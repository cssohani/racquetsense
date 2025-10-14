from django.urls import path
from . import views
from .views import get_tennis_news

urlpatterns = [
    path("api/chat/", views.ChatView.as_view(), name="chat_view"),
    path("test-tennis/", views.test_tennis_api, name="test-tennis"),
    path("api/news/", get_tennis_news, name="get_tennis_news"),

]
