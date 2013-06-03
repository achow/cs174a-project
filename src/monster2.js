MONSTER_STATE = {
    DEAD: 1,
    GO_HOME: 2,
    ALIVE: 3,
    STOP: 4,
};

def ("Monster2") << Actor ({

    init: function(world, id) {
        this._super(world, id);
        this.m_state = MONSTER_STATE.ALIVE;
        this.color.setColor(1, 1, 1);
        this.initial_position = new Position();
        this.initial_position = this.position;
        this.setDirection(DIRECTION.LEFT);
        this.dirmove 
    },

    getState: function() {
        return this.m_state;
    },

    setState: function(state) {
        this.m_state = state;

        // Change color depending on state
    },

    moveToward: function(targetX, targetY) {
                
            if ((this.position.x - targetX) > 0)
            {
                this.setDirection(DIRECTION.LEFT);
            }
            else if ((this.position.x - targetX) < 0)
            {
                this.setDirection(DIRECTION.RIGHT);
            }
            else if ((this.position.y - targetY) > 0)
            {
                this.setDirection(DIRECTION.DOWN);
            }
            else if ((this.position.y - targetY) < 0)
            {
                this.setDirection(DIRECTION.UP);
            }

            // Otherwise move in a random valid direction
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
		
    },
    
    doAction: function() {
        this.moveToward(this.world.pacman.position.x, this.world.pacman.position.y);

        
        if ((Math.abs(this._position.x - this.world.pacman._position.x) <= dt)
            && (Math.abs(this._position.y - this.world.pacman._position.y) <= dt)) {
            window.clearInterval(GL.canvas[0].renderInterval);
            window.clearInterval(GL.canvas[0].actionInterval);
            window.clearInterval(GL.canvas[1].renderInterval);
            window.clearInterval(GL.canvas[1].actionInterval);
            
            this._position.x = this.world.pacman._position.x;
            this._position.y = this.world.pacman._position.y;
            
            GL.canvas[0].draw();
            GL.canvas[1].draw();

        }
    },

    goHome: function()
    {
        this.position = this.initial_position;
        //logic to make monster go home after death
    },

});
