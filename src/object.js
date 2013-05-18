Obj = new JS.Class({

    initialize: function(id) {
        this.modelId = id;
        this.position = new Position();
        this.size = 1;
    },
    /*
     * drawing function
     */
    draw: function() {
        // stub
    },
    /*
     * return scale matrix
     *
     */
    scale: function() {
        var I = mat4.create();
        return mat4.scale(mat4.create(), I, [this.size, this.size, this.size]);
    },

    /*
     * return world matrix
     */
    where: function() {
        var I = mat4.create();
        return mat4.translate(mat4.create(), I, [this.position.x, this.position.y, this.position.z]);
    },

    /*
     *  for animation
     */
    dt: function() {

    }
});
