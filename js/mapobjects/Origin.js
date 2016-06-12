
var Origin = function(id, cell, spawnLimit, spawnedAgentsTargetDestinationId) {
    this.id = id;
    this.cell = cell;
    this.spawnLimit = spawnLimit;
    this.spawnedAgentsTargetDestinationId = spawnedAgentsTargetDestinationId;
    this.spawns = 0;
};

Origin.prototype = {
    chanceToSpawnAgent: function(id) {
        if (this.cell.cellType != CellType.AGENT && this.spawns < this.spawnLimit) {
            this.spawns ++;
            this.cell.type = CellType.AGENT;
            var agent = new Agent(id, this.cell, this.spawnedAgentsTargetDestinationId);
            agent.cellTypeOccupying = CellType.ORIGIN;
            return agent;
        }
        return null;
    }
};
