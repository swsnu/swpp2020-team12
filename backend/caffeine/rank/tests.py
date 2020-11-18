from datetime import timedelta, date
from django.test import TestCase, Client
from study.models import DailyStudyRecord, DailyStudyForSubject, Concentration
from user.models import User
from group.models import Group


class StudyTestCase(TestCase):
    maxDiff = None

    def setUp(self):
        user1 = User.objects.create_user(username='id1', name='nickname1',
                                         password='pw1', message='message1')
        user2 = User.objects.create_user(username='id2', name='nickname2',
                                         password='pw2', message='message2')
        user3 = User.objects.create_user(username='id3', name='nickname3',
                                         password='pw3', message='message3')
        group1 = Group.objects.create(name='team1', description='this is description1')
        group1.members.add(user1, user2)

        # 8시간
        DailyStudyRecord.objects.create(user=user1,
                                        date=date.today(),
                                        total_study_time=timedelta(hours=1, minutes=30),
                                        total_concentration=timedelta(hours=1, minutes=30),
                                        total_gauge=1)
        DailyStudyRecord.objects.create(user=user1,
                                        date=date.today() - timedelta(days=1),
                                        total_study_time=timedelta(hours=2, minutes=00),
                                        total_concentration=timedelta(hours=2, minutes=00),
                                        total_gauge=1)
        DailyStudyRecord.objects.create(user=user1,
                                        date=date.today() - timedelta(days=2),
                                        total_study_time=timedelta(hours=2, minutes=00),
                                        total_concentration=timedelta(hours=2, minutes=00),
                                        total_gauge=1)
        DailyStudyRecord.objects.create(user=user1,
                                        date=date.today() - timedelta(days=3),
                                        total_study_time=timedelta(hours=1, minutes=00),
                                        total_concentration=timedelta(hours=1, minutes=00),
                                        total_gauge=1)

        # user2 6시간
        DailyStudyRecord.objects.create(user=user2,
                                        date=date.today(),
                                        total_study_time=timedelta(hours=1, minutes=42),
                                        total_concentration=timedelta(hours=1, minutes=42),
                                        total_gauge=1)
        DailyStudyRecord.objects.create(user=user2,
                                        date=date.today() - timedelta(days=3),
                                        total_study_time=timedelta(hours=3, minutes=00),
                                        total_concentration=timedelta(hours=3, minutes=00),
                                        total_gauge=1)
        DailyStudyRecord.objects.create(user=user2,
                                        date=date.today() - timedelta(days=4),
                                        total_study_time=timedelta(hours=2, minutes=00),
                                        total_concentration=timedelta(hours=2, minutes=00),
                                        total_gauge=1)
        # 15시
        for i in range(1, 6):
            DailyStudyRecord.objects.create(user=user3,
                                            date=date.today() - timedelta(days=i - 1),
                                            total_study_time=timedelta(hours=i, minutes=00),
                                            total_concentration=timedelta(hours=i, minutes=00),
                                            total_gauge=1)

    def test_rank_count(self):
        # first start from day
        self.assertEqual(DailyStudyRecord.objects.filter(date=date.today()).count(), 3)

    def test_user_rank_get(self):
        # first start from day
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/rank/user')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"records": [{'id': 2, 'name': 'nickname2', 'time': 'P0DT01H42M00S'},
                                                       {'id': 1, 'name': 'nickname1', 'time': 'P0DT01H30M00S'},
                                                       {'id': 3, 'name': 'nickname3', 'time': 'P0DT01H00M00S'},
                                                       ],
                                           "user_ranking": 2,
                                           "user_record": {'id': 1, 'name': 'nickname1', 'time': 'P0DT01H30M00S'}})

    def test_user_rank_post(self):
        # first start from day
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/rank/user')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"records": [{'id': 3, 'name': 'nickname3', 'time': 'P0DT15H00M00S'},
                                                       {'id': 2, 'name': 'nickname2', 'time': 'P0DT06H42M00S'},
                                                       {'id': 1, 'name': 'nickname1', 'time': 'P0DT06H30M00S'}],
                                           "user_ranking": 3,
                                           "user_record": {'id': 1, 'name': 'nickname1', 'time': 'P0DT06H30M00S'}})

    def test_group_rank_get(self):
        # first start from day
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/rank/group/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"records": [{'id': 2, 'name': 'nickname2', 'time': 'P0DT01H42M00S'},
                                                       {'id': 1, 'name': 'nickname1', 'time': 'P0DT01H30M00S'}],
                                           "user_ranking": 2,
                                           "user_record": {'id': 1, 'name': 'nickname1', 'time': 'P0DT01H30M00S'}})

    def test_group_rank_post(self):
        # first start from day
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/rank/group/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"records": [{'id': 2, 'name': 'nickname2', 'time': 'P0DT06H42M00S'},
                                                       {'id': 1, 'name': 'nickname1', 'time': 'P0DT06H30M00S'}],
                                           "user_ranking": 2,
                                           "user_record": {'id': 1, 'name': 'nickname1', 'time': 'P0DT06H30M00S'}})
