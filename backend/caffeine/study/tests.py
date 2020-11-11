import json
from django.test import TestCase, Client
from .models import DailyStudyRecord, DailyStudyForSubject, Concentration
from user.models import User
from datetime import timedelta


class StudyTestCase(TestCase):
    def setUp(self):
        user1 = User.objects.create_user(username='id1', name='nickname1',
                                         password='pw1', message='message1')
        user2 = User.objects.create_user(username='id2', name='nickname2',
                                         password='pw2', message='message2')
        DailyStudyRecord.objects.create(user=user1,
                                        total_study_time=timedelta(hours=10, minutes=42),
                                        total_concentration=timedelta(hours=10, minutes=42), total_gauge=1)
        DailyStudyRecord.objects.create(user=user2,
                                        total_study_time=timedelta(minutes=42),
                                        total_concentration=timedelta(minutes=30),
                                        total_gauge=timedelta(minutes=30).seconds / timedelta(minutes=42).seconds)
        daily_study_for_subject = DailyStudyForSubject.objects.create(study_time=timedelta(),
                                                                      subject='swpp', distracted_time=timedelta(),
                                                                      user=user1)
        Concentration.objects.create(parent_study=daily_study_for_subject)
        Concentration.objects.create(parent_study=daily_study_for_subject)

    def test_daily_study_record_count(self):
        self.assertEqual(DailyStudyRecord.objects.all().count(), 2)

    def test_daily_study_for_subject_count(self):
        self.assertEqual(DailyStudyForSubject.objects.count(), 1)

    def test_concentration_count(self):
        self.assertEqual(Concentration.objects.count(), 2)

    def test_study_room_post(self):
        """???"""
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/status', json.dumps({
            'group_id': 1, 'subject': 'swpp'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_study_infer(self):
        client = Client()
        client.login(username='id1', password='pw1')


        '''
        self.assertEqual(response.json(), {
            'id': 4,
            'description': 'test_descript',
            'name': 'test_subject',
            'user': 1,
            'days': [{'day': 2, 'end_time': '18:00:00',
                      'start_time': '15:00:00'}]
        })
        '''
