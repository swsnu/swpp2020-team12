import datetime
from django.test import TestCase
from user.models import User
from .models import Subject, Days


# Create your tests here.
class SubjectTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        user1 = User.objects.create_user(username='id1', name='nickname1', password='pw1', message='message1')
        user2 = User.objects.create_user(username='id2', name='nickname2', password='pw2', message='message2')
        User.objects.create_user(username='id3', name='nickname3', password='pw3', message='message3')
        subject = Subject.objects.create(name='subject1', description='this is description1',
                                         user=user1)

        subject = Subject.objects.create(name='subject2', description='this is description2',
                                         user=user2)

        subject = Subject.objects.create(name='subject3', description='this is description3',
                                         user=user1)
    def test_subject_count(self):
        self.assertEqual(Subject.objects.all().count(), 3)
