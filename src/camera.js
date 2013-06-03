def ("Camera") ({

    init: function() {
        this.position = new Position();
		this.setPosition(10, 7, 0);
        this._position = new Position(); // internal position
        this._theta = 0;
        this._phi = 0;
        this.theta = 0; // Horizontal
        this.phi = 0; // up/down
        this.attachObject = null;
    },

    setPosition: function(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    },

    move: function(x, y, z) {
        this.position.x += x;
        this.position.y += y;
        this.position.z += z;
    },

    /*
     * return view matrix
     */
    view: function() {
        // we face negative z
        var at = [
            Math.sin(glMatrix.toRadian(this._theta))*Math.cos(glMatrix.toRadian(this._phi)),
            -Math.sin(glMatrix.toRadian(this._phi)),
            Math.cos(glMatrix.toRadian(this._theta))*Math.cos(glMatrix.toRadian(this._phi)),
        ];
        var t = vec3.subtract(vec3.create(), this._position.toVec3(), at);
        temp = mat4.create();
        //return mat4.ortho(temp, -20.0, 20.0, -20.0, 20.0, 0, 100);
        return mat4.lookAt(mat4.create(), this._position.toVec3(), t, [0, 1, 0]);
    },

    /*
     *  for animation
     */
    dt: function() {
        if (this.attachObject) {
            // attach
            this.position = this.attachObject.position;
			// adapt to direction
			/*
			if(this.attachObject.direction == 0)	//DOWN
				
			    NONE: -1, // For when we start, pacman is immobile
                DOWN: 0,
                UP: 1,
                LEFT: 2,
                RIGHT: 3,*/
            switch (this.attachObject.direction)
            {   
                case DIRECTION.NONE:
                this._position.y -= 0.1;

                case DIRECTION.UP:
                this._position.y -= 0.1;

                case DIRECTION.DOWN:
                this._position.y -= 0.1;

                case DIRECTION.LEFT:
                this._position.x -= 0.1;

                case DIRECTION.RIGHT:
                this._position.x += 0.1;

            }
            
        }
        this._position.x += (this.position.x - this._position.x)*dt;
        this._position.y += (this.position.y - this._position.y)*dt;
        this._position.z += (this.position.z - this._position.z)*dt;
        this._phi += (this.phi - this._phi)*dt;
        this._theta += (this.theta - this._theta)*dt;
    },
});
