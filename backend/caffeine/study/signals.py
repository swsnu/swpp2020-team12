import django.dispatch

inference_happen = django.dispatch.Signal(providing_args=["studying_info", "group_id"])
join_group = django.dispatch.Signal(providing_args=["name", "user_id", "group_id", "message"])
leave_group = django.dispatch.Signal(providing_args=["name", "user_id", "group_id"])
