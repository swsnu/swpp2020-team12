from django.urls import path
#from .group import views
from . import views
urlpatterns = [
    path('', views.user_group_list),
    path('<int:group_id>/', views.user_group_info),
    path('search/<str:group_id>', views.search_group_info),
    #path('search/<str:group_id>', views.group_search)
]
