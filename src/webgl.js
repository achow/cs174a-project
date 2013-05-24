def ("GL") ({
    initGL: function(canvas) {
        try {
            gl = canvas.getContext("experimental-webgl");
            gl.viewportWidth = canvas.width;
            gl.viewportHeight = canvas.height;
        } catch (e) {
        }
        if (!gl) {
            console.log("Could not initialise WebGL, sorry :-(");
        }
    },
    initShaders: function() {
        function getShader(gl, id) {
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

            return shader;
        }
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            console.log("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
        shaderProgram.uView = gl.getUniformLocation(shaderProgram, "uView");
        shaderProgram.uWorld = gl.getUniformLocation(shaderProgram, "uWorld");
        shaderProgram.uPerspective = gl.getUniformLocation(shaderProgram, "uPerspective");
        shaderProgram.aTextureCoord = gl.getAttribLocation(shaderProgram, "aTextureCoord");

        gl.enableVertexAttribArray(shaderProgram.aPosition);

    },

    initBuffers: function() {
        // load model here
        var myCube = new CubeBuffer();
        var mySphere = new SphereBuffer();

        // cube
        var cubeBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, cubeBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(myCube.Vertices), gl.STATIC_DRAW);
        cubeBuf.itemSize = 4;
        cubeBuf.numItems = myCube.numVertices;

        // sphere
        var sphereBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sphereBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mySphere.Vertices), gl.STATIC_DRAW);
        sphereBuf.itemSize = 4;
        sphereBuf.numItems = mySphere.numVertices;

        MODEL.buffer[MODEL.BLOCK] = cubeBuf;
        MODEL.buffer[MODEL.PACMAN] = sphereBuf;
        MODEL.buffer[MODEL.MONSTER] = sphereBuf;
    },
    onKeyUp: function (key) {
        console.log(key);
    },

    drawScene: function() {
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // draw it
        this.world.draw();
    },
    init: function() {

        // set up key
        var self = this;
        document.onkeyup = function (e) {
            self.onKeyUp(e.keyCode);
        };

        var canvas = document.getElementById("game-canvas");

        // full screen
        canvas.width = document.width;
        canvas.height = document.height;

        this.initGL(canvas);
        this.initShaders();
        this.initBuffers();

        this.world = new World();

        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);

        this.drawScene();
    }
});
