
var Origin = function(id, cell) {
    this.id = id;
    cell.type = CellType.ORIGIN;
    this.cell = cell;
    
    this.spawnLimit;
    this.possibleTargetDestinationIDs;
    this.spawns = 0;
};

Origin.prototype = {
    chanceToSpawnAgent: function(id) {
        if (this.cell.cellType != CellType.AGENT && this.spawns < this.spawnLimit) {
            this.spawns ++;
            var agent = new Agent(id, this.cell);
            agent.targetDestinationId = getRandomElement(this.possibleTargetDestinationIDs);
            agent.cellTypeOccupying = CellType.ORIGIN;
            return agent;
        }
        return null;
    }
};
