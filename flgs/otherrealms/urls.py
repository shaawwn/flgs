from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),

    # API routes
    path("events/<str:date>", views.get_event, name="get_event")
]
