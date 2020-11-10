from datetime import timedelta
from django.db import models
from user.models import User


# Create your models here.

class Group(models.Model):
    name = models.CharField(null=False, max_length=64, unique=True)
    password = models.CharField(null=True, max_length=64, blank=True)
    description = models.TextField(null=True, blank=True)
    time = models.DurationField(default=timedelta())  # sum of all user's daily study time
    members = models.ManyToManyField(User)

#    def __str__(self):
#        return self.name

#    def getTime(self):
#        return self.time


class StudyRoom(models.Model):
    group = models.OneToOneField(Group,
                                 on_delete=models.CASCADE)
    active_members = models.ManyToManyField(User)  # group에 속한 user들만 들어올 수 있게 하려면?

#    def getActiveUsers(self):
#        return self.active_members
