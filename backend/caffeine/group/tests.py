from django.test import TestCase
from .models import Group
from .models import StudyRoom
from customUser.models import CustomUser as User
import datetime

# Create your tests here.
class GroupTestCase(TestCase):
    def setUp(self):  # beforeeach 같은거
        user1=User.objects.create_user(username='id1', name='nickname1', password='pw1', message='message1')
        user2=User.objects.create_user(username='id2', name='nickname2', password='pw2', message='message2')
        user3=User.objects.create_user(username='id3', name='nickname3', password='pw3', message='message3')
        Group1=Group.objects.create(name='team1', description ='this is description1', time=datetime.timedelta(hours=10, minutes=42))
        Group2=Group.objects.create(name='team2', description ='this is description2', password='pw2', time=datetime.timedelta(hours=15, minutes=20))
        Group1.members.add(user1, user2)
        Group2.members.add(user2, user3)
        StudyRoom1= StudyRoom.objects.create(group=Group1)          # 다른 그룹의 user들은 못들어오게 짜야하지 않나??
        StudyRoom1.active_members.add(user1)

    def test_group_count(self):
        self.assertEqual(Group.objects.all().count(), 2)

    def test_studyRoom_count(self):
        self.assertEqual(StudyRoom.objects.count(), 1)