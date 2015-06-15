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

//PLAYER
var player = new Player();

var keyboard = new Keyboard();


//CREATING THE LEVEL
//Level Layers
var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;
var LAYER_BACKGROUND2 = 2;
//var LAYER_OBJECT_ENEMY = 2;
var LAYER_COUNT = 1;
//var LAYER_OBJECT_TRIGGER = 3;

//Setting Terms For Layers
var TILE = 35
var MAP = {tw: 12, th: 100};
var TILESET_TILE = TILE * 2;
var TILESET_PADDING = 2;
var TILESET_SPACING = 2;
var TILESET_COUNT_X = 14;//27;
var TILESET_COUNT_Y = 14;//14;

var METER = TILE;
var GRAVITY = METER * 9.8 * 6;
var MAXDX = METER * 10;
var MAXDY = METER * 15;
var ACCEL = MAXDX * 2;
var FRICTION = MAXDX * 6;

//sidescrolling
function tileToPixel(tile)
{
	return tile * TILE;
}
function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);
}

function bound(value, min, max)
{
	if(value < min)
		return min;
	if(value > max)
		return max;
	return value;
}

//Image for JSON
var tileset = document.createElement("img");
tileset.src = "tileset.png";

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
		//var idx = 0;
		for(var y = 0; y<level2.layers[layerIdx].height; y++)
		{
			for(var x = 0; x<level2.layers[layerIdx].width; x++)
			{
				var idx = x * startY; x < startY + maxTiles; x++;
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

/*var worldOffsetX = 0;
function drawMap()
{
	var startX = -1;
	var maxTiles = Math.floor(SCREEN_WIDTH / TILE) + 2;
	var tileX = pixelToTile(player.position.x);
	var offsetX = TILE + Math.floor(player.position.x % TILE);
	

	startX = tileX - Math.floor(maxTiles / 2);

	if(startX < -1)
	{
		startX = 0;
		offsetX = 0;
		
	}
	if(startX > MAP.tw - maxTiles)
	{
		startX = MAP.tw - maxTiles + 1;
		offsetX = TILE;
	}
		
	worldOffsetX = startX * TILE + offsetX;

	for(var layerIdx=0; layerIdx<LAYER_COUNT; layerIdx++)
	{
		var idx = 0;
		for(var y=0; y < level2.layers[layerIdx].height; y++)
		{
			var idx = y * level2.layers[layerIdx].width + startX;
			for(var x = startX; x < startX + maxTiles; x++)
			{
				if(level2.layers[layerIdx].data[idx] !=0)
				{
					//the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile),
					//so subtract one from the tileset to get the correct tile
					var tileIndex = level2.layers[layerIdx].data[idx]-1;
					var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X)*(TILESET_TILE + TILESET_SPACING);
					var sy = TILESET_PADDING + (Math.floor(tileIndex / TILESET_COUNT_Y))* (TILESET_TILE + TILESET_SPACING);
					context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, (x-startX)*TILE - offsetX, (y-1)*TILE, TILESET_TILE, TILESET_TILE);
				}
				idx++;
			}
		}
	}
}*/

/*var cells = [];
function intialize()
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
}*/


function run()
{
	context.fillStyle = "#ccc";		
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
	context.fillText("FPS: " + fps, 5, 20, 100);


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
