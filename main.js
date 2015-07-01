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

//STATE MANAGER
var stateManager = new StateManager();
stateManager.pushState(new SplashState());

//FRAMES PER SECOND
var fps = 0;
var fpsCount = 0;
var fpsTime = 0;

var player = new Player();
var keyboard = new Keyboard();
var enemy = new Enemy();
var coins = [];
var enemies = [];
var score = 0;

//CREATING THE LEVEL
//Level Layers

var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_OBJECT_TRIGGERS = 2;
var LAYER_OBJECT_ENEMIES = 3;
var LAYER_OBJECT_COINS = 4;
var LAYER_OBJECT_PATH = 5;
var LAYER_COUNT = 3;

//Setting Terms For Layers
var TILE = 35
var MAP = {tw: 30, th: 1000};
var TILESET_TILE = TILE;
var TILESET_PADDING = 0;
var TILESET_SPACING = 0;
var TILESET_COUNT_X = 16;//27;
var TILESET_COUNT_Y = 16;//14;

var METER = TILE;
var GRAVITY = METER * 5/*9.8*/ * 5//6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 20;//2;
var FRICTION = MAXDX * 30;//6;

//var player.isDead == true

var STATE_GAME = 0;
var STATE_GAMEOVER = 1;
var STATE_GAMEWIN = 2;

//SIDESCROLLING AND COLLISION
function cellAtPixelCoord(layer, x, y)
{
	if(x<0 || x>SCREEN_WIDTH || y<0)
		return 1;
	//let the player drop of the bottom of the screen(this means death)
	if(y>SCREEN_HEIGHT)
		return 0;
	return cellAtTileCoord(layer, p2t(x), p2t(y));
};

function cellAtTileCoord(layer, tx, ty)
{
	if(layer == LAYER_OBJECT_TRIGGERS && (tx<0 || tx>=MAP.tw || ty<0))
		return 0;
	else if(tx<0 || tx>MAP.tw || ty<0)
		return 1;
	//let the player drop off the bottom of the screen (this means death)
	if(ty>=MAP.th)
		return 0;
	return cells[layer][ty][tx];
};

function tileToPixel(tile)
{
	return tile * TILE;
};
function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
};

function bound(value, min, max)
{
	if(value < min)
		return min;
	if(value > max)
		return max;
	return value;
};

//Image for JSON
var tileset = document.createElement("img");
tileset.src = "maptestgrass.png";

var worldOffsetY = 0;
function drawMap()
{
	var startY = -1;
	var maxTiles = Math.floor(SCREEN_HEIGHT / TILE) + 2;
	var tileY = pixelToTile(player.position.y);
	var offsetY = TILE + Math.floor(player.position.y%TILE);

	startY = tileY - Math.floor(maxTiles / 2);

	if(startY < -1)
	{
		startY = 0;
		offsetY = 0;
	}
	if(startY > MAP.th - maxTiles + 1)
	{
		startY = MAP.th - maxTiles + 1;
		offsetY = TILE;
	}

	worldOffsetY = startY * TILE + offsetY;

	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		var idx = 0;
		for(var y = 0; y<level2.layers[layerIdx].height; y++)
		{
			for(var x = 0; x<level2.layers[layerIdx].width; x++)
			{
				//var idx = x * startY; x < startY + maxTiles; x++;
				if(level2.layers[layerIdx].data[idx] != 0)
				{
					var tileIndex = level2.layers[layerIdx].data[idx]-1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X)*
							(TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y))* 
							(TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE,
						x * TILE, ((y-1) - startY)* TILE - offsetY, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
	}
}

var cells = [];
function initialize()
{
	for(var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		cells[layerIdx] = [];
		var idx = 0;
		for(var y = 0; y < level2.layers[layerIdx].height; y++)
		{
			cells[layerIdx][y] = [];
			for(var x = 0; x < level2.layers[layerIdx].width; x++)
			{
				if(level2.layers[layerIdx].data[idx] != 0)
				{
					cells[layerIdx][y][x] = 1;
					cells[layerIdx][y-1][x] = 1;
					cells[layerIdx][y-1][x+1] = 1;
					cells[layerIdx][y][x+1] = 1;
				}
				else if(cells[layerIdx][y][x] != 1)
				{
					cells[layerIdx][y][x] = 0;
				}
				idx++;
			}
		}
	}
}


function run()
{
	context.fillStyle = "#1498fd";		
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();

	stateManager.update(deltaTime);

	stateManager.draw();



	            //-------- keep down the bottom of run ----------//
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
	context.fillText("FPS: " + fps, 422, 12, 100);
}

initialize();

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
