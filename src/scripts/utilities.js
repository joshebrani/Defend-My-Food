// import { handleGameGrid } from './board';
// import { handleGokus } from './goku';

const CELLSIZE = 50;


  export function createMap(ctx) {
    ctx.shadowColor = "black";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(0, CELLSIZE, canvas.width - CELLSIZE * 4, CELLSIZE);

    // ctx.fillStyle = "#7cfc00";
    ctx.fillRect(
      canvas.width - CELLSIZE * 4,
      CELLSIZE,
      CELLSIZE,
      canvas.height - CELLSIZE * 2
    );

    // ctx.fillStyle = "#7cfc00";
    ctx.fillRect(
      CELLSIZE,
      canvas.height - CELLSIZE * 2,
      canvas.width - CELLSIZE * 4,
      CELLSIZE
    );

    // ctx.fillStyle = "#7cfc00";
    ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE, CELLSIZE * 6);

    // ctx.fillStyle = "#7cfc00";
    ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE * 11, CELLSIZE);

    // ctx.fillStyle = "#7cfc00";
    ctx.fillRect(CELLSIZE * 11, CELLSIZE * 4, CELLSIZE, CELLSIZE * 4);
  }

export function collision(first, second) {
  // if (
  //   !(
  //     first.x > second.x + second.width ||
  //     first.x + first.width < second.x ||
  //     first.y > second.y + second.height ||
  //     first.y + first.height < second.y
  //   )
  // ) {
  //   return true;
  // }
  return (
    first.x < second.x + second.width &&
    first.x + first.width > second.x &&
    first.y < second.y + second.height &&
    first.y + first.height > second.y
  ) 
}
