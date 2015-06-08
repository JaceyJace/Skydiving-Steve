var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();

// This function will return the time in seconds since the function 
// was last called
// You should only call this function once per frame
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();

		// Find the delta time (dt) - the change in time since the last drawFrame
		// We need to modify the delta time to something we can use.
		// We want 1 to represent 1 second, so if the delta is in milliseconds
		// we divide it by 1000 (or multiply by 0.001). This will make our 
		// animations appear at the right speed, though we may need to use
		// some large values to get objects movement and rotation correct
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	
		// validate that the delta is within range
	if(deltaTime > 1)
		deltaTime = 1;
		
	return deltaTime;
}

//--------------------******************** Don't modify anything above here ********************--------------------//

//------------*********** VARIABLES ***********------------//
//SCREEN SIZE
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

//GAME STATES
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_WIN = 2;
var STATE_LOSE = 3;
var gameState = STATE_SPLASH;


//FRAMES PER SECOND
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

//CREATING THE LEVEL
//Level Layers
var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_BACKGROUND2 = 2;
//var LAYER_OBJECT_ENEMY = 2;
var LAYER_COUNT = 2;
//var LAYER_OBJECT_TRIGGER = 3;

//Setting Terms For Layers
var TILE = 30;
var MAP = {tw: 12, th: 1000};
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 28;
var TILESET_COUNT_Y = 15;

//Image for JSON
var Jungle_terrain = document.createElement("img");
Jungle_terrain.src = "Jungle_terrain.png";





var splashTimer = 3;
function runStateSplash(deltaTime)
{
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);

	splashTimer -= deltaTime;
	if(splashTimer <= 0)
	{
		gameState = STATE_GAME;
	}
}

function drawMap()
{
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		var idx = 0;
		for(var y = 0; y<level1.layers[layerIdx].height; y++)
		{
			for(var x = 0; x<level1.layers[layerIdx].width; x++)
			{
				if(level1.layers[layerIdx].data[idx] != 0)
				{
					var tileIndex = level1.layers[layerIdx].data[idx]-1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X)*(TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y))* (TILESET_TILE + TILESET_SPACING);
					context.drawImage(Jungle_terrain, sx, sy, TILESET_TILE, TILESET_TILE,x * TILE, (y-1)* TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
	}
}

function runStateGame(deltaTime)
{

	/*context.fillStyle = "#F10B0B";
	context.fillRect(0, 0, canvas.width, canvas.height);*/

	drawMap();
	/*
	var grass = document.createElement("img");
	grass.src = "grass.png";
	context.drawImage(grass, 0, 0);*/

	


            //-------- keep down the bottom of RunStateGame ----------//
	// update the frame counter 
	fpsTime += deltaTime;
	fpsCount++;
	if(fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}		
		
	// draw the FPS
	context.fillStyle = "#f00";
	context.font="14px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
}

function runStateWin(deltaTime)
{
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function runStateLose(deltaTime)
{
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function run()
{
	//context.fillStyle = "#f00";		
	//context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();

	switch(gameState)
	{
		case STATE_SPLASH:
			runStateSplash(deltaTime);
			break;
		case STATE_GAME:
			runStateGame(deltaTime);
			break;
		case STATE_WIN:
			runStateWin(deltaTime);
			break;
		case STATE_LOSE:
			runStateLose(deltaTime);
			break;
	}
}

//initialize();

















//--------------------******************** Don't modify anything below here ********************--------------------//


// This code will set up the framework so that the 'run' function is called 60 times per second.
// We have a some options to fall back on in case the browser doesn't support our preferred method.
(function() {
  var onEachFrame;
  if (window.requestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
      _cb();
    };
  } else if (window.mozRequestAnimationFrame) {
    onEachFrame = function(cb) {
      var _cb = function() { cb(); window.mozRequestAnimationFrame(_cb); }
      _cb();
    };
  } else {
    onEachFrame = function(cb) {
      setInterval(cb, 1000 / 60);
    }
  }
  
  window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
