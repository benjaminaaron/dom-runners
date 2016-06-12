
var Agent = function(id, cell) {
    this.id = id;
    this.cell = cell;

};

Agent.prototype = {
    makeMove: function(map) {
        console.log('agent ' + this.id + ' making move');
        var freeNeigbourCells = map.getFreeNeighbourCells(this.cell);
        
        

    }
};
