import os
import numpy as np
from PIL import Image, ImageOps
from torch.utils.data import DataLoader, Dataset
import torchvision.transforms as transforms
import json
import random
import matplotlib.pyplot as plt
import boto3
from io import BytesIO
import botocore.exceptions

IMG_SIZE = (224, 224)
IMAGE_NET_MEAN = [0.485, 0.456, 0.406]
IMAGE_NET_STD = [0.229, 0.224, 0.225]

s3_client = boto3.client('s3')

def view_image(im, name=""):
    image = im.numpy().transpose((1, 2, 0)) 
    image = image * IMAGE_NET_STD + IMAGE_NET_MEAN

    plt.imshow(image)
    if name:
        plt.title(f"Label: {name}")
    plt.show()

def is_s3_path(path):
    return path.lower().startswith("s3://")
    
def split_name_and_key(path):
    return path.replace("s3://", "").split("/", 1)

def exists(path):
    if is_s3_path(path):
        try:
            bucket_name, object_key = split_name_and_key(path)
            if object_key[-1] == '/':
                    response = s3_client.list_objects(
                        Bucket=bucket_name,
                        Prefix=object_key,
                        Delimiter='/'
                    )

                    return 'CommonPrefixes' in response
            else:
                s3_client.head_object(Bucket=bucket_name, Key=object_key)
                return True
        except botocore.exceptions.ClientError as e:
            if e.response['Error']['Code'] == 'NoSuchKey':
                return False
            else:
                raise 
    else:
        return os.path.exists(path)

def read_json(path):
    if is_s3_path(path):
        bucket_name, object_key = split_name_and_key(path)
        obj = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        return json.loads(obj['Body'].read().decode('utf-8'))
    else:
        # Read the JSON from a local file
        with open(path, 'r') as f:
            return json.load(f)

def read_image(path):
    if is_s3_path(path):
        bucket_name, object_key = split_name_and_key(path)
        obj = s3_client.get_object(Bucket=bucket_name, Key=object_key)
        img_data = obj['Body'].read()
        img = Image.open(BytesIO(img_data)).convert('RGB')
        return img
    else:
        img = Image.open(path).convert('RGB')
        return img

class TrainFoodDataset(Dataset):
    def __init__(self, data_dir='s3://makanlah-s3-bucket/datasets/', augment=True):
        self.data_dir = data_dir
        assert exists(self.data_dir), self.data_dir
        self.x, self.y, self.names = self.parse_annotations()
        self.augment_data = augment
        
        if augment:
            self.transform = transforms.Compose([
                transforms.RandomHorizontalFlip(),
                transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.05, hue=0.05),
                transforms.RandomRotation(30),
                transforms.ToTensor(),
                transforms.Normalize(mean=IMAGE_NET_MEAN, std=IMAGE_NET_STD),
            ])
        else:
            self.transform = transforms.Compose([
                transforms.ToTensor(),
                transforms.Normalize(mean=IMAGE_NET_MEAN, std=IMAGE_NET_STD),
            ])


    def parse_annotations(self):
        food_file = os.path.join(self.data_dir, 'train_food.json')
        assert exists(food_file), food_file
        label_file = os.path.join(self.data_dir, 'labels.json')
        assert exists(label_file), label_file
        data = read_json(food_file)
        labels = read_json(label_file)
        x = []
        y = []
        names = []
        for i in data:
            x.append(os.path.join(self.data_dir, i['path']))
            y.append(labels.index(i['class']))
            names.append(i['class'])
        print('{} images'.format(len(x)))
        return x, y, names

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        image_file = self.x[index]
        assert exists(image_file), image_file
        label = self.y[index]
        name = self.names[index]
        image = read_image(image_file)
        im_width, im_height = image.size

        h = IMG_SIZE[1]
        w = IMG_SIZE[0]
        resized_image = image.resize((w, h), Image.Resampling.LANCZOS)
        im = self.transform(resized_image)
        
        return im, label, name, image_file

class TrainOutliersDataset(Dataset):
    def __init__(self, data_dir='s3://makanlah-s3-bucket/datasets/', augment=True):
        self.data_dir = data_dir
        assert exists(self.data_dir), self.data_dir
        self.x = self.parse_annotations()
        self.augment_data = augment
        if augment:
            self.transform = transforms.Compose([
                transforms.RandomHorizontalFlip(),
                transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.05, hue=0.05),
                transforms.RandomRotation(30),
                transforms.ToTensor(),
                transforms.Normalize(mean=IMAGE_NET_MEAN, std=IMAGE_NET_STD),
            ])
        else:
            self.transform = transforms.Compose([
                transforms.ToTensor(),
                transforms.Normalize(mean=IMAGE_NET_MEAN, std=IMAGE_NET_STD),
            ])

    def parse_annotations(self):
        file = os.path.join(self.data_dir, 'train_outliers.json')
        assert exists(file), file
        data = read_json(file)
        x = []
        for i in data:
            x.append(os.path.join(self.data_dir, i['path']))
        print('{} images'.format(len(x)))
        return x

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        image_file = self.x[index]
        assert exists(image_file), image_file
        image = read_image(image_file)
        im_width, im_height = image.size

        h = IMG_SIZE[1]
        w = IMG_SIZE[0]
        resized_image = image.resize((w, h), Image.Resampling.LANCZOS)
        im = self.transform(resized_image)
        
        return im, image_file

class TestDataset(Dataset):
    def __init__(self, data_dir='s3://makanlah-s3-bucket/datasets/', include_outliers=False):
        self.data_dir = data_dir
        assert exists(self.data_dir), self.data_dir
        self.x, self.y, self.names = self.parse_annotations(include_outliers)
        self.transform = transforms.Compose([
            transforms.ToTensor(),
            transforms.Normalize(mean=IMAGE_NET_MEAN, std=IMAGE_NET_STD),
        ])

    def parse_annotations(self, include_outliers):
        food_file = os.path.join(self.data_dir, 'test_food.json')
        assert exists(food_file), food_file
        label_file = os.path.join(self.data_dir, 'labels.json')
        assert exists(label_file), label_file
        data = read_json(food_file)
        labels = read_json(label_file)
        x = []
        y = []
        names = []
        for i in data:
            x.append(os.path.join(self.data_dir, i['path']))
            y.append(labels.index(i['class']))
            names.append(i['class'])
        
        if include_outliers:
            outlier_file = os.path.join(self.data_dir, 'test_outliers.json')
            assert exists(outlier_file), outlier_file
            outliers = read_json(outlier_file)
            for i in outliers:
                x.append(os.path.join(self.data_dir, i['path']))
                y.append(-1)
                names.append("")
            
        print('{} images'.format(len(x)))
        return x, y, names

    def __len__(self):
        return len(self.x)

    def __getitem__(self, index):
        image_file = self.x[index]
        label = self.y[index]
        name = self.names[index]
        image = read_image(image_file)
        im_width, im_height = image.size

        h = IMG_SIZE[1]
        w = IMG_SIZE[0]
        resized_image = image.resize((w, h), Image.Resampling.LANCZOS)
        im = self.transform(resized_image)
        
        return im, label, name, image_file
