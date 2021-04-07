const CELLSIZE = 50;
const CELLGAP = 3;
const GAMEGRID = [];
const GOKUS = [];
let MONEY = 1000;

class Goku {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = CELLSIZE;
    this.height = CELLSIZE;
    this.shooting = false;
    this.projectiles = [];
    this.timer = 0;
    // this.health = 100
  }
  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "gold";
    ctx.font = "10px Arial";
    // ctx.fillText(Math.floor(this.health), this.x + 15, this.height + 30);
    ctx.fillText("Goku", this.x + 15, this.y + 30);
  }
}

canvas.addEventListener("click", function () {
  const gridPostitionX = mouse.x - (mouse.x % CELLSIZE);
  const gridPostitionY = mouse.y - (mouse.y % CELLSIZE);
  if (gridPostitionY < CELLSIZE) return;
  for (let i = 0; i < GOKUS.length; i++) {
    if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY) return;
  }
  let gokuCost = 100;
  if (MONEY >= gokuCost) {
    GOKUS.push(new Goku(gridPostitionX, gridPostitionY));
    MONEY -= gokuCost;
  }
});

export function handleGokus() {
  for (let i = 0; i < GOKUS.length; i++) {
    GOKUS[i].draw();
  }
}


