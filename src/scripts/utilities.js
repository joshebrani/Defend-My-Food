// import { handleGameGrid } from './board';
// import { handleGokus } from './goku';

const CELLSIZE = 50;


  export function createMap(ctx) {
    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(0, CELLSIZE, canvas.width - CELLSIZE * 4, CELLSIZE);

    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(
      canvas.width - CELLSIZE * 4,
      CELLSIZE,
      CELLSIZE,
      canvas.height - CELLSIZE * 2
    );

    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(
      CELLSIZE,
      canvas.height - CELLSIZE * 2,
      canvas.width - CELLSIZE * 4,
      CELLSIZE
    );

    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE, CELLSIZE * 6);

    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE * 11, CELLSIZE);

    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(CELLSIZE * 11, CELLSIZE * 4, CELLSIZE, CELLSIZE * 4);
  }

export function collision(first, second) {
  if (
    !(
      first.x > second.x-1 + second.width-1 ||
      first.x + first.width-1 < second.x-1 ||
      first.y > second.y-1 + second.height-1 ||
      first.y + first.height-1 < second.y-1
    )
  ) {
    return true;
  }
}
