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
var platforms;

// // This will store the floating platforms from each level
// var aerialPlatforms;

// // This will store the ground for each level
// var groundPlatforms;

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
    { frameWidth: 200, frameHeight: 200 })

  // Aerial platforms sprites
  this.load.image('aerial-platform-1', 'media/assets/level-1/aerial-platform-1.jpg')
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
*/
function create () {
  // This renders a preloaded image (the 1st action level's background)
  this.add.image(0, 0, 'bg-level-1').setOrigin(0, 0)

  // This makes it so that the platforms don't move when a character jumps on top of them
  platforms = this.physics.add.staticGroup()

  // I will render the ground from action level 1 as a platform with collision detection
  platforms.create(0, 492, 'ground-level-1').setOrigin(0, 0)

  // This renders the aerial platforms for the 1st action level
  platforms.create(200, 350, 'aerial-platform-1')
  platforms.create(900, 350, 'aerial-platform-1')

  // This adds the player's spritesheet with dynamic physics
  player = this.physics.add.sprite(100, 450, 'fang-idle')

  // This prevents the player from going out of bounds
  player.setCollideWorldBounds(true)

  // This gets the player from the spritesheet, and adds animation to it (walk to right)
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('fang-idle', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  })

  // this.add.image(400, 500, 'ground-level-1')
}

function update ()
{
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
