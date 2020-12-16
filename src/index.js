

function hideTribute() {
    console.log("Hiding the tribute page")
}

function getUserInput() {
    let height = 300
    let width = 300

    return [height, width]    
}

function buildBoard(height, width) {    
        
    let parentContainer =  document.querySelector(".game-container");
    canvas = document.createElement("canvas");
    
    context = canvas.getContext("2d");
    canvas.id = "game-board";
    canvas.width = height;
    canvas.height = width;
    canvas.style.zIndex   = 8;
    canvas.style.position = "absolute";
    canvas.style.border   = "1px solid black";

    COLS = canvas.width / resolution;
    ROWS = canvas.height / resolution;

    parentContainer.appendChild(canvas);
}

function create2DArray(cols, rows) {
    return new Array(cols).fill(null)
                .map(() => new Array(rows).fill(null))
}

function fillRandom(cols, rows) {
    for (let i = 0; i < cols - 1; i++) {
        for (let j = 0; j < rows - 1; j++) {
            let num = (Math.random() * 2);
            let randomBinary = Math.floor(num);
            if (randomBinary === 1) {
                theGrid[i][j] = 1;
            } else {
                theGrid[i][j] = 0;
            }
        }
    }
}

function drawGrid(grid) {
    
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row];

            context.beginPath();
            context.rect(col * resolution, row * resolution, resolution, resolution)
            context.fillStyle = cell ? "black" : "white"; //if true, color in
            context.fill()
            context.stroke()
        }
    }
}

function updateGrid() {
    for (let col = 0; col < theGrid.length; col++) {
        for (let row = 0; row < theGrid[col].length; row++) {
            let neighborCells = 0;
            const currentCell = theGrid[col][row]

            neighborCells += theGrid[col + 1][row]
            neighborCells += theGrid[col + 1][row +1]
            neighborCells += theGrid[col][row +1]
            neighborCells += theGrid[col - 1][row + 1]
            neighborCells += theGrid[col - 1][row]
            neighborCells += theGrid[col - 1][row - 1]
            neighborCells += theGrid[col][row - 1]
            neighborCells += theGrid[col + 1][row + 1]

            switch (totalCells) {
                case 2:
                    mirrorGrid[col][row] = currentCell;
                    break;
                case 3:
                    mirrorGrid[col][row] = 1; // make live
                    break;
                default:
                    mirrorGrid[col][row] = 0;
            }
        }
    }

    for (var l = 1; l < theGrid.length - 1; l++) { //iterate through rows
        //top and bottom
        mirrorGrid[l][0] = mirrorGrid[l][theGrid.length - 3];
        mirrorGrid[l][theGrid.length - 2] = mirrorGrid[l][1];
        //left and right
        mirrorGrid[0][l] = mirrorGrid[theGrid.length - 3][l];
        mirrorGrid[theGrid.length - 2][l] = mirrorGrid[1][l];

    }


    //swap grids
    var temp = theGrid;
    theGrid = mirrorGrid;
    mirrorGrid = temp;
}

var canvas;
var context;
const resolution = 20;
var COLS;
var ROWS;
var theGrid;
var mirrorGrid;

function startGameFlow() {
    [height, width] = getUserInput()
    hideTribute()
    buildBoard(30, 30)

    theGrid = create2DArray(COLS, ROWS)
    mirrorGrid = create2DArray(COLS, ROWS);

    fillRandom(COLS, ROWS);
    drawGrid(theGrid)
    updateGrid(theGrid)
    // requestAnimationFrame(startGameFlow);
}




