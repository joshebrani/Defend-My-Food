import Projectile from './projectile';

export const projectiles = []

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

export default Goku

