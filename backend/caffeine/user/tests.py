import json
from django.test import TestCase, Client
from .models import User


# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        User.objects.create_user(username='id1', name='nickname1', password='pw1', message='message1')
        User.objects.create_user(username='id2', name='nickname2', password='pw2', message='message2')
        User.objects.create_user(username='id3', name='nickname3', password='pw3', message='message3')

    def test_group_count(self):
        self.assertEqual(User.objects.all().count(), 3)

    def test_signup(self):
        client = Client()
        #        client.login(username='id1', password='pw1')
        response = client.post('/user/signup', json.dumps({'username': 'test_user', 'name': 'test_name',
                                                           'password': 'test_pw', 'message': 'test_message'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)
        response = client.put('/user/signup', json.dumps({'username': 'test_user', 'name': 'test_name',
                                                          'password': 'test_pw', 'message': 'test_message'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_signin(self):
        client = Client()
        response = client.post('/user/signin', json.dumps({'username': 'test_user', 'password': 'test_pw'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 401)
        response = client.post('/user/signin', json.dumps({'username': 'id1', 'password': 'pw1'}),
                               content_type='application/json')
        self.assertEqual(response.status_code, 204)
        response = client.put('/user/signin', json.dumps({'username': 'id1', 'password': 'pw1'}),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)
