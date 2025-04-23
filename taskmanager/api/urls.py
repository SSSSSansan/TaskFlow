from django.urls import path
from .views import login_view, logout_view, TaskListCreate, TaskDetail, CategoryList, StatusList

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view),
    path('tasks/', TaskListCreate.as_view(), name='task-list-create'),
    path('tasks/<int:pk>/', TaskDetail.as_view()),
    path('categories/', CategoryList.as_view()),
    path('statuses/', StatusList.as_view()),
]
