def ("Picker") ({
    init: function (canvas, gl) {
        this.pickedColor = [];
		this.canvas = canvas;
		this.gl = gl;
		this.texture = null;
		this.framebuffer = null;
		this.renderbuffer = null;
		
		this.mouseDown = false;
		this.lastMouseX = null;
		this.lastMouseY = null;	
		
		this.initValues();
    },
	
	initValues: function(){
		var width = this.canvas.width;
		var height = this.canvas.height;
		
		var gl = this.gl;
		//1. Init Picking Texture
		this.texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		try{
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		}
		catch(e)
		{
			alert("cannot");
		}
		//2. Init Render Buffer
		this.renderbuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
		
		
		//3. Init Frame Buffer
		this.framebuffer = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderbuffer);
		

		//4. Clean up
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);		
	},
	
	update: function() {

		var width = this.canvas.width;
		var height = this.canvas.height;
	   
	    var gl = this.gl;
		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		try{
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		}
		catch(e){
			alert("cannot");
		}
		
		//2. Init Render Buffer
		gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderbuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
	
	},

	find: function(x, y){
		
		//read one pixel
		var readout = new Uint8Array(1 * 1 * 4);
		var gl = this.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);	
		gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,readout);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);	
		
		
		//alert(readout[0]);
		this.pickedColor[0] = readout[0];
		this.pickedColor[1] = readout[1];
		this.pickedColor[2] = readout[2];
	},
});
