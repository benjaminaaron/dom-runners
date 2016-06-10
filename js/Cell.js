
var Cell = function(row, col, cellsize) {
    this.row = row;
    this.col = col;
    this.x = col * cellsize;
    this.y = row * cellsize;
    this.cellsize = cellsize;
    this.isFree; // for only free or not free, later: enums
};

Cell.prototype = {
    toString: function() {
        return this.row + ' / ' + this.col;
    },
    
    identifyType: function(screenshotCtx) {
        this.isFree = this.hasOnlyWhitePixels(screenshotCtx.getImageData(this.x, this.y, this.cellsize, this.cellsize));
    },
    
    hasOnlyWhitePixels: function(imgData) {
        for (var i = 0; i < imgData.data.length; i += 4) {
            if(imgData.data[i + 3] != 0) { // we're not actually looking for white pixel but those with zero alpha
                return false;
            }
        }
        return true;
    },
    
    draw: function(ctx) {
        if (this.isFree) {
            ctx.fillRect(this.x, this.y, cellsize, cellsize);
        }
    }
};
