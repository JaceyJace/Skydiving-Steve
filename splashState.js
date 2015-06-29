var SplashState = function() 
{
	this.prototype = BaseState;
}

SplashState.prototype.load = function() 
{	
	this.splashTimer = 10;
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
	var splashscreen = document.createElement("img");
	splashscreen.src = "splashscreen.png";

	var splashscreen2 = document.createElement("img");
	splashscreen2.src = "splashscreen2.png";

	if(this.splashTimer <=10 && >=6)
	{
		context.drawImage(splashscreen, 0, 0);
	}
	if(this.splashTimer <=5)
	{
		context.drawImage(splashscreen2, 0, 0)
	}
}