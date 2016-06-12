
var Map = function(cellsize, rows, cols, imgData, ctx) {
    this.cellsize = cellsize;
    this.rows = rows;
    this.cols = cols;
    this.cells = [];
    
    this.agents = [];
    this.origins = [];
    this.destinations = [];
    
    this.ctx = ctx;
    this.initCells(imgData);
    
    this.freeCells = [];
    this.collectFreeCells();
    
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
        var agents = 10;
        var origins = 3;
        var destinations = 2;
        
        // agents
        for(var i = 0; i < agents; i ++)
            this.addRandomAgent();
        
        // origins
        for(var i = 0; i < origins; i ++)
            this.addRandomOrigin();
        
        // destinations
        for(var i = 0; i < destinations; i ++)
            this.addRandomDestination();
        
        var destinationIDs = Array.apply(null, {length: this.destinations.length}).map(Number.call, Number); // via stackoverflow.com/a/20066663
        this.wireAgentsToDestinations(destinationIDs);
        this.configureOrigins(destinationIDs, 5, 10);
        
        /*this.addAgent(this.getCell(8, 6));
        this.addAgent(this.getCell(10, 10));
        this.addAgent(this.getCell(9, 14));
        this.addOrigin(this.getCell(4, 6));
        this.addDestination(this.getCell(17, 16));*/
    },
    
    collectFreeCells: function() {
        for(var i in this.cells) {
            var cell = this.cells[i];
            if(cell.type == CellType.FREE)
                this.freeCells.push(cell);
        }
    },
    
    getRandomFreeCell: function() {
        return this.freeCells.splice(getRandomIndex(this.freeCells), 1)[0];
    },
    
    addRandomAgent: function(cell) {
        this.agents.push(new Agent(this.agents.length, this.getRandomFreeCell()));
    },
    
    addRandomOrigin: function(cell) {
        this.origins.push(new Origin(this.destinations.length, this.getRandomFreeCell()));
    },
    
    addRandomDestination: function(cell) {
        this.destinations.push(new Destination(this.destinations.length, this.getRandomFreeCell()));
    },
    
    wireAgentsToDestinations: function(destinationIDs) {
        for(var i in this.agents)
            this.agents[i].targetDestinationId = getRandomElement(destinationIDs);
    },
    
    configureOrigins: function(destinationIDs, minSpawnLimit, maxSpawnLimit) {
        for(var i in this.origins) {
            this.origins[i].spawnLimit = getRandomIntBetween(minSpawnLimit, maxSpawnLimit);
            this.origins[i].possibleTargetDestinationIDs = destinationIDs; // TODO allow (random) subsets of that
        }
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
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        // verticals
        for(var y = 0; y <= height; y += cellsize) {
            ctx.beginPath();
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
    
    oneRound: function() {
        // origins
        for(var i in this.origins) {
            var origin = this.origins[i];
            var spawnedAgent = origin.chanceToSpawnAgent(this.agents.length);
            if(spawnedAgent != null)
                this.agents.push(spawnedAgent);
        }
        // agents
        for(var i in this.agents) {
            var agent = this.agents[i];
            if (!agent.destinationReached) {
                var freeNeigbourCells = this.getFreeNeighbourCells(agent.cell);
                var chosenCell = null;
                var minDist = Number.MAX_VALUE;
                for(var j in freeNeigbourCells) {
                    var neighbourCell = freeNeigbourCells[j];
                    var distToTargetDestination = this.getDistanceBetweenCells(neighbourCell, this.destinations[agent.targetDestinationId].cell);
                    if (distToTargetDestination < minDist) {
                        minDist = distToTargetDestination;
                        chosenCell = neighbourCell;
                    }
                }
                if (chosenCell != null) // if the agent is surrounded by non-walkable cells
                    this.moveAgent(agent, chosenCell);
            } else {
                this.removeAgent(agent);
            }
        }
        this.draw();
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
    },
    
    getDistanceBetweenCells: function(cell1, cell2) {
        return Math.sqrt(Math.pow(cell2.col - cell1.col, 2) + Math.pow(cell2.row - cell1.row, 2));
    },
    
    moveAgent: function(agent, targetCell) {
        if(targetCell == this.destinations[agent.targetDestinationId].cell)
            agent.destinationReached = true;
        agent.cell.type = agent.cellTypeOccupying; // restore the cell we stayed on
        agent.cellTypeOccupying = targetCell.type;
        targetCell.type = CellType.AGENT;
        agent.cell = targetCell;
    },
    
    removeAgent: function(agent) {
        agent.cell.type = CellType.DESTINATION;
        this.agents.splice(this.agents.indexOf(agent), 1);
    },
    
    hasAgents: function() {
        return this.agents.length > 0;
    }
};
