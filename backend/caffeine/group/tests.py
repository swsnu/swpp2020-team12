import datetime
import json
from django.test import TestCase, Client
from user.models import User
from .models import Group
from .models import StudyRoom


# Create your tests here.
class GroupTestCase(TestCase):
    maxDiff = None

    def setUp(self):  # beforeeach 같은거
        user1 = User.objects.create_user(username='id1', name='nickname1',
            password='pw1', message='message1')
        user2 = User.objects.create_user(username='id2', name='nickname2',
            password='pw2', message='message2')
        user3 = User.objects.create_user(username='id3', name='nickname3',
            password='pw3', message='message3')
        group1 = Group.objects.create(name='team1', description='this is description1',
                                      time=datetime.timedelta(hours=10, minutes=42))
        group2 = Group.objects.create(name='team2', description='this is description2',
            password='pw2', time=datetime.timedelta(hours=15, minutes=20))
        group1.members.add(user1, user2)
        group2.members.add(user2, user3)
        study_room1 = StudyRoom.objects.create(group=group1)  # 다른 그룹의 user들은 못들어오게 짜야하지 않나??
        study_room1.active_members.add(user1)

    def test_group_count(self):
        self.assertEqual(Group.objects.all().count(), 2)

    def test_studyRoom_count(self):
        self.assertEqual(StudyRoom.objects.count(), 1)

    def test_user_group_list_get(self):
        client = Client()
        client.login(username='id2', password='pw2')
        response = client.get('/group/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [{'description': 'this is description1',
                                            'id': 1,
                                            'name': 'team1',
                                            'time': 'P0DT10H42M00S',
                                            'members': [{
                                                'id': 1,
                                                'name': 'nickname1',
                                                'message': 'message1'
                                            },
                                                {
                                                    'id': 2,
                                                    'name': 'nickname2',
                                                    'message': 'message2'
                                                }
                                            ]},
                                           {'description': 'this is description2',
                                            'id': 2,
                                            'name': 'team2',
                                            'time': 'P0DT15H20M00S',
                                            'members': [{
                                                'id': 2,
                                                'name': 'nickname2',
                                                'message': 'message2'
                                            },
                                                {'id': 3,
                                                 'name': 'nickname3',
                                                 'message': 'message3'
                                                 }]
                                            }])

    def test_user_group_list_post(self):
        client = Client()
        client.login(username='id2', password='pw2')
        response = client.post('/group/', json.dumps({
            'description': 'test_descript',
            'password': '',
            'name': 'test_team'}), content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json(), {
            'description': 'test_descript',
            'time': 'P0DT00H00M00S',
            'name': 'test_team',
            'members': [{'id': 2, 'message': 'message2', 'name': 'nickname2'}],
            'id': 3})
        response = client.post('/group/', json.dumps({
            'ww': 'test_descrip',
            'rr': '',
            'oo': 'test_team'}), content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.delete('/group/')
        self.assertEqual(response.status_code, 405)

    def test_user_group_get(self):
        client = Client()
        client.login(username='id2', password='pw2')
        response = client.get('/group/2/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'id': 2,
            'count': 2,
            'description': 'this is description2',
            'name': 'team2',
            'time': 'P0DT15H20M00S',
            'members': [{'id': 2, 'message': 'message2', 'name': 'nickname2'},
                        {'id': 3, 'message': 'message3', 'name': 'nickname3'}]
        })
    
    def test_user_group_delete(self):
        client = Client()
        client.login(username='id2', password='pw2')
        response = client.delete('/group/2/')
        self.assertEqual(response.status_code, 200)

    def test_group_search(self):
        client = Client()
        client.login(username='id2', password='pw2')
        response = client.post('/group/search/eam')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [
            {'id': 1,
             'count': 2,
             'description': 'this is description1',
             'name': 'team1',
             'time': 'P0DT10H42M00S', 'password': ''},
            {'id': 2,
             'count': 2,
             'description': 'this is description2',
             'name': 'team2',
             'time': 'P0DT15H20M00S', 'password': 'pw2'}
        ])
        response = client.get('/group/2/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {
            'id': 2,
            'count': 2,
            'description': 'this is description2',
            'name': 'team2',
            'time': 'P0DT15H20M00S',
            'members': [{'id': 2, 'message': 'message2', 'name': 'nickname2'},
                        {'id': 3, 'message': 'message3', 'name': 'nickname3'}]
        })

    def test_search_group_info(self):
        client = Client()
        client.login(username='id3', password='pw3')
        response = client.get('/group/search/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(),
                         {'id': 1,
                          'count': 2,
                          'description': 'this is description1',
                          'name': 'team1',
                          'password': '',
                          'time': 'P0DT10H42M00S'}
                         )
        client.login(username='id1', password='pw1')
        response = client.get('/group/search/1')
        self.assertEqual(response.status_code, 400)

    def test_search_group_info_join(self):
        client = Client()
        client.login(username='id3', password='pw3')
        response = client.put('/group/search/1', {'password': ''}, content_type='application/json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Group.objects.filter(id=1).first().members.count(), 3)
        response = client.put('/group/search/2', {'password': ''}, content_type='application/json')
        self.assertEqual(response.status_code, 403)
        response = client.put('/group/search/1', {'pass': ''}, content_type='application/json')
        self.assertEqual(response.status_code, 400)
        response = client.delete('/group/search/1')
        self.assertEqual(response.status_code, 405)
