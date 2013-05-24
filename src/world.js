World = new JS.Class({

    initialize: function(id) {
        this.box = [];
        this.initMap();

        this.pacman = new Pacman(this, MODEL.PACMAN);
        //this.add(this.pacman);
        this.camera = new Camera();
        // move cam back a little bit
        this.camera.position.z = 20;
        this.camera.position.x = 5;
        this.camera.position.y = 5;
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
            _.each(row.split(""), function(entry, w) {
                // this is a wall
                if (entry === MAPELEMENT.WALL) {
                    var block = new Block(this, MODEL.BLOCK);
                    block.position.x = w;
                    block.position.y = h;
                    block.position.z = 1;
                    self.add(block);
                }
            });
        });
    },

    getMapElement : function(x, y) {
        return MapData[y][x];
    }
});
