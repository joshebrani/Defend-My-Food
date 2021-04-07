const CELLSIZE = 50;
const CELLGAP = 3;
const GAMEGRID = [];
const GOKUS = [];
let MONEY = 1000;

class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = CELLSIZE;
    this.height = CELLSIZE;
  }
  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      ctx.strokeStyle = "red";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

function createGrid() {
  for (let y = CELLSIZE; y < canvas.height; y += CELLSIZE) {
    for (let x = 0; x < canvas.width; x += CELLSIZE) {
      GAMEGRID.push(new Cell(x, y));
    }
  }
}

createGrid();

function handleGameGrid() {
  for (let i = 0; i < GAMEGRID.length; i++) {
    GAMEGRID[i].draw();
  }
}
