var GameoverState = function() 
{
	this.prototype = BaseState;
}

GameoverState.prototype.load = function() 
{
	this.GameoverTimer = 3;
}

GameoverState.prototype.unload = function() 
{
	this.GameoverTimer -= deltaTime;
	if(this.GameoverTimer <= 0)
	{
		stateManager.switchState(new GameState());
	}
}

GameoverState.prototype.update = function(deltaTime) 
{
}

GameoverState.prototype.draw = function() 
{
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillText("You didn't die", 50, 240);
	context.fillStyle = "#FF0000";
	context.font = "60px cloudy";
	
	context.fillText("Press ctrl + r to restart", 50, 300);
	context.fillStyle = "FF0000";
	context.font = "12px Calibri";
	
	//insert score stuff here
}