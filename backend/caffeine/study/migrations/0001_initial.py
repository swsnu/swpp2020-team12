# Generated by Django 3.1.2 on 2020-12-15 08:05

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Concentration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('concentration', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='DailyStudyForSubject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today)),
                ('start_time', models.DateTimeField(auto_now_add=True)),
                ('end_time', models.DateTimeField(auto_now=True)),
                ('study_time', models.DurationField(default=datetime.timedelta(0))),
                ('distracted_time', models.DurationField(default=datetime.timedelta(0))),
                ('concentration_gauge', models.FloatField(default=0)),
                ('last_updated_time', models.DateTimeField(auto_now=True)),
                ('is_active', models.BooleanField(default=False)),
                ('subject', models.CharField(max_length=64)),
            ],
        ),
        migrations.CreateModel(
            name='DailyStudyRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.date.today)),
                ('total_study_time', models.DurationField(default=datetime.timedelta(0))),
                ('total_concentration', models.DurationField(default=datetime.timedelta(0))),
                ('total_gauge', models.FloatField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='TuneEyes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('open_eye_left', models.FloatField(default=0.6)),
                ('close_eye_left', models.FloatField(default=0)),
                ('open_eye_right', models.FloatField(default=0.6)),
                ('close_eye_right', models.FloatField(default=0)),
            ],
        ),
    ]
