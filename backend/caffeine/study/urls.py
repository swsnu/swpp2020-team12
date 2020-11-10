from django.urls import path
from . import views

urlpatterns = [
    path('study/status/', views.user_group_list),
    path('/study/infer/', views.user_group_info),
    path('search/<int:group_id>', views.search_group_info),
    path('search/<str:group_name>', views.group_search)
]
