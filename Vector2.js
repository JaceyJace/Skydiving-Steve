var Vector2 = function(x,y) 
{
	this.x = x;
	this.y = y;
}

Vector2.prototype.set = function (x,y)
{
	this.x = x;
	this.y = y;
}

Vector2.prototype.normalise = function(x,y)
{
	this.magnitude = math.sqrt ((this.x * this.x) + (this.y * this.y));
	
	this.normX = this.x / this.magnitude;
	this.normY = this.y / this.magnitude;
}

Vector2.prototype.add = function(x,y)
{
        this.x = this.x + x;
        this.y = this.y + y;
}      


Vector2.prototype.subtract = function(x,y)
{
        this.x = this.x - x;
        this.y = this.y - y;
}      

Vector2.prototype.multiply = function(x,y)
{
        this.x = this.x * x;
        this.y = this.y * y;
}