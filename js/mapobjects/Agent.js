
var Agent = function(id, cell, targetDestinationId) {
    this.id = id;
    cell.type = CellType.AGENT;
    this.cell = cell;
    this.targetDestinationId = targetDestinationId;
    this.cellTypeOccupying = CellType.FREE; // to restore it after leaving it
    this.destinationReached = false;
};
