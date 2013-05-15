var canvas = document.getElementById("mainCanvas");
  // Somewhat fullscreen canvas
  canvas.width = window.innerWidth - 20;
  canvas.height = window.innerHeight - 20;

var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
  // Canvas background color
  ctx.fillStyle="#008A2E";
  ctx.fillRect(0,0,canvas.width, canvas.height);

// Sidebar
ctx.fillStyle="#140000";
ctx.fillRect(canvas.width-150,0,canvas.width, canvas.height);

function Node (x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
  
  this.population = 5;
  this.populationGrowthRate = null;

  this.resourceCount = null;
  this.resourceProductionRate = null;
  
  this.update = function() {
      this.population += 0.01;
  };
  
  this.draw = function() {
    // Draws a circle
    ctx.fillStyle = "#990000";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // Print population count
    ctx.fillStyle = "#FFFFFF";
    ctx.font="14px Arial";
    ctx.fillText(this.population.toFixed(0), this.x, this.y);
  }   
};

function Edge () {
  this.node1 = null;
  this.node2 = null;
  this.distance = null;

  this.draw = function() {
    // Draw edge
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.moveTo(node1.x, node1.y);
    ctx.lineTo(node2.x, node2.y);
    ctx.stroke();
    ctx.closePath();
  }  
};

/*
function Pool {};

function Disease {
    fatality: null,
    transmission_rate: null,    
};
*/

var nodeArr = [];
for (var i = 0; i < 10; i++) {
    var obj = new Node(Math.random()*1000, Math.random()*1000, 30);
    nodeArr.push(obj);
}

var reset = function () {};

// Update game objects
var update = function () {
  for (var i = 0; i < 10; i++) {
    nodeArr[i].update();
  }
};

// Draw everything
var render = function () {
  for (var i = 0; i < 10; i++) {
    nodeArr[i].draw();
  }
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

