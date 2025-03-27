from starlette.requests import Request
import torch
from torchvision import transforms
import mlflow
import ray
from io import BytesIO
from PIL import Image
from ray import serve
import numpy as np
import boto3

@serve.deployment(num_replicas=1)
class FoodModel:
    def __init__(self):
        mlflow.set_tracking_uri("http://mlflow:5000")
        IMG_SIZE = (224, 224)
        IMAGE_NET_MEAN = [0.485, 0.456, 0.406]
        IMAGE_NET_STD = [0.229, 0.224, 0.225]
        self.transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Resize(IMG_SIZE),
            transforms.Normalize(mean=IMAGE_NET_MEAN, std=IMAGE_NET_STD),
        ])
        model_name = "model"
        version = 1
        self.model = mlflow.pytorch.load_model(model_uri=f"models:/{model_name}/{version}")
        self.model.eval();
        self.labels = ["air_limau", "air_milo", "air_sirap", "ais_kacang", "apam_balik", "cendol", "char_kuey_teow", "chicken_rice", "congee", "curry_puff", "durian", "fried_rice", "kaya_toast", "kottu", "kuih_seri_muka", "mee_goreng", "nasi_biryani", "nasi_kerabu", "nasi_lemak", "ondeh_ondeh", "otak_otak", "papaya", "pineapple", "pisang_goreng", "rambutan", "rojak", "roti_canai", "satay", "teh_tarik", "thosai"]
        self.s3_client = boto3.client('s3')

    def split_name_and_key(self, path):
        return path.replace("s3://", "").split("/", 1)

    async def __call__(self, http_request: Request):
        body = await http_request.json()
        
        image_uri = body.get('image_uri')
        bucket_name, object_key = self.split_name_and_key(image_uri)
        obj = self.s3_client.get_object(Bucket=bucket_name, Key=object_key)
        img_data = obj['Body'].read()
        img = Image.open(BytesIO(img_data)).convert('RGB')

        pred = self.model(self.transform(img)[None, :])[0]
        idx = torch.argmax(pred).item()
        max_p = torch.exp(pred[idx]) / torch.sum(torch.exp(pred))

        print(f"Predicted: {self.labels[idx]}, %: {max_p}")

        prediction = "none"
        if max_p >= 0.5:
            prediction = self.labels[idx]

        probabilities = {i : j for i, j in  zip(self.labels, (torch.exp(pred) / torch.sum(torch.exp(pred))).tolist())}

        return {
            "prediction": prediction,
            "probabilities": probabilities
        }


makanlah_model = FoodModel.bind()
