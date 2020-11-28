from django.db import models
from django import forms
from user.models import User
from datetime import timedelta

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


# null=True가 맞냐?
class Days(models.Model):
    day = models.IntegerField(choices=DAYS_OF_WEEK, null=True)
    start_time = models.TimeField(blank=True, null=True)
    end_time = models.TimeField(blank=True, null=True)


class Subject(models.Model):
    name = models.CharField(max_length=64, null=False)
    days = models.ManyToManyField(Days, related_name='timetable', blank=True)  # null은 써도 효과 없음
    description = models.TextField(blank=True, null=True)  # textfield에서 null 쓰지 말라고 권고
    user = models.ForeignKey(User,
                             on_delete=models.CASCADE)
