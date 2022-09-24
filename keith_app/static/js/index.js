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

First, I will add all of the basic stuff to start a Phaser game, which is a “config” variable, and 3 functions: create(), 
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

// These variables will hold the EXP points for the main character
var experiencePoints = 0
var experiencePointsText

/* This is a boolean that will make the player invincible for a second right after being hit. 

Since the player will be initially vulnerable to attacks, it will start as "False".
*/
var playerImmunity = false

/* This adds a countdown. I will use it for giving invincibility frames to the player */
var immunityCountdown

/* Thsi will store the create() event listener to detect the space bar being pressed */
var spaceBar;

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


  player.anims.play('idle') // This plays the player's idle animation
}


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

  // Fang's ataccking spritesheet
  this.load.spritesheet('fang-attacking', 'media/assets/fang/fang-attacking.png', 
    { frameWidth: 96, frameHeight: 51 })

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
  aerialPlatforms.create(200, 350, 'aerial-platform-1')
  aerialPlatforms.create(900, 350, 'aerial-platform-1')

  // This adds the player's idle spritesheet with dynamic physics
  player = this.physics.add.sprite(100, 0, 'fang-idle').setScale(2)

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
    frameRate: 14
  })

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

  // This will call a function whenever the player touches an enemy. This won't push the enemy.
  this.physics.add.overlap(player, meleeEnemies, touchMeleeEnemy, null, this)
  
  // This creates an instance of an enemy (the melee weapon one)
  var meleeEnemy1 = meleeEnemies.create(800, 16, 'melee-enemy').setScale(3)

  // These lines will create 3 more instances of the melee weapon enemy
  var meleeEnemy2 = meleeEnemies.create(600, 16, 'melee-enemy').setScale(3)
  var meleeEnemy3 = meleeEnemies.create(400, 16, 'melee-enemy').setScale(3)
  var meleeEnemy4 = meleeEnemies.create(200, 16, 'melee-enemy').setScale(3)

  // This horizontally flips the melee enemy sprite
  meleeEnemy1.flipX = true
  meleeEnemy2.flipX = true
  meleeEnemy3.flipX = true
  meleeEnemy4.flipX = true

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

If the user presses space bar, they will attack with their sword (the ataccking animation for the player will player.)
*/
function update () {
  // This executes if the player touches the left arrow
  if (cursors.left.isDown) {
    // This flips the sprite horizontally so that the player faces to the left
    player.flipX = true

    // This makes the player's sprite to move to the left
    player.setVelocityX(-250)

    // This plays the animation of the player running
    player.anims.play('running', true)
  } else if (cursors.right.isDown) { // This executes if the player touches the right arrow
    // This flips the sprite horizontally so that the sprite faces back to its original direction 
    player.flipX = false

    player.setVelocityX(250)

    player.anims.play('running', true)
  } 
  else if (spaceBar.isDown) { // This executes if the player presses the space bar

    // DEBUG msg
    console.log('The space bar has been pressed.')

    // This plays the attacking animation
    player.anims.play('fang-attacking', true)

    // This prevents the player from moving while they attack
    player.setVelocityX(0)

  } 
  else {
    player.setVelocityX(0)

    player.anims.play('idle', true)
  }

  // This executes if the player touches the up arrow
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330)
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
