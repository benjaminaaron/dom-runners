
var CellType = {
    FREE: 0,
    OBSTACLE: 1,
    ORIGIN: 2,
    DESTINATION: 3,
    AGENT: 4
};

function getCellColor(type) {
    switch(type) {
        case CellType.FREE:
            return '#FFFFFF';
        case CellType.OBSTACLE:
            return '#BBBBBB';
        case CellType.ORIGN:
            return '#FFFF00';
        case CellType.DESTINATION:
            return '#FF0000';
        case CellType.AGENT:
            return '#000000';
    }
}
