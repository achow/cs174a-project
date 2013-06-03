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
                
            if (key == 37) // Left arrow
                canvas.world.camera.theta += 5;
            else if (key == 39) // Right arrow
                canvas.world.camera.theta -= 5;
            else if (key == 38) // Up arrow
                canvas.world.camera.phi += 5;
            else if (key == 40) // Down arrow
                canvas.world.camera.phi -= 5;
				
			//move pacman and monsters
			else if (charRep == "I" || charRep == "J" || charRep == "K" || charRep == "M")
			{
				var direction = DIRECTION.NONE;
				if(charRep == "I")
					direction = DIRECTION.UP;
				else if(charRep == "J")
					direction = DIRECTION.LEFT;
				else if(charRep == "K")
					direction = DIRECTION.RIGHT;
				else if(charRep == "M")
					direction = DIRECTION.DOWN;
				
				_.each(canvas.world.animateList, function(obj) {
					if(obj.modelId == MODEL.PACMAN)
					{
						obj.setDirection(direction);
						//canvas.world.camera.attachObject = obj;
						//canvas.world.lightPosition = obj.position;
					}
				});	
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
