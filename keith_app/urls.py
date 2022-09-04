""" Next, I will have to include the “path” and “views” libraries in the urls.py file that I will include on the “app”
folder. Here, I will use “urlpatterns”, and inserts all of the URLs for every page for my web app (source:
https://youtu.be/pRNhdI9PVmg) .

"""
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('sign-up', views.sign_up, name='sign_up'),
]