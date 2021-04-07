import { handleGameGrid } from './board';
import { handleGokus } from './goku';

const CELLSIZE = 50;
const CELLGAP = 3;
const GAMEGRID = [];
const GOKUS = [];
let MONEY = 1000;

export function handleGameStatus() {
  if (MONEY > 400) {
    ctx.fillStyle = "green";
    ctx.font = "15px Arial";
  } else {
    ctx.fillStyle = "red";
    ctx.font = "15px Arial";
  }
  ctx.fillText("Money: " + MONEY, 810, 30);
}

export function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "lightgray";
  ctx.fillRect(canvas.width - CELLSIZE * 2, 0, CELLSIZE * 2, canvas.height);
  handleGameGrid();
  handleGokus();
  handleGameStatus();
  requestAnimationFrame(animate);
}
// animate();

export function collision(first, second) {
  if (
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  ) {
    return true;
  }
}
