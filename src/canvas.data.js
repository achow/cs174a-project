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

            var attribute = [
                "aPosition",
                "aNormal",
            ];

            var uniform = [
                "uView",
                "uWorld",
                "uPerspective",
                "uLightPosition",
            ];

            _.each(attribute, function(attr) {
                shaderProgram[attr] = gl.getAttribLocation(shaderProgram, attr);
                gl.enableVertexAttribArray(shaderProgram[attr]);
            });

            _.each(uniform, function(unif) {
                shaderProgram[unif] = gl.getUniformLocation(shaderProgram, unif);
            });
        },
        initBuffer: function(canvas) {
            var gl = canvas.gl;
            // load model here
            var buffer = [
                new CubeBuffer(),
                new SphereBuffer(),
            ];

            var glBuffer = _.map(buffer, function(buf, key) {
                var vbuf = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buf.Vertices), gl.STATIC_DRAW);
                vbuf.itemSize = 4;
                vbuf.numItems = buf.numVertices;

                var nbuf = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, nbuf);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buf.Normals), gl.STATIC_DRAW);
                nbuf.itemSize = 3;
                nbuf.numItems = buf.numVertices;
                return { vertices: vbuf, normals: nbuf };
            });

            MODEL.buffer[MODEL.BLOCK] = glBuffer[0];
            MODEL.buffer[MODEL.PACMAN] = glBuffer[1];
            MODEL.buffer[MODEL.MONSTER] = glBuffer[1];
        },
        createObject: function (canvas) {
            canvas.world = new World();
        },
        draw: function (canvas) {
            canvas.world.draw(canvas);
            document.onmouseup = function(e) {
                var gl = canvas.gl;
                var pixelValues = new Uint8Array(4);
                gl.readPixels(e.pageX, canvas.gl.viewportHeight - e.pageY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelValues);
                alert(pixelValues[0]);
            }

        },
    }
];
