CANVAS_DATA = [
    {
        id: "game-canvas",
        shader: ["shader-vs", "shader-fs"],
        width: document.width,
        height: document.height,
        keyPress: function (canvas, key) {
            var charRep = String.fromCharCode(key);

            if (charRep == "W")
                canvas.world.camera.move(0, 1, 0);
            else if (charRep == "A")
                canvas.world.camera.move(-1, 0, 0);
            else if (charRep == "S")
                canvas.world.camera.move(0, -1, 0);
            else if (charRep == "D")
                canvas.world.camera.move(1, 0, 0);
            else if (key == 37) // Left arrow
                canvas.world.camera.theta += 5;
            else if (key == 39) // Right arrow
                canvas.world.camera.theta -= 5;
            else if (key == 38) // Up arrow
                canvas.world.camera.phi += 5;
            else if (key == 40) // Down arrow
                canvas.world.camera.phi -= 5;
        },
        initShader: function(canvas) {
            var gl = canvas.gl;
            var shaderProgram = canvas.shaderProgram;
            shaderProgram.uView = gl.getUniformLocation(shaderProgram, "uView");
            shaderProgram.uWorld = gl.getUniformLocation(shaderProgram, "uWorld");
            shaderProgram.uPerspective = gl.getUniformLocation(shaderProgram, "uPerspective");
            shaderProgram.uLightPosition = gl.getUniformLocation(shaderProgram, "uLightPosition");

            shaderProgram.aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
            shaderProgram.aNormal = gl.getAttribLocation(shaderProgram, "aNormal");
            shaderProgram.aTextureCoord = gl.getAttribLocation(shaderProgram, "aTextureCoord");

            gl.enableVertexAttribArray(shaderProgram.aPosition);
            gl.enableVertexAttribArray(shaderProgram.aNormal);
            gl.enableVertexAttribArray(shaderProgram.aTextureCoord);
        },
        initBuffer: function(canvas) {
            var gl = canvas.gl;
            // load model here
            var myCube = new CubeBuffer();
            var mySphere = new SphereBuffer();

            // cube
            var cubeVertices = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myCube.Vertices), gl.STATIC_DRAW);
            cubeVertices.itemSize = 4;
            cubeVertices.numItems = myCube.numVertices;

            var cubeNormals = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, cubeNormals);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myCube.Normals), gl.STATIC_DRAW);
            cubeNormals.itemSize = 3;
            cubeNormals.numItems = myCube.numVertices;

            // sphere
            var sphereVertices = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sphereVertices);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mySphere.Vertices), gl.STATIC_DRAW);
            sphereVertices.itemSize = 4;
            sphereVertices.numItems = mySphere.numVertices;

            var sphereNormals = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, sphereNormals);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mySphere.Normals), gl.STATIC_DRAW);
            sphereNormals.itemSize = 3;
            sphereNormals.numItems = mySphere.numVertices;

            MODEL.buffer[MODEL.BLOCK] = { vertices: cubeVertices, normals: cubeNormals };
            MODEL.buffer[MODEL.PACMAN] = { vertices: sphereVertices, normals: sphereNormals };
            MODEL.buffer[MODEL.MONSTER] = { vertices: sphereVertices, normals: sphereNormals };
        },
        createObject: function (canvas) {
            canvas.world = new World();
        },
        draw: function (canvas) {
            canvas.world.draw(canvas);
        },
    }
];
