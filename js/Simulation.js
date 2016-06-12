
var Simulation = function(map) {
    this.map = map;
    
    this.agents = [];
    this.origins = [];
    this.destinations = [];
    this.collectMapObjects();
};

Simulation.prototype = {
    collectMapObjects: function() {
        
        for(var i in map.cells) {
            var cell = map.cells[i];
            switch(cell.type) {
                case CellType.AGENT:
                    this.agents.push(new Agent(this.agents.length, cell));
                    break;
                case CellType.ORIGIN:
                    this.origins.push(new Origin(this.origins.length, cell, this.addAgent));
                    break;
                case CellType.DESTINATION:
                    this.destinations.push(new Destination(this.destinations.length, cell, this.removeAgent));
                    break;
            }
        }
    }, 
    
    addAgent: function(agent) {    
    
    },
    
    removeAgent: function(agent) {
        
    },
    
    start: function() {
        this.running = true;
        
        while(this.running) {
            for(var i in this.agents) {
                var agent = this.agents[i];
                agent.makeMove(this.map);
            }
            this.running = false;
        }
    }
};
