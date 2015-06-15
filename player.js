var LEFT = 0;
var RIGHT = 1;

var ANIM_IDLE = 0;
var ANIM_TURN_LEFT = 1;
var ANIM_TURN_RIGHT = 2;
var ANIM_MAX = 3;

var Player = function() 
	{
		this.sprite = new Sprite("steve.png");					

		this.sprite.buildAnimation(3, 3, 200, 141, 0.05,		//idle
			[0, 1, 2, 3, 4, 5]);

		this.sprite.buildAnimation(3, 3, 200, 141, 0.05,		//fall left
			[6]);

		this.sprite.buildAnimation(3, 3, 200, 141, 0.05,		//fall right
			[7]);

		this.sprite.buildAnimation(3, 3, 200, 141, 0.05,		//fall right
			[8]);

		this.position = new Vector2 ();
		this.position.set(0, 10);
		this.width = 200;
		this.height = 141;
		this.velocity = new Vector2 ();
		this.isDead = false;
		this.direction = LEFT;
		this.cooldownTimer = 0;		

/*
		//CHUCK
		this.sprite = new Sprite("ChuckNorris.png");					

		this.sprite.buildAnimation(12, 8, 165, 126, 0.05,		//idle left
			[0, 1, 2, 3, 4, 5, 6, 7]);

		for(var i=0; i<ANIM_MAX; i++)
		{
			this.sprite.setAnimationOffset(i, -55, -87)
		}

		this.position = new Vector2 ();
		this.position.Set(5*35, 10*35);
		this.width = 159;
		this.height = 163;
		this.velocity = new Vector2 ();
		this.isDead = false;
		this.direction = LEFT;
		this.cooldownTimer = 0;*/
	};

		//PLAYER MOVEMENT
	Player.prototype.update = function(deltaTime)
	{
		this.sprite.update(deltaTime);

		var left = false;
		var right = false;
 		var wasleft = this.velocity.x < 0;
		var wasright = this.velocity.x > 0;
		var falling = this.falling;
		var ddx = 0; // acceleration
		var ddy = GRAVITY;

		// CHECK KEYPRESS
		if(keyboard.isKeyDown(keyboard.KEY_LEFT) == true) 
		{
		 	left = true;
		 	this.direction = LEFT;
		 	if(this.sprite.currentAnimation != ANIM_TURN_LEFT)
		 		this.sprite.setAnimation(ANIM_TURN_LEFT);
		}

		else if(keyboard.isKeyDown(keyboard.KEY_RIGHT) == true) 
		{
		 	right = true;
		 	this.direction = RIGHT;
		 	if(this.sprite.currentAnimation != ANIM_TURN_RIGHT)
		 		this.sprite.setAnimation(ANIM_TURN_RIGHT);
		}

		// STOP SHAKING
	if (left)
		 	ddx = ddx - ACCEL; // player wants to go left
		else if (wasleft)
		 	ddx = ddx + FRICTION; // player was going left, but not any more
		if (right)
		 	ddx = ddx + ACCEL; // player wants to go right
		else if (wasright)
		 	ddx = ddx - FRICTION; // player was going right, but not any more
		
		// calculate the new position and velocity:
		this.position.y = Math.floor(this.position.y + (deltaTime * this.velocity.y));
		this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (deltaTime * ddx), -MAXDX, MAXDX);
		this.velocity.y = bound(this.velocity.y + (deltaTime * ddy), -MAXDY, MAXDY);

		if ((wasleft && (this.velocity.x > 0)) ||
			(wasright && (this.velocity.x < 0)))
		{
			// clamp at zero to prevent friction from making us jiggle side to side
			this.velocity.x = 0;
		}
	}

		//DRAW PLAYER
Player.prototype.draw = function()
	{
		this.sprite.draw(context, this.position.x - worldOffsetY, this.position.y);
		context.save();
		context.translate(this.x, this.y);
		context.restore();
	}