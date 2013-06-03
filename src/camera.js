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
        
        this.changingView = false;
        this.attachOffsetZ = 2;
        this.attachDistance = 1;
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
        if (!this.attachObject) {
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
        }
        else {
            var at = this.attachObject._position.toVec3();
                
            this.position.x = 0;
            this.position.y = 0;
            this.position.z = this.attachOffsetZ;
            
            if (this.attachObject.direction == DIRECTION.RIGHT) {
                this.position.x = -this.attachDistance;
            }
            else if (this.attachObject.direction == DIRECTION.LEFT) {
                this.position.x = this.attachDistance;
            }
            else if (this.attachObject.direction == DIRECTION.UP) {
                this.position.y = -this.attachDistance;
            }
            else if (this.attachObject.direction == DIRECTION.DOWN) {
                this.position.y = this.attachDistance;
            }
            
            this.position.x += this.attachObject._position.x;
            this.position.y += this.attachObject._position.y;
            this.position.z += this.attachObject._position.z;
            //console.log(this.attachObject._position, this._position);

            return mat4.lookAt(mat4.create(), this._position.toVec3(), at, [0, 0, 1]);
        }
    },

    /*
     *  for animation
     */
    dt: function() {
        this._position.x += (this.position.x - this._position.x)*dt;
        this._position.y += (this.position.y - this._position.y)*dt;
        this._position.z += (this.position.z - this._position.z)*dt;
        this._phi += (this.phi - this._phi)*dt;
        this._theta += (this.theta - this._theta)*dt;
    },
});
