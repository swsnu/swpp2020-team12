from django.test import TestCase
from .models import CustomUser as User

# Create your tests here.
class UserTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        User.objects.create_user(username='id1', name='nickname1', password='pw1', message='message1')
        User.objects.create_user(username='id2', name='nickname2', password='pw2', message='message2')
        User.objects.create_user(username='id3', name='nickname3', password='pw3', message='message3')

    def test_group_count(self):
        self.assertEqual(User.objects.all().count(), 3)