def ("Pellet") << Obj ({
    init: function(world, id, x, y, size) {
        this._super(world, id);
        this.size = size;
        this.position.x = x;
        this.position.y = y;
        this.color.setColor(0, 1, 0);
    },
    
    dt: function() {
    },
    
    doAction: function() {
        if (this.position.x == Math.floor(this.world.pacman._position.x)
            && this.position.y == Math.floor(this.world.pacman._position.y)) {
            var i = this.world.animateList.indexOf(this);
            if (i != -1)
                this.world.animateList.splice(i, 1);
                
            i = this.world.renderList.indexOf(this);
            if (i != -1)
                this.world.renderList.splice(i, 1);
        }
    },
});