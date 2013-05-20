MONSTER_STATE = {
    DEAD: 1,
    GO_HOME: 2,
    ALIVE: 3,
    STOP: 4,
};

Monster = new JS.Class(Actor, {
    initialize: function(world, id) {
        this.callSuper(world, id);
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
        /*
        // Horizontal movement
        if (this.position.x != targetX) {
            if (this.getDirection() != DIRECTION.EAST && this.position.x > targetX 
                && getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.WALL) {
                
                SetX(GetX()-1);
                setDirection(WEST);
                return;
            }
            //east
            if (GetX() < targetx && maze->GetGridContents(GetX()+1, GetY()) != WALL && getDirection() != WEST) {
                SetX(GetX()+1);
                setDirection(EAST);
                return;
            }
        }*/
        //logic to move toward pacman
    },

    goHome: function()
    {
        //logic to make monster go home after death
    },

});
