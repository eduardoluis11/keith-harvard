from django.shortcuts import render

""" I will sooner or later have to use HttpResponseRedirect, so, I will include it here (source: 
https://docs.djangoproject.com/en/4.1/topics/http/urls/
"""
from django.http import HttpResponseRedirect

""" Since I will login and log out a user, and do other kinds of stuff with user authentication, I will inluce the 
modules “authenticate”, “login”, “logout”, and “Integrity Error”. I learned how to use those modules from project 4, 
that is, from the Network project from Web 50 (source: https://cdn.cs50.net/web/2020/spring/projects/4/network.zip .)
"""

# This will let the user login and log out
from django.contrib.auth import authenticate, login, logout

# This will display an error message if 2 users have the same username
from django.db import IntegrityError

""" I will show the user a success flash confirmation message in some instances. To show them a flash message, and if I 
need to redirect them to a new page, I will use the “messages” and “redirect” modules (source:
https://youtu.be/8kBo91L8JTY ) 
"""
from django.contrib import messages
from django.shortcuts import redirect

# This will let me use the decorator that only allows me to enter a page if I'm logged in
from django.contrib.auth.decorators import login_required

""" I will add the “datetime” library so that I can insert timestamps with the current date and time on the views 
(source: https://docs.python.org/3/library/datetime.html ).
"""
import datetime

""" I will add the “reverse” function so that I can enter the home page in a faster way (source: 
https://docs.djangoproject.com/en/4.1/ref/urlresolvers/ ).
"""
from django.urls import reverse

# This imports all forms from forms.py
from .forms import SignUpForm

# Create your views here.

""" Home Page view
"""
def index(request):
    return render(request, 'index.html')


""" Sign up view.

This will render the sign up page, and create an account if the user submits the sign up form.

I will import the forms from forms.py.
"""
def sign_up(request):

    # Sign Up form
    form = SignUpForm

    return render(request, 'sign-up.html', {
        "form": form,
    })
