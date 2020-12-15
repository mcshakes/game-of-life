

function hideForm() {
    let form = document.getElementsByClassName("boardInputs")[0];
    form.style.display = "none";
}

function getUserInput() {
    let height = document.getElementById('height').value;
    let width = document.getElementById('width').value;

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
    let arr = new Array(cols);

    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
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
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            let neighborCells = 0;
            const cell = grid[col][row];




        }
    }
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
    hideForm()
    buildBoard(400, 400)

    theGrid = create2DArray(COLS, ROWS)
    mirrorGrid = create2DArray(COLS, ROWS);

    fillRandom(COLS, ROWS);
    drawGrid(theGrid)
}




