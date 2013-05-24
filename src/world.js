World = new JS.Class({

    initialize: function(id) {
        this.box = [];
        this.camera = new Camera();
        // move cam back a little bit
        this.camera.position.z = 20;
        this.camera.position.y = -10;
        this.camera.phi = 20;
        this.initMap();
    },

    /*
     * add object to the box
     */
    add: function(obj) {
        this.box.push(obj);
    },
    /*
     * run all object's dt
     */
    dt: function() {
        _.each(this.box, function(obj) {
            obj.dt();
        });
    },
    /*
     * run all object's render
     */
    draw: function() {
        console.log("world draw");
        gl.uniformMatrix4fv(shaderProgram.uPerspective, false,
            mat4.perspective(mat4.create(), 45, gl.viewportWidth / gl.viewportHeight, 1, 100.0)
            //mat4.create()
        );
        gl.uniformMatrix4fv(shaderProgram.uView, false,
            //mat4.create()
            this.camera.view()
        );
        _.each(this.box, function(obj) {
            obj.draw();
        });
    },
    /*
     * make a map
     */
    initMap: function() {
        var self = this;
        _.each(MapData, function(row, h) {
            h = - (MAP_SIZE_H/2) + MAP_SIZE_H - 1 - h; // the map is upside down (by design)
            _.each(row.split(""), function(entry, w) {
                w = w - (MAP_SIZE_W/2);
                // this is a wall
                if (entry === MAPELEMENT.WALL) {
                    var block = new Block(this, MODEL.BLOCK);
                    block.position.x = w;
                    block.position.y = h;
                    block.position.z = 1;
                    self.add(block);
                } else if (entry === MAPELEMENT.PACMANSPAWN){
                    var pacman = new Pacman(self, MODEL.PACMAN);
                    pacman.position.x = w;
                    pacman.position.y = h;
                    self.add(pacman);
                    self.pacman = pacman;
                }
            });
        });
    },

    getMapElement : function(x, y) {
        return MapData[y][x];
    }
});
