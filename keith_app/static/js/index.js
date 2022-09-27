/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
/* eslint-disable object-shorthand */
/* eslint-disable no-var */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-trailing-spaces */
/* I will use a huge chunk of JS code for the game from a specific tutorial in YouTube (source: Channel A (Alex Ziska)
from https://youtu.be/vyqbNFMDRGQ ).

I will need to create multiple JS files in order for the code to be readable. Remember to put the links to these JS
files on the layout.html file so that I can load those scripts. I will use the same file structure as the one in the
fighting game tutorial from YouTube from Channel A (Alex Ziska). That is, I will create the following 3 files: index.js,
utils.js, and classes.js.

If I can make the size of the canvas responsive, that would be great, especially since I’m required to make this project to be responsive.
If I set them to 1024 and 576, that's a fixed size in pixels. That's NOT what I want. I want a variable size.

I will try Faheel’s answer from this Stack Overflow thread (source: Faheel’s reply from
https://stackoverflow.com/questions/34772957/how-to-make-canvas-responsive ). That is, I will set the canvas’
height via JS. I will try setting the height to 0.5 times the width if the height of the screen is too low (like
less than 400px, which is the approximate height of mobile phones in horizontal mode). I will use a height of
less than 413 px for the conditional, since, for the hone screens I’m using, the phone height in horizontal mode is of 412 px.

Since I always want the height of the canvas to be responsive, and, in general, I want the player to only play this game
in horizontal mode on any screen, I will make the height to be always be less than the canvas' width. So, the ratio between the
height and the width will be always less than 1.

Between 0.3 and 0.4 is perfect for small phone screens in horizontal mode. Now, for computer screens, I want the height to be
higher. The problem is the padding that I’m adding with the navbar. So, I will make it so that, if the user’s logged in, I 
will remove the padding between the navbar and the rest of the page. I can do that using the “is_authenticated” decorator, and 
adding or deleting the Bootstrap class that adds the padding depending on whether the user’s logged in.

0.38 is the perfect ratio between height and width for phone screens in horizontal mode. In computer screens, I think I want it 
the height to be higher. 

What I wanted to do with an “if” won’t work. So, I will leave the ratio in 0.38 for all screens for the screen’s height.

Next, I will create a class/constructor for creating sprites. From that class, I will create each instance of a sprite
(like for the player, each anemy, and NPCs such as Keith). The "this" attribute refers to each specific instance of a 
sprite.

After that, I will create the player and the enemies by calling instances of the Sprite class, and specifying their
position as arguments. Afterwards, I will render those sprites in the browser by calling the "draw()" function.

Due to a bug, I will be forced to remove the ratio constant between the width and height of the canvas. I will have to 
use another method for adapting the canvas to mobile screens.

If I use the dimensions 1024x576 px, I will get a 16:9 ratio.

AFTER FURTHER CONSIDERATION, I will use a JS game engine called Phaser. I will no longer use the code from Channel A (Alex 
Ziska)'s Figthing Game. 

First, I will add all of the basic stuff to start a Phaser game, which is aattack “config” variable, and 3 functions: create(), 
update(), and preload() (source: https://phaser.io/tutorials/making-your-first-phaser-3-game/part1 .)

Second, I will insert all of the sprites (or at least, some of the sprites for the time being) into Phaser’s preload() 
function (source: https://phaser.io/tutorials/making-your-first-phaser-3-game/part2 .) I will insert the backgrounds as 
images (with the “image” tag,) and the characters as spritesheets (with the “spritesheet” tag.)

To fit an entire canvas in any screen size on any screen size, to make the canvas responsive in a basic way, I will use 
“mode: Phaser.Scale.FIT” inside of the “config” variable (source: 
https://github.com/photonstorm/phaser3-examples/blob/master/public/src/scalemanager/fit.js .)

*/

/* Settings for the Phaser game (includes physics, dimensions of the canvas, etc.) 

I will add "arcade", since that's a pre-made collision detection system included in Phaser (source: 
https://phaser.io/tutorials/making-your-first-phaser-3-game/part3 .) This also lets me add gravity, so that the player
can fall after jumping.

Upon further consideration, I will leave the canvas with 1024x576 px as its dimensions, since that gives me a 16:9 ratio,
and looks better that way (source: https://youtu.be/vyqbNFMDRGQ ).

To give gravity to the player, so they falls faster and faster the more time that they spend in the air, I will add 
“gravity: { y: NUMBER }” (source: https://phaser.io/tutorials/making-your-first-phaser-3-game/part6 ).
*/
var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT, // This makes the game responsive
    parent: 'keith-game', // Thiss renders the game above the footer
    width: 1024,
    height: 576
  },
  physics: { // This will add gravity and some basic collision detection
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
}

// This executes the settings in "config" on the actual game
var game = new Phaser.Game(config)

// Upon further consideration, I will store all platforms and grounds in a single variable
// var platforms

// This will store the floating platforms from each level
var aerialPlatforms

// This will store the ground for each level
var groundPlatforms

// These variables will hold the HP points for the main character
var healthPoints = 100
var healthPointsText

/* These will hold the HP points for the enemies. 

Although not the most efficient solution, I will create an HP variable for each of the 4 enemies. That is, I will
create 4 HP variables for the enemies. That way, if the player hurts and enemy, only that enemy will be hurt. Otherwise,
all enemies would lose HP if the player attacked a single enemy 
*/
var enemy1HealthPoints = 30
var enemy1HealthPointsText

var enemy2HealthPoints = 30
var enemy2HealthPointsText

var enemy3HealthPoints = 30
var enemy3HealthPointsText

var enemy4HealthPoints = 30
var enemy4HealthPointsText

// These variables will hold the EXP points for the main character
var experiencePoints = 0
var experiencePointsText

/* This is a boolean that will make the player invincible for a second right after being hit. 

Since the player will be initially vulnerable to attacks, it will start as "False".
*/
var playerImmunity = false

// // This will make each instance of an enemy invincible during the attacking animation
// var enemyImmunity = false

/* This adds a countdown. I will use it for giving invincibility frames to the player */
var immunityCountdown

/* This will store the create() event listener to detect the space bar being pressed */
var spaceBar

// This will help me play the entire attacking animation for the player
var isPlayerAttacking = false

// This will declare Fang's sword hitbox as a global variable
var hitbox

/* Invincibility frames boolean  function. This will make the player invincible for half a second.

This is what I’ll do to set the countdown to give invincibility frames to the player: first, I will go to the create() function,
and create the countdown function using “.time.addEvent”. I will give it “500” milliseconds so that it gives me half a second 
for the countdown. Upon further consideration, I'd rather give the player 1 second of invincibility.

Next, I will create a global function (before the preload() function) which will only do one thing: to set the “immunity” variable 
back to “false” so that the player is vulnerable to attacks once again.

Finally, I will call the function that sets the immunity back to false un the update() function. However, within that function, I 
will call the countdown function. This way, the function should wait half a second before being executed. That is, I will have to 
wait for half a second until the immunity variable gets back to “false”. 

How to use Phaser 3's timer (source: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/timer/#introduction ).

I could use simple JS as a countdown (source: jo_va's reply from
https://stackoverflow.com/questions/54630495/phaser-how-to-use-a-simple-timer-from-0-to-3 ).

The "clearTint" function will remove the red tint that I give the player after they get hurt: (source: 
https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Components.Tint.html .)

This should only be called while the player's HP is above 0 (if they are still alive).
*/
function removeImmunity () {

  // While the timer is being executed and is below half a second this will execute
  // if (timer.getElapsed() < 500) {

  // If a second has passed since I touched an enemy, this will execute
  setTimeout(() => {
    // DEBUG msg.
    console.log('The removeImmunity() function has been called.')

    // This removes the player immunity, and makes him vulnerable again
    playerImmunity = false

    // This removes the player's red tint, and gets their colors back to normal
    player.clearTint()

  }, 1000)


  // DEBUG msg: this shows me the current value of the timer
  // console.log('The curent value for the timer is: ' + timer.hasDispatched)
  // console.log('The curent value for the timer is: ' + timer.getElapsed())


  // console.log('The curent value for the timer is: ' + timer.getRemaining())

  // console.log('The curent value for the timer is: ' + timer.getProgress())

  // console.log('The curent value for the timer is: ' + timer)



  // }

} 

/* This detects the collision between the ball and chain enemies (melee enemies) 
and the player.

Here, the enemy will hurt the player if they touch them. 

If the player loses all of their HP (Health Points), they will die, and they will get a Game Over.

How to make an enemy hurt the player (source: https://thoughts.amphibian.com/2015/11/enemy-collisions-in-my-phaser-platformer.html ). 
First, I will declare an empty boolean variable called “immune”. I will create it since I want the player to be invincible for a 
second after getting hurt (I will add them invincibility-frames). Then, during that second or so, I want them to be red. Well, 
that will be executed when the “immune” variable is set to “True”.

After that second has passed, the player won’t be neither invincible nor red any longer. That is, I will set the “immune” variable 
to “False”, which will make the character vulnerable to damage once again.

How to make a countdown or timed event in Phaser 3 (source: https://phaser.io/examples/v3/view/time/time-scale ).

I will only call the removeImmunity() function if the player is still alive.

I will try to reuse this function to let the player hurt the enemy during the sword swinging animation. Since this function is 
called whenever the enemy and the player overlap, I think this function is the most appropriate to let the player hurt the enemy.
I will use the boolean variable that stores whether the player is playing its attack animation to determine if the player can hurt 
the enemy.

I WON'T be playing a hurting animation (like the idle animation) whenever I get hurt, because, otherwise, I will never finish
the attack animation. So, the isPlayerAttacking variable never becomes true, so I can't move my character horizontally after getting 
hurt.
*/
function touchMeleeEnemy (player, meleeEnemy) {
  // This will check if the player was vulnerable to attacks when touching an enemy
  if (playerImmunity === false) {
    
    playerImmunity = true // This will make the player immune for half a second

    player.setTint(0xff0000) // This will turn the player red

    // This will subtract some HP from the player
    healthPoints = healthPoints - 10

    // This updates the HUD to show the player's remaining HP
    healthPointsText.setText('HP: ' + healthPoints)

    // DEBUG msg: This checks how much HP I have left
    console.log('HP remaining: ' + healthPoints)

    // This will make the player vulnerable again after a second if they are still alive
    if (healthPoints > 0) {
      removeImmunity() 
    }

    // // This is a counter which will make the player vulnerable again after half a second (BUGGY, since it's from Phaser 2)
    // immunityCountdown = this.time.addEvent({ delay: 5000, 
    //   function () {
    //     playerImmunity = false
    //   }, this
    // })

    // game.time.events.add(500, function () {
    //   playerImmunity = false
    // }, this)
    
  }
  
  /* This will only execute if the player is playing the attack animation 
  

  */
  // if (isPlayerAttacking === true) {
  //   console.log('The player is attacking the enemy.')
  // }

  // else { // This will execute if the player is immune
  //   playerImmunity = false
  // }

  

  // This will play is the player is killed
  if (healthPoints === 0) {
    this.physics.pause() // This pauses the game 

    player.setTint(0xff0000) // This makes the player turn red permanently

    // This variable stores if the player got a Game Over
    gameOver = true // End of player death code
  }

  // This plays the player's idle animation
  // player.anims.play('idle') 
} // End of touchEnemy()

/* This will let the hitbox hurt the enemy when the player swings their sword.

I'll try to access the health and name properties of each enemy, to make sure that, for instance, if I
attack meleeEnemy1, that I will get the name "Melee Enemy 1", and its corresponding HP points.

To make the player hurt only once the enmy per sword slash, I will first subtract HP from the enemy, and then
make the enemy invincible for the rest of the attacking animation. Then, once the attacking animation ends,
I will make enemy vulnerable once again.

I'll use a switch case for better readability and to make the code run faster

From 900 milliseconds, I prevent from hurting too much an enemy if I press the Space bar too many times in a row.
*/
function hurtEnemy (meleeEnemies, hitbox) {

  
  switch (meleeEnemies.immunity) {
    // This will subtract HP points from the enemy if the enemy isn't invincible
    case false:
      meleeEnemies.health = meleeEnemies.health - 10

      // This will give a red tint to the enemy while they're invincible
      meleeEnemies.setTint(0xff0000)

      // This will make the enemy invincible during the rest of the attacking animation
      meleeEnemies.immunity = true
      break

    // This will make the enemy invincible until the sword swinging animation ends
    case true:
      setTimeout(() => {
        meleeEnemies.immunity = false

        // This removes the red tint
        meleeEnemies.clearTint()
      }, 900)

      // if (isPlayerAttacking === false) {
      // meleeEnemies.immunity = false
      // }


  }


  // DEBUG msg
  console.log("You're attacking the enemy with your sword.")

  // DEBUG msg: this prints the health and name of the enemy being attacked
  console.log('This is ' + meleeEnemies.name + ' .')
  console.log('It has ' + meleeEnemies.health + ' HP.')
  console.log('Is the enemy currently invincible?: ' + meleeEnemies.immunity)
}

// This prints a message whenever the player touches the sword's hitbox
// function touchHitbox (player, hitbox) {

//   // DEBUG msg
//   console.log("You've just touched the hitbox.")
// }


/* This lets the player attack and hurt the enemies.
*/
// function attackEnemy (meleeEnemy, player) {
//   console.log('You just attacked an enemy.')
// }


/* This will play Fang's attack animation.

I will create a function exclusively for playing the attack animation. Then, I will call that function from the create() 
function each time I hit the space bar. 
*/ 
// function playerAttack() {
//   player.anims.play('fang-attacking', true)
// }


/* =========================================================================================================================== */

/* Here, I will insert the sprites 

I had to upload all the images into a folder called "media", and had to take from there the images.

I will also upload the aerial platform sprites in here.

My height can only be up to 54 px high if I want to prevent Fang from falling through the aerial platforms while attacking. 
I may ned to readjust my sprites. 

To hurt the enemy I will create a hitbox, and render it in front of the player while they are swinging their sword. To make things
easier, I will create a sprite for the hitbox.
*/
function preload () {
  // Background of action level 1 without the ground
  this.load.image('bg-level-1', 'media/assets/level-1/forest-background.jpg')

  // Ground of action level 1
  this.load.image('ground-level-1', 'media/assets/level-1/ground.jpg')

  // Fang's idle spritesheet
  this.load.spritesheet('fang-idle', 'media/assets/fang/fang-idle.png', 
    { frameWidth: 36, frameHeight: 51 })

  // Fang's running spritesheet
  this.load.spritesheet('fang-running', 'media/assets/fang/fang-running.png', 
    { frameWidth: 50, frameHeight: 49 })

  // Fang's attacking spritesheet
  this.load.spritesheet('fang-attacking', 'media/assets/fang/fang-attacking.png', 
    { frameWidth: 96, frameHeight: 51 })

  // Fang's hitbox
  this.load.image('sword-hitbox', 'media/assets/fang/sword-hitbox.jpg')

  // Aerial platforms sprites
  this.load.image('aerial-platform-1', 'media/assets/level-1/aerial-platform-1.jpg')

  // Fang's HUD mask (it will make it easier to read the HP and EXP)
  this.load.image('fang-hud', 'media/assets/UI/fang-hud.png')

  // Enemy sprites
  // Ball and chain robot (melee enemy)
  this.load.image('melee-enemy', 'media/assets/enemies/melee-enemy.png', { frameWidth: 36, frameHeight: 51 })
}




/* This renders the sprites and other things that were inserted in the preload() function.

I will add "this.image" to render the images that aren't spritesheets (i.e: the backgrounds.)

I will also render the aerial platforms in here. I’m only going to have 3 platforms in pretty much all 
action levels: the level’s ground, and 2 aerial platforms. 

Since neither the aerial platforms nor the levels' grounds will move when the player or enemy touches them, the will 
have "static" physics. That is, the won't move if a character falls on top of them. This is done with the "staticGroup"
snippet (source: https://phaser.io/tutorials/making-your-first-phaser-3-game/part4).

I don't need to use "this.image.add" for the platforms, since I will render them as an object with physics. So, I can
render them using ".create". I don't need to add the ".refreshBody()" property, since that's only to add the
collision detection if I had stretched the sprite using "setScale".

To have an easier time calculating where to put the sprites, I will use setOrigin(0,0), so Phaser puts the beginning 
of the sprite at the top left corner of the screen as (0, 0).

The “setCollideWorldBounds(true);” snippet will prevent the player from going out of bounds. That is, they won’t be 
able to go past the right and left edged of the levels (source: 
https://phaser.io/tutorials/making-your-first-phaser-3-game/part5 ).

To detect collision between the player and the platforms, and prevent me from falling through the platforms, I need to 
add "this.physics.add.collider(player_sprite, platform_sprite);".

To assign the keyboard arrow keys to the game so that the player can move Fang, I’ll use the snippet 
“cursors = this.input.keyboard.createCursorKeys();” (source: 
https://phaser.io/tutorials/making-your-first-phaser-3-game/part7 ).

I could use setScale() to make Fang bigger without editing his spritesheet in Photoshop. I’ll use something like “.setScale(NUMBER)”.

I will re-use an aerial platform to use it as the ground for the 1st action level. I will use "setScale" to make the platform long 
enough to cover the entire width of the screen. I will also have to apply the property "refreshBody" to it since I want it to have 
collision detection after stretching the original platform sprite.

I will set the text for the HP and the EXP using “this.add.text” (source: 
https://phaser.io/tutorials/making-your-first-phaser-3-game/part9 .) I will later see how to modify a shape’s opacity level in 
Phaser so that I can put a mask behind the UI so that the UI becomes easier to read. Alternatively, I coul create a PNG image in 
Photoshop or a rectangle with low opacity, so that I could use it as a mask.

To change the transparency of a sprite in Phaser, I need to add a number between 0 and 1 to its "alpha" attribute (source: 
https://labs.phaser.io/edit.html?src=src/game%20objects/sprites/sprite%20alpha.js&v=3.55.2 ).

Fang's running animation has 8 sprites. Therefore, I will have to loop the sprites from the 0th sprite to the 7th sprite
to get the running animation.

If I increase the "frameRate" property from "anims", I'll make the animation to look faster.So, I increased the frameRate property
from the running animation so that it looks faster.

To add the enemies, I will give them dynamic physics, and give them collision detection between them and the player and the 
platforms, and I will also assign them a function so that they can hurt the player (source: 
https://phaser.io/tutorials/making-your-first-phaser-3-game/part10 ).

I will add the enemy as a sprite, not a an image nor a group, so that I can assign them animations in a relatively easy way
(source: (source: https://www.codecademy.com/courses/learn-phaser/lessons/learn-phaser-animations-and-tweens/exercises/review .)

I see now the problem I had with the setWorldColliders for the enemy sprites: I never actually created an instance of an enemy. 
I just created a method or class of sorts (a cookie cutter) for creating a group of enemies, but I never created an instance of 
a single enemy. So, without that instance, the setWorldColliders attribute will give me a bug.

I will create the half a second countdown to remove the player's invincibility frames here.

How to use an overlap instead of a collider to make 2 sprites touch each other without one pushing the other: (source: 
https://labs.phaser.io/edit.html?src=src/physics/arcade/sprite%20overlap%20group.js&v=3.55.2 ).

The attacking animation won't have the "repeat" property, since I want the animation to only be played once. I don't
want to loop that animation.

How to detect when a user presses the space bar in Phaser (source: 
https://photonstorm.github.io/phaser3-docs/Phaser.Input.Keyboard.KeyboardPlugin.html ).

How to use an "if" to detect a specific key being pressed in update() in Phaser (source: James Skemp's reply on
https://stackoverflow.com/questions/54553703/how-to-detect-specific-keypress-in-phaser-3 ). 

How to detect a non-cursor key on Phaser (source: https://phaser.io/examples/v3/view/input/keyboard/add-key ).

I will render the player's sword hitbox in front of the player wheenver they swing their sword.

Since I want Fang's hitbox to have an overlap interaction with the enemies, I guess I'll have to add physics to it. 
As for the type of physics that I'll need, I'll use static physics, since I don't want the hitbox to be bouncing 
around the level once it touches something. However, the hitbox will be constantly moving (I will have to update 
its position in the update() function.) So, if I get a bug, I will change its physics to a dynamic one.

This sets static physics to a single image (source: https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Matter.Image#setStatic ).

How to get a sprite's X and Y position (source:
Manuel Abascal's reply on
https://stackoverflow.com/questions/58811485/how-to-use-x-and-y-positions-of-a-sprite-for-fling-physics-in-phaser-3 ).

To give Health Points to each enemy individually (to prevent hurting all enemies at the same time when I attack 1 enemy), I
need to either pass that enemy's HP as an argument to the hurtEnemy() function, or assign health as an attribute to each enemy.
The easiest way would be to use "." notation to assign health as an attribute to each enemy. So, I will hive health and a name
to each enemy. The name will be useful for debugging purposes. 
*/
function create () {
  // This renders a preloaded image (the 1st action level's background)
  this.add.image(0, 0, 'bg-level-1').setOrigin(0, 0)

  // This renders a mask for Fang's HUD
  var fangHUD = this.add.image(0, 0, 'fang-hud').setOrigin(0, 0)

  // This adds transparency to the HUD's mask
  fangHUD.alpha = 0.7

  // This makes it so that the platforms don't move when a character jumps on top of them
  aerialPlatforms = this.physics.add.staticGroup()

  // This creates the physics for the ground platform
  // groundPlatforms = this.physics.add.staticGroup()

  // I will render the ground from action level 1 as a platform with collision detection
  // groundPlatforms.create(0, 492, 'ground-level-1').setOrigin(0, 0)

  // This renders an aerial platform as the ground for the 1st action level
  aerialPlatforms.create(300, 691, 'aerial-platform-1').setScale(8).refreshBody()

  // This renders the aerial platforms for the 1st action level
  aerialPlatforms.create(100, 350, 'aerial-platform-1')
  aerialPlatforms.create(925, 350, 'aerial-platform-1')

  // This adds the player's idle spritesheet with dynamic physics
  player = this.physics.add.sprite(300, 400, 'fang-idle').setScale(2)

  // This prevents the player from going out of bounds
  player.setCollideWorldBounds(true)

  // This gets the player's idle sprites from the spritesheet, and adds animation to it (walk to right)
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('fang-idle', { start: 0, end: 3 }),
    frameRate: 7,
    repeat: -1
  })

  // This gets the player's running sprites from the spritesheet, and adds animation to it (walk to right)
  this.anims.create({
    key: 'running',
    frames: this.anims.generateFrameNumbers('fang-running', { start: 0, end: 7 }),
    frameRate: 14,
    repeat: -1
  })

  // This gets the player's attack spritesheet, and adds animation to it
  this.anims.create({
    key: 'fang-attacking',
    frames: this.anims.generateFrameNumbers('fang-attacking', { start: 0, end: 3 }),
    frameRate: 14, 
    repeat: 0
  })

  // These get the player's X and Y position
  playerXPosition = player.body.position.x
  playerYPosition = player.body.position.y

  // This gives static physics to Fang's hitbox by creating a group of hitboxes
  hitbox = this.physics.add.staticGroup()

  // hitbox = this.add.image(500, 300, 'sword-hitbox').setOrigin(0, 0)

  // This renders a specific instantce of Fang's hitbox
  hitbox1 = hitbox.create(-100, 0, 'sword-hitbox')

  // This makes the hitbox to be invisible and disappear by default
  // hitbox1.exists = false


  // hitbox = this.add.image(500, 300, 'sword-hitbox').setOrigin(0, 0)

  // This creates an overlap between Fang's hitbox and another character 
  // this.physics.add.overlap(player, hitbox, touchHitbox, null, this)




  // This adds collision between the player and the aerial platforms, to prevent me from falling through them
  this.physics.add.collider(player, aerialPlatforms)

  // This adds collision between the player and the ground to prevent me from falling through them
  // this.physics.add.collider(player, groundPlatforms)

  // This will register the arrow keys to let me move the player with the arrows
  cursors = this.input.keyboard.createCursorKeys()

  // This creates the HP text that will be displayed in the UI
  healthPointsText = this.add.text(16, 16, 'HP: 100', { fontSize: '32px', fill: '#FFFFFF' })

  // This creates the EXP text that will be displayed in the HUD
  experiencePointsText = this.add.text(16, 64, 'EXP: 0', { fontSize: '32px', fill: '#FFFFFF' })

  // This creates a constructor for creating enemies, and adds them collision detection
  meleeEnemies = this.physics.add.group() // Melee enemy
  this.physics.add.collider(meleeEnemies, aerialPlatforms) // Collision detection between player and enemy

  // // This renders the melee enemies
  // meleeEnemies.create(800, 150, 'melee-enemy')



  // This will let the player hurt enemies with Fang's sword
  // this.physics.add.overlap(meleeEnemies, player, attackEnemy, null, this)
  
  // This creates an instance of an enemy (the melee weapon one)
  var meleeEnemy1 = meleeEnemies.create(980, 16, 'melee-enemy').setScale(3)

  // These lines will create 3 more instances of the melee weapon enemy
  var meleeEnemy2 = meleeEnemies.create(780, 16, 'melee-enemy').setScale(3)
  var meleeEnemy3 = meleeEnemies.create(400, 16, 'melee-enemy').setScale(3)
  var meleeEnemy4 = meleeEnemies.create(40, 16, 'melee-enemy').setScale(3)

  // This horizontally flips the melee enemy sprite
  meleeEnemy1.flipX = true
  meleeEnemy2.flipX = true
  meleeEnemy3.flipX = true
  // meleeEnemy4.flipX = true

  // These will assign health, invincibility status, and names to each enemy
  meleeEnemy1.health = enemy1HealthPoints
  meleeEnemy1.name = 'Melee Enemy 1'
  meleeEnemy1.immunity = false

  meleeEnemy2.health = enemy2HealthPoints
  meleeEnemy2.name = 'Melee Enemy 2'
  meleeEnemy2.immunity = false

  meleeEnemy3.health = enemy3HealthPoints
  meleeEnemy3.name = 'Melee Enemy 3'
  meleeEnemy3.immunity = false

  meleeEnemy4.health = enemy4HealthPoints
  meleeEnemy4.name = 'Melee Enemy 4'
  meleeEnemy4.immunity = false



  // This will call a function whenever the player touches an enemy. This won't push the enemy.
  this.physics.add.overlap(player, meleeEnemies, touchMeleeEnemy, null, this)

  // This creates the overlap that will hurt the enemy with the hitbox
  this.physics.add.overlap(meleeEnemies, hitbox, hurtEnemy, null, this)

  // This prevents the melee enemy from going out of bounds
  meleeEnemy1.setCollideWorldBounds(true)
  meleeEnemy2.setCollideWorldBounds(true)
  meleeEnemy3.setCollideWorldBounds(true)
  meleeEnemy4.setCollideWorldBounds(true)

  // This will create the event for detecting if the space bar has been pressed
  spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

  // this.input.keyboard.on('keydown_SPACE', this.playerAttack(), this)

  // This creates the invincibility frame countdown for half a second
  // immunityCountdown = this.time.addEvent({ delay: 500 })

  // This prevents the melee enemy from going out of bounds (BUGGY)
  // meleeEnemies.setCollideWorldBounds(true)

  // This plays the running animation for the melee enemy
  // this.anims.create({
  //   key: 'melee-enemy-running',
  //   frames: this.anims.generateFrameNumbers('melee-enemy', { start: 0, end: 7 }),
  //   frameRate: 14,
  //   repeat: -1
  // })


  // this.add.image(400, 500, 'ground-level-1')
}

/* This will constantly refresh the game so that I can see the sprite animations.

The "if (cursors)" functions will let me move the player and play Fang's different animations from
the spritesheet, depending on the name of the key that I assigned to that animation. The "true" boolean
argument plays the animation. Since I have an idle animation, I will NEVER eliminate the "true" argument
for the player's sprite.

If the player is touching a platform, and presses the up arrow, they'll be able to jump. You CAN'T jump
if you're touching the lower bound of the screen.

The only running sprites that I have for the player are facing to the right. However, with the function "flipX", 
I can make a horizontal flip so that, when I run to the left, the sprites are flipepd so that Fang is facing to the
left (source: https://www.codecademy.com/courses/learn-phaser/lessons/learn-phaser-cameras-and-effects/exercises/review-credits .)

I will also execute the enemy animations in here.

I will call the invincibility frame boolean function in here, but with the half a second delay from the countdown function that
I created in the create() function.

If the user presses space bar, they will attack with their sword (the attacking animation for the player will player.)

Using a boolean for determining which animation should play: (source: 
https://www.mkelly.me/blog/phaser-finite-state-machine/ ).

How to use SetBodySize to make an sprite wider (source: https://youtu.be/SCO2BbbO17c ).

I will constantly update the X and Y coordinates of the hitbox so that it is always in front of the player.
To do so, I will get the player's X and Y coordinates, and give them to the hitbox.

How to get the X coordinate of an image (NOT a sprite) (source: 3b33's reply on
https://phaser.discourse.group/t/get-coordinate-of-moving-image/7722/2 ).

Reset() function on Phaser 3 to change a sprite's X and Y coordinates (source: 
https://newdocs.phaser.io/docs/3.55.2/Phaser.Physics.Arcade.Body#reset ).

How to use the reset() function to render something in the same position as the player (source: 
https://thoughts.amphibian.com/2015/11/attacking-enemies-in-my-phaser.html ). 

To make the hitbox to always be rendered in front of the player, independently of whether they're facing the right or
the left, I will create an "if" statement that checks if the player is flipped. If they are, I will render the hitbox
more towards the left (like by subtracting 20 px to Fang's sprite). Otherwise, I will render it at around 160 px beyond
Fang's sprite.

I will try using "exists = true" to try to make the hitbox reappear during the attacking animation.

To make the hitbox to be away by default, and to make it appear only while attacking, I set the hitbox's initial position to 
be out of the game world's bounds. Then, during the sword swing animation, I made the hitbox to apepar in front of Fang. Afterwards, 
I'm returning the hitbox back to being out of bounds.

I have a bug that makes the player to get hurt if they face towards the left and attack an enemy. To fix this, I will make the player
invincible during the sword swinging animation. Then, right after the animation ends, I will make the player once again vulnerable
to attacks.

I will make the enemies invincible right after damaging them so that the player can only hurt them once per attack. To do that, 
I'll create a boolean that will assign immunity to enemies right after getting hurt, and which will make enemies vulnerable
once again right after the attacking animation ends. And, since I only want a specific enemy to be invincible during the attack, 
I will assign each enemy the immunity boolean as a property via "." notation (i.e: "enemy.immunity = false").
*/
function update () {

  // These will get the player's coordinates and assign them to the hitbox
  // hitbox.x = player.body.position.x
  // hitbox.y = player.body.position.y

  // This will let the player move only if they aren't attacking (to finish the attacking animation)
  if (isPlayerAttacking === false) {
    // This executes if the player touches the left arrow
    if (cursors.left.isDown) {
      // This flips the sprite horizontally so that the player faces to the left
      player.flipX = true

      // This flips the hitbox horizontally algonside the player.
      // hitbox1.flipX = true

      // This makes the player's sprite to move to the left
      player.setVelocityX(-250)

      // This plays the animation of the player running
      player.anims.play('running', true)

    // eslint-disable-next-line brace-style
    } 
    // This executes if the player touches the right arrow
    else if (cursors.right.isDown) { 
    
      // This flips the sprite horizontally so that the sprite faces back to its original direction 
      player.flipX = false

      player.setVelocityX(250)

      player.anims.play('running', true)
    } else {
      player.setVelocityX(0)

      player.anims.play('idle', true)
    }

    // This executes if the player touches the up arrow
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330)
    }
  } // End of non-sword swinging inputs


  if (spaceBar.isDown) { // This executes if the player presses the space bar

    // DEBUG msg
    console.log('The space bar has been pressed.')

    // This plays the attacking animation
    player.anims.play('fang-attacking', true)

    // This prevents the player from moving while they attack
    player.setVelocityX(0)

    // This will stop all other animations
    isPlayerAttacking = true

    // This will make the player invincible during the attacking animation
    playerImmunity = true

    // This will make the hitbox to appear and be visible
    // hitbox1.exists = true

    // DEBUG msg: this will get the hitbox's coordinates
    // console.log('The X coordinate for the hitbox is ' + hitbox1.x)

    // This will try to reset the X position of the hitbox
    // hitbox.x = 600

    // This renders the sword's hitbox right in front of the player
    // If the player is facing to the left, I will render the hitbox towards the left
    if (player.flipX === true) {
      hitbox1.body.reset(player.body.position.x + 30, player.body.position.y + 60)
    // eslint-disable-next-line brace-style
    } 
    // If the player is facing to the right, I will render the hitbox towards the right
    else {
      hitbox1.body.reset(player.body.position.x + 160, player.body.position.y + 60)
    }
    

    // DEBUG: This renders the hitbox somewhere else (IT WORKS)
    // hitbox1.x = 100
    // hitbox1.y = 100

    // hitbox.reset(100, 100)
    

    // This resets Fang's position after swinging his sword. (IT WORKS but I don't need it)
    // player.body.reset(100, 100)

    // This will make the sprite wider so that the sword touches the enemy
    // player.setBodySize(player.width * 2)

    // This will let other animations play once the attacking animation ends
    player.once('animationcomplete', () => {
      isPlayerAttacking = false

      // This will make the hitbox to move back to being out of the stage's bounds (to make it "disappear")
      hitbox1.body.reset(-100, 0)

      // This will make the player once again vulnerable to attacks (after 200 milliseconds)
      setTimeout(() => {
        playerImmunity = false
      }, 200)
      
      // // These will make all enemies vulnerable after the sword swinging animation ends
      // meleeEnemy1.immunity = false
      // meleeEnemy2.immunity = false
      // meleeEnemy3.immunity = false
      // meleeEnemy4.immunity = false

      // // These will remove the red tints from all enemies after attack animation ends
      // meleeEnemy1.clearTint()
      // meleeEnemy2.clearTint()
      // meleeEnemy3.clearTint()
      // meleeEnemy4.clearTint()

      // This will return the player's width back to normal
      // player.setBodySize(player.width * 0.5)
    })

  } 



  // // This calls the immunity boolean function after a half a second delay if the player gets hurt
  // if (playerImmunity === true) {
  //   removeImmunity() 
  // }


  // // This executes the enemy animations
  // // Melee weapon enemy
  // meleeEnemies.anims.play('melee-enemy-running', true)
}


















// This selects the <canvas> tags
// const gameCanvas = document.querySelector('canvas')

// // This is the context variable, and will make the game 2D
// const c = gameCanvas.getContext('2d')

// // Canvas height
// gameCanvas.width = 1024

// // Canvas width
// gameCanvas.height = 576

// // Ratio between the canvas' height and width
// // const heightWidthRatio = 0.38

// // Height of the canvas (responsive)
// // gameCanvas.height = gameCanvas.width * heightWidthRatio

// // This changes the color of the canvas
// c.fillRect(0, 0, gameCanvas.width, gameCanvas.height)

// // This is a class/method for creating sprites
// class Sprite {
//   // This stores each property of the class/method (like position)
//   constructor (position) {
//     this.position = position
//   }

//   // This will render an instance of a sprite
//   draw () {
//     // This is a placeholder that will render a red rectangle as a sprite
//     c.fillStyle = 'red'

//     // Dimensions of the rectangle that will act as a placeholder sprite
//     c.fillRect(this.position.x, this.position.y, 50, 150)
//   }
// }

// // Instance of the Sprite class, which will create the player
// const player = new Sprite({
//   x: 0,
//   y: 0
// })

// // This renders the player
// player.draw()

// // Instance of an enemy sprite
// const enemy = new Sprite({
//   x: 400,
//   y: 100
// })

// enemy.draw()

// // DEBUG msg
// console.log(player)









// This checks if the the screen height is less than 413 px (a phone screen in horizontal mode)
// if (gameCanvas.height < 413) {
//   // Ratio between the canvas' height and width
//   const heightWidthRatio = 0.38

//   // Height of the canvas (responsive)
//   gameCanvas.height = gameCanvas.width * heightWidthRatio
// } else {
//   // If the screen's height is over 413 px, then the device is larger than a phone screen in horizontal mode 

//   const heightWidthRatio = 0.38
//   gameCanvas.height = gameCanvas.width * heightWidthRatio
// }

// gameCanvas.width = 1024
// gameCanvas.height = 576
