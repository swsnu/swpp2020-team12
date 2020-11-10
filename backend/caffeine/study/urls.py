from django.urls import path
from . import views

urlpatterns = [
    path('study/status/', views.studyromm),
    path('study/infer/', views.studyromm),
]
