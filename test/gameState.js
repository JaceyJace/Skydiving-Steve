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
}

GameState.prototype.draw = function() 
{
	drawMap();
	player.draw();
}