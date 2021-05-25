import Projectile from './projectile';

const CELLSIZE = 50;
export const projectiles = []
const GAMEGRID = [];
const GOKUS = [];
let MONEY = 1000;
// const img = document.getElementById('goku');

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
    this.width = 49;
    this.height = 49;
    this.shooting = false;
    this.projectiles = [];
    this.timer = 0;
    this.img = document.getElementById("goku2");
    // this.health = 100
     
  }
  draw() {
    this.ctx.shadowColor = "aqua";
    this.ctx.shadowBlur = 15;
    this.ctx.drawImage(this.img, this.x+8, this.y,this.width-10, this.height)
  }

  shoot() {
    this.timer++;
    if (this.timer % 50 === 0) {
      projectiles.push(new Projectile(this.x + 25, this.y - 10))
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