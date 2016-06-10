
var Map = function(cellsize, canvas) {
    this.cellsize = cellsize;
    this.canvas = canvas;
    this.cols = Math.floor(canvas.width / cellsize);
    this.rows = Math.floor(canvas.width / cellsize);
    this.cells = [];
    this.initCells();
};

Map.prototype = {
    initCells: function() {
        this.loopTroughCells(function(row, col) {
            this.cells.push(new Cell(row, col, this.cellsize));
       }.bind(this));
    },
    
    loopTroughCells(callback) {
        for(var row = 0; row < this.rows; row ++) {
            for(var col = 0; col < this.cols; col ++) {
                callback(row, col);
            }
        }
    },
    
    drawGrid: function() {
        var ctx = this.canvas.getContext('2d');
        ctx.strokeStyle = "#999999";
        var width = this.cols * cellsize;
        var height = this.rows * cellsize;
        // horizontals
        for(var x = 0; x <= width; x += cellsize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        // verticals
        for(var y = 0; y <= height; y += cellsize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
    },
    
    identifyCellTypes: function(screenshotCtx) {
        this.loopTroughCells(function(row, col) {
            this.getCell(row, col).identifyType(screenshotCtx);
       }.bind(this));
   },
   
   getCell: function(row, col) {
       return this.cells[this.cols * row + col];
   },
   
   drawCells: function() {
       var ctx = this.canvas.getContext('2d');
       ctx.fillStyle = "#FFFF00";
       this.loopTroughCells(function(row, col) {
           this.getCell(row, col).draw(ctx);
      }.bind(this));
   }
};
