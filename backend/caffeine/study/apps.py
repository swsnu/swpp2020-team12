## pylint: disable=import-outside-toplevel
from django.apps import AppConfig


class StudyConfig(AppConfig):
    name = 'study'

    def ready(self):
        from .consumers import announce_likes, join_group, leave_group
