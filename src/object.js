Obj = new JS.Class({

    initialize: function(world, id) {
        this.modelId = id;
        this.position = new Position();
        //this.ambLight = new Color();
        //this.dirLight = new Color();
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
        // move it
        gl.uniformMatrix4fv(shaderProgram.uWorld, false, this.where());

        // draw it with right buffer
        var buf = MODEL.buffer[this.modelId];
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.vertexAttribPointer(shaderProgram.aPosition, buf.itemSize, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, buf.numItems);
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
