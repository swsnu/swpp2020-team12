from django.urls import path
from . import views

urlpatterns = [
    path('status/', views.study_room),
    path('infer/', views.study_infer),
    path('tune/', views.study_tune),
]
