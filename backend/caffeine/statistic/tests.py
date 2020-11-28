import json
from datetime import datetime, timedelta, date
from django.test import TestCase, Client
from user.models import User
from study.models import DailyStudyForSubject, DailyStudyRecord


# Create your tests here.
class StatisticTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        user1 = User.objects.create_user(username='id1', name='nickname1',
            password='pw1', message='message1')
        dailystudyrecord1 = DailyStudyRecord.objects.create(user=user1, total_study_time=timedelta(seconds=1), total_concentration=timedelta(0))
        dailystudyforsubject1 = DailyStudyForSubject.objects.create(study_time=timedelta(seconds=1),
            subject='swpp', distracted_time=timedelta(0), user=user1)
    def test_getMonthlydata(self):
        client = Client()
        client.login(username='id1', password='pw1')
        today_year=str(datetime.today().year)
        today_month=str(datetime.today().month-1)
        today=date.today().isoformat()
        response = client.get('/statistic/{}/{}'.format(today_year, today_month))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [{'date':today,
                          'count':0
                          }])
    def test_getWeeklydata(self):
        client = Client()
        client.login(username='id1', password='pw1')
        today_year=str(datetime.today().year)
        today_month=str(datetime.today().month-1)
        today_day=str(datetime.today().day)
        response = client.get('/statistic/{}/{}/{}'.format(today_year, today_month, today_day))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'weekly_total':'00:00','weekly_study_time':'00:00','weekly_subjectData':[{'x': 'swpp', 'y': 1.0}]})
    def test_getDailySubject(self):
        client = Client()
        client.login(username='id1', password='pw1')
        today_year=str(datetime.today().year)
        today_month=str(datetime.today().month-1)
        today_day=str(datetime.today().day)
        response = client.get('/statistic/{}/{}/{}/subjects'.format(today_year, today_month, today_day))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'daily_total':'00:00','daily_study_time':'00:00','subjectData':[{'x': 'swpp', 'y': 1.0}]})
