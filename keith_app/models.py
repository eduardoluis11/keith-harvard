from django.db import models

""" This will let me store users in the database (source: 
https://docs.djangoproject.com/en/4.1/topics/auth/customizing/)
"""
from django.contrib.auth.models import AbstractUser

# Create your models here.

""" Users model.

I need first to create the model that stores users. I will use AbstractUser to create users.
"""
class User(AbstractUser):
    pass

""" Save File model.

This will let me save the player's data when they save their game while talking to Keith. This will let me store the 
player's current level, their HP, and their attack points. I will also need their user ID, so that I save the data
from that specific user.

All 4 fields are integers.
"""
class SaveFile(models.Model):
    user_id = models.IntegerField(default=0)
    player_level = models.IntegerField(default=0)
    player_hp = models.IntegerField(default=0)
    player_attack_points = models.IntegerField(default=0)
