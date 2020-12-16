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

export default Cell;