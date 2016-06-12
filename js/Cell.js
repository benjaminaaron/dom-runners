
var Cell = function(row, col, cellsize, type) {
    this.row = row;
    this.col = col;
    this.x = col * cellsize;
    this.y = row * cellsize;
    this.cellsize = cellsize;
    this.type = type;
};

Cell.prototype = {
    toString: function() {
        return this.row + ' / ' + this.col;
    },

    draw: function(ctx) {
        ctx.fillStyle = getCellColor(this.type);
        ctx.fillRect(this.x, this.y, this.cellsize, this.cellsize);
    }
};
