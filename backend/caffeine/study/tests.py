from django.test import TestCase
from .models import Daily_study_record, Daily_study_for_subject, Concentration
from user.models import User
from datetime import timedelta

class modelsTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username='id1', name='nickname1',
            password='pw1', message='message1')
        user2 = User.objects.create_user(username='id2', name='nickname2',
            password='pw2', message='message2')
        Daily_study_record.objects.create(user=user1,
            total_study_time=timedelta(hours=10, minutes=42),
            total_concentration=timedelta(hours=10, minutes=42), total_gauge=1)
        Daily_study_record.objects.create(user=user2,
            total_study_time=timedelta(minutes=42),
            total_concentration=timedelta(minutes=30),
            total_gauge=timedelta(minutes=30).seconds/timedelta(minutes=42).seconds)
        daily_study_for_subject=Daily_study_for_subject.objects.create(study_time=timedelta(),
            subject='swpp', distracted_time=timedelta(), user=user1)
        Concentration.objects.create(parent_study=daily_study_for_subject)
        Concentration.objects.create(parent_study=daily_study_for_subject)

    def test_daily_study_record_count(self):
        self.assertEqual(Daily_study_record.objects.all().count(), 2)

    def test_daily_study_for_subject_count(self):
        self.assertEqual(Daily_study_for_subject.objects.count(), 1)

    def test_concentration_count(self):
        self.assertEqual(Concentration.objects.count(), 2)
