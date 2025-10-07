from django.urls import path
from . import views

urlpatterns = [
    path("", views.ChatView.as_view(), name="chat"),
    path("test-tennis/", views.test_tennis_api, name="test-tennis"),
]
