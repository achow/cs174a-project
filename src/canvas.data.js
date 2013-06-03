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
        ],
        keyPress: function (canvas, key) {
		},
	    handleMouseDown: function (canvas, event) {		
		},
        handleMouseUp: function (canvas, event) {		
		},
        handleMouseMove: function (canvas, event) {	
		},
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
        handleMouseDown: function (canvas, event) {		
			canvas.mouseDown = true;
			canvas.lastMouseX = event.clientX;
			canvas.lastMouseY = event.clientY;
		},
        handleMouseUp: function (canvas, event) {		
			canvas.mouseDown = false;
		},
        handleMouseMove: function (canvas, event) {		
			if(!canvas.mouseDown)
				return;
			
			var newX = event.clientX;
			var newY = event.clientY;
			
			// detect where mouse is
			
			canvas.lastMouseX = newX;
			canvas.lastMouseY = newY;
			
		},
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
];
