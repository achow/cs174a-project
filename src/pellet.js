def ("Pellet") << Obj ({
    init: function(world, id, x, y, size) {
        this._super(world, id);
        this.size = size;
        this.position.x = x;
        this.position.y = y;
    },
});