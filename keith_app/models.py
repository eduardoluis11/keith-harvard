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
