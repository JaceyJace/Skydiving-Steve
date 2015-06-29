var enemies = [];
var coins = [];
var lives = 3;

var GameState = function() 
{
	this.prototype = BaseState;
}

GameState.prototype.load = function() 
{
	//add ENEMY
	idx = 0;
	for(var y = 0; y < level2.layers[LAYER_OBJECT_ENEMIES].height; y++)
	{
		for(var x = 0; x < level2.layers[LAYER_OBJECT_ENEMIES].width; x++)
		{
			if(level2.layers[LAYER_OBJECT_ENEMIES].data[idx] != 0)
			{
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var c = new Enemy(px, py);
				enemies.push(c);
			}
			idx++;
		}
	}
	//add coins
	idx = 0;
	for(var y = 0; y < level2.layers[LAYER_OBJECT_COINS].height; y++)
	{
		for(var x = 0; x < level2.layers[LAYER_OBJECT_COINS].width; x++)
		{
			if(level2.layers[LAYER_OBJECT_COINS].data[idx] != 0)
			{
				var px = tileToPixel(x);
				var py = tileToPixel(y);
				var c = new Coin(px, py);
				coins.push(c);
			}
			idx++;
		}
	}

	//HUD var
	var score = 0;
	var lives = 3;
}

GameState.prototype.unload = function() 
{
}

GameState.prototype.update = function(deltaTime) 
{
	player.update(deltaTime);
	for(var i=0; i<coins.length; i++)
	{
		coins[i].update(deltaTime);
	}
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].update(deltaTime);
	}

	//tests if 2 rectangles are intersecting.
		//Pass in the x,y coordinates, width and height of each rectangle.
		//Returns 'true' if the rectangles are intersecting
	function intersects(x1, y1, w1, h1, x2, y2, w2, h2)
	{
		if(y2 + h2 < y1 ||
			x2 + w2 < x1 ||
			x2 > x1 + w1 ||
			y2 > y1 + h1)
			{
				return false;
			}
			return true;
	}

	//COIN collision
	for(var c=0; c<coins.length; c++)
		{
			if(intersects( player.position.x, player.position.y, player.width/2, player.height/2,
			 coins[c].position.x, coins[c].position.y, TILE, TILE) == true)
			{
				coins.splice(c, 1);
				// increment the player score
				score += 10;
				break;	
			}	
		}

	//CLOUD collision
	for(var e=0; e<enemies.length; e++)
	{
		if(intersects(player.position.x, player.position.y, player.width/2, player.height/2,
		 enemies[e].position.x, enemies[e].position.y,TILE,TILE) == true)
		{
			enemies.splice(e, 1);
			hit = true;
			// decrement the player score
			score -= 5;
			lives -= 1;
			break;	
		}	
	}
}

GameState.prototype.draw = function(stevehead) 
{
	drawMap();
	player.draw();
	var stevehead = document.createElement("img");
	stevehead.src = "stevehead.png";
	for(var i=0; i<coins.length; i++)
	{
		coins[i].draw();
	}

	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].draw();
	}

	for(var i=0; i<lives; i++)
	{
	 	context.drawImage(stevehead, 5 + ((stevehead.width+2)*i), 27);
	} 
}