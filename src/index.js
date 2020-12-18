

function hideTribute() {
    console.log("Hiding the tribute page")

    let myTribute = document.getElementById("tribute")
    let displaySetting = myTribute.style.display;

    if (displaySetting == "flex") {
        myTribute.style.display = "none";
    } 
}

function showGameBoard() {
    let gameBoard = document.getElementById("game-container")
    let displaySetting = gameBoard.style.display;

    if (displaySetting == "none") {
        gameBoard.style.display = "block";
    } 
}




function startGameFlow() {
    hideTribute()
    showGameBoard()
    var gameWorld = new GameWorld("game")
}

class GameWorld {
    static numColumns = 75;
    static numRows = 40;

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId)
        this.context = this.canvas.getContext("2d");
        this.gameObjects = [];

        this.createGrid();

        // Request an animation frame for the first time
        window.requestAnimationFrame(() => this.gameLoop());
    }

    createGrid() {
        for (let y = 0; y < GameWorld.numRows; y++) {
            for (let x = 0; x < GameWorld.numColumns; x++) {
                this.gameObjects.push(new Cell(this.context, x, y));
            }
        }
    }

    checkSurroundings () {
        // Loop over all cells
        for (let x = 0; x < GameWorld.numColumns; x++) {
            for (let y = 0; y < GameWorld.numRows; y++) {

                // Count the nearby population
                let numAlive = this.isAlive(x - 1, y - 1) + this.isAlive(x, y - 1) + this.isAlive(x + 1, y - 1) + this.isAlive(x - 1, y) + this.isAlive(x + 1, y) + this.isAlive(x - 1, y + 1) + this.isAlive(x, y + 1) + this.isAlive(x + 1, y + 1);
                let centerIndex = this.gridToIndex(x, y);

                if (numAlive == 2){
                    // Do nothing
                    this.gameObjects[centerIndex].nextAlive = this.gameObjects[centerIndex].alive;
                }else if (numAlive == 3){
                    // Make alive
                    this.gameObjects[centerIndex].nextAlive = true;
                }else{
                    // Make dead
                    this.gameObjects[centerIndex].nextAlive = false;
                }
            }
        }

        // Apply the new state to the cells
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].alive = this.gameObjects[i].nextAlive;
        }
    }

    gameLoop() {
        this.checkSurroundings();

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].draw();
        }

        // The loop function has reached it's end, keep requesting new frames
        setTimeout( () => {
            window.requestAnimationFrame(() => this.gameLoop());
        }, 100)
    }

    isAlive(x, y) {
        if (x < 0 || x >= GameWorld.numColumns || y < 0 || y >= GameWorld.numRows){
            return false;
        }

        return this.gameObjects[this.gridToIndex(x, y)].alive?1:0;
    }

    gridToIndex(x, y){
        return x + (y * GameWorld.numColumns);
    }

}




class Cell {
    static width = 10;
    static height = 10;

    constructor (context, gridX, gridY) {
        this.context = context;
        this.gridX = gridX;
        this.gridY = gridY;

        this. alive = Math.random() > 0.5; //True or False
    }

    draw() {
        this.context.fillStyle = this.alive ? "#ff8080" : "#303030";
        this.context.fillRect(this.gridX * Cell.width, this.gridY * Cell.height, Cell.width, Cell.height)
    }
}