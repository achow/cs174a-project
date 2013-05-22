CubeBuffer = new JS.Class({

	 initialize: function() {
		this.initCube();
		this.positionBuffer;
	 },

	 initCube: function() {
		this.numTriangles = 12;
        this.numVertices = 3*this.numTriangles;
        this.Vertices = [];
        this.Normals = [];

        //this.Index = 0;
		
		this.VIndex = 0;
		this.NIndex = 0;
		
        this.generateCube();


     },

	quad: function(a, b, c, d)
	{
		var oneSet = [];
		
			oneSet[0] = [ -0.5, -0.5,  0.5, 1.0 ];
			oneSet[1] = [ -0.5,  0.5,  0.5, 1.0 ];
			oneSet[2] = [ 0.5,  0.5,  0.5, 1.0 ];
			oneSet[3] = [ 0.5, -0.5,  0.5, 1.0 ];
			oneSet[4] = [ -0.5, -0.5, -0.5, 1.0 ];
			oneSet[5] = [ -0.5,  0.5, -0.5, 1.0 ];
			oneSet[6] = [ 0.5,  0.5, -0.5, 1.0 ];
			oneSet[7] = [ 0.5, -0.5, -0.5, 1.0 ];

		this.Vertices[this.VIndex] = oneSet[a][0];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[a][1];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[a][2];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[a][3];
		this.VIndex++;		
        this.Normals[this.NIndex] = oneSet[a][0];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[a][1];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[a][2];
		this.NIndex++;

		this.Vertices[this.VIndex] = oneSet[b][0];
		this.VIndex++;		
		this.Vertices[this.VIndex] = oneSet[b][1];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[b][2];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[b][3];
		this.VIndex++;		
        this.Normals[this.NIndex] = oneSet[b][0];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[b][1];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[b][2];
		this.NIndex++;		

		this.Vertices[this.VIndex] = oneSet[c][0];
		this.VIndex++;		
		this.Vertices[this.VIndex] = oneSet[c][1];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[c][2];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[c][3];
		this.VIndex++;		
        this.Normals[this.NIndex] = oneSet[c][0];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[c][1];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[c][2];
		this.NIndex++;
		
		this.Vertices[this.VIndex] = oneSet[a][0];
		this.VIndex++;		
		this.Vertices[this.VIndex] = oneSet[a][1];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[a][2];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[a][3];
		this.VIndex++;		
        this.Normals[this.NIndex] = oneSet[a][0];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[a][1];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[a][2];
		this.NIndex++;

		this.Vertices[this.VIndex] = oneSet[c][0];
		this.VIndex++;		
		this.Vertices[this.VIndex] = oneSet[c][1];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[c][2];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[c][3];
		this.VIndex++;		
        this.Normals[this.NIndex] = oneSet[c][0];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[c][1];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[c][2];
		this.NIndex++;
		
		this.Vertices[this.VIndex] = oneSet[d][0];
		this.VIndex++;		
		this.Vertices[this.VIndex] = oneSet[d][1];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[d][2];
		this.VIndex++;	
		this.Vertices[this.VIndex] = oneSet[d][3];
		this.VIndex++;		
        this.Normals[this.NIndex] = oneSet[d][0];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[d][1];
		this.NIndex++;
        this.Normals[this.NIndex] = oneSet[d][2];
		this.NIndex++;
		
		/*
			oneSet[0] = vec4.fromValues( -0.5, -0.5,  0.5, 1.0 );
			oneSet[1] = vec4.fromValues( -0.5,  0.5,  0.5, 1.0 );
			oneSet[2] = vec4.fromValues( 0.5,  0.5,  0.5, 1.0 );
			oneSet[3] = vec4.fromValues( 0.5, -0.5,  0.5, 1.0 );
			oneSet[4] = vec4.fromValues( -0.5, -0.5, -0.5, 1.0 );
			oneSet[5] = vec4.fromValues( -0.5,  0.5, -0.5, 1.0 );
			oneSet[6] = vec4.fromValues( 0.5,  0.5, -0.5, 1.0 );
			oneSet[7] = vec4.fromValues( 0.5, -0.5, -0.5, 1.0 );
			
		this.Vertices[this.Index] = oneSet[a];
        this.Normals[this.Index] = vec3.fromValues(oneSet[a][0], oneSet[a][1], oneSet[a][2]);
		this.Index++;
		
		this.Vertices[this.Index] = oneSet[b];
        this.Normals[this.Index] = vec3.fromValues(oneSet[b][0], oneSet[b][1], oneSet[b][2]);
		this.Index++;

		this.Vertices[this.Index] = oneSet[c];
        this.Normals[this.Index] = vec3.fromValues(oneSet[c][0], oneSet[c][1], oneSet[c][2]);
		this.Index++;
		
		this.Vertices[this.Index] = oneSet[a];
        this.Normals[this.Index] = vec3.fromValues(oneSet[a][0], oneSet[a][1], oneSet[a][2]);
		this.Index++;
		
		this.Vertices[this.Index] = oneSet[c];
        this.Normals[this.Index] = vec3.fromValues(oneSet[c][0], oneSet[c][1], oneSet[c][2]);
		this.Index++;
		
		this.Vertices[this.Index] = oneSet[d];
        this.Normals[this.Index] = vec3.fromValues(oneSet[d][0], oneSet[d][1], oneSet[d][2]);
		this.Index++;
			*/
		

	},

	generateCube: function()
	{
		this.quad( 1, 0, 3, 2 );
		this.quad( 2, 3, 7, 6 );
		this.quad( 3, 0, 4, 7 );
		this.quad( 6, 5, 1, 2 );
		this.quad( 4, 5, 6, 7 );
		this.quad( 5, 4, 0, 1 );
	}

});
