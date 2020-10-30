from django.urls import path
#from .group import views
from . import views
urlpatterns = [
    path('user', views.user_group_list),
    path('user/<int:group_id>', views.user_group_info),
    path('search/<int:group_id>', views.search_group_info),
    path('search/<str:group_name>', views.group_search)
]
