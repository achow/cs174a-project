def ("Monster2") << Monster ({

    moveToward: function(targetX, targetY) {
                
            /*if ((this.position.x - targetX) > 0)
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
            }*/

            if (this._position.x != targetX) {
            // West
            if (this.getDirection() != DIRECTION.RIGHT && this.position.x > targetX
                && this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.WALL) {
                this.setDirection(DIRECTION.LEFT);
                this.move();
                return;
            }
            // East
            if (this.getDirection() != DIRECTION.LEFT && this.position.x < targetX
                && this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT.WALL) {
                this.setDirection(DIRECTION.RIGHT);
                this.move();
                return;
            }
        }

        // Vertical movement
        else if (this._position.y != targetY) {
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

});
