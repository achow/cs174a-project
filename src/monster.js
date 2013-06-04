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
            
            // Otherwise move in a random valid direction
            var dirmove = Math.floor(Math.random() * 4);
            for (var i = 0; i < 4; i++) {
                switch (dirmove) {
                    case 0: // North
                        if (this.world.getMapElement(this.position.x, this.position.y-1) != MAPELEMENT.WALL
                            && this.getDirection() != DIRECTION.DOWN) {
                            this.setDirection(DIRECTION.DOWN);
                            this.move();
                            return;
                        }
                        break;

                    case 1: // East
                        if (this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT.WALL
                            && this.getDirection() != DIRECTION.LEFT) {
                            this.setDirection(DIRECTION.LEFT);
                            this.move();
                            return;
                        }
                        break;

                    case 2: // South
                        if (this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT.WALL
                            && this.getDirection() != DIRECTION.UP) {
                            this.setDirection(DIRECTION.UP);
                            this.move();
                            return;
                        }
                        break;
                    case 3: // West
                        if (this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.WALL
                            && this.getDirection() != DIRECTION.RIGHT) {
                            this.setDirection(DIRECTION.RIGHT);
                            this.move();
                            return;
                        }
                        break;
                }
                dirmove = (dirmove + 1) % 4;
            }
		}
    },
    
    doAction: function() {
	
		if(this.selected == false)
			this.wait = 0;
	
		if(this.wait == 0)
		{
			this.moveToward(this.world.pacman.position.x, this.world.pacman.position.y);
			if(this.selected)
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
        
        if ((Math.abs(this._position.x - this.world.pacman._position.x) <= dt)
            && (Math.abs(this._position.y - this.world.pacman._position.y) <= dt)) {
			
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
