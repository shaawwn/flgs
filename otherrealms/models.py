from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
    pass

# Catalog Models

# Game Models

class Warhammer(models.Model):
    pass


class MTG(models.Model):
    pass


class Comics(models.Model):
    pass


class TableTop(models.Model):
    pass


class Collectibles(models.Model):
    pass


# Event Models

class Event(models.Model):
    """Manage events for general events and game/hobby specific events"""

    pass