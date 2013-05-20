DIRECTION = {
    NONE: -1, // For when we start, pacman is immobile
    DOWN: 0,
    UP: 1,
    LEFT: 2,
    RIGHT: 3,
};

var Actor = new JS.Class(Obj, {

    initialize: function(world, id) {
        this.callSuper(world, id);
        this.direction = DIRECTION.NONE;
    },

    setDirection: function(dir) {
        this.direction = dir;
    },
    
    getDirection: function(dir) {
        return this.direction;
    },
    
    move: function() {
        switch (this.direction) {
            case DIRECTION.NONE:
                break;
                
            case DIRECTION.DOWN: 
                if (this.world.getMapElement(this.position.x, this.position.y-1) != MAPELEMENT_WALL
                    && getMapElement(this.position.x, this.position.y-1) != MAPELEMENT_CAGEDOOR)
                    --this.position.y;
                break;
                
            case DIRECTION.UP: 
                if (this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT_WALL
                    && this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT_CAGEDOOR)
                    ++this.position.y;
                break;
                
            case DIRECTION.LEFT: 
                if (this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT_WALL
                    && this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT_CAGEDOOR)
                    --this.position.x;
                break;
                
            case DIRECTION.RIGHT:
                if (this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT_WALL
                    && this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT_CAGEDOOR)
                    ++this.position.x;
                break;
                
            default:
                console.log("Bad direction: ", this.direction);
        }
    },

    /*
     * called for each turn
     * actor should make a move here
     */
    action: function() {
        throw "action() called on superclass Actor";
    },
});
