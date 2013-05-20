DIRECTION = {
    NONE: 0, // For when we start, pacman is immobile
    DOWN: 1,
    UP: 2,
    LEFT: 3,
    RIGHT: 4,
};

var Actor = new JS.Class(Obj, {

    initialize: function(id, startX, startY) {
        this.callSuper(id);
        this.direction = DIRECTION.NONE;
        this.position.x = startX;
        this.position.y = startY;
    },

    setDirection: function(dir) {
        this.direction = dir;
    },
    
    move: function() {
        switch (this.direction) {
            case DIRECTION.NONE:
                break;
                
            case DIRECTION.DOWN: 
                if (MapData[this.position.y-1][this.position.x] != '#'
                    && MapData[this.position.y-1][this.position.x] != '%')
                    --this.position.y;
                break;
                
            case DIRECTION.UP: 
                if (MapData[this.position.y+1][this.position.x] != '#'
                    && MapData[this.position.y+1][this.position.x] != '%')
                    ++this.position.y;
                break;
                
            case DIRECTION.LEFT: 
                if (MapData[this.position.y][this.position.x-1] != '#'
                    && MapData[this.position.y][this.position.x-1] != '%')
                    --this.position.x;
                break;
                
            case DIRECTION.RIGHT:
                if (MapData[this.position.y][this.position.x+1] != '#'
                    && MapData[this.position.y][this.position.x+1] != '%')
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

    /*moveUp: function()
    {
        this.position.y ++;
        //move up, set y+1
    },

    moveDown: function()
    {
        this.position.y --;
        //move down, set y-1
    },

    moveLeft: function()
    {
        this.position.x --;
        //move left, set x-1
    },

    moveRight: function()
    {
        this.position.x ++;
        //move right, set x+1
    },*/

})
