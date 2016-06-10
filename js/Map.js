
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
        for(var row = 0; row < this.rows; row ++) {
            for(var col = 0; col < this.cols; col ++) {
                this.cells.push(new Cell(row, col, this.cellsize));
            }
        }
    },
    
    drawCells: function() {
        var ctx = this.canvas.getContext('2d');
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
    }
};
