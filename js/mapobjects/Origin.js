
var Origin = function(id, cell, spawnLimit, spawnedAgentsTargetDestinationId) {
    this.id = id;
    cell.type = CellType.ORIGIN;
    this.cell = cell;
    this.spawnLimit = spawnLimit;
    this.spawnedAgentsTargetDestinationId = spawnedAgentsTargetDestinationId;
    this.spawns = 0;
};

Origin.prototype = {
    chanceToSpawnAgent: function(id) {
        if (this.cell.cellType != CellType.AGENT && this.spawns < this.spawnLimit) {
            this.spawns ++;
            var agent = new Agent(id, this.cell, this.spawnedAgentsTargetDestinationId);
            agent.cellTypeOccupying = CellType.ORIGIN;
            return agent;
        }
        return null;
    }
};
