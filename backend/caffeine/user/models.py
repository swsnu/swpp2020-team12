from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(null=False, max_length=64)
    message = models.CharField(null=True, blank=True, max_length=255)
    open_eye_left = models.FloatField(default=0.6)
    close_eye_left = models.FloatField(default=0)
    open_eye_right = models.FloatField(default=0.6)
    close_eye_right = models.FloatField(default=0)
