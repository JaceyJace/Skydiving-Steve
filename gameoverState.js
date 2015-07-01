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
	var gameoverscreen = document.createElement("img");
	gameoverscreen.src = "gameoverscreen.png";
	context.drawImage(gameoverscreen, 0, 0);
	
	context.fillStyle = "yellow";
	context.font = "50px Calibri";
	var scoreText = "Score: " + score;
	context.fillText(scoreText, 450, 825);
}