# CS50W's Final Project: Keith

## Made by Eduardo Salinas

## Brief summary
My submission for the final project for CS50W’s course is a browser game called Keith. It’s a game made with Django and a JavaScript game engine called Phaser.
In the game, you’ll have to defeat robots, and you’ll have to talk to your adoptive son to become stronger against your enemies.

I was inspired to make this game by watching videos from Saveafox Rescue’s YouTube channel, a non-profit animal rescue. In particular, I got inspired by two foxes: Finnegan Fox, and Kipper. I thought it was cute that Finnegan decided to adopt Kipper as his foster child, and I wanted to replicate their foster father-son relationship in a game. 

Here’s one of the videos that inspired me to make this game: https://www.youtube.com/watch?v=61BYaakCHIE .

The game was inspired by the Persona game franchise. In the most recent Persona games, you can hang out with your friends from high school, and fight monsters after class. You need to talk with your friends since, if you improve your bonds with them, you can become stronger against the monsters that you’ll face.

Similarly, in Keith, if you talk to your son and improve your relationship with him, you’ll become stronger, and you’ll have an easier time defeating enemies.


## Distinctiveness
My project is sufficiently distinct from the other projects of this course since we never did a game in any of the course’s assignments. So, since I made a browser game, and since we never did a game as project, that makes my project way different from the other projects.

Also, since coding and using a browser game is way different from coding and using a social media app, an ecommerce, or any of the apps made in the course’s assignments, my web app is different from all other projects from this class. 



## Complexity
My browser game is more complex than all the project assignments for this course. One of the reasons for that is that I had to learn how to use a JavaScript game engine in order to make my web app. I used a game engine called Phaser. We never learned how to use Phaser nor any other game engine in any of the course’s classes nor in any of the assignments. Therefore, since I had to learn from scratch how to use the main tool that I needed to make this project, that makes my project more complex than the other project from the course.

And the reason why I used a game engine to make my web app is because I tried to make the game entirely by using JavaScript, but it was too complex to do without a game engine. I couldn’t make the game responsive by using pure JavaScript and CSS. And trying to add mechanics to the game was also complicated. So, I had to use a game engine. Therefore, making a game as a web app is in and by itself a complex task. And, since we never made a game for any of this course’s assignments, my project is more complex than the rest of this course’s assignments.
Finally, this assignment took me at least a month to do. All other assignments could be done in between one or two weeks. However, I needed at least a month of work to do this project. Therefore, since it took me more time to make this project than the required time to make the previous projects, this project is more complex than the previous projects in the course.

## What's contained in each file that I created
Since I created the Django project from scratch, there were a lot of files that I had to manually create. So, in order to avoid making this README file longer than necessary, I will provide a really brief description of some of the files.


### LICENSE
I generated this with GitHub. It contains the description of the GNU GPL Version 3 License. This is to give some copyright protection to my code if I ever turn it into a commercial game.

### styles.css
This is where I wrote the code for the styles for users who haven’t logged in to their accounts. This contains the styles for the cookie consent banner. That is, it handles the buttons that tells you that this web app uses cookies.

### styles-logged-user.css
A CSS file that contains the styles for the website for users who are logged in. I had to create 2 separate CSS files since I had a bug in which the cookie consent banner wasn’t being properly hidden when the user was logged in. So, these styles won’t touch the cookie consent banner to prevent that bug. The rest of these styles is almost an exact copy of the styles from styles.css.



### index.js
This is the file that contains all of the JavaScript code that runs the game with the Phaser game engine. This is where most of my code is. This is the most important file of the web app. The entire game code can be found here.

### script.js
This file contains the JavaScript code for handling the cookie consent banner. 

### about.html
This is the “About” page of the website. It contains a brief description of the game.

### contact.html
This is the “Contact Me” page of the website. This is where my contact information would go. 

### index.html
This is the home page of the website. This is where the user will land once they first enter the website, and this is also the page where they will be able to play the game.

### layout.html
This is where the <head> tag, the navigation bar, and the footer of the website are included. 

### legal.html
This is the “Legal” page of the website. This is where the web app’s Terms and Conditions and Privacy Policy would be included.

### login.html
This is the page that will let users log into their accounts to play the game.

### sign-up.html
This is the page of the website where users can create their own accounts.

### forms.py
This file contains all of the forms used in my web app. The forms included are Django forms.



### urls.py (from the keith_app folder)
This is where all the URLs of the web app are stored. They redirect the user to each of the web app’s pages. 

### requirements.txt
This contains the name of a Python package that I installed to make my web app work. In my case, I’m using Pillow version 9.2.0.


## How to run my application
1) You need to have Django 4.1 installed in your machine. You can do so by using the command “pip install django===4.1” in your command line interface or terminal. You need to have “pip” installed beforehand.

2) You need to apply the migrations. For this, first use this command:
python manage.py makemigrations keith_app
Then, use:
python manage.py migrate

3) (Optional). Even though it’s not absolutely necessary, it’s recommended that you install Pillow 9.2.0. For this, you could run the following command:
pip install -r PATH_to_requirements.txt 
Alternatively, you could use:
pip install pillow===9.2.0

4) Now, run 
python manage.py runserver

Then, copy the link shown on your shell, and paste it in your browser.

5) Click on “Ok” to close the cookie consent banner that will show up in a few seconds.

6) You need to create an account to play the game. Therefore, click on “Sign Up” on either the navigation bar or on the blue link in the home page.
In the following page, fill out the form with a username, email, and a password. The, click on “Sign Up”.

7) If you wish to log out, click on “Log Out” in the navigation bar. 
However, if you do, you will need to log in back to your account to keep on playing the game. To do so, click on “Login” in either the navigation bar or the home page, and fill out the form with your credentials.
9) Once you’re logged in, you’ll be able to play the game.

### CONTROLS:
- Left and right arrow keys: move around.
- Up arrow key: Jump.
- Space: attack with your sword.
- 1: Level up*.
- 2: Save your game*.
- 3: Close Keith’s dialogue and fight more enemies*.

* The “1”, “2”, and “3” keys only work when Keith, a small black fox, appears onscreen. He will appear alongside a text box with dialogue. 

### OBJECTIVE OF THE GAME
The main objective of the game is to defeat the 4 enemy robots that appear onscreen, and talk to Keith, your foster son. 

After you defeat all enemies, Keith will appear, heal you, and he will ask you 3 options: to level up, to save your game, or to cancel his dialogue so that you can fight more enemies.

You should press 1 after Keith appears so that you can level up and become stronger. Your health points and level will increase. Also, you’ll be able to deal more damage.

Press 2 so that you can save your game in the web app’s database, so that you can close the browser and keep on playing afterwards without losing your progress.

Finally, press 3 to close Keith’s dialogue so that you can fight a new set of 4 enemies.

The game has no end. You can keep fighting sets of 4 enemies and leveling up by talking to Keith for as long as you want.


## Important notes

I will put the "media" folder in the same folder as the manage.py file, since that's the recommended way of doing it in real life, even though it goes against this project's instructions (source: Nathan Jones's reply on https://stackoverflow.com/questions/44548832/media-path-for-app-in-django  ). 

There’s simply no easy way of doing this project without putting the “media” folder in the same folder as the manage.py file. I know it goes against the rules set by this project. That is, I know that I should put all folder either inside of the “project” or the “app” folder. However, it will be impossible for me to make this web app without putting the “media” folder in the same folder as manage.py. 

None of the previous projects asked me to use something like the “media” folder since all images had to be taken from an internet link (like in the “commerce” project.) 

So, I will have to end up leaving the “media” folder in the same folder as the manage.py file, even if it goes against the rules. 

Also, the instructions say that “in general”, I need to use the same file structure as the previous projects. I will interpret “in general” as in “not necessarily exactly the same file structure as the previous projects, but pretty close to it”.  

============================================================

## References


### Sprite references

Elthen's Pixel Art Shop. (2021, May 24). 2d pixel art fox sprites by Elthen's pixel art shop. itch.io. Retrieved September 30, 2022, from https://elthen.itch.io/2d-pixel-art-fox-sprites Changes made: I took one of the foxes sprites' head, and pasted it in the body of another sprite. License: https://www.patreon.com/posts/27430241

HarvettFox96. (2019, January 25). Fox bases - player character sheet. OpenGameArt.org. Retrieved September 30, 2022, from https://opengameart.org/content/fox-bases-player-character-sheet Changes made: The sprite's color was changed from light gray to dark gray. Also, the outline's color was changed to black. License: https://static.opengameart.org/OGA-BY-3.0.txt

LuizMelo. (2020, August 10). Martial hero 2 by Luizmelo. itch.io. Retrieved September 30, 2022, from https://luizmelo.itch.io/martial-hero-2 License: Creative Commons Zero (CC-0)

Muniz, E. (2017, February 21). Free Pixel Art Forest by Edermunizz. itch.io. Retrieved September 30, 2022, from https://edermunizz.itch.io/free-pixel-art-forest License: https://edermunizlicense.carrd.co/

Penusbmic. (2020, December 31). Sci-fi character pack 10 by penusbmic. itch.io. Retrieved September 30, 2022, from https://penusbmic.itch.io/sci-fi-character-pack-10 


==============================================================================


### Code references

ravi. (n.d.). Django forms and model forms. CoWhite Software. Retrieved September 4, 2022, from https://django.cowhite.com/blog/django-forms-and-model-forms/ 

3b33. (2020, October 18). Get coordinate of moving image. Phaser. Retrieved September 26, 2022, from https://phaser.discourse.group/t/get-coordinate-of-moving-image/7722/2 I took some code from 3b33's reply.

Abascal, M. (2019, November 12). How to use X and Y positions of a sprite for "Fling" physics in phaser 3? Stack Overflow. Retrieved September 26, 2022, from https://stackoverflow.com/questions/58811485/how-to-use-x-and-y-positions-of-a-sprite-for-fling-physics-in-phaser-3 I took some code from Manuel Abascal's reply.

bFunc. (2018, February 24). HTML moving phaser into Container Div. Stack Overflow. Retrieved September 18, 2022, from https://stackoverflow.com/questions/20526933/html-moving-phaser-into-container-div I took some code from bFunc's reply.

Codecademy. (n.d.). Learn Phaser: Animations and Tweens. Codecademy. Retrieved September 19, 2022, from https://www.codecademy.com/courses/learn-phaser/lessons/learn-phaser-animations-and-tweens/exercises/review 

Codecademy. (n.d.). Learn Phaser: Cameras and Effects. Codecademy. Retrieved September 19, 2022, from https://www.codecademy.com/courses/learn-phaser/lessons/learn-phaser-cameras-and-effects/exercises/review-credits 

Davey, R. (2017, July 14). Examples - Time scale. Phaser. Retrieved September 19, 2022, from https://phaser.io/examples/v3/view/time/time-scale 

Davey, R. (2018, February 20). Making Your First Phaser 3 Game - Source Code. Phaser. Retrieved September 18, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/phaser3-tutorial-src.zip 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 1 - introduction - learn. Phaser. Retrieved September 18, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part1 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 10 - bouncing bombs - learn. Phaser. Retrieved September 19, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part10 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 2 - loading assets - learn. Phaser. Retrieved September 18, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part2 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 3 - world building - learn. Phaser. Retrieved September 19, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part3 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 4 - the platforms - learn. Phaser. Retrieved September 19, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part4 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 5 - ready player one - learn. Phaser. Retrieved September 19, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part5 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 6 - body velocity: A world of physics - learn. Phaser. Retrieved September 19, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part6 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 7 - controlling the player with the keyboard - learn. Phaser. Retrieved September 19, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part7 

Davey, R. (2018, February 20). Making your first phaser 3 game: Part 9 - a score to settle - learn. Phaser. Retrieved September 19, 2022, from https://phaser.io/tutorials/making-your-first-phaser-3-game/part9 

Davey, R. (2018, January 24). Examples - Add key. Phaser. Retrieved September 24, 2022, from https://phaser.io/examples/v3/view/input/keyboard/add-key 

Davey, R. (2019, January 29). Phaser3-examples/fit.js at master · photonstorm/phaser3-examples. GitHub. Retrieved September 19, 2022, from https://github.com/photonstorm/phaser3-examples/blob/master/public/src/scalemanager/fit.js 

Davey, R. (2020, November 20). Phaser3-examples/index.css at master · photonstorm/phaser3-examples. GitHub. Retrieved September 19, 2022, from https://github.com/photonstorm/phaser3-examples/blob/master/public/css/index.css 

Davey, R. (n.d.). Keyboard events. Notes of Phaser 3. Retrieved September 24, 2022, from https://rexrainbow.github.io/phaser3-rex-notes/docs/site/keyboardevents/ 

Davey, R. (n.d.). Phaser 3 Sandbox. Phaser 3 examples. Retrieved September 19, 2022, from https://labs.phaser.io/edit.html?src=src%2Fgame+objects%2Fsprites%2Fsprite+alpha.js&amp;v=3.55.2 

Davey, R. (n.d.). Timer. Notes of Phaser 3. Retrieved September 19, 2022, from https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/#introduction 

devric. (2020, September 22). Using Axios Library in Phaser 3.24.1 game. Stack Overflow. Retrieved September 28, 2022, from https://stackoverflow.com/questions/63904868/using-axios-library-in-phaser-3-24-1-game I took some code from devric's reply.

Django Software Foundation. (n.d.). Customizing authentication in Django. Django. Retrieved September 30, 2022, from https://docs.djangoproject.com/en/4.1/topics/auth/customizing/ 

Django Software Foundation. (n.d.). django.urls utility functions. Django. Retrieved September 4, 2022, from https://docs.djangoproject.com/en/4.1/ref/urlresolvers 

Django Software Foundation. (n.d.). How to manage static files (e.g. images, JavaScript, CSS). Django. Retrieved September 4, 2022, from https://docs.djangoproject.com/en/4.1/howto/static-files/ 

Django Software Foundation. (n.d.). How to use Django’s CSRF protection. Django. Retrieved September 4, 2022, from https://docs.djangoproject.com/en/4.1/howto/csrf/ 

Django Software Foundation. (n.d.). Model field reference. Django. Retrieved September 4, 2022, from https://docs.djangoproject.com/en/dev/ref/models/fields/ 

Django Software Foundation. (n.d.). Models. Django. Retrieved September 5, 2022, from https://docs.djangoproject.com/en/4.1/topics/db/models/ 

Django Software Foundation. (n.d.). Request and response objects. Django. Retrieved September 5, 2022, from https://docs.djangoproject.com/en/4.1/ref/request-response/ 

Django Software Foundation. (n.d.). The Django template language. Django. Retrieved September 4, 2022, from https://docs.djangoproject.com/en/4.1/ref/templates/language/ 

Django Software Foundation. (n.d.). The Django template language. Django. Retrieved September 4, 2022, from https://docs.djangoproject.com/en/4.1/ref/templates/language/#template-inheritance 

Django Software Foundation. (n.d.). URL dispatcher. Django. Retrieved September 4, 2022, from https://docs.djangoproject.com/en/4.1/topics/http/urls/ 

Django Software Foundation. (n.d.). Using the Django authentication system. Django. Retrieved September 5, 2022, from https://docs.djangoproject.com/en/dev/topics/auth/default/ 

dubler. (2019, June 21). Canceling gravity on a specific object. Phaser. Retrieved September 26, 2022, from https://phaser.discourse.group/t/canceling-gravity-on-a-specific-object/2854 I took some code from dubler's reply.

Eckles, S. (2020, April 9). Keep the footer at the bottom: Flexbox vs. grid. Modern CSS Solutions. Retrieved September 4, 2022, from https://moderncss.dev/keep-the-footer-at-the-bottom-flexbox-vs-grid/ 

Faheel. (2018, March 28). How to make canvas responsive. Stack Overflow. Retrieved September 5, 2022, from https://stackoverflow.com/questions/34772957/how-to-make-canvas-responsive I took some code from Faheel's reply.

How to display Success/ Flash message in django | Session Messages in django. (2021). YouTube. Retrieved September 4, 2022, from https://youtu.be/8kBo91L8JTY. 

instantsetsuna. (2010, August 3). OnKeyPress vs. onkeyup and Onkeydown. Stack Overflow. Retrieved September 28, 2022, from https://stackoverflow.com/questions/3396754/onkeypress-vs-onkeyup-and-onkeydown I took some code from instantsetsuna's question.

JavaScript Fighting Game Tutorial with Html Canvas. (2022). YouTube. Retrieved September 5, 2022, from https://youtu.be/vyqbNFMDRGQ. 

Jones, N. (2017, June 14). Media path for app in Django. Stack Overflow. Retrieved September 19, 2022, from https://stackoverflow.com/questions/44548832/media-path-for-app-in-django I took some code from Nathan Jones' reply.

jo_va. (2019, February 11). Phaser: How to use a simple timer from 0 to 3. Stack Overflow. Retrieved September 19, 2022, from https://stackoverflow.com/questions/54630495/phaser-how-to-use-a-simple-timer-from-0-to-3 I took some code from jo_va's reply.

Kelly, M. (2019, February 23). Phaser Tutorial Series: Finite State Machine. mkelly.me. Retrieved September 24, 2022, from https://www.mkelly.me/blog/phaser-finite-state-machine/ 

Martin, K. (n.d.). How to automatically update your copyright year. Kerstin Martin・Squarespace &amp; Calm Business Educator. Retrieved September 4, 2022, from https://kerstinmartin.com/blog/copyright-notice 

nicklundy. (2020, September 24). How to make canvas responsive. Stack Overflow. Retrieved September 5, 2022, from https://stackoverflow.com/questions/34772957/how-to-make-canvas-responsive. I took some code from nicklundy's reply

Omondi, A. (2020, September 15). Working with Django Templates &amp; Static files. DigitalOcean. Retrieved September 4, 2022, from https://www.digitalocean.com/community/tutorials/working-with-django-templates-static-files 

Phaser 3 Sandbox - Just Down. Phaser 3 examples. (n.d.). Retrieved September 24, 2022, from https://labs.phaser.io/edit.html?src=src%2Finput%2Fkeyboard%2Fjust+down.js&amp;v=3.55.2 

Phaser 3 Sandbox - On complete event. Phaser 3 examples. (n.d.). Retrieved September 24, 2022, from https://labs.phaser.io/edit.html?src=src%2Fanimation%2Fon+complete+event.js&amp;v=3.55.2 

Phaser 3 Sandbox - Sprite overlap group. Phaser 3 examples. (n.d.). Retrieved September 23, 2022, from https://labs.phaser.io/edit.html?src=src%2Fphysics%2Farcade%2Fsprite+overlap+group.js&amp;v=3.55.2 

Photon Storm. (2021, January 5). Class: Keyboardplugin. Phaser 3 API Documentation. Retrieved September 24, 2022, from https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.KeyboardPlugin.html 

Photon Storm. (2021, January 5). Namespace: Tint. Phaser 3 API Documentation. Retrieved September 19, 2022, from https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Tint.html 

Photon Storm. (2021, May 27). Download - Phaser 3.55.2. Phaser. Retrieved September 5, 2022, from https://phaser.io/download/stable 

Photon Storm. (n.d.). Phaser.Input.Keyboard.KeyCodes -  ONE: number. Phaser 3 API Documentation (beta). Retrieved September 26, 2022, from https://newdocs.phaser.io/docs/3.54.0/Phaser.Input.Keyboard.KeyCodes#ONE 

Photon Storm. (n.d.). Phaser.Physics.Arcade.Body - reset(x, y). Phaser 3 API Documentation (beta). Retrieved September 26, 2022, from https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Arcade.Body#reset 

Photon Storm. (n.d.). Phaser.Physics.Matter.Image - setStatic(value). Phaser 3 API Documentation (beta). Retrieved September 26, 2022, from https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Matter.Image#setStatic 

Python Django Tutorial For Beginners 2021 - Full Course. (2021). YouTube. Retrieved September 4, 2022, from https://youtu.be/pRNhdI9PVmg. 

Python Software Foundation. (n.d.). Datetime - basic date and time types. Python 3.10.7 documentation. Retrieved September 4, 2022, from https://docs.python.org/3/library/datetime.html 

Skemp, J. (2019, February 8). How to detect specific keypress in Phaser 3? Stack Overflow. Retrieved September 24, 2022, from https://stackoverflow.com/questions/54553703/how-to-detect-specific-keypress-in-phaser-3 I took some code from James Skemp's reply.

Sword Swing Attack in Arcade Physics with Phaser 3.50+. (2022). YouTube. Retrieved September 24, 2022, from https://youtu.be/SCO2BbbO17c. 

Thomas , G. (2020, January 8). Godsont/cookie-consent-banner. GitHub. Retrieved September 4, 2022, from https://github.com/Godsont/Cookie-Consent-Banner 

Thomas, G. (2020, January 8). Cookie-Consent-Banner/index.html at master · godsont/cookie-consent-banner. GitHub. Retrieved September 4, 2022, from https://github.com/Godsont/Cookie-Consent-Banner/blob/master/index.html 

Thomas, G. (2020, January 8). Cookie-consent-banner/main.js at master · godsont/cookie-consent-banner. GitHub. Retrieved September 4, 2022, from https://github.com/Godsont/Cookie-Consent-Banner/blob/master/main.js 

Thomas, G. (2020, January 8). Cookie-consent-banner/style.css at master · godsont/cookie-consent-banner. GitHub. Retrieved September 4, 2022, from https://github.com/Godsont/Cookie-Consent-Banner/blob/master/style.css 

Thornton, J., &amp; Otto, M. (n.d.). Footers. Bootstrap. Retrieved September 4, 2022, from https://getbootstrap.com/docs/5.2/examples/footers/ 

Thornton, J., &amp; Otto, M. (n.d.). Navbar. Bootstrap. Retrieved September 4, 2022, from https://getbootstrap.com/docs/5.2/components/navbar/ 

Turner, A. (2019, April 5). Responsive Gamepad Demo. Responsive gamepad demo. Retrieved September 5, 2022, from https://torch2424.github.io/responsive-gamepad/ 

Turner, A. (2019, April 5). TORCH2424/responsive-gamepad: Handle keyboard, gamepad, and touch controls under a single API 🕹️. GitHub. Retrieved September 5, 2022, from https://github.com/torch2424/responsive-gamepad This is the GitHub documentation of the Responsive Gamepad plugin.

Ulloa, B. (2018, June 22). Phaser 2 not loading images to game with Django. Stack Overflow. Retrieved September 19, 2022, from https://stackoverflow.com/questions/50960043/phaser-2-not-loading-images-to-game-with-django I took some code from Bryam Ulloa's reply.

Unknown. (2015, November 20). Enemy collisions in my phaser platformer. Amphibian Abstracts. Retrieved September 19, 2022, from https://thoughts.amphibian.com/2015/11/enemy-collisions-in-my-phaser-platformer.html 

Unknown. (2015, November 23). Attacking enemies in my phaser platformer. Amphibian Abstracts. Retrieved September 26, 2022, from https://thoughts.amphibian.com/2015/11/attacking-enemies-in-my-phaser.html 

user10238703. (2018, August 17). How to place a the label/description of a django char field above the textbox. Stack Overflow. Retrieved September 4, 2022, from https://stackoverflow.com/questions/51893239/how-to-place-a-the-label-description-of-a-django-char-field-above-the-textbox I took some code from user10238703's reply.

W3Schools. (n.d.). Python Try Except. W3Schools. Retrieved September 5, 2022, from https://www.w3schools.com/python/python_try_except.asp 

YouTube. (2017). Make a Touch Controller for your HTML5 Game! YouTube. Retrieved September 5, 2022, from https://www.youtube.com/watch?v=3M_aNkaFkiw. 

YouTube. (2020). How To Upload Images With Django - Django Blog #26. YouTube. Retrieved September 19, 2022, from https://www.youtube.com/watch?v=ygzGr51dbsY. 

Yu, B., &amp; Malan, D. (n.d.). Mail - Distribution Code. CS50’s Web Programming with Python and JavaScript. Retrieved September 19, 2022, from https://cdn.cs50.net/web/2020/spring/projects/3/mail.zip I took some code from the Mail assignment's source code from CS50W.

Yu, B., &amp; Malan, D. (n.d.). Network - CS50's web programming with python and JavaScript. Network - CS50's Web Programming with Python and JavaScript. Retrieved September 4, 2022, from https://cs50.harvard.edu/web/2020/projects/4/network/ I took some code from the Network assignment's source code from CS50W.

Yu, B., &amp; Malan, D. (n.d.). Network - Distribution code. CS50’s Web Programming with Python and JavaScript. Retrieved September 4, 2022, from https://cdn.cs50.net/web/2020/spring/projects/4/network.zip I took some code from the source code from CS50W's Project 4 (Network) assignment.

Zim. (2013, December 3). Bootstrap navbar with left, center or right aligned items. Stack Overflow. Retrieved September 4, 2022, from https://stackoverflow.com/questions/19733447/bootstrap-navbar-with-left-center-or-right-aligned-items I took some code from Zim’s reply.