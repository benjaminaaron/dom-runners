
var Agent = function(id, cell) {
    this.id = id;
    cell.type = CellType.AGENT;
    this.cell = cell;
    this.cellTypeOccupying = CellType.FREE; // to restore it after leaving it
    this.destinationReached = false;
    
    this.targetDestinationId;
};
