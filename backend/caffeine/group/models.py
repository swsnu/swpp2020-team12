from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    description = models.TextField(blank=True)
    time = models.IntegerField()  # sum of all user's daily study time
    members = models.ManyToManyField(User)

    def __str__(self):
        return self.name

    def getTime(self):
        return self.time
