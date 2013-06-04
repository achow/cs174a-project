MONSTER_STATE = {
    DEAD: 1,
    GO_HOME: 2,
    ALIVE: 3,
    STOP: 4,
	EATABLE: 5,
};

def ("Monster") << Actor ({

    init: function(world, id, color) {
        this._super(world, id);
        this.m_state = MONSTER_STATE.ALIVE;
        this.color.setColor(color[0], color[1], color[2]);
        this.initial_position = new Position();
        this.initial_position = this.position;
		
		this.selected = false;
        this.checkforstart = false;
		this.wait = 0;
    },
	
    getState: function() {
        return this.m_state;
    },

    setState: function(state) {
        this.m_state = state;

        // Change color depending on state
    },

    moveToward: function(targetX, targetY) {
        // Check if movement is achievable without changing direction

        // Horizontal movement
        if (this.position.x == targetX) {
            // West
            if (this.getDirection() != DIRECTION.LEFT && this.position.x > targetX
                && this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.WALL) {
                this.setDirection(DIRECTION.LEFT);
                this.move();
                return;
            }
            // East
            if (this.getDirection() != DIRECTION.RIGHT && this.position.x < targetX
                && this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT.WALL) {
                this.setDirection(DIRECTION.RIGHT);
                this.move();
                return;
            }
        }

        // Vertical movement
        else if (this.position.y == targetY) {
            // North
            if (this.getDirection() != DIRECTION.DOWN && this.position.y > targetY
                && this.world.getMapElement(this.position.x, this.position.y-1) != MAPELEMENT.WALL) {
                this.setDirection(DIRECTION.DOWN);
                this.move();
                return;
            }
            // South
            if (this.getDirection() != DIRECTION.UP && this.position.y < targetY
                && this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT.WALL) {
                this.setDirection(DIRECTION.UP);
                this.move();
                return;
            }
        }

		else {
            
            if (this.checkforstart == false)
            {
                if (this.world.pacman.direction != DIRECTION.NONE)
                {
                    this.checkforstart = true;
                    this.direction = this.world.pacman.direction;
                }

            }

            switch (this.getDirection()) {
                    case DIRECTION.DOWN: // Down
                        if (this.world.getMapElement(this.position.x, this.position.y-1) == MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT.WALL)
                             {
                            this.dirmove= Math.floor(Math.random() * 4);
                            this.setDirection(this.dirmove);
                            this.move();
                            return;
                        }
                        else
                            {this.move();}
                        break;

                    case DIRECTION.UP: // Up
                        if (this.world.getMapElement(this.position.x, this.position.y+1) == MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT.WALL    
                            )
                         {
                            this.dirmove= Math.floor(Math.random() * 4);
                            this.setDirection(this.dirmove);
                            this.move();
                            return;
                        }
                        else
                            {this.move();}
                            
                        break;

                    case DIRECTION.LEFT: // Left
                        if (this.world.getMapElement(this.position.x-1, this.position.y) == MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x, this.position.y-1) != MAPELEMENT.WALL)
                            {
                            this.dirmove= Math.floor(Math.random() * 4);
                            this.setDirection(this.dirmove);
                            this.move();
                            return;
                        }
                        else
                        {
                            this.move();
                        }
                        break;
                    case DIRECTION.RIGHT: // Right
                        if (this.world.getMapElement(this.position.x+1, this.position.y) == MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT.WALL
                            || this.world.getMapElement(this.position.x, this.position.y-1) != MAPELEMENT.WALL
                            )
                            {
                            this.dirmove= Math.floor(Math.random() * 4);
                            this.setDirection(this.dirmove);
                            this.move();
                            return;
                        }
                        else
                        {
                            this.move();
                        }
                        break;
                }
		}
    },
    
    doAction: function() {
	
		if(this.selected == false)
		{
			this.wait = 0;
			this.moveToward(this.world.pacman.position.x, this.world.pacman.position.y);
		}
		else if(this.selected == true && this.wait == 0)
		{
			this.moveToward(this.world.pacman.position.x, this.world.pacman.position.y);
			this.wait++;		
		}
		else
		{
			this.wait++;
			if(this.wait > 10)
				this.wait = 0;
		}

		if(this.world.pacman.isEater())
		{
			this.setState(MONSTER_STATE.EATABLE);
		}
		else
		{
			this.setState(MONSTER_STATE.ALIVE);			
		}
        
        if (this._position.diff(this.world.pacman._position) <= (this.size + this.world.pacman.size)) {
			
			if(this.world.pacman.isEater())
			{
				this.setState(MONSTER_STATE.ALIVE);
				this._position.x = this.world.monsterStartX;
				this.position.x = this.world.monsterStartX;
				this._position.y = this.world.monsterStartY;
				this.position.y = this.world.monsterStartY;
				
				this.world.points += POINTS.MONSTER;
				
				this.selected = false;
				this.wait = 0;
				
				this.world.nextMouseX = null;
				this.world.nextMouseY = null;
				//console.log(this.world.points);
				//console.log(this.position.x, this.position.y);
				
				GL.canvas[0].draw();
				GL.canvas[1].draw();
				
				/*
				var i = this.world.animateList.indexOf(this);
            if (i != -1)
                this.world.animateList.splice(i, 1);
                
            i = this.world.renderList.indexOf(this);
            if (i != -1)
                this.world.renderList.splice(i, 1);*/
			}
			else
			{
				this.world.pacman.m_lives--;
				if(this.world.pacman.m_lives == 0)
				{
					this.world.pacman.m_dead = true;
					
					window.clearInterval(GL.canvas[0].renderInterval);
					window.clearInterval(GL.canvas[0].actionInterval);
					window.clearInterval(GL.canvas[1].renderInterval);
					window.clearInterval(GL.canvas[1].actionInterval);
					
					this._position.x = this.world.pacman._position.x;
					this._position.y = this.world.pacman._position.y;
                    
                    this.world.pacman.direction = DIRECTION.NONE;
				}
				else
				{
					this._position.x = this.world.monsterStartX;
					this.position.x = this.world.monsterStartX;
					this._position.y = this.world.monsterStartY;
					this.position.y = this.world.monsterStartY;
				
					var self = this;
				     _.each(this.world.animateList, function(obj) {
					 
						if(obj.modelId == MODEL.MONSTER)
						{
							obj._position.x = self.world.monsterStartX;
							obj.position.x = self.world.monsterStartX;
							obj._position.y = self.world.monsterStartY;
							obj.position.y = self.world.monsterStartY;							
						}
					 
					});
				
					
					this.world.pacman._position.x = this.world.pacmanStartX;
					this.world.pacman._position.y = this.world.pacmanStartY;
					this.world.pacman.position.x = this.world.pacmanStartX;
					this.world.pacman.position.y = this.world.pacmanStartY;
					
					GL.canvas[0].draw();
					GL.canvas[1].draw();
				}
			}

        }
    },

    goHome: function()
    {
        this.position = this.initial_position;
        //logic to make monster go home after death
    },

});
