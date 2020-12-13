var canvas;
var context;
const resolution = 40;

function buildGrid() {
    const COLS = canvas.width / resolution;
    const ROWS = canvas.height / resolution;

    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(0)
            .map(() => Math.floor(Math.random() * 2)));  // random fill of 1 or 0
}

function renderBoard() {    
    let input_height = document.getElementById('height').value;
    let input_width = document.getElementById('width').value;
    
    let parentContainer =  document.getElementsByClassName("game-container")[0];

    canvas = document.createElement("canvas");
    
    context = canvas.getContext("2d");
    canvas.id = "game-board";
    canvas.width = input_width;
    canvas.height = input_height;
    canvas.style.zIndex   = 8;
    canvas.style.position = "absolute";
    canvas.style.border   = "1px solid black";

    const COLS = canvas.width / resolution;
    const ROWS = canvas.height / resolution;

    parentContainer.appendChild(canvas);

    hideForm()

    let grid = buildGrid();
    update(grid)
}


function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row]

            context.beginPath();
            context.rect(col * resolution, row * resolution, resolution, resolution);
            context.fillStyle = cell ? "black" : "white";
            context.fill()
            context.stroke();
        }
    }
}


function hideForm() {
    // hiding the entire section
    let form = document.getElementsByClassName("boardInputs")[0];

    form.style.display = "none";
}

function nextGen(grid, columns, rows) {
    const nextGen = grid.map(arr => [...arr]); // a copy of the grid array

    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row]
            let numNeighbors = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    // Create a 3 by 3 grid to check surrounding of the current cell (0,0)

                    if (i === 0 && j === 0) {
                        continue;
                    }

                    const x_cell = col + i;
                    const y_cell = row + j;

                    if (x_cell >= 0 && y_cell >= 0 && x_cell < columns && y_cell < rows) { // If you aren't in the edges
                        const currentNeighbor = grid[col + i][row + j];
                        numNeighbors += currentNeighbor;
                    }

                    
                }
            }

            // apply rules here after we get all the neighbors to study

            if (cell === 1 && numNeighbors < 2) {
                nextGen[col][row] = 0;
            }
            else if (cell === 1 && numNeighbors > 3) {
                nextGen[col][row] = 0;
            } 
            else if (cell === 0 && numNeighbors === 3) {
                nextGen[col][row] = 1;
            }
        }
    }

    return nextGen;
}

requestAnimationFrame(update);

function update(in_grid) {
    grid = nextGen(in_grid, COLS, ROWS);
    render(grid);
    requestAnimationFrame(update);
}
