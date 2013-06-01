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
	    handleMouseDown: function (event) {		
		},
        handleMouseUp: function (event) {		
		},
        handleMouseMove: function (event) {	
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
						canvas.world.camera.attachObject = obj;
						//canvas.world.lightPosition = obj.position;
					}
				});	
			}
			
        },
        handleMouseDown: function (event) {		
			this.mouseDown = true;
			this.lastMouseX = event.clientX;
			this.lastMouseY = event.clientY;
		},
        handleMouseUp: function (event) {		
			this.mouseDown = false;
		},
        handleMouseMove: function (event) {		
			if(!this.mouseDown)
				return;
			
			var newX = event.clientX;
			var newY = event.clientY;
			
			// detect where mouse is
			
			this.lastMouseX = newX;
			this.lastMouseY = newY;
			
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
        picker: function(canvas, buf) {
            console.log(buf);
        },
    },
];
