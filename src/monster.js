MONSTER_STATE = {
    DEAD: 1,
    GO_HOME: 2,
    ALIVE: 3,
    STOP: 4,
};

def ("Monster") << Actor ({

    init: function(world, id) {
        this._super(world, id);
        this.m_state = MONSTER_STATE.ALIVE;
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
        if (this.position.x != targetX) {
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
        else if (this.position.y != targetY) {
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
        this.moveToward(this.world.pacman.position.x, this.world.pacman.position.y);
    },

    goHome: function()
    {
        //logic to make monster go home after death
    },

});
