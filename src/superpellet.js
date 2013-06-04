def ("SuperPellet") << Obj ({
    init: function(world, id, x, y, size) {
        this._super(world, id);
        this.size = size;
        this.position.x = x;
        this.position.y = y;
        this.color.setColor(1, 0.5, 0);
    },

    dt: function() {
        if ((Math.abs(this.position.x - this.world.pacman._position.x) <= dt)
            && (Math.abs(this.position.y - this.world.pacman._position.y) <= dt)) {

            this.world.points += POINTS.SUPERPELLET;

            var i = this.world.animateList.indexOf(this);
            if (i != -1)
                this.world.animateList.splice(i, 1);

            i = this.world.renderList.indexOf(this);
            if (i != -1)
                this.world.renderList.splice(i, 1);

			if(this.world.pacman.isEater())
			{
				this.world.eaterModeTime = 0;
			}
            this.world.pacman.setEater(true);
			
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
