var Actor = new JS.Class(Obj, {
    moveUp: function()
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
    },

})
