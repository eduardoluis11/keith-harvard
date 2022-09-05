# This will let me use Django forms
from django import forms

# This will be used for taking today's date, and use it as a default date (source:
# https://docs.python.org/3/library/datetime.html)
from datetime import date

""" Registration form. This will let a user to sign up.

I will need the following fields:
•	Username.
•	Email.
•	Password.
•	Repeating the Password, to confirm it.

I need to use is an extra attribute called “widget=forms.PasswordInput” to hide the password in the password input.

For the username, a CharField will suffice.

For the email, I will use EmailField to check that the user types a proper email.
"""
class SignUpForm(forms.Form):
    username = forms.CharField(max_length=100)
    email = forms.EmailField(required=False, max_length=254)
    password = forms.CharField(max_length=2000, widget=forms.PasswordInput)   # Password
    confirmation_password = forms.CharField(max_length=50, widget=forms.PasswordInput)


""" Login Form.

The fields that I will need will be simply the username and password.

I will censor the password.
"""
class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(max_length=2000, widget=forms.PasswordInput)   # Password

