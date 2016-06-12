
var cellsize = 10;
var simStepPause = 100; // ms

var debugMode = false;


function initMap() {
    var oldCanvas = document.getElementById('backgroundCanvas');
    if (oldCanvas != null) {
        oldCanvas.parentNode.removeChild(oldCanvas);
    }
    
    html2canvas(document.body, {
        //allowTaint: true,
        onrendered: function(canvasRet) {
            //document.body.appendChild(canvas);
            var imgData = canvasRet.getContext('2d').getImageData(0, 0, canvasRet.width, canvasRet.height);
            
            var canvas = document.createElement('canvas');
            canvas.id = 'backgroundCanvas';
            canvas.width = imgData.width;
            canvas.height = imgData.height;
            //backgroundCanvas.getContext('2d').putImageData(imgData, 0, 0);
            
            document.body.appendChild(canvas);
            
            var ctx = canvas.getContext('2d');
            var rows = Math.floor(canvas.height / cellsize);
            var cols = Math.floor(canvas.width / cellsize);

            var map = new Map(rows, cols, imgData, ctx);
            var simulation = new Simulation(map);
            simulation.start();
            
            document.onmousemove = function (event) {
                map.updateMousePos(event.pageX, event.pageY);
            }
        }
    });
}
