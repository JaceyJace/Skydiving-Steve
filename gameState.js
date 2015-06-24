var GameState = function() 
{
	this.prototype = BaseState;
}

GameState.prototype.load = function() 
{
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
}

GameState.prototype.draw = function() 
{
	drawMap();
	player.draw();
	for(var i=0; i<coins.length; i++)
	{
		coins[i].draw();
	}
}