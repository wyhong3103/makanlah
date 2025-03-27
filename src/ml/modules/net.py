import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models
import numpy as np
import torch.nn.functional as F

class MobileNetV2(nn.Module):
    def __init__(self, num_classes=30):
        super(MobileNetV2, self).__init__()
        self.model = models.mobilenet_v2(pretrained=True)
        self.model.classifier[1] = nn.Linear(self.model.last_channel, num_classes)

    def forward(self, x):
        return self.model(x)
