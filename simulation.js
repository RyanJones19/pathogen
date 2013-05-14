// Create the canvas
var canvas = document.createElement("canvas");
  // Somewhat fullscreen canvas
  canvas.width = window.innerWidth - 25;
  canvas.height = window.innerHeight - 25;

  /* Hardcoded Canvas Size
  canvas.width = 800;
  canvas.height = 600;
  */
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);

// Node class
function Node (x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  this.color = '#00513d';
  
  /*
  population: null,
  populationGrowthRate: null,
  
  resourceCount: null,
  resourceProductionRate: null,
  */

  //alert('Node instantiated');  
  
  this.update = function() {
      this.size += 0.02;
  };
  
  // Draws a circle
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc((this.x - this.size), (this.y - this.size), this.size, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  }   
};

/*
function Edge {};

function Pool {};

function Disease {
    fatality: null,
    transmission_rate: null,    
};
*/

var node1 = new Node(200,200, 50);
var node2 = new Node(800,800, 25);

var reset = function () {};

// Update game objects
var update = function () {
    node1.update();    
    node2.update();
};

// Draw everything
var render = function () {
    // Drawing edge between nodes
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.stroke();

    node1.draw();
    node2.draw();
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible 