/* I will use a huge chunk of JS code for the game from a specific tutorial in YouTube (source: Channel A (Alex Ziska)
from https://youtu.be/vyqbNFMDRGQ ).

I will need to create multiple JS files in order for the code to be readable. Remember to put the links to these JS
files on the layout.html file so that I can load those scripts. I will use the same file structure as the one in the
fighting game tutorial from YouTube from Channel A (Alex Ziska). That is, I will create the following 3 files: index.js,
utils.js, and classes.js.

If I can make the size of the canvas responsive, that would be great, especially since I’m required to make this project to be responsive.
If I set them to 1024 and 576, that's a fixed size in pixels. That's NOT what I want. I want a variable size.
*/

// This selects the <canvas> tags
const gameCanvas = document.querySelector('canvas')

// This is the context variable, and will make the game 2D
const c = gameCanvas.getContext('2d')

// Dimensions of the canvas (should I make them responsive?)
// gameCanvas.width = 1024
// gameCanvas.height = 576
