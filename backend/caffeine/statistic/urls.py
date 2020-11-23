from django.urls import path
from . import views

urlpatterns = [
    path('<int:year>/<int:month>', views.getMonthlydata),
    path('<int:year>/<int:month>/<int:date>', views.getWeeklydata),
    path('<int:year>/<int:month>/<int:date>/subjects', views.getDailySubject)
]