from django.urls import path
from . import views

urlpatterns = [
    path('user', views.user_rank),
    path('group/<int:group_id>', views.group_rank)
]
