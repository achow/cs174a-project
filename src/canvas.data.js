CANVAS_DATA = [
    {
        id: "minimap",
        shader: ["shader-vs", "shader-fs"],
        shaderAttribute : [
            "aPosition",
            "aNormal",
        ],
        shaderUniform : [
            "uView",
            "uWorld",
            "uPerspective",
            "uLightPosition",
			"uColor",
			"uIsPicked",
        ],
        keyPress: function (canvas, key) {
		},
		/*
	    handleMouseDown: function (canvas, event) {		
		},
        handleMouseUp: function (canvas, event) {		
		},*/
        model: [
            new CubeBuffer(),
            new SphereBuffer(),
        ],
        modelMap: [
            {type: MODEL.BLOCK, index: 0 }, // index in model
            {type: MODEL.PACMAN, index: 1 },
            {type: MODEL.MONSTER, index: 1 },
            {type: MODEL.PELLET, index: 1 },
            {type: MODEL.MONSTER2, index:1},
			{type: MODEL.SUPERPELLET, index: 1 },
        ],
        picker: function(canvas, buf) {
            console.log(buf);
        },
    },
    {
        id: "game-canvas",
        shader: ["shader-vs", "shader-fs"],
        shaderAttribute : [
            "aPosition",
            "aNormal",
        ],
        shaderUniform : [
            "uView",
            "uWorld",
            "uPerspective",
            "uLightPosition",
			"uColor",
			"uIsPicked",
        ],
        keyPress: function (canvas, key) {
            var charRep = String.fromCharCode(key);

			if(canvas.world.attachObject == null)
			{
				if (charRep == "W")
					canvas.world.camera.move(0, 1, 0);
				else if (charRep == "A")
					canvas.world.camera.move(-1, 0, 0);
				else if (charRep == "S")
					canvas.world.camera.move(0, -1, 0);
				else if (charRep == "D")
					canvas.world.camera.move(1, 0, 0);
			}
                
            if (charRep == "J") // Left arrow
                canvas.world.camera.theta += 5;
            else if (charRep == "K") // Right arrow
                canvas.world.camera.theta -= 5;
            else if (charRep == "I") // Up arrow
                canvas.world.camera.phi += 5;
            else if (charRep == "M") // Down arrow
                canvas.world.camera.phi -= 5;

            else if (charRep == "X")
            {
                canvas.world.camera.attachObject = canvas.world.pacman;
            }
            else if (charRep == "Z")
            {
                canvas.world.camera = new Camera();

                canvas.world.camera.position.z = 7;
                canvas.world.camera.position.y = -10;
                canvas.world.camera.phi = 60;
                
            }
				
			//move pacman and monsters
			else if (key == 37|| key == 38|| key == 39 || key == 40)
			{

				var direction = DIRECTION.NONE;
				if(key == 38)
					canvas.world.pacman.direction = DIRECTION.UP;
				else if( key == 37 )
					canvas.world.pacman.direction = DIRECTION.LEFT;
				else if(key == 39)
					canvas.world.pacman.direction = DIRECTION.RIGHT;
				else if(key == 40)
					canvas.world.pacman.direction = DIRECTION.DOWN;
                    
                canvas.world.camera.attachObject = canvas.world.pacman;
			}


			
        },
		/*
        handleMouseDown: function (canvas, event) {		
			//canvas.world.mouseDown = true;
				var tempX = canvas.world.nextMouseX;
				var tempY = canvas.world.nextMouseY;

				canvas.world.nextMouseX = event.clientX;
				canvas.world.nextMouseY = event.clientY;
				
				canvas.world.lastMouseX = tempX;
				canvas.world.lastMouseY = tempY;
		},
        handleMouseUp: function (canvas, event) {		

			if(canvas.world.mouseDown == true)
			{
				var tempX = canvas.world.nextMouseX;
				var tempY = canvas.world.nextMouseY;

				canvas.world.nextMouseX = event.clientX;
				canvas.world.nextMouseY = event.clientY;
				
				canvas.world.lastMouseX = tempX;
				canvas.world.lastMouseY = tempY;
			}
			canvas.world.mouseDown = false;
		},
		*/
        model: [
            new CubeBuffer(),
            new SphereBuffer(),
        ],
        modelMap: [
            {type: MODEL.BLOCK, index: 0 }, // index in model
            {type: MODEL.PACMAN, index: 1 },
            {type: MODEL.MONSTER, index: 1 },
            {type: MODEL.PELLET, index: 1 },
			{type: MODEL.SUPERPELLET, index: 1 },
        ],
        picker: function(canvas, event) {
		
			var tempX = canvas.world.nextMouseX;
			var tempY = canvas.world.nextMouseY;

			canvas.world.nextMouseX = event.clientX;
			canvas.world.nextMouseY = event.clientY;
				
			canvas.world.lastMouseX = tempX;
			canvas.world.lastMouseY = tempY;
		
		    var gl = canvas.gl;
		
			if(canvas.world.nextMouseX != null && canvas.world.nextMouseY != null &&
			canvas.world.lastMouseX != canvas.world.nextMouseX && canvas.world.lastMouseY != canvas.world.nextMouseY)
			{
				var readout = new Uint8Array(4);
				gl.readPixels(canvas.world.nextMouseX,canvas.gl.canvas.height - canvas.world.nextMouseY,1,1,gl.RGBA,gl.UNSIGNED_BYTE,readout);
			
				if(!(readout[0] == 255 && readout[1] == 0 && readout[2] == 0))
				{
					canvas.world.pickedColor.r = readout[0];
					canvas.world.pickedColor.g = readout[1];
					canvas.world.pickedColor.b = readout[2];
				}
			}
		}
	}
];
