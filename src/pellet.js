def ("Pellet") << Obj ({
    init: function(world, id, x, y, size) {
        this._super(world, id);
        this.size = size;
        this.position.x = x;
        this.position.y = y;
        this.color.setColor(0, 1, 0);
    },
    
    dt: function() {
        if (this.position.diff(this.world.pacman._position) <= (this.size + this.world.pacman.size)) {
			
			this.world.points += POINTS.PELLET;
			
            var i = this.world.animateList.indexOf(this);
            if (i != -1)
                this.world.animateList.splice(i, 1);
                
            i = this.world.renderList.indexOf(this);
            if (i != -1)
                this.world.renderList.splice(i, 1);
                
            this.pelletCount--;
            
            if (this.pelletCount == 0) {
                console.log("GG");
                // TODO: Game win text
            }
        }
    },
    
    doAction: function() {
    },
});