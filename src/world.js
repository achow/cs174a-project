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
        this.lightPosition.z = 400;

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
		
		//gl.uniform3fv(shaderProgram.uColor, color.toVec3());
        
        _.each(this.renderList, function(obj) {
            gl.uniform3fv(shaderProgram.uColor, obj.color.toVec3());
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
                    var pacman = new Pacman(self, MODEL.PACMAN);
                    pacman.position.x = w;
                    pacman.position.y = h;
                    self.addToRenderList(pacman, true);
                    self.pacman = pacman;
                } else if (entry === MAPELEMENT.MONSTERSPAWN) {
                    // monster
                    var monster = new Monster(self, MODEL.MONSTER);
                    monster.position.x = w;
                    monster.position.y = h;
                    self.addToRenderList(monster, true);
                } else if (entry === MAPELEMENT.PELLET) {
                    self.addToRenderList(new Pellet(self, MODEL.PELLET, w, h, 0.25), true);
                } else if (entry === MAPELEMENT.SUPERPELLET) {
                    self.addToRenderList(new Pellet(self, MODEL.PELLET, w, h, 0.35), true);
                }
            });
        });
    },

    getMapElement : function(x, y) {
        return MapData[y][x];
    }
});
