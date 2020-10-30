from django.test import TestCase
from .models import Subject
from customUser.models import CustomUser as User
import datetime


# Create your tests here.
class SubjectTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        user1 = User.objects.create_user(username='id1', name='nickname1', password='pw1', message='message1')
        user2 = User.objects.create_user(username='id2', name='nickname2', password='pw2', message='message2')
        User.objects.create_user(username='id3', name='nickname3', password='pw3', message='message3')
        Subject.objects.create(name='team1', description='this is description1',
                               time=datetime.timedelta(hours=10, minutes=42), user=user1)
        Subject.objects.create(name='team2', description='this is description2',
                               time=datetime.timedelta(hours=15, minutes=20), user=user2)
        Subject.objects.create(name='team3', description='this is description3',
                               time=datetime.timedelta(hours=11, minutes=00), user=user1)

    def test_Subject_count(self):
        self.assertEqual(Subject.objects.all().count(), 3)
