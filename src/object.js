Obj = new JS.Class({

    initialize: function(world, id) {
        this.modelId = id;
        this.position = new Position();
        this.size = 1;
        this.world = world;
    },

    setPosition: function(newX, newY) {
        this.position.x = newX;
        this.position.y = newY;
    },

    /*
     * drawing function
     */
    draw: function() {

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
        return mat4.translate(mat4.create(), I, this.position.toVec3());
    },

    /*
     *  for animation
     */
    dt: function() {

    },

    /*
     * advanced topic: collision detection
     * return true if this object hits another object
     * sphere mode
     */
    bump: function(otherObj) {
        var dist = this.position.diff(otherObj.position);
        return dist < (this.size + otherObj.size)/2;
    },
});
