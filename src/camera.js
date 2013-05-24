def ("Camera") ({

    init: function() {
        this.position = new Position();
        this.theta = 0; // Horizontal 
        this.phi = 0;
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
            Math.sin(glMatrix.toRadian(this.theta))*Math.cos(glMatrix.toRadian(this.phi)),
            -Math.sin(glMatrix.toRadian(this.phi)),
            Math.cos(glMatrix.toRadian(this.theta))*Math.cos(glMatrix.toRadian(this.phi)),
        ];
        var t = vec3.subtract(vec3.create(), this.position.toVec3(), at);
        return mat4.lookAt(mat4.create(), this.position.toVec3(), t, [0, 1, 0]);
    },

    /*
     *  for animation
     */
    dt: function() {
        if (this.attachObject) {
            // attach
            this.position = this.attachObject.position;
        }
    },
});
