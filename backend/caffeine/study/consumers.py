from channels.generic.websocket import WebsocketConsumer
from channels.layers import get_channel_layer
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from .signals import inference_happen, join_group, leave_group
import json


@receiver(inference_happen)
def announce_likes(studying_info, group_id, simage, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'study{group_id}', {
            "type": "new_inference",
            "inference": studying_info,
            "image": simage
        }
    )


@receiver(join_group)
def announce_join(name, user_id, group_id, message, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'study{group_id}', {
            "type": "join_group",
            "user": {"user__name": name, "user__id": user_id, "user__mesage": message}
        }
    )
    print(name)


@receiver(leave_group)
def announce_leave(name, user_id, group_id, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f'study{group_id}', {
            "type": "leave_group",
            "user": {"user__name": name, "user__id": user_id}
        }
    )


class StudyConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_number']
        print(self.room_name)
        self.room_group_name = f'study{self.room_name}'

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, *args):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def new_inference(self, event):
        inference = event['inference']
        image = event['image']
        # Send message to WebSocket
        self.send(text_data=json.dumps({'inference': inference, 'image': image}))

    def join_group(self, event):
        user = event['user']
        # Send message to WebSocket
        self.send(text_data=json.dumps({'join': user}))

    def leave_group(self, event):
        user = event['user']
        # Send message to WebSocket
        self.send(text_data=json.dumps({'leave': user}))
