from django.urls import path
from . import views
urlpatterns = [
    path('', views.subject_list),
    path('user/<int:group_id>', views.subject_info),
]
