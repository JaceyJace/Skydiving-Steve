var GamewinState = function() 
{
	this.prototype = BaseState;
}

GamewinState.prototype.load = function() 
{
	// if the end stage trigger is activated
		// load dat gamestate
}

GamewinState.prototype.unload = function() 
{
	//when GamewinTimer -= 0
		// stateManager.switchState(new SplashState());
}

GamewinState.prototype.update = function(deltaTime) 
{
}

GamewinState.prototype.draw = function() 
{
	context.fillStyle = "#FFFFFF";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillText("You won", 50, 300);
	context.fillStyle = "FF0000";
	context.font = "12px Calibri";
}