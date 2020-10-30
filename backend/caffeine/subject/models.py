from django.db import models
from customUser.models import CustomUser as User


# Create your models here.

class Subject(models.Model):
    name = models.CharField(max_length=64)
    time = models.DurationField()  # sum of all customUser's daily study time
    description = models.TextField(blank=True)
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.name