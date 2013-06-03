def ("Canvas") ({
    init: function(data) {
        console.log("canvas setup", data);
        var self = this;
        this.id = data.id;
        this.buffer = [];
        var canvas = document.getElementById(data.id);
		
        // check webgl
        try {
            // create shader for canvas
            this.initGL(canvas, data.shader);
        } catch (e) {
            console.log("Could not initialise WebGL, sorry :-(");
            return;
        }
        this.initShader(data.shaderAttribute, data.shaderUniform);
        this.initBuffer(data.model, data.modelMap);

        // canvas only has one world
        this.world = new World();
        // set up key
        this.keyPress = function (e) {
            data.keyPress(self, e.keyCode);
        };
		this.handleMouseDown = function (event) {
			data.handleMouseDown(self, event);
		},
        this.handleMouseUp = function (event) {		
			data.handleMouseUp(self, event);
		},
        this.picker = function (e) {
            var gl = self.gl;
            var pixelValues = new Uint8Array(4);
            gl.readPixels(e.pageX, canvas.height - e.pageY, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelValues);
            data.picker(self, pixelValues);
        }
		
		document.onmousedown = this.handleMouseDown;
		document.onmouseup = this.handleMouseUp;
		
        this.active();
		
        // time delta
        dt = 1/15;

        // render loop
        window.setInterval(function() {
            self.world.camera.dt();
            self.world.dt();
            self.draw();
        }, dt*1000);
		
		window.setInterval(function() {
            self.world.doAction();
        }, dt*1000);
    },
    /*
     * create actual canvas and program
     */
    initGL: function(canvas, shader) {
        var gl = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
        this.gl = gl;

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
    },
    initBuffer: function(model, mapping) {
        var gl = this.gl;
        // load model here

        var glBuffer = _.map(model, function(buf, key) {
            var vbuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vbuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buf.Vertices), gl.STATIC_DRAW);
            vbuf.itemSize = 4;
            vbuf.numItems = buf.numVertices;

            var nbuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, nbuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(buf.Normals), gl.STATIC_DRAW);
            nbuf.itemSize = 3;
            nbuf.numItems = buf.numVertices;
            return { vertices: vbuf, normals: nbuf };
        });

        var self = this;
        _.each(mapping, function(map) {
            self.buffer[map.type] = glBuffer[map.index];
        });
    },
    initShader: function(attribute, uniform) {
        var gl = this.gl;
        var shaderProgram = this.shaderProgram;

        _.each(attribute, function(attr) {
            shaderProgram[attr] = gl.getAttribLocation(shaderProgram, attr);
            gl.enableVertexAttribArray(shaderProgram[attr]);
        });

        _.each(uniform, function(unif) {
            shaderProgram[unif] = gl.getUniformLocation(shaderProgram, unif);
        });
    },

    /*
     * add shader by id
     */
    addShader: function(id) {
        var gl = this.gl;
        var shaderProgram = this.shaderProgram;

        console.log("add shader", id);
        var shaderScript = document.getElementById(id);
        if (!shaderScript) return;

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
            return;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.log(gl.getShaderInfoLog(shader));
            return;
        }
        gl.attachShader(shaderProgram, shader);
    },

    draw: function() {
        var gl = this.gl;
        // set size
        var canvas = document.getElementById(this.id);
        //console.log(this.id, canvas.width, canvas.height);
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);


        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.world.draw(this);
    },
    /*
     * only one active canvas can access user keyboard
     */
    active: function() {
        console.log("active", this.id);
        document.onkeyup = this.keyPress;
       // document.onmouseup = this.picker;
    }
});
