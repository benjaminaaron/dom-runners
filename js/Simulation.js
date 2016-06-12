
var Simulation = function(map) {
    this.map = map;
    
    this.agents = [];
    this.origins = [];
    this.destinations = [];
    this.collectMapObjects();
};

Simulation.prototype = {
    collectMapObjects: function() {
        
        for(var i = 0; i < map.cells.length; i ++) {
            var cell = map.cells[i];
            switch(cell.type) {
                case CellType.AGENT:
                    this.agents.push(new Agent(cell));
                    break;
                case CellType.ORIGIN:
                    this.origins.push(new Origin(cell, this.addAgent));
                    break;
                case CellType.DESTINATION:
                    this.destinations.push(new Destination(cell, this.removeAgent));
                    break;
            }
        }
    }, 
    
    addAgent: function(agent) {    
    
    },
    
    removeAgent: function(agent) {
        
    }
};
