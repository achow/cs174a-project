DIRECTION = {
    NONE: -1, // For when we start, pacman is immobile
    DOWN: 0,
    UP: 1,
    LEFT: 2,
    RIGHT: 3,
};

def ("Actor") << Obj ({

    init: function(world, id) {
        this._super(world, id);
        this._position = new Position(); // internal position
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
                if (this.world.getMapElement(this.position.x, this.position.y-1) != MAPELEMENT.WALL
                    && getMapElement(this.position.x, this.position.y-1) != MAPELEMENT_CAGEDOOR)
                    --this.position.y;
                break;

            case DIRECTION.UP:
                if (this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT.WALL
                    && this.world.getMapElement(this.position.x, this.position.y+1) != MAPELEMENT.CAGEDOOR)
                    ++this.position.y;
                break;

            case DIRECTION.LEFT:
                if (this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.WALL
                    && this.world.getMapElement(this.position.x-1, this.position.y) != MAPELEMENT.CAGEDOOR)
                    --this.position.x;
                break;

            case DIRECTION.RIGHT:
                if (this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT.WALL
                    && this.world.getMapElement(this.position.x+1, this.position.y) != MAPELEMENT.CAGEDOOR)
                    ++this.position.x;
                break;

            default:
                console.log("Bad direction: ", this.direction);
        }
    },

    where: function() {
        return mat4.translate(mat4.create(), mat4.create(), this._position.toVec3());
    },

    dt: function () {
        this._position.x += (this.position.x - this._position.x)*dt;
        this._position.y += (this.position.y - this._position.y)*dt;
        this._position.z += (this.position.z - this._position.z)*dt;
    },
    /*
     * called for each turn
     * actor should make a move here
     */
    doAction: function() {
        throw "action() called on superclass Actor";
    },
});
