World = new JS.Class({

    initialize: function(id) {
        this.box = [];
        //this.gl;
        //this.vShaderScript;
        //this.fShaderScript;
        //this.shaderProgram;
        //this.aVertexPosition;
        this.initMap();

        this.pacman = new Pacman(this, MODEL_ID.PACMAN);
        this.add(this.pacman);
        this.camera = new Camera();
    },

    //getShader: function(gl, shaderScript) {
        ////var shaderScript = document.getElementById(id);
        //if (!shaderScript) {
             //return null;
        //}
        //var str = "";
        //var k = shaderScript.firstChild;
        //while (k) {
          //if (k.nodeType == 3) {
            //str += k.textContent;
          //}
          //k = k.nextSibling;
        //}
        //var shader;
        //if (shaderScript.type == "x-shader/x-fragment") {
          //shader = gl.createShader(gl.FRAGMENT_SHADER);
          ////alert("yes1!");
        //} else if (shaderScript.type == "x-shader/x-vertex") {
        ////  alert("yes2!");
          //shader = gl.createShader(gl.VERTEX_SHADER);
        //} else {
            //alert("no!");
          //return null;
        //}
        //gl.shaderSource(shader, str);
        //gl.compileShader(shader);
        //if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          //alert(gl.getShaderInfoLog(shader));
          //return null;
        //}
        //return shader;
    //},

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
    renderScene: function() {
        _.each(this.box, function(obj) {
            obj.draw();
        });
    },
    /*
     * make a map
     */
    initMap: function() {
        self = this;
        _.each(MapData, function(row, h) {
            _.each(row.split(""), function(entry, w) {
                // this is a wall
                if (entry === MAPELEMENT.WALL) {
                    var block = new Block(MODEL_ID.BLOCK);
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
