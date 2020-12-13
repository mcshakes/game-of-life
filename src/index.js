var canvas;
var context;
const resolution = 40;

function buildGrid() {
    const COLS = canvas.width / resolution;
    const ROWS = canvas.height / resolution;

    return new Array(COLS).fill(null)
        .map(() => new Array(ROWS).fill(0)
            .map(() => Math.floor(Math.random() * 2)));
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

    parentContainer.appendChild(canvas);

    hideForm()

    let grid = buildGrid();

    console.log(grid)
    // render(grid);
}

function render(grid) {
    for (let col = 0; col < grid.length; col++) {
        for (let row = 0; row < grid[col].length; row++) {
            const cell = grid[col][row]

            context.beginPath();
            context.rect(col * resolution, row * resolution, resolution, resolution);
            context.stroke();
        }
    }
}

function hideForm() {
    // hiding the entire section
    let form = document.getElementsByClassName("boardInputs")[0];

    form.style.display = "none";
}
