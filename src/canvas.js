def ("Canvas") ({
    init: function(data) {
        console.log("canvas setup", data);
        var self = this;
        this.id = data.id;
        // set size
        var canvas = document.getElementById(data.id);
        canvas.width = data.width;
        canvas.height = data.height;

        // set up key
        this.keyPress = function (e) {
            data.keyPress(self, e.keyCode);
        };
        this.active();

        // create shader for canvas
        this.initGL(canvas, data.shader);
        data.initShader(this);
        data.initBuffer(this);
        data.createObject(this);

        // time delta
        dt = 1/30;

        // render loop
        window.setInterval(function() {
            self.world.camera.dt();
            self.world.dt();
            self.clear();
            data.draw(self);
        }, dt*1000);
    },
    /*
     * create actual canvas and program
     */
    initGL: function(canvas, shader) {
        try {
            var gl = canvas.getContext("experimental-webgl");
            this.gl = gl;
            // set size
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.enable(gl.DEPTH_TEST);

            // create program
            var shaderProgram = gl.createProgram();
            this.shaderProgram = shaderProgram;
            var self = this;
            _.each(shader, function(shaderId) {
                self.addShader(shaderId);
            });
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                console.log("Could not initialise shaders");
            }
            gl.useProgram(shaderProgram);
        } catch (e) {
        }
        if (!this.gl) {
            console.log("Could not initialise WebGL, sorry :-(");
        }
    },
    /*
     * add shader by id
     */
    addShader: function(id) {
        var gl = this.gl;
        var shaderProgram = this.shaderProgram;

        console.log("add shader", id);
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }
        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            return null;
        }
        gl.attachShader(shaderProgram, shader);
    },
    /*
     * clear the canvas
     */
    clear: function() {
        var gl = this.gl;
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    },
    /*
     * only one active canvas can access user keyboard
     */
    active: function() {
        console.log("active", this.id);
        document.onkeyup = this.keyPress;
    }
});
