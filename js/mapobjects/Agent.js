
var Agent = function(id, cell, targetDestinationId) {
    this.id = id;
    this.cell = cell;
    this.targetDestinationId = targetDestinationId;
    this.cellTypeOccupying = CellType.FREE;
    this.destinationReached = false;
};
