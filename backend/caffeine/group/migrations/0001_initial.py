# Generated by Django 3.1.4 on 2020-12-10 05:33

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('study', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
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
                ('members', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StudyRoom',
            fields=[
                ('group', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='group.group')),
                ('active_studys', models.ManyToManyField(blank=True, to='study.DailyStudyForSubject')),
            ],
        ),
    ]
