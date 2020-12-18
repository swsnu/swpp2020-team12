import datetime
from django.test import TestCase, Client
from user.models import User
from .models import Subject, Days
import json


# Create your tests here.
class SubjectTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        user1 = User.objects.create_user(username='id1', name='nickname1',
                                         password='pw1', message='message1')
        user2 = User.objects.create_user(username='id2', name='nickname2',
                                         password='pw2', message='message2')
        User.objects.create_user(username='id3', name='nickname3',
                                 password='pw3', message='message3')
        subject1 = Subject.objects.create(name='subject1',
                                          description='this is description1',
                                          user=user1)

        Subject.objects.create(name='subject2',
                               description='this is description2',
                               user=user2)

        subject3 = Subject.objects.create(name='subject3',
                                          description='this is description3',
                                          user=user1)
        day1 = Days.objects.create(day=1, start_time='12:00', end_time='13:00')
        day2 = Days.objects.create(day=2, start_time='14:00', end_time='16:00')
        day3 = Days.objects.create(day=5, start_time='15:00', end_time='16:00')

        subject1.days.add(day1, day2)
        subject3.days.add(day3)

    def test_subject_count(self):
        self.assertEqual(Subject.objects.all().count(), 3)

    def test_get_subjects(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/api/subject/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [{'id': 1,
                                            'name': 'subject1',
                                            'description': 'this is description1',
                                            'user': 1,
                                            'days': [{'day': 1, 'end_time': '13:00:00',
                                                      'start_time': '12:00:00'},
                                                     {'day': 2, 'end_time': '16:00:00',
                                                      'start_time': '14:00:00'}]},
                                           {'id': 3,
                                            'name': 'subject3',
                                            'description': 'this is description3',
                                            'user': 1,
                                            'days': [{'day': 5, 'end_time': '16:00:00',
                                                      'start_time': '15:00:00'}]
                                            }])

    def test_post_subjects(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/api/subject/', json.dumps({
            'description': 'test_descript', 'name': 'test_subject',
            'days': [{'day': 2, 'end_time': '18:00:00',
                      'start_time': '15:00:00'}]
        }), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {
            'id': 4,
            'description': 'test_descript',
            'name': 'test_subject',
            'user': 1,
            'days': [{'day': 2, 'end_time': '18:00:00',
                      'start_time': '15:00:00'}]
        })

    def test_get_subject(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/api/subject/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'id': 1,
                                           'name': 'subject1',
                                           'description': 'this is description1',
                                           'user': 1,
                                           'days': [{'day': 1, 'end_time': '13:00:00',
                                                     'start_time': '12:00:00'},
                                                    {'day': 2, 'end_time': '16:00:00',
                                                     'start_time': '14:00:00'}]})

    def test_edit_subject(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.put('/api/subject/1', json.dumps({
            'description': 'test_descript', 'name': 'test_subject',
            'days': [{'day': 2, 'end_time': '13:00:00',
                      'start_time': '15:00:00'}]}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {'id': 1,
                                           'description': 'test_descript',
                                           'name': 'test_subject',
                                           'days': [{'day': 2, 'end_time': '13:00:00',
                                                     'start_time': '15:00:00'}],
                                           'user': 1})

    def test_delete_subject(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.delete('/api/subject/1')
        self.assertEqual(response.status_code, 200)
