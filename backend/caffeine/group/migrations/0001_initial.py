# Generated by Django 3.1.2 on 2020-12-07 12:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64, unique=True)),
                ('password', models.CharField(blank=True, default='', max_length=64, null=True)),
                ('description', models.TextField(blank=True, default='', null=True)),
                ('time', models.DurationField(default=datetime.timedelta(0))),
            ],
        ),
        migrations.CreateModel(
            name='StudyRoom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
