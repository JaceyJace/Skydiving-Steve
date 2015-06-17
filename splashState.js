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
	var splashScreen = document.createElement("img");
	splashScreen.src = "splashScreen.png"
	
}