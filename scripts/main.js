var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

var nodeArr = [];
var edgeArr = [];

function Node (x, y, initialPopulation) {
  this.x = x;
  this.y = y;
  this.size = null;
  
  this.populationCount = initialPopulation;
  this.populationGrowthRate = 0.000002;

  this.infectedPopulationCount = 1;
  this.infectionTransmissionRate = 0.00015;

  this.deadPopulationCount = 0;
  this.populationDeathRate = 0.001;

  this.resourceCount = 1;
  this.resourceProductionRate = 0.001;
  
  this.update = function() {
      this.populationCount += this.populationCount * this.populationGrowthRate;
      this.infectedPopulationCount += this.populationCount * this.infectionTransmissionRate;
      this.deadPopulationCount += this.infectedPopulationCount * this.populationDeathRate;
      this.resourceCount += this.resourceProductionRate;
      //this.size = this.populationCount;
  };
  
  this.draw = function() {
    function drawCircle (x, y, size, color) {
      ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(x, y, size, 0, 2*Math.PI);
      ctx.stroke();
      ctx.closePath();
      ctx.fill();
    };

    drawCircle(this.x, this.y, this.populationCount, "#009933");          // Draw green pop circle
    drawCircle(this.x, this.y, this.infectedPopulationCount, "#FF3300");  // Draw orange infected circle    
    drawCircle(this.x, this.y, this.deadPopulationCount, "#0F0F0F");      // Draw black death circle

    ctx.fillStyle = "#000000";
    ctx.font="14px Arial";
    ctx.fillText(this.populationCount.toFixed(0), this.x + this.size + 10, this.y); // Print population
    ctx.fillText(this.resourceCount.toFixed(0), this.x + this.size + 10, this.y + 15); // Print resources
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
 * Initialize game objects
 */
var reset = function () {
  function inRange (x1, y1, x2, y2, range) {
    if ((y1 - y2 >= range * -1 && y1 <= y2) || (y1 - y2 <= range && y1 >= y2)) {
      if ((x1 - x2 >= range * -1 && x1 <= x2) || (x1 - x2 <= range && x1 >= x2)) 
        return true;
    }
    return false;
  };

  for (var i = 0; i < 10; i++) {
    var obj = new Node(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*100);
    nodeArr.push(obj);
  }

  for (var i = 0; i < nodeArr.length; i++) {
    for (var j = 0; j < nodeArr.length; j++) {
      if (inRange(nodeArr[i].x, nodeArr[i].y, nodeArr[j].x, nodeArr[j].y, 300) == true) {
        var obj = new Edge(nodeArr[i], nodeArr[j]);
        edgeArr.push(obj);
      }
    }
  }
};

/*
 * Update game objects
 *
 */
var update = function () {
  for (var i = 0; i < nodeArr.length; i++)
    nodeArr[i].update();
};

/*
 * Draw everything
 *
 */
var render = function () {
  ctx.clearRect (0, 0, canvas.width, canvas.height);                  // Clear canvas for redrawing

  ctx.fillStyle = "#7A8B8B";
  ctx.fillRect(0,0,canvas.width, canvas.height);                      // Set Canvas background color

  ctx.fillStyle = "#0F0F0F";
  ctx.fillRect(canvas.width - 150, 0, canvas.width, canvas.height);   // Draw Sidebar

  for (var i = 0; i < edgeArr.length; i++) 
    edgeArr[i].draw();

  for (var i = 0; i < nodeArr.length; i++) 
    nodeArr[i].draw();
};

/*
 * The main game loop
 *
 */
var main = function () {
  var now = Date.now();
  var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

/*
 * Load game
 *
 */
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible 
