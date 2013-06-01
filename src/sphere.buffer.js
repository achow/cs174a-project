def ("SphereBuffer") ({

     init: function() {
        this.initSphere();
     },

     initSphere: function() {
        this.numVertices = (Math.pow(4, 5+1)*3);
        this.Vertices = [];
        this.Normals = [];

        //this.Index = 0;

        this.VIndex = 0;
        this.NIndex = 0;

        this.generateSphere();
     },

     generateSphere: function() {
        var v = [];

        v[0] = [0.0, 0.0, 1.0, 1.0];
        v[1] = [0.0, 0.942809, -0.333333, 1.0];
        v[2] = [-0.816497, -0.471405, -0.333333, 1.0];
        v[3] = [0.816497, -0.471405, -0.333333, 1.0];

        this.dividTriangle(v[0], v[1], v[2], 5);
        this.dividTriangle(v[3], v[2], v[1], 5);
        this.dividTriangle(v[0], v[3], v[1], 5);
        this.dividTriangle(v[0], v[2], v[3], 5);
    },

    unit: function(p)
    {
        var c = vec4.create(); var d = 0.0;
        for(var i=0; i<3; i++)
            d += p[i]*p[i];
        d = Math.sqrt(d);
        if(d > 0.0)
            for(var i=0; i<3; i++)
                c[i] = 0.5 * p[i]/d; //changed this to make the radius smaller
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
        /*
            this.Vertices[this.Index] = a;
            this.Normals[this.Index] = vec3.fromValues(a[0], a[1], a[2]);//get the normal of the triangle
            this.Index++;
            this.Vertices[this.Index] = b;
            this.Normals[this.Index] = vec3.fromValues(b[0], b[1], b[2]);
            this.Index++;
            this.Vertices[this.Index] = c;
            this.Normals[this.Index] = vec3.fromValues(c[0], c[1], c[2]);
            this.Index++;
            */
            this.Vertices[this.VIndex] = a[0];
            this.VIndex++;
            this.Vertices[this.VIndex] = a[1];
            this.VIndex++;
            this.Vertices[this.VIndex] = a[2];
            this.VIndex++;
            this.Vertices[this.VIndex] = a[3];
            this.VIndex++;
            this.Normals[this.NIndex] = a[0];
            this.NIndex++;
            this.Normals[this.NIndex] = a[1];
            this.NIndex++;
            this.Normals[this.NIndex] = a[2];
            this.NIndex++;

            this.Vertices[this.VIndex] = b[0];
            this.VIndex++;
            this.Vertices[this.VIndex] = b[1];
            this.VIndex++;
            this.Vertices[this.VIndex] = b[2];
            this.VIndex++;
            this.Vertices[this.VIndex] = b[3];
            this.VIndex++;
            this.Normals[this.NIndex] = b[0];
            this.NIndex++;
            this.Normals[this.NIndex] = b[1];
            this.NIndex++;
            this.Normals[this.NIndex] = b[2];
            this.NIndex++;


            this.Vertices[this.VIndex] = c[0];
            this.VIndex++;
            this.Vertices[this.VIndex] = c[1];
            this.VIndex++;
            this.Vertices[this.VIndex] = c[2];
            this.VIndex++;
            this.Vertices[this.VIndex] = c[3];
            this.VIndex++;
            this.Normals[this.NIndex] = c[0];
            this.NIndex++;
            this.Normals[this.NIndex] = c[1];
            this.NIndex++;
            this.Normals[this.NIndex] = c[2];
            this.NIndex++;

        }
    }

});

