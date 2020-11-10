from django.urls import path
from . import views

urlpatterns = [
    path('status/', views.studyromm),
    path('infer/', views.study_infer),
]
