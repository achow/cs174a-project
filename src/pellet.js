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
                
            this.world.pelletCount--;
            
            if (this.world.pelletCount == 0) {
			
				this.world.gamewin = true;
			
                window.clearInterval(GL.canvas[0].renderInterval);
                window.clearInterval(GL.canvas[0].actionInterval);
                window.clearInterval(GL.canvas[1].renderInterval);
                window.clearInterval(GL.canvas[1].actionInterval);
                
                //console.log("GG");
                // TODO: Game win text
            }
        }
    },
    
    doAction: function() {
    },
});