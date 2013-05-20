document.write('<script type="text/javascript" language="javascript" src="gl-matrix/common.js"></script>')
document.write('<script type="text/javascript" language="javascript" src="gl-matrix/mat4.js"></script>')
document.write('<script type="text/javascript" language="javascript" src="gl-matrix/mat3.js"></script>')
document.write('<script type="text/javascript" language="javascript" src="gl-matrix/vec4.js"></script>')
document.write('<script type="text/javascript" language="javascript" src="gl-matrix/vec3.js"></script>')
document.write('<script type="text/javascript" language="javascript" src="gl-matrix/vec2.js"></script>')

/*
        <script type="text/javascript" src="position.js"></script>
        <script type="text/javascript" src="block.js"></script>
        <script type="text/javascript" src="camera.js"></script>
*/

World = new JS.Class({

    initialize: function(id) {
        this.box = [];
		this.gl;
		this.vShaderScript;
		this.fShaderScript;
		this.shaderProgram;
		this.aVertexPosition;
    },
	
	getShader: function(gl, shaderScript) {
		//var shaderScript = document.getElementById(id);
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
		  //alert("yes1!");
		} else if (shaderScript.type == "x-shader/x-vertex") {
		//  alert("yes2!");
		  shader = gl.createShader(gl.VERTEX_SHADER);
		} else {
			alert("no!");
		  return null;
		}
		gl.shaderSource(shader, str);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		  alert(gl.getShaderInfoLog(shader));
		  return null;
		}
		return shader;
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
        for (var i in this.box) {
            this.box[i].dt();
        }
    },
    /*
     * run all object's render
     */
    renderScene: function() {
        for (var i in this.box) {
            this.box[i].draw();
        }
    }
});
