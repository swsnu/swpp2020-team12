import json
from datetime import datetime, timedelta
from django.test import TestCase, Client
from user.models import User
from study.models import DailyStudyForSubject, DailyStudyRecord


# Create your tests here.
class StatisticTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        user1 = User.objects.create_user(username='id1', name='nickname1',
                                         password='pw1', message='message1')
        DailyStudyRecord.objects.create(user=user1, total_study_time=timedelta(seconds=1), date=datetime(2020, 11, 25),
                                        total_concentration=timedelta(0))
        DailyStudyForSubject.objects.create(date=datetime(2020, 11, 25), study_time=timedelta(seconds=1),
                                            subject='swpp', distracted_time=timedelta(0), user=user1)

    def test_getMonthlyData(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/statistic/2020/10')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [{'date': '2020-11-24',
                                            'count': 0
                                            }])

    def test_getWeeklyData(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/statistic/2020/10/25')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'weekly_total': '00:00', 'weekly_study_time': '00:00',
                                           'weekly_subjectData': [{'x': 'swpp', 'y': 1.0}]})

    def test_getDailySubject(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/statistic/2020/10/24/subjects')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'daily_total': '00:00', 'daily_study_time': '00:00',
                                           'subjectData': [{'x': 'swpp', 'y': 1.0}]})
