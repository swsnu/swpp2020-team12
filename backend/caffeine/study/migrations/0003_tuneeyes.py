# Generated by Django 3.1.2 on 2020-12-15 08:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('study', '0002_auto_20201215_1624'),
    ]

    operations = [
        migrations.CreateModel(
            name='TuneEyes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('open_eye_left', models.FloatField(default=0.6)),
                ('close_eye_left', models.FloatField(default=0)),
                ('open_eye_right', models.FloatField(default=0.6)),
                ('close_eye_right', models.FloatField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='eyes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
