
var Cell = function(row, col, type) {
    this.row = row;
    this.col = col;
    this.x = col * cellsize;
    this.y = row * cellsize;
    this.type = type;
    
    this.isOccupied = false; // by an agent
};

Cell.prototype = {
    toString: function() {
        return this.row + ' / ' + this.col;
    },

    draw: function(ctx) {
        ctx.fillStyle = getCellColor(this.type);
        ctx.fillRect(this.x, this.y, cellsize, cellsize);
    },
    
    isWalkable: function() {
        return this.type != CellType.OBSTACLE && this.type != CellType.TEMPOBSTACLE && this.type != CellType.AGENT;
    }
};
