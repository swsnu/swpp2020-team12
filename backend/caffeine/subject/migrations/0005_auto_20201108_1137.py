# Generated by Django 3.1.2 on 2020-11-08 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subject', '0004_auto_20201108_1134'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subject',
            name='days',
            field=models.ManyToManyField(blank=True, null=True, related_name='timetable', to='subject.Days'),
        ),
    ]