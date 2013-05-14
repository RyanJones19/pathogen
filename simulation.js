// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;
    document.body.appendChild(canvas);

function node = {
  size: null,
  x: null,
  y: null,
  color: '#790ead',
  
  population: null,
  populationGrowthRate: null,
  
  resourceCount: null,
  resourceProductionRate: null,
 
  init: function(x, y) {
    node.size = 20;    
    node.x = x;
    node.y = y;
    node.population = 5;
  },
  
  update: function() {
      node.size += 0.02;
  },
  
  draw: function(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc((node.x - node.size), (node.y - node.size), node.size, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();
  }   
};

function edge {
    
    
};


function pool {
    
    
};

function disease {
    fatality: null,
    transmission_rate: null,
    
};

// Reset the game when the player catches a monster
var reset = function () {
    node.init(400,200);
};

// Update game objects
var update = function (modifier) {
    node.update();
};

// Draw everything
var render = function () {
    // Drawing edge between nodes
    //ctx.moveTo(node.x, node.y);
    //ctx.lineTo(node2.x, node2.y);
    //ctx.stroke();
    
    node.draw(node.x, node.y, node.size, node.color);
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