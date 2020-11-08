from django.db import models
from user.models import User
from datetime import timedelta
from django import forms

# Create your models here.

DAYS_OF_WEEK = (
    (0, 'Monday'),
    (1, 'Tuesday'),
    (2, 'Wednesday'),
    (3, 'Thursday'),
    (4, 'Friday'),
    (5, 'Saturday'),
    (6, 'Sunday'),
)

#days를 만들거면 무조건 starttime, duration 만들어야 함
class Days(models.Model):
    days = models.CharField(max_length=1, choices=DAYS_OF_WEEK)
    start_time = models.TimeField(blank=True, null=False)
    duration = models.DurationField(blank=True, null=False)


class Subject(models.Model):
    name = models.CharField(max_length=64, null=False)
    days = models.ManyToManyField(Days, null=True)
    description = models.TextField(blank=True, null=True)
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE)

    def __str__(self):
        return self.name
