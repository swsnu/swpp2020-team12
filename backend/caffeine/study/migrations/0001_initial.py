# Generated by Django 3.1.2 on 2020-11-21 16:27

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyStudyRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('total_study_time', models.DurationField(default=datetime.timedelta(0))),
                ('total_concentration', models.DurationField(default=datetime.timedelta(0))),
                ('total_gauge', models.FloatField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='daily_record', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='DailyStudyForSubject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('start_time', models.DateTimeField(auto_now_add=True)),
                ('end_time', models.DateTimeField(auto_now=True)),
                ('study_time', models.DurationField(default=datetime.timedelta(0))),
                ('distracted_time', models.DurationField(default=datetime.timedelta(0))),
                ('concentration_gauge', models.FloatField(default=0)),
                ('last_updated_time', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=False)),
                ('subject', models.CharField(max_length=64)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='daily_subject_record', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Concentration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('concentration', models.BooleanField(default=True)),
                ('image', models.ImageField(blank=True, upload_to='')),
                ('parent_study', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='concentrations', to='study.dailystudyforsubject')),
            ],
        ),
    ]
