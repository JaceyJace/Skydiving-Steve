var GameoverState = function() 
{
	this.prototype = BaseState;
}

GameoverState.prototype.load = function() 
{
	if(lives == 0)
		{
			gameState = STATE_GAMEOVER;
			return;
		}		
}

GameoverState.prototype.unload = function() 
{
	this.GameoverTimer = 3;
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
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#FFFFFF";
	
	
	context.fillText("You didn't die", 50, 240);
	context.fillStyle = "#FF0000";
	context.font = "60px cloudy";
}