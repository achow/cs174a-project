POINTS = {
    PELLET: 10,
	SUPERPELLET: 50,
	MONSTER: 100,
};

def ("World") ({

    init: function(id) {
        this.renderList = [];
        this.animateList = [];
        this.camera = new Camera();
        // move cam back a little bit
        this.camera.position.z = 7;
        this.camera.position.y = -10;
        this.camera.phi = 60;

        this.lightPosition = new Position();

        this.lightPosition.x = 15;
        this.lightPosition.y = 10;
        this.lightPosition.z = 500;

		this.pickedColor = new Color();
		
		this.mouseDown = false;
		this.lastMouseX = null;
		this.lastMouseY = null;
		this.nextMouseX = null;
		this.nextMouseY = null;
		
		this.eaterModeTime = 0;
		
		this.points = 0;
        
        this.pelletCount = 0;
		
        this.initMap();
    },

    /*
     * add object to the box
     * animate: optional, set it to true to turn on animation for this object
     */
    addToRenderList: function(obj, animate) {
        if (animate === true)
            this.animateList.push(obj);
        this.renderList.push(obj);
    },
    
    /*
     * run all object's dt
     */
    dt: function() {
        _.each(this.animateList, function(obj) {
            obj.dt();
        });
    },
	 /*
     * run all object's doAction
     */
    doAction: function() {
        _.each(this.animateList, function(obj) {
            obj.doAction();
        });
    },
    /*
     * run all object's render
     */
	 

	 
    draw: function(canvas) {
        var gl = canvas.gl;
        var shaderProgram = canvas.shaderProgram;
        // perspective
        gl.uniformMatrix4fv(shaderProgram.uPerspective, false,
            mat4.perspective(mat4.create(), 45, gl.viewportWidth / gl.viewportHeight, 1, 100.0)
            //mat4.create()
        );

        // camera transform
        gl.uniformMatrix4fv(shaderProgram.uView, false,
            //mat4.create()
            this.camera.view()
        );
        // where is light
        gl.uniform3fv(shaderProgram.uLightPosition, this.lightPosition.toVec3());
		
		//gl.uniform1i(shaderProgram.uIsPicked, 0);
		
		var r = this.pickedColor.r;
		var g = this.pickedColor.g;
		var b = this.pickedColor.b;
	//	var r = 255;
	//	var g = 255;
	//	var b = 255;
        _.each(this.renderList, function(obj) {
		
            gl.uniform3fv(shaderProgram.uColor, obj.color.toVec3());
				
			gl.uniform1i(shaderProgram.uIsPicked, 0);
				
			if(obj.isEqual(obj.color.r, r) && obj.isEqual(obj.color.g, g) && obj.isEqual(obj.color.b, b))
				gl.uniform1i(shaderProgram.uIsPicked, 1);

            obj.draw(canvas);		
        });
    },
    /*
     * make a map
     */
    initMap: function() {
        var self = this;
        _.each(MapData, function(row, h) {
           // h = - (MAP_SIZE_H/2) + MAP_SIZE_H - 1 - h; // the map is upside down (by design)
            _.each(row.split(""), function(entry, w) {
             //   w = w - (MAP_SIZE_W/2);
                if (entry === MAPELEMENT.WALL) {
                    // wall
                    var block = new Block(this, MODEL.BLOCK);
                    block.position.x = w;
                    block.position.y = h;
                    self.addToRenderList(block);
                } else if (entry === MAPELEMENT.PACMANSPAWN){
                    // pacman
					
					self.pacmanStartX = w;
					self.pacmanStartY = h;
					
                    var pacman = new Pacman(self, MODEL.PACMAN);
                    pacman.position.x = w;
                    pacman.position.y = h;
                    self.addToRenderList(pacman, true);
                    self.pacman = pacman;
                } else if (entry === MAPELEMENT.MONSTERSPAWN) {
                    // monster
					
					self.monsterStartX = w;
					self.monsterStartY = h;
					//console.log(w, h);
					
                    var monster = new Monster2(self, MODEL.MONSTER, [1, 1, 1]);
                    monster.position.x = w;
                    monster.position.y = h;
                    self.addToRenderList(monster, true);

                    var monster = new Monster2(self, MODEL.MONSTER, [1, 0, 1]);
                    monster.position.x = w;
                    monster.position.y = h;
                    self.addToRenderList(monster, true);

                    var monster = new Monster(self, MODEL.MONSTER, [0.5, 0.5, 1]);
                    monster.position.x = w;
                    monster.position.y = h;
                    self.addToRenderList(monster, true);


                } else if (entry === MAPELEMENT.PELLET) {
                    self.addToRenderList(new Pellet(self, MODEL.PELLET, w, h, 0.25), true);
                    this.pelletCount++;
                } else if (entry === MAPELEMENT.SUPERPELLET) {
                    self.addToRenderList(new SuperPellet(self, MODEL.SUPERPELLET, w, h, 0.35), true);
                    this.pelletCount++;
                }
            });
        });
    },

    getMapElement : function(x, y) {
        return MapData[y][x];
    }
});
