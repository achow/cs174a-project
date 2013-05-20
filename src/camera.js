Camera = new JS.Class({

    initialize: function() {
        this.position = new Position();
        this.theta = 0;
        this.phi = 0;
        this.attachObject = null;
    },

    /*
     * return view matrix
     */
    view: function() {
        var up = [0, 1, 0, 0];

        // we face negative z
        var at = [
            Math.sin(glMatrix.toRadian(this.theta))*Math.cos(glMatrix.toRadian(this.phi)),
            -Math.sin(glMatrix.toRadian(this.phi)),
            Math.cos(glMatrix.toRadian(this.theta))*Math.cos(glMatrix.toRadian(this.phi)),
            1 ];
        var t = vec4.subtract(vec4.create(), this.position.toVec4(), at);
        return mat4.lookAt(mat4.create(), this.position.toVec4(), t, up);
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
