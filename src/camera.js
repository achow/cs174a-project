def ("Camera") ({

    init: function() {
        this.position = new Position();
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
        return mat4.lookAt(mat4.create(), this._position.toVec3(), t, [0, 1, 0]);
    },

    /*
     *  for animation
     */
    dt: function() {
        if (this.attachObject) {
            // attach
            this.position = this.attachObject.position;
        }
        this._position.x += (this.position.x - this._position.x)*dt;
        this._position.y += (this.position.y - this._position.y)*dt;
        this._position.z += (this.position.z - this._position.z)*dt;
        this._phi += (this.phi - this._phi)*dt;
        this._theta += (this.theta - this._theta)*dt;
    },
});
