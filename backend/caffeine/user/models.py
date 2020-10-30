from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(null=False, max_length=64)
    message = models.CharField(null=True, blank=True, max_length=255)



