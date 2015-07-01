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
	var winState = document.createElement("img");
	winState.src = "winState.png";
	context.drawImage(winState, 0, 0);

	context.fillStyle = "red";
	context.font = "50px Calibri";
	var reset = "To Reply press CTRL + R";
	context.fillText(reset, 260, 825);

	context.fillStyle = "yellow";
	context.font = "50px Calibri";
	var scoreText = "Score: " + score;
	context.fillText(scoreText, 450, 350);
}