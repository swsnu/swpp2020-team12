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
        # first start from day
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/status/', json.dumps({
            'group_id': 1, 'subject': 'swpp'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(DailyStudyRecord.objects.all().count(), 1)
        current_study = DailyStudyForSubject.objects.filter(is_active=True)
        self.assertEqual(current_study.count(), 1)
        current_study = current_study.first()
        user1 = User.objects.get(username='id1')
        self.assertEqual(current_study.user, user1)
        self.assertEqual(current_study.subject, 'swpp')

    def test_study_room_post_again(self):
        # study again
        user1 = User.objects.get(username='id1')
        DailyStudyRecord.objects.create(user=user1,
                                        total_study_time=timedelta(hours=10, minutes=42),
                                        total_concentration=timedelta(hours=10, minutes=42), total_gauge=1)
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/status/', json.dumps({
            'group_id': 1, 'subject': 'swpp'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(DailyStudyRecord.objects.all().count(), 1)
        current_study = DailyStudyForSubject.objects.filter(is_active=True)
        self.assertEqual(current_study.count(), 1)
        current_study = current_study.first()
        user1 = User.objects.get(username='id1')
        self.assertEqual(current_study.user, user1)
        self.assertEqual(current_study.subject, 'swpp')

    def test_study_room_put(self):
        user1 = User.objects.get(username='id1')
        today_study = DailyStudyRecord.objects.create(user=user1,
                                                      total_study_time=timedelta(hours=10, minutes=42),
                                                      total_concentration=timedelta(hours=10, minutes=42),
                                                      total_gauge=1)
        study1 = DailyStudyForSubject.objects.create(study_time=timedelta(minutes=42),
                                                     subject='swpp', distracted_time=timedelta(minutes=32),
                                                     user=user1, is_active=True)
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.put('/study/status/')
        self.assertEqual(response.status_code, 200)
        today = DailyStudyRecord.objects.get(date=date.today())
        self.assertEqual(today.total_study_time,
                         today_study.total_study_time + study1.study_time + study1.distracted_time)
        self.assertEqual(today.total_concentration,
                         today_study.total_concentration + study1.study_time)
        self.assertEqual(today.total_gauge,
                         (today_study.total_concentration + study1.study_time) /
                         (today_study.total_study_time + study1.study_time + study1.distracted_time))

    def test_study_room_405(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/study/status/')
        self.assertEqual(response.status_code, 405)
        response = client.delete('/study/status/')
        self.assertEqual(response.status_code, 405)

    def test_study_infer_0(self):
        user1 = User.objects.get(username='id1')
        client = Client()
        client.login(username='id1', password='pw1')
        study1 = DailyStudyForSubject.objects.create(study_time=timedelta(minutes=42),
                                                     subject='swpp', distracted_time=timedelta(minutes=32),
                                                     user=user1, is_active=True)
        # with status 0
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/infer/', json.dumps({
            'image': 'b123sfad'
        }), content_type='application/json')
        self.assertJSONEqual(response.content,
                             {'status': 0, 'gauge': (study1.study_time + timedelta(seconds=10)) /
                                                    (study1.study_time + study1.distracted_time + timedelta(
                                                        seconds=10))})
