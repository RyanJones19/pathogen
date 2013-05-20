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
      this.size = this.populationCount;
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

    drawCircle(this.x, this.y, this.size, "#009933");          // Draw green pop circle
    drawCircle(this.x, this.y, this.infectedPopulationCount, "#FF3300");  // Draw orange infected circle    
    drawCircle(this.x, this.y, this.deadPopulationCount, "#0F0F0F");      // Draw black death circle

    ctx.fillStyle = "#000000";
    ctx.font="14px Arial";
    ctx.fillText(this.populationCount.toFixed(0), this.x + this.size + 10, this.y); // Print population
    ctx.fillText(this.resourceCount.toFixed(0), this.x + this.size + 10, this.y + 15); // Print resources
  }   
};