var Actor = new JS.Class(Obj, {
	initialize: function(id)
	{
		this.modelid = id;
		this.position = new position();
		this.size = 1;
	}

	MoveUp: function()
	{
		//move up, set y+1
	}

	MoveDown: function()
	{
		//move down, set y-1
	}

	MoveLeft: function()
	{
		//move left, set x-1
	}

	MoveRight: function()
	{
		//move right, set x+1
	}

})
