var canvas = document.getElementById("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");

var nodeArr = [];
var edgeArr = [];

// Handle Mouse Position
var mouseX, mouseY;
canvas.addEventListener("mousemove", getPosition, false);

function getPosition (event)
{
  var canvas = document.getElementById("canvas");
  mouseX = event.x - canvas.offsetLeft;
  mouseY = event.y - canvas.offsetTop;
}

function inRange (x1, y1, x2, y2, range) 
{
  if ((y1 - y2 >= range * -1 && y1 <= y2) || (y1 - y2 <= range && y1 >= y2)) {
    if ((x1 - x2 >= range * -1 && x1 <= x2) || (x1 - x2 <= range && x1 >= x2)) 
      return true;
  }
  return false;
}

/*
 * Initialize game objects
 */
/*
 
 */

function reset() 
{
  for (var i = 0; i < 10; i++) {
    // Create offset from edges of canvas
    var tmpX = (Math.random()*(canvas.width-250)) +50;
    var tmpY = (Math.random()*(canvas.height-50)) +50;
    var tmpSize = Math.random()*40 +10;

    var obj = new Node(tmpX, tmpY, tmpSize);
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
}

/*
 * Update game objects
 *
 */
function update () 
{
  for (var i = 0; i < nodeArr.length; i++)
    nodeArr[i].update();

  for (var j = 0; j < nodeArr.length; j++) {
    if (inRange(nodeArr[j].x, nodeArr[j].y, mouseX, mouseY, nodeArr[j].populationCount) == true) {
      if (nodeArr[j].infectedPopulationCount > 0.1) {
        nodeArr[j].infectedPopulationCount -= 0.1;
      }
    }
  }
}

/*
 * Draw everything
 *
 */
function render () 
{
  // Clear canvas for redrawing
  ctx.clearRect (0, 0, canvas.width, canvas.height);                  

  // Set Canvas background color
  ctx.fillStyle = "#3ca9d0";
  ctx.fillRect(0,0,canvas.width, canvas.height);                      

  // Draw Sidebar
  ctx.fillStyle = "#0F0F0F";
  ctx.fillRect(canvas.width - 150, 0, canvas.width, canvas.height);   

  // Draw Edges
  for (var i = 0; i < edgeArr.length; i++) 
    edgeArr[i].draw();

  // Draw Nodes
  for (var i = 0; i < nodeArr.length; i++) 
    nodeArr[i].draw();

  // Draw Mouse Pos
  ctx.fillStyle = "#FFFFFF";
  ctx.font="14px Arial";
  ctx.fillText("X: " + mouseX, canvas.width - 125, 25);
  ctx.fillText("Y: " + mouseY, canvas.width - 125, 50); 
}

/*
 * The main game loop
 *
 */
function main () 
{
  var now = Date.now();
  var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
}

/*
 * Load game
 *
 */
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible 
