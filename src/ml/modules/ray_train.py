import os
from filelock import FileLock
from tqdm import tqdm
import torch
import torch.nn as nn
import torch.nn.functional as F
import mlflow
import ray.train
from torch.utils.data import DataLoader
from torchvision import datasets, transforms
from ray.train import ScalingConfig
from ray.train.torch import TorchTrainer
from datasets import TrainFoodDataset, TrainOutliersDataset, TestDataset
import numpy as np
from net import MobileNetV2

def get_dataloaders(batch_size):
    train_food_dataset = TrainFoodDataset()
    train_outliers_dataset = TrainOutliersDataset()
    test_dataset = TestDataset(include_outliers=False)

    train_food_dataloader = DataLoader(train_food_dataset, batch_size=batch_size, shuffle=True)
    train_outliers_dataloader = DataLoader(train_outliers_dataset, batch_size=batch_size, shuffle=True)
    test_dataloader = DataLoader(test_dataset, batch_size=batch_size)

    return train_food_dataloader, train_outliers_dataloader, test_dataloader

def cosine_annealing(step, total_steps, lr_max, lr_min):
    return lr_min + (lr_max - lr_min) * 0.5 * (
            1 + np.cos(step / total_steps * np.pi))

def train_func_per_worker(config):
    if ray.train.get_context().get_world_rank() == 0:
        mlflow.set_tracking_uri("http://mlflow:5000")
        mlflow.set_experiment("food_model")
        mlflow.start_run()

    lr = config["lr"]
    epochs = config["epochs"]
    batch_size = config["batch_size_per_worker"]

    train_food_dataloader, train_outliers_dataloader, test_dataloader = get_dataloaders(batch_size=batch_size)

    train_food_dataloader = ray.train.torch.prepare_data_loader(train_food_dataloader)
    train_outliers_dataloader = ray.train.torch.prepare_data_loader(train_outliers_dataloader)
    test_dataloader = ray.train.torch.prepare_data_loader(test_dataloader)

    model = MobileNetV2()
    model = ray.train.torch.prepare_model(model)

    optimizer = torch.optim.SGD(model.parameters(), lr, momentum=0.9, nesterov=True)

    scheduler = torch.optim.lr_scheduler.LambdaLR(
        optimizer,
        lr_lambda=lambda step: cosine_annealing(
            step,
            epochs * len(train_food_dataloader),
            1, 
            1e-8))

    for epoch in range(epochs):
        if ray.train.get_context().get_world_size() > 1:
            train_food_dataloader.sampler.set_epoch(epoch)

        model.train()
        train_loss_avg = 0
        for in_set, out_set in tqdm(zip(train_food_dataloader, train_outliers_dataloader), desc=f"Train Epoch {epoch}"):
            data = torch.cat((in_set[0], out_set[0]), 0)
            target = in_set[1]

            x = model(data)

            scheduler.step()
            optimizer.zero_grad()

            loss = F.cross_entropy(x[:len(in_set[0])], target)
            # cross-entropy from softmax distribution to uniform distribution
            loss += 0.5 * -(x[len(in_set[0]):].mean(1) - torch.logsumexp(x[len(in_set[0]):], dim=1)).mean()

            loss.backward()
            optimizer.step()

            with torch.no_grad():
                train_loss_avg = train_loss_avg * 0.8 + float(loss) * 0.2

        model.eval()
        test_loss_avg = 0.0
        correct = 0
        with torch.no_grad():
            for data, target, _, _ in tqdm(test_dataloader, desc=f"Test Epoch {epoch}"):
                output = model(data)
                loss = F.cross_entropy(output, target)

                pred = output.data.max(1)[1]
                correct += pred.eq(target.data).sum().item()

                test_loss_avg += float(loss.data)
        
        test_loss = test_loss_avg / len(test_dataloader)
        test_acc = correct / len(test_dataloader.dataset)

        if ray.train.get_context().get_world_rank() == 0:
            mlflow.log_metrics({"training_loss": train_loss_avg, "testing_loss": test_loss_avg, "accuracy": test_acc}, step=epoch)

    if ray.train.get_context().get_world_rank() == 0:
        mlflow.pytorch.log_model(model.module, "food_model")
        mlflow.end_run()
    
def train_food_model(num_workers=2, cpus_per_worker=1, use_gpu=False):
    global_batch_size = 8

    train_config = {
        "lr": 0.001,
        "epochs": 1,
        "batch_size_per_worker": global_batch_size // num_workers,
    }

    scaling_config = ScalingConfig(
        num_workers=num_workers,
        use_gpu=use_gpu,
        resources_per_worker={"CPU": cpus_per_worker}
    )

    trainer = TorchTrainer(
        train_loop_per_worker=train_func_per_worker,
        train_loop_config=train_config,
        scaling_config=scaling_config,
    )

    result = trainer.fit()
    print(f"Training result: {result}")


if __name__ == "__main__":
    num_workers = int(os.getenv("NUM_WORKERS", "1"))
    cpus_per_worker = int(os.getenv("CPUS_PER_WORKER", "1"))
    train_food_model(num_workers=num_workers, cpus_per_worker=cpus_per_worker)
