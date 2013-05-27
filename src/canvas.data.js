CANVAS_DATA = [
    {
        id: "game-canvas",
        shader: ["shader-vs", "shader-fs"],
        width: document.width,
        height: document.height,
        shaderAttribute : [
            "aPosition",
            "aNormal",
        ],
        shaderUniform : [
            "uView",
            "uWorld",
            "uPerspective",
            "uLightPosition",
        ],
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
        model: [
            new CubeBuffer(),
            new SphereBuffer(),
        ],
        modelMap: [
            {type: MODEL.BLOCK, index: 0 }, // index in model
            {type: MODEL.PACMAN, index: 1 },
            {type: MODEL.MONSTER, index: 1 },
        ],
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
