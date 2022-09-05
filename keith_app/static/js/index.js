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
*/

// This selects the <canvas> tags
const gameCanvas = document.querySelector('canvas')

// This is the context variable, and will make the game 2D
const c = gameCanvas.getContext('2d')

// Ratio between the canvas' height and width
const heightWidthRatio = 0.38

// Height of the canvas (responsive)
gameCanvas.height = gameCanvas.width * heightWidthRatio

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
