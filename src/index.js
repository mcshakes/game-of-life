var canvas;
var context;

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
    startGame()
}

function hideForm() {
    // hiding the entire section
    let form = document.getElementsByClassName("boardInputs")[0];
    
    form.style.display = "none";
}

function startGame() {
    console.log("STARTING Context ", context)
}