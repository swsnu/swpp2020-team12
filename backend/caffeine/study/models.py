from django.db import models
from datetime import timedelta
from user.models import User

class Daily_study_record(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='dailyrecord'
    )
    date = models.DateField(auto_now_add=True)
    total_study_time = models.DurationField(timedelta(0))
    total_concentration = models.DurationField(timedelta(0))
    total_gauge = models.FloatField(default=0)

class Daily_study_for_subject(models.Model):
    date = models.DateField(auto_now_add=True)
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(auto_now=True)
    study_time = models.DurationField(timedelta(0))
    distracted_time = models.DurationField(timedelta(0))
    concentration_gauge = models.FloatField(default=0)
    last_updated_time = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)
    subject = models.CharField(max_length=64)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='daily_subject_record'
    )

#def user_directory_path(instance, filename):
#        return '{0}/{1}'.format(instance.user.id, filename)

class Concentration(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    concentration = models.BooleanField(default=True)
    image = models.ImageField(upload_to='', blank=True)
    parent_study = models.ForeignKey(
        Daily_study_for_subject,
        on_delete=models.CASCADE,
        related_name='concentrations'
    )
    