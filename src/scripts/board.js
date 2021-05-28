const CELLSIZE = 50;

import { collision } from './utilities';

const mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
};

class Cell {
  constructor(x, y) {
    this.canvas = document.getElementById('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.x = x;
    this.y = y;
    this.width = CELLSIZE;
    this.height = CELLSIZE;
    this.canvas.addEventListener("mousemove", function (e) {
      mouse.x = e.offsetX;
      mouse.y = e.offsetY;
    });

    this.canvas.addEventListener("mouseleave", function () {
      mouse.x = undefined;
      mouse.y = undefined;
    });
  }
  draw() {
    if (mouse.x && mouse.y && collision(this, mouse)) {
      this.ctx.strokeStyle = "red";
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}


export default Cell
