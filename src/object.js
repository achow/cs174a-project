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
    
	 initSphere: function() {
		this.numVertices = (Math.pow(4, 5+1)*3);
		this.Vertices = new Array();
		this.Normals = new Array();
   
		this.Index = 0;
		this.generateSphere();
	
		this.vertexPositionBuffer = this.myWorld.gl.createBuffer();
		this.myWorld.gl.bindBuffer(this.myWorld.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
		this.myWorld.gl.bufferData(this.myWorld.gl.ARRAY_BUFFER, new Float32Array(this.Vertices), this.myWorld.gl.STATIC_DRAW);
		this.vertexPositionBuffer.itemSize = 4;
		this.vertexPositionBuffer.numItems = this.numVertices;

	 },
	 
	 generateSphere: function() {
		var v = new Array();
		v[0] = vec4.fromValues(0.0, 0.0, 1.0, 1.0);
        v[1] = vec4.fromValues(0.0, 0.942809, -0.333333, 1.0);
		v[2] = vec4.fromValues(-0.816497, -0.471405, -0.333333, 1.0);
		v[3] = vec4.fromValues(0.816497, -0.471405, -0.333333, 1.0);
		
		this.dividTriangle(v[0], v[1], v[2], 5);
		this.dividTriangle(v[3], v[2], v[1], 5);
		this.dividTriangle(v[0], v[3], v[1], 5);
		this.dividTriangle(v[0], v[2], v[3], 5);
	},
	
	unit: function(p)
	{
		var c = vec4.create(); var d;
		for(var i=0; i<3; i++)
			d += p[i]*p[i];
		d = Math.sqrt(d);
		if(d > 0.0)
			for(var i=0; i<3; i++)
				c[i] = p[i]/d;
		c[3] = 1.0;
		return c;
	},
	
	dividTriangle: function(a, b, c, n){
		var v1; var v2; var v3;
		if(n>0)
		{
			var temp = vec4.create();
			temp = vec4.add(temp, a, b);
			v1 = this.unit(temp);
			temp = vec4.add(temp, a, c);
			v2 = this.unit(temp);
			temp = vec4.add(temp, b, c);			
			v3 = this.unit(temp);   

			this.dividTriangle(a , v1, v2, n-1);
			this.dividTriangle(c , v2, v3, n-1);
			this.dividTriangle(b , v3, v1, n-1);
			this.dividTriangle(v1, v3, v2, n-1);
		}
		else{
			this.Vertices[this.Index] = a;
			this.Normals[this.Index] = vec3.fromValues(a.x, a.y, a.z);//get the normal of the triangle
			this.Index++;
			this.Vertices[this.Index] = b;
			this.Normals[this.Index] = vec3.fromValues(b.x, b.y, b.z);
			this.Index++;
			this.Vertices[this.Index] = c;
			this.Normals[this.Index] = vec3.fromValues(c.x, c.y, c.z);
			this.Index++;
		};
	},
    /*
     * drawing function
     */
    drawSphere: function() {
		
		this.myWorld.gl.viewport(0, 0, this.myWorld.gl.viewportWidth, this.myWorld.gl.viewportHeight);
		this.myWorld.gl.clear(this.myWorld.gl.COLOR_BUFFER_BIT | this.myWorld.gl.DEPTH_BUFFER_BIT);
		
		this.myWorld.gl.bindBuffer(this.myWorld.gl.ARRAY_BUFFER, this.vertexPositionBuffer);
		this.myWorld.gl.vertexAttribPointer(this.myWorld.aVertexPosition, this.vertexPositionBuffer.itemSize, this.myWorld.gl.FLOAT, false, 0, 0);
		
		this.myWorld.gl.drawArrays(this.myWorld.gl.TRIANGLE_STRIP, 0, this.numVertices);

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
