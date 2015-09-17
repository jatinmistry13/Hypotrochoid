/**
 * Draw Hypotrochoid on canvas through javascript.
 * @author Jatin Mistry
 */
 (function() {
 
    var d, canvas, context, time, w, h, m, cos, sin, pow, PI, axes={};
 
	// requestAnim shim layer by Paul Irish
    this.window.reqAnimationFrame = (function(){
      return  this.window.requestAnimationFrame       || 
              this.window.webkitRequestAnimationFrame || 
              this.window.mozRequestAnimationFrame    || 
              this.window.oRequestAnimationFrame      || 
              this.window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                this.window.setTimeout(callback, 16);
              };
    })();
    
    // Initialize
    function initSetup() {
	    d = this.document;
	    canvas = d.body.appendChild(d.createElement('canvas'));
	    context = canvas.getContext('2d');
	    time = 0;
	    w = canvas.width = this.innerWidth;
	    h = canvas.height = this.innerHeight;
	    m = Math;
	    cos = m.cos;
	    sin = m.sin;
	    pow = m.pow;
	    PI = m.PI;
    }
    
    // perform calculation to show X and Y axes
    function calcAxes()
	{
		axes={}; //ctx=canvas.getContext("2d");
		axes.x0 = 0.5 + 0.5*canvas.width;   // x0 pixels from left to x=0
		axes.y0 = 0.5 + 0.5*canvas.height;  // y0 pixels from top to y=0
		axes.scale = 40;                    // 40 pixels from x=0 to x=1
		axes.doNegativeX = true;
	}
	
	// show X and Y axes
	function showAxes(context,axes) {
		var x0=axes.x0, w=context.canvas.width;
		var y0=axes.y0, h=context.canvas.height;
		var xmin = axes.doNegativeX ? 0 : x0;
		context.beginPath();
		context.strokeStyle = "rgb(128,128,128)"; 
		context.moveTo(xmin,y0); context.lineTo(w,y0);  // X axis
		context.moveTo(x0,0);    context.lineTo(x0,h);  // Y axis
		context.stroke();
	}
	
	// resize the canvas so that the origin of axis is always at the centre of screen
    function resize() {
		canvas.width = w = this.innerWidth;
		canvas.height = h = this.innerHeight;
	}
	
	// perform all the necessary drawing
    function drawHypotrochoid(){
	    // Clear
	    context.clearRect(0, 0, w, h);
	    //canvas.width = canvas.width; //Or context.clearRect(0, 0, w, h);
	    
	    //time += 0.1;
	    time += 0.001;
	    
	    // The number of particles to generate
	    //var i = 10000;
	    var i = 10000;
	
		// calculate axes    
	    calcAxes();
		// Show X and Y axes
		showAxes(context,axes); 
	    
	    // set the color
		context.fillStyle = 'rgba(0,204,255, 0.9)';
		while(i--){
			// The magic		
			var a = 100*(1);
			var b = 100*(3/4);
			var d = b;
		
	        context.fillRect( ((a + b)*pow(cos(time + i), 3) + d*pow(cos((a + b)/b*(time + i)), 3))+ w/2,
	                          ((a + b)*pow(sin(time + i), 3) - d*pow(sin((a + b)/b*(time + i)), 3))+ h/2,
	                          1,
	                          1 );
	     }
    }

	
	// The main animation loop
	function animate() {
		window.reqAnimationFrame( animate );
		drawHypotrochoid();
    }
            
	initSetup();
	
	// adding eventlistener
	// 1) EventType:	'resize'
	// 2) listener:		resize method
	// 3) useCapture:	Boolean indicating whether to bind the event as it is propogating towards the target node, 
	//					(event Capture), or as the event bubbles upwards from the target (event bubble). 
	this.addEventListener( 'resize', resize, false );

	// Initial size
	resize();
	
	// perform animation
	animate();
	
})();