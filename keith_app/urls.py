""" Next, I will have to include the “path” and “views” libraries in the urls.py file that I will include on the “app”
folder. Here, I will use “urlpatterns”, and inserts all of the URLs for every page for my web app (source:
https://youtu.be/pRNhdI9PVmg) .

I will also include the URLs to the APIs for loading and saving the game in here.
"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sign-up', views.sign_up, name='sign_up'),
    path('login', views.login_user, name='login_user'),
    path('logout', views.logout_user, name='logout_user'),
    path('load-game', views.load_game, name='load_game'),   # API for loading the game
    path('save-game', views.save_game, name='save_game'),   # API for saving the game
    path('about', views.about, name='about'),  # About page
]
