
var Cell = function(row, col, cellsize, isFree) {
    this.row = row;
    this.col = col;
    this.cellsize = cellsize;
    this.isFree = isFree;
};

Cell.prototype = {
    toString: function() {
        return this.row + ' / ' + this.col;
    },

    draw: function(ctx) {
        if (this.isFree) {
            var x = this.col * this.cellsize;
            var y = this.row * this.cellsize;
            ctx.fillRect(x, y, this.cellsize, this.cellsize);
        }
    }
};
