
var Cell = function(row, col, cellsize) {
    this.row = row;
    this.col = col;
    this.cellsize = cellsize;
    console.log(this.toString());
};

Cell.prototype = {
    toString: function() {
        return this.row + ' / ' + this.col;
    }
};
