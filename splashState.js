var SplashState = function() 
{
	this.prototype = BaseState;
}

SplashState.prototype.load = function() 
{	
	this.splashTimer = 3;
}

SplashState.prototype.unload = function() 
{
}

SplashState.prototype.update = function(deltaTime) 
{

	this.splashTimer -= deltaTime;
	if(this.splashTimer <= 0)
	{
		stateManager.switchState(new GameState());
	}
}

SplashState.prototype.draw = function() 
{
	context.fillStyle = "#F10B0B";
	context.fillRect(0, 0, canvas.width, canvas.height);
}