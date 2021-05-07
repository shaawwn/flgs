from django.urls import path
from . import views

# app_name = "otherrealms"
urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("events", views.events, name="events"),
    path("games/<str:game>", views.games, name="games"),
    path("about", views.about, name="about"),
    path("online_catalog", views.online_catalog, name="online_catalog"),
    path("contact", views.contact, name="contact")
]