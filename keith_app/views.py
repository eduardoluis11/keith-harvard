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

# This will let me convert Python data to JSON, and send it to a JS file
from django.http import JsonResponse

# This imports all forms from forms.py
from .forms import SignUpForm, LoginForm

# This imports the models (source: https://docs.djangoproject.com/en/4.1/topics/db/models/ )
from .models import User, SaveFile

# This will let me use the "CSRF exempt" decorator
from django.views.decorators.csrf import csrf_exempt

# This will let me use json.loads()
import json

# Create your views here.

""" Home Page view.

This is where I'll render the game.

I’m having a bug in which the sprites are never rendered into the canvas. Instead, I get a square with a diagonal line (as 
if indicated that I can’t use that image). Also, I get a ton of XHR errors, saying “same origin” and “404: not found”. I 
think the “same origin” bug was the same that a appeared to me whenever I tried to call an API in an insecure way (without 
cookies). 

So, for the time being and for testing my code, I will add a “CSRF exempt” decorator. Even though that will make my web app 
more insecure for the time being, at least I’ll be able to render the sprites into the Canvas to make sure that they work properly.

From my “mail” homework assignment, I will look for the “CSRF exempt” decorator and its corresponding library (source: 
https://cdn.cs50.net/web/2020/spring/projects/3/mail.zip .) I NO LONGER NEED IT.

"""

def index(request):
    return render(request, 'index.html')


""" Sign up view.

This will render the sign up page, and create an account if the user submits the sign up form.

I will import the forms from forms.py.

Now, I will add the code to the sign up() view so that I can insert a user into the User model. I need to get the 
data from the sign up page’s form.

I will get the data from the form’s fields using request.method and request.POST (source: 
https://docs.djangoproject.com/en/4.1/ref/request-response/ .)

If the user submits the 4 fields, and if the password and the confirmation password match, I will use a “Try Except” to 
check if the username is duplicated. If the username doesn’t exist, I will let the user login. Otherwise, I will 
display an error message saying that that username has been taken by someone else  (source: 
https://www.w3schools.com/python/python_try_except.asp ).

BUGFIX: I need to add the variable with the form inside every instance of "return", or otherwise, the form
won't render if I get an error. For instance, I had an error in which, if I typed a different password and 
confirmation password, the sign up form wouldn't be rendered again.

I will also create an entry on the Save File table immediately after the user creates an account, and I will assign it
to them. This is so that I just update the save file whenever I save the game, instead of having to create the entry
and updating it. I need to get to somehow get their user ID, since I need to put that into the Save File table. 
Since usernames are unique, I will make a Query Set statement that will get the ID of the user that just registered
with that username.

"""
def sign_up(request):

    # Sign Up form
    form = SignUpForm

    # This will detect if the user submitted the Sign Up form
    if request.method == "POST":

        # This gets the data from each of the form's fields:
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation_password = request.POST["confirmation_password"]

        # This checks that the password and confirmation password are the same
        if password != confirmation_password:
            return render(request, "sign-up.html", {
                "message": "The password and confirmation password do not match.",
                "form": form
            })

        # This will create a user if the username hasn't been taken by someone else
        try:
            new_user = User.objects.create_user(username, email, password)
            new_user.save()

            # This will grab the instance of the user that was just created
            user_instance = User.objects.get(username=username)

            # This gets the ID of the recently created user
            user_id = user_instance.id

            print("The new user's ID is: " + str(user_id))  # DEBUG msg

            # This will prepare an entry in the Save File table for this user
            new_save_file = SaveFile(user_id=user_id, player_level=1, player_hp=100, player_attack_points=10)

            # This will create that entry
            new_save_file.save()

        # This will print an error if the user types a username that was taken by someone else
        except IntegrityError:
            return render(request, "sign-up.html", {
                "message": "Error: This username was taken by someone else.",
                "form": form
            })

        # This will log in the newly created user
        login(request, new_user)

        # This will redirect the logged user to the home page
        return HttpResponseRedirect(reverse("index"))

    # This will render the sign-up page if the user enters from a link
    else:
        return render(request, 'sign-up.html', {
            "form": form,
        })


""" Log In View.

I will use the “authenticate” function to check if a username and its respective password exist inside the database 
(source: https://docs.djangoproject.com/en/dev/topics/auth/default/ ). 
"""
def login_user(request):

    # Sign Up form
    form = LoginForm

    # This will detect if the user submitted the Log In form
    if request.method == "POST":

        # This gets the data from each of the form's fields:
        username = request.POST["username"]
        password = request.POST["password"]

        # This will check if the username and password exist in the database
        check_user = authenticate(request, username=username, password=password)

        # If the user exists, they will be logged in
        if check_user is not None:
            login(request, check_user)
            return HttpResponseRedirect(reverse("index"))

        # If the user types a wrong username or password, I will display an error message
        else:
            return render(request, "login.html", {
                "message": "You typed an incorrect username and/or password.",
                "form": form
            })

    # This will render the login page if the user enters from a link
    else:
        return render(request, 'login.html', {
            "form": form,
        })


""" Log Out View.

The “logout” function will log the user out.

I will add the decorator that checks that user should be logged in to prevent the user from accessing this function
if they're not logged in.
"""
@login_required
def logout_user(request):

    # This logs the user out
    logout(request)

    # This redirects the user to the home page
    return HttpResponseRedirect(reverse("index"))

""" API for loading game data.

This will let the user get their HP, level, and attack points whenever the boot up their game.

To make this easier to code, I will add it a CSRF Exempt decorator, so that I can easily access this data.

And, of course, the user needs to be logged in to be able to load their game. So, I will put a "login required" 
decorator.

If the user doesn't do a POST request, they are entering into the API's URL without calling the API. So, I will print
these users an error message.

Using "." notation (to access properties), I will get the HP, level, and attack points of the save file of the 
currently logged user from the database (from the Save File table.)

To convert the Python data from the database, and turn it into JSON data to send it to my JS file, I need to 
use "return JsonResponse", and use the same notation as if I were to send something from views.py to an HTML file by
using Jinja.
"""
@csrf_exempt
@login_required
def load_game(request):

    # This will print an error message if the user enters the API's URL
    if request.method != "POST":
        return JsonResponse({"message": "You shouldn't be here. This is the API for loading your game data"},
                            status=400)

    # This will be the actual working API
    else:

        # This gets the instance of the User table with all the data from the logged user
        logged_user = request.user

        logged_user_id = logged_user.id  # This gets the ID from the user

        # This will get an instance from the Save File table with the player's data
        logged_users_save_file = SaveFile.objects.get(user_id=logged_user_id)

        player_level = logged_users_save_file.player_level    # This gets the user's level from their save file
        player_hp = logged_users_save_file.player_hp  # This gets the HP from the user's save file

        # This gets the attack points from the user's save file
        player_attack_points = logged_users_save_file.player_attack_points

        # # DEBUG msg. WORKS PROPERLY
        # print(player_attack_points)

        # This converts the database data into JSON, and sends it to a JS file
        return JsonResponse({
            "player_level": player_level,
            "player_hp": player_hp,
            "player_attack_points": player_attack_points
        }, status=200)

""" API for Saving the Game.

This will let me save the game. It will be called if the player presses "2" when Keith is on the scene.

I will need to receive first data from the JS file with the Phaser code, since I need the player's stats while they
were playing. Then, I will convert that JS code into Python code, and then I will finally insert that into the 
database.

Remember that I need to create a new URL to call this API.

I will need to use a Query Set statement to update the player's stats from their respective entry on the Save File
table.

I DON'T need to use a JSON Response at the end of this API, since I don't need to send anything to the JS file.
However, I will send a confirmation message so that I can print it on the console, so that I verify that the
games has been successfully saved.
"""
@csrf_exempt
@login_required
def save_game(request):

    # This will print an error message if the user enters the API's URL
    if request.method != "POST":
        return JsonResponse({"message": "You shouldn't be here. This is the API for saving your game data"},
                            status=400)

    # This will be the actual working API
    else:

        # This gets the instance of the User table with all the data from the logged user
        logged_user = request.user

        logged_user_id = logged_user.id  # This gets the ID from the user

        # This will get the instance of the entry from the Save File table with the player's data
        logged_users_save_file = SaveFile.objects.get(user_id=logged_user_id)

        # This will get the JS data and turn it into Python objects
        data = json.loads(request.body)

        new_player_level = data.get("player_level")  # This stores the player's level
        new_player_hp = data.get("player_hp")  # This stores the player's max HP
        new_player_attack_points = data.get("player_attack_points")  # This stores the player's attack points

        # This updates the save file of the logged user with their new stats
        SaveFile.objects.filter(user_id=logged_user_id).update(player_level=new_player_level, player_hp=new_player_hp,
                                                               player_attack_points=new_player_attack_points)

        # This sends a confirmation message to the JS file with the Phaser code
        return JsonResponse({
            "confirmation_message": "Your game has been successfully saved by using the Save Game API."
        }, status=200)






