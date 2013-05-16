var canvas = document.getElementById("mainCanvas");
  // Somewhat fullscreen canvas
    canvas.width = window.innerWidth - 20;
    canvas.height = window.innerHeight - 20;

var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
  // Canvas background color
    //ctx.fillStyle="#008A2E";
    //ctx.fillRect(0,0,canvas.width, canvas.height);

function Node (x, y, initialPopulation) {
  this.x = x;
  this.y = y;
  this.size = null;
  
  this.populationCount = initialPopulation;
  this.populationGrowthRate = 0.01;

  this.resourceCount = 1;
  this.resourceProductionRate = 0.01;
  
  this.update = function() {
      this.populationCount += this.populationGrowthRate;
      this.resourceCount += this.resourceProductionRate;

      this.size = this.populationCount;
  };
  
  this.draw = function() {
    // Draws a circle
    ctx.fillStyle = "#009933";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // Print population count
    ctx.fillStyle = "#000000";
    ctx.font="14px Arial";
    // Print population
    ctx.fillText(this.populationCount.toFixed(0), this.x + this.size + 10, this.y);
    // Print resources
    ctx.fillText(this.resourceCount.toFixed(0), this.x + this.size + 10, this.y + 15);
  }   
};

function Edge (node1, node2) {
  this.node1 = node1;
  this.node2 = node2;

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

function inRange (x1, y1, x2, y2, range) {
  if ((y1 - y2 >= range * -1 && y1 <= y2) || (y1 - y2 <= range && y1 >= y2)) {
    if ((x1 - x2 >= range * -1 && x1 <= x2) || (x1 - x2 <= range && x1 >= x2)) {
      return true;
    }
  }
  return false;
};

var nodeArr = [];
for (var i = 0; i < 10; i++) {
    var obj = new Node(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*30);
    nodeArr.push(obj);
}

var edgeArr = [];
for (var i = 0; i < nodeArr.length; i++) {
  for (var j = 0; j < nodeArr.length; j++) {
    if (inRange(nodeArr[i].x, nodeArr[i].y, nodeArr[j].x, nodeArr[j].y, 300) == true) {
      var obj = new Edge(nodeArr[i], nodeArr[j]);
      edgeArr.push(obj);
    }
  }
}

var reset = function () {
};

// Update game objects
var update = function () {
  for (var i = 0; i < nodeArr.length; i++) {
    nodeArr[i].update();
  }
};

// Draw everything
var render = function () {
  // Clear canvas for redrawing
  ctx.clearRect (0, 0, canvas.width, canvas.height);

  for (var i = 0; i < edgeArr.length; i++) {
    edgeArr[i].draw();
  }

  for (var i = 0; i < nodeArr.length; i++) {
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
