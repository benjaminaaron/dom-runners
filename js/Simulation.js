
var Simulation = function(map) {
    this.map = map;
    this.stepcounter = 0;
};

Simulation.prototype = {
    start: function() {
        var self = this;
        function loop () {
            setTimeout(function () {
                self.map.oneRound();
                if (self.map.hasAgents()) {
                    loop();
                } else {
                    self.finishedCallback();
                }
            }, 200);
            self.stepcounter ++;
        }
        loop();
    },
    
    finishedCallback: function() {
        console.log('simulation finished ater ' + this.stepcounter + ' steps');
    }
};
