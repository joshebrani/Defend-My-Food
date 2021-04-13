import Projectile from './projectile';

const CELLSIZE = 50;
export const projectiles = []
const CELLGAP = 3;
const GAMEGRID = [];
const GOKUS = [];
let MONEY = 1000;

const mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
};

class Goku {
  constructor(x, y) {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = CELLSIZE;
    this.height = CELLSIZE;
    this.shooting = false;
    this.projectiles = [];
    this.timer = 0;
    this.health = 100
     
  }
  draw() {
    this.ctx.fillStyle = "blue";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = "gold";
    this.ctx.font = "10px Arial";
        this.ctx.fillText(
          Math.floor(this.health) + "HP",
          this.x + 12,
          this.y + 10
        );
    this.ctx.fillText("Goku", this.x + 15, this.y + 30);
  }

  shoot() {
    this.timer++;
    if (this.timer % 50 === 0) {
      projectiles.push(new Projectile(this.x + 70, this.y + 25))
    }
  }
}


// export function handleGokus() {
//   for (let i = 0; i < GOKUS.length; i++) {
//     GOKUS[i].draw();
//   }
// }


export default Goku


 //  this.canvas.addEventListener("mousemove", function (e) {
      //    mouse.x = e.offsetX;
      //    mouse.y = e.offsetY;
      //  });

      //  this.canvas.addEventListener("mouseleave", function () {
      //    mouse.x = undefined;
      //    mouse.y = undefined;
      //  });
      //  this.canvas.addEventListener("click", function () {
      //    const gridPostitionX = mouse.x - (mouse.x % CELLSIZE);
      //    const gridPostitionY = mouse.y - (mouse.y % CELLSIZE);
      //    if (gridPostitionY < CELLSIZE) return;
      //    for (let i = 0; i < GOKUS.length; i++) {
      //      if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY) return;
      //    }
      //    let gokuCost = 100;
      //    if (MONEY >= gokuCost) {
      //      GOKUS.push(new Goku(gridPostitionX, gridPostitionY));
      //      MONEY -= gokuCost;
      //    }
      //  });