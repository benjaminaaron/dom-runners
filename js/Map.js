
var Map = function(cellsize, rows, cols, imgData, ctx) {
    this.cellsize = cellsize;
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    
    this.ctx = ctx;
    this.initCells(imgData);
    this.placeMapObjects();
    this.draw();
};

Map.prototype = {
    initCells: function(imgData) {
        this.loopTroughCells(function(row, col) {
            var cellType = this.hasOnlyWhitePixels(row, col, imgData) ? CellType.FREE : CellType.OBSTACLE;
            this.cells.push(new Cell(row, col, this.cellsize, cellType));
        }.bind(this));
    },
    
    hasOnlyWhitePixels: function(row, col, imgData) { // imgData.data is a 1-dim-array (rows next to each other) of the pixels, where each pixel has 4 entries (rgba)
        var yStart = row * this.cellsize;
        var yEnd = yStart + this.cellsize;
        for(var y = yStart; y < yEnd; y ++) {
            var indexStart = 4 * (y * imgData.width + col * this.cellsize);
            var indexEnd = indexStart + 4 * this.cellsize;
            for(var index = indexStart; index < indexEnd; index += 2 * 4) {
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
    
    placeMapObjects: function() {
        //TODO some clever random mechanism
        this.getCell(8, 6).type = CellType.AGENT;
        this.getCell(10, 10).type = CellType.AGENT;
        this.getCell(9, 14).type = CellType.AGENT;
        this.getCell(4, 6).type = CellType.ORIGIN;
        this.getCell(17, 16).type = CellType.DESTINATION;
    },
    
    getCell: function(row, col) {
        if(row < 0 || row >= this.rows.length || col < 0 || col >= this.cols.length)
            return null;
        return this.cells[this.cols * row + col];
    },
    
    draw() {
        this.drawCells(this.ctx);
        this.drawGrid(this.ctx);
    },
    
    drawGrid: function(ctx) {
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
   
    drawCells: function(ctx) {
        this.loopTroughCells(function(row, col) {
            this.getCell(row, col).draw(ctx);
        }.bind(this));
    },
    
    getFreeNeighbourCells: function(cell) {
        var freeNeigbourCells = [];
        var dirs = neighbourDirections();
        for(var i in dirs) {
            var neighbourCell = this.getCell(cell.row + dirs[i][0], cell.col + dirs[i][1]);
            if(neighbourCell != null && neighbourCell.isWalkable())
                freeNeigbourCells.push(neighbourCell);
        }
        return freeNeigbourCells;
    }
};
