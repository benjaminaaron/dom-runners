
var Map = function(cellsize, canvas) {
    this.cellsize = cellsize;
    this.canvas = canvas;
    this.cols = Math.floor(canvas.width / cellsize);
    this.rows = Math.floor(canvas.width / cellsize);
    this.cells = [];
};

Map.prototype = {
    initCells: function(imgData) {
        this.loopTroughCells(function(row, col) {
            this.cells.push(new Cell(row, col, this.cellsize, this.hasOnlyWhitePixels(row, col, imgData)));
       }.bind(this));
    },
    
    hasOnlyWhitePixels: function(row, col, imgData) { // imgData.data is a 1-dim-array (rows next to each other) of the pixels, where each pixel has 4 entries (rgba)
        var yStart = row * this.cellsize;
        var yEnd = yStart + this.cellsize;
        for(var y = yStart; y < yEnd; y ++) {
            var indexStart = 4 * (y * imgData.width + col * this.cellsize);
            var indexEnd = indexStart + 4 * this.cellsize;
            for(var index = indexStart; index < indexEnd; index ++) {
                if (imgData.data[index + 3] != 0) { // only check the alpha-value
                    return false;
                }
            }
        }
        return true;
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
