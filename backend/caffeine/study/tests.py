import json
from django.test import TestCase, Client
from django.conf.urls import url
from channels.testing import WebsocketCommunicator
from channels.routing import URLRouter
from .models import DailyStudyRecord, DailyStudyForSubject, Concentration
from group.models import Group, StudyRoom
from .consumers import StudyConsumer
from user.models import User
from datetime import timedelta, date
from unittest.mock import patch


class StudyTestCase(TestCase):

    def setUp(self):
        user1 = User.objects.create_user(username='id1', name='nickname1',
                                         password='pw1', message='message1')
        User.objects.create_user(username='id2', name='nickname2',
                                 password='pw2', message='message2')
        daily_study_for_subject = DailyStudyForSubject.objects.create(
            study_time=timedelta(),
            subject='swpp', distracted_time=timedelta(),
            user=user1)
        group1 = Group.objects.create(name='team1', description='this is description1',
                                      time=timedelta())
        group1.members.add(user1)
        StudyRoom.objects.create(group=group1)
        Concentration.objects.create(parent_study=daily_study_for_subject)
        Concentration.objects.create(parent_study=daily_study_for_subject)

    def test_daily_study_record_count(self):
        user1 = User.objects.get(username='id1')
        DailyStudyRecord.objects.create(user=user1,
                                        total_study_time=timedelta(hours=10, minutes=42),
                                        total_concentration=timedelta(hours=10, minutes=42),
                                        total_gauge=1)
        self.assertEqual(DailyStudyRecord.objects.all().count(), 1)

    def test_daily_study_for_subject_count(self):
        self.assertEqual(DailyStudyForSubject.objects.count(), 1)

    def test_concentration_count(self):
        self.assertEqual(Concentration.objects.count(), 2)

    def test_study_room_post(self):
        # first start from day
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/status/', json.dumps({
            'group_id': 1, 'subject': 'swpp'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(DailyStudyRecord.objects.all().count(), 1)
        current_study = DailyStudyForSubject.objects.filter(is_active=True)
        self.assertEqual(current_study.count(), 1)
        current_study = current_study.first()
        user1 = User.objects.get(username='id1')
        self.assertEqual(current_study.user, user1)
        self.assertEqual(current_study.subject, 'swpp')

    def test_study_room_post_again(self):
        # study again
        user1 = User.objects.get(username='id1')
        DailyStudyRecord.objects.create(user=user1,
                                        total_study_time=timedelta(hours=10, minutes=42),
                                        total_concentration=timedelta(hours=10, minutes=42),
                                        total_gauge=1)
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/status/', json.dumps({
            'group_id': 1, 'subject': 'swpp'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(DailyStudyRecord.objects.all().count(), 1)
        current_study = DailyStudyForSubject.objects.filter(is_active=True)
        self.assertEqual(current_study.count(), 1)
        current_study = current_study.first()
        user1 = User.objects.get(username='id1')
        self.assertEqual(current_study.user, user1)
        self.assertEqual(current_study.subject, 'swpp')

    def test_study_room_post_reject(self):
        User.objects.create_user(username='id3', name='nickname3',
                                 password='pw3', message='message')
        User.objects.create_user(username='id4', name='nickname4',
                                 password='pw4', message='message')
        User.objects.create_user(username='id5', name='nickname5',
                                 password='pw5', message='message')
        User.objects.create_user(username='id6', name='nickname6',
                                 password='pw6', message='message')
        for i in range(1, 6):
            client = Client()
            client.login(username='id' + str(i), password='pw' + str(i))
            response = client.post('/study/status/', json.dumps({
                'group_id': 1, 'subject': 'swpp'
            }), content_type='application/json')
            self.assertEqual(response.status_code, 200)
        client = Client()
        client.login(username='id6', password='pw6')
        response = client.post('/study/status/', json.dumps({
            'group_id': 1, 'subject': 'swpp'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 400)

    def test_study_room_post_flushing(self):
        user1 = User.objects.get(username='id1')
        today_before = DailyStudyRecord.objects.create(
            user=user1,
            total_study_time=timedelta(hours=10, minutes=42),
            total_concentration=timedelta(hours=10, minutes=42),
            total_gauge=1)
        record1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=1),
            subject='swpp', distracted_time=timedelta(minutes=3),
            user=user1, is_active=True)
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/status/', json.dumps({
            'group_id': 1, 'subject': 'swpp'
        }), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        today_after = DailyStudyRecord.objects.get(date=date.today())
        self.assertEqual(today_after.total_study_time,
                         today_before.total_study_time +
                         record1.study_time +
                         record1.distracted_time)
        self.assertEqual(today_after.total_concentration,
                         today_before.total_concentration + record1.study_time)
        self.assertEqual(today_after.total_gauge,
                         (today_before.total_concentration + record1.study_time) /
                         (today_before.total_study_time + record1.study_time +
                          record1.distracted_time))

    def test_study_room_put(self):
        user1 = User.objects.get(username='id1')
        user2 = User.objects.get(username='id2')
        room = StudyRoom.objects.get(group__id=1)
        today_study = DailyStudyRecord.objects.create(
            user=user1,
            total_study_time=timedelta(hours=10, minutes=42),
            total_concentration=timedelta(hours=10, minutes=42),
            total_gauge=1)
        study1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=32),
            user=user1, is_active=True)
        study2 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=30),
            user=user2, is_active=True)
        room.active_studys.add(study1)
        room.active_studys.add(study2)
        room.save()
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.put('/study/status/', json.dumps({'group_id': 1}))
        self.assertEqual(response.status_code, 200)
        today = DailyStudyRecord.objects.get(date=date.today())
        self.assertEqual(today.total_study_time,
                         today_study.total_study_time + study1.study_time + study1.distracted_time)
        self.assertEqual(today.total_concentration,
                         today_study.total_concentration + study1.study_time)
        self.assertEqual(today.total_gauge,
                         (today_study.total_concentration + study1.study_time) /
                         (today_study.total_study_time + study1.study_time +
                          study1.distracted_time))

    def test_study_room_405(self):
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.get('/study/status/')
        self.assertEqual(response.status_code, 405)
        response = client.delete('/study/status/')
        self.assertEqual(response.status_code, 405)

    @patch("requests.post")
    def test_study_infer_1(self, mock_post):
        response = mock_post.return_value
        response.status_code = 200
        response.json.return_value = {
            "responses": [
                {}
            ]
        }
        user1 = User.objects.get(username='id1')
        client = Client()
        client.login(username='id1', password='pw1')
        study1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=32),
            user=user1, is_active=True)
        # with status 1
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/infer/', json.dumps({
            'id': 1,
            'image': 'img/,b123sfad'
        }), content_type='application/json')
        self.assertJSONEqual(response.content,
                             {'status': 1,
                              'gauge': study1.study_time /
                                       (study1.study_time + study1.distracted_time +
                                        timedelta(seconds=10))})

    @patch("requests.post")
    def test_study_infer_2(self, mock_post):
        response = mock_post.return_value
        response.status_code = 200
        response.json.return_value = {
            "responses": [
                {
                    "faceAnnotations": [
                        {
                            "landmarks": {

                            },
                            "panAngle": 35,
                            "tiltAngle": 2
                        }
                    ]
                }
            ]
        }
        user1 = User.objects.get(username='id1')
        client = Client()
        client.login(username='id1', password='pw1')
        study1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=32),
            user=user1, is_active=True)
        # with status 1
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/infer/', json.dumps({
            'id': 1,
            'image': 'img/,b123sfad'
        }), content_type='application/json')
        self.assertJSONEqual(response.content,
                             {'status': 2,
                              'gauge': study1.study_time /
                                       (study1.study_time + study1.distracted_time +
                                        timedelta(seconds=10))})

    @patch("requests.post")
    def test_study_infer_3(self, mock_post):
        response = mock_post.return_value
        response.status_code = 200
        response.json.return_value = {
            "responses": [
                {
                    "faceAnnotations": [
                        {
                            "landmarks": [
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {'type': 'LEFT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 72.62827, 'y': 64.66847, 'z': -2.5742698}},
                                {'type': 'LEFT_EYE_RIGHT_CORNER',
                                 'position': {'x': 83.162415, 'y': 69.53085, 'z': -0.2833072}},
                                {'type': 'LEFT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 72.54645, 'y': 72.7361, 'z': -0.6251203}},
                                {'type': 'LEFT_EYE_LEFT_CORNER',
                                 'position': {'x': 63.052597, 'y': 69.7298, 'z': 4.5587893}},
                                {'type': 'RIGHT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 118.87221, 'y': 60.081333, 'z': -3.2206633}},
                                {'type': 'RIGHT_EYE_RIGHT_CORNER',
                                 'position': {'x': 129.94545, 'y': 65.620705, 'z': 3.272311}},
                                {'type': 'RIGHT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 118.60211, 'y': 68.69534, 'z': -1.4409065}},
                                {'type': 'RIGHT_EYE_LEFT_CORNER',
                                 'position': {'x': 107.855835, 'y': 64.51412, 'z': -0.5179331}}
                            ],
                            "panAngle": 2,
                            "tiltAngle": 2
                        }
                    ]
                }
            ]
        }
        user1 = User.objects.get(username='id1')
        client = Client()
        client.login(username='id1', password='pw1')
        study1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=32),
            user=user1, is_active=True)
        # with status 1
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/infer/', json.dumps({
            'image': 'img/,b123sfad',
            'id': 1,
        }), content_type='application/json')
        self.assertJSONEqual(response.content,
                             {'status': 3,
                              'gauge': study1.study_time /
                                       (study1.study_time + study1.distracted_time +
                                        timedelta(seconds=10))})

    @patch("requests.post")
    def test_study_infer_2_label(self, mock_post):
        response = mock_post.return_value
        response.status_code = 200
        response.json.return_value = {
            "responses": [
                {
                    "faceAnnotations": [
                        {
                            "landmarks": [
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {'type': 'LEFT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 88.8842, 'y': 86.08209, 'z': -3.097817}},
                                {'type': 'LEFT_EYE_RIGHT_CORNER',
                                 'position': {'x': 100.33783, 'y': 92.47614, 'z': 0.40933454}},
                                {'type': 'LEFT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 88.629486, 'y': 95.35517, 'z': -0.6440098}},
                                {'type': 'LEFT_EYE_LEFT_CORNER',
                                 'position': {'x': 78.15495, 'y': 92.04042, 'z': 4.476044}},
                                {'type': 'RIGHT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 144.95845, 'y': 91.08008, 'z': -0.96997035}},
                                {'type': 'RIGHT_EYE_RIGHT_CORNER',
                                 'position': {'x': 155.19812, 'y': 97.29413, 'z': 7.579177}},
                                {'type': 'RIGHT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 144.25189, 'y': 100.49269, 'z': 1.5529345}},
                                {'type': 'RIGHT_EYE_LEFT_CORNER',
                                 'position': {'x': 133.95114, 'y': 96.33359, 'z': 1.6383073}}
                            ],
                            "panAngle": 2,
                            "tiltAngle": 2
                        }
                    ],
                    "labelAnnotations": [
                        {
                            "description": 'Smartphone'
                        }
                    ]
                }
            ]
        }
        user1 = User.objects.get(username='id1')
        client = Client()
        client.login(username='id1', password='pw1')
        study1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=32),
            user=user1, is_active=True)
        # with status 1
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/infer/', json.dumps({
            'id': 1,
            'image': 'img/,b123sfad'
        }), content_type='application/json')
        self.assertJSONEqual(response.content,
                             {'status': 2,
                              'gauge': study1.study_time /
                                       (study1.study_time + study1.distracted_time +
                                        timedelta(seconds=10))})

    @patch("requests.post")
    def test_study_infer_2_label2(self, mock_post):
        response = mock_post.return_value
        response.status_code = 200
        response.json.return_value = {
            "responses": [
                {
                    "faceAnnotations": [
                        {
                            "landmarks": [
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {'type': 'LEFT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 88.8842, 'y': 86.08209, 'z': -3.097817}},
                                {'type': 'LEFT_EYE_RIGHT_CORNER',
                                 'position': {'x': 100.33783, 'y': 92.47614, 'z': 0.40933454}},
                                {'type': 'LEFT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 88.629486, 'y': 95.35517, 'z': -0.6440098}},
                                {'type': 'LEFT_EYE_LEFT_CORNER',
                                 'position': {'x': 78.15495, 'y': 92.04042, 'z': 4.476044}},
                                {'type': 'RIGHT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 144.95845, 'y': 91.08008, 'z': -0.96997035}},
                                {'type': 'RIGHT_EYE_RIGHT_CORNER',
                                 'position': {'x': 155.19812, 'y': 97.29413, 'z': 7.579177}},
                                {'type': 'RIGHT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 144.25189, 'y': 100.49269, 'z': 1.5529345}},
                                {'type': 'RIGHT_EYE_LEFT_CORNER',
                                 'position': {'x': 133.95114, 'y': 96.33359, 'z': 1.6383073}}
                            ],
                            "panAngle": 2,
                            "tiltAngle": 2
                        }
                    ],
                    "labelAnnotations": [
                        {
                            "description": 'Electronic device'
                        }
                    ]
                }
            ]
        }
        user1 = User.objects.get(username='id1')
        client = Client()
        client.login(username='id1', password='pw1')
        study1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=32),
            user=user1, is_active=True)
        # with status 1
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/infer/', json.dumps({
            'id': 1,
            'image': 'img/,b123sfad'
        }), content_type='application/json')
        self.assertJSONEqual(response.content,
                             {'status': 2,
                              'gauge': study1.study_time /
                                       (study1.study_time + study1.distracted_time +
                                        timedelta(seconds=10))})

    @patch("requests.post")
    def test_study_infer_0(self, mock_post):
        response = mock_post.return_value
        response.status_code = 200
        response.json.return_value = {
            "responses": [
                {
                    "faceAnnotations": [
                        {
                            "landmarks": [
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {}, {}, {}, {}, {}, {}, {}, {},
                                {'type': 'LEFT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 88.8842, 'y': 86.08209, 'z': -3.097817}},
                                {'type': 'LEFT_EYE_RIGHT_CORNER',
                                 'position': {'x': 100.33783, 'y': 92.47614, 'z': 0.40933454}},
                                {'type': 'LEFT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 88.629486, 'y': 95.35517, 'z': -0.6440098}},
                                {'type': 'LEFT_EYE_LEFT_CORNER',
                                 'position': {'x': 78.15495, 'y': 92.04042, 'z': 4.476044}},
                                {'type': 'RIGHT_EYE_TOP_BOUNDARY',
                                 'position': {'x': 144.95845, 'y': 91.08008, 'z': -0.96997035}},
                                {'type': 'RIGHT_EYE_RIGHT_CORNER',
                                 'position': {'x': 155.19812, 'y': 97.29413, 'z': 7.579177}},
                                {'type': 'RIGHT_EYE_BOTTOM_BOUNDARY',
                                 'position': {'x': 144.25189, 'y': 100.49269, 'z': 1.5529345}},
                                {'type': 'RIGHT_EYE_LEFT_CORNER',
                                 'position': {'x': 133.95114, 'y': 96.33359, 'z': 1.6383073}}
                            ],
                            "panAngle": 2,
                            "tiltAngle": 2
                        }
                    ],
                    "labelAnnotations": [
                    ]
                }
            ]
        }
        user1 = User.objects.get(username='id1')
        client = Client()
        client.login(username='id1', password='pw1')
        study1 = DailyStudyForSubject.objects.create(
            study_time=timedelta(minutes=42),
            subject='swpp', distracted_time=timedelta(minutes=32),
            user=user1, is_active=True
        )
        # with status 1
        client = Client()
        client.login(username='id1', password='pw1')
        response = client.post('/study/infer/', json.dumps({
            'id': 1,
            'image': 'img/,b123sfad'
        }), content_type='application/json')
        self.assertJSONEqual(response.content,
                             {'status': 0,
                              'gauge': (study1.study_time + timedelta(seconds=10)) /
                                       (study1.study_time + study1.distracted_time +
                                        timedelta(seconds=10))})

    async def test_study_consumer_infer(self):
        application = URLRouter([
            url(r'^ws/study/(?P<room_number>[^/]+)/$', StudyConsumer.as_asgi())
        ])
        communicator = WebsocketCommunicator(application, "/ws/study/1/")
        connected, _ = await communicator.connect()
        assert connected
        await communicator.send_input({"type": "new_inference", "inference": "infer"})
        event = await communicator.receive_output(timeout=1)
        self.assertJSONEqual(event['text'], {"inference": "infer"})
        await communicator.send_input({"type": "join_group", "user": "hello"})
        event = await communicator.receive_output(timeout=1)
        self.assertJSONEqual(event['text'], {"join": "hello"})
        await communicator.send_input({"type": "leave_group", "user": "bye"})
        event = await communicator.receive_output(timeout=1)
        self.assertJSONEqual(event['text'], {"leave": "bye"})
        await communicator.disconnect()
