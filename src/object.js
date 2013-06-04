def ("Obj") ({

    init: function(world, id) {
        this.modelId = id;
        this.position = new Position();
        this.size = 1;
        this.world = world;
        this.color = new Color();
    },

    setPosition: function(newX, newY) {
        this.position.x = newX;
        this.position.y = newY;
    },

	isEqual: function(color1, color2)
	{
		// 0 --> 1
		var c1 = color1;
		// 0 --> 255
		var c2;
		
		if(color2 >= 0 && color2 <= 65)
		{
			c2 = 0;
		}
		else if(color2 >= 65 && color2 <= 100)
		{
			c2 = 0.5;
		}
		else
		{
			c2 = 1;		
		}
		
		if(c1 == c2) return true;
		else return false;
	},
	
    /*
     * drawing function
     */
    draw: function(canvas) {
        var gl = canvas.gl;
        var shaderProgram = canvas.shaderProgram;

        // move it
        gl.uniformMatrix4fv(shaderProgram.uWorld, false, mat4.mul(mat4.create(), this.where(), this.scale()));

        // draw it with right buffer
        var buf = canvas.buffer[this.modelId];

        // use vertices
        gl.bindBuffer(gl.ARRAY_BUFFER, buf.vertices);
        gl.vertexAttribPointer(shaderProgram.aPosition, buf.vertices.itemSize, gl.FLOAT, false, 0, 0);

        // use normals
        gl.bindBuffer(gl.ARRAY_BUFFER, buf.normals);
        gl.vertexAttribPointer(shaderProgram.aNormal, buf.normals.itemSize, gl.FLOAT, false, 0, 0);

		if(this.modelId == MODEL.MONSTER && this.world.pacman.isEater())
		{
			this.selected = false;
			this.wait = 0;
			gl.uniform3fv(shaderProgram.uColor, [0.5, 0.5, 1.0]);
			gl.uniform1i(shaderProgram.uIsPicked, 0);
		}
		
        gl.drawArrays(gl.TRIANGLES, 0, buf.vertices.numItems);
    },

    /*
     * return scale matrix
     *
     */
    scale: function() {
        return mat4.scale(mat4.create(), mat4.create(), [this.size, this.size, this.size]);
    },
	
	
	dt: function() {
		alert("object dt called!");
	},
	
	doAction: function() {
		alert("object doAction called!");	
	},
	
	setDirection: function(dir){
		alert("object setPosition called!");	
	},

    /*
     * return world matrix
     */
    where: function() {
        return mat4.translate(mat4.create(), mat4.create(), this.position.toVec3());
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
