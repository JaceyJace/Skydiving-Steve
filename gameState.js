var enemies = [];
var coins = [];

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
}

GameState.prototype.draw = function() 
{
	drawMap();
	player.draw();
	for(var i=0; i<coins.length; i++)
	{
		coins[i].draw();
	}
	for(var i=0; i<enemies.length; i++)
	{
		enemies[i].draw();
	}
}