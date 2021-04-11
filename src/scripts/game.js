// import { animate } from './utilities';
import Cell from "./board";
import Goku from "./goku";
import Naruto from './naruto';
import { createMap } from "./utilities";

export function game(canvas, ctx) {
     const CELLSIZE = 50;
     const CELLGAP = 3;
     const GAMEGRID = [];
     const GOKUS = [];
     const NARUTOS = [];
     let MONEY = 1000;
     let frame = 0

     // mouse
     const mouse = {
       x: undefined,
       y: undefined,
       width: 0.1,
       height: 0.1,
     };

     canvas.addEventListener("mousemove", function (e) {
       mouse.x = e.offsetX;
       mouse.y = e.offsetY;
     });

     canvas.addEventListener("mouseleave", function () {
       mouse.x = undefined;
       mouse.y = undefined;
     });
     // board

     function createGrid() {
       for (let y = 0; y < canvas.height; y += CELLSIZE) {
         for (let x = 0; x < canvas.width - CELLSIZE * 2; x += CELLSIZE) {
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

     // projectiles

     // gokus

     canvas.addEventListener("click", function () {
       const gridPostitionX = mouse.x - (mouse.x % CELLSIZE);
       const gridPostitionY = mouse.y - (mouse.y % CELLSIZE);
       if (gridPostitionX > canvas.width - CELLSIZE * 3) return;
       for (let i = 0; i < GOKUS.length; i++) {
         if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY)
           return;
       }
       let gokuCost = 250;
       if (MONEY >= gokuCost) {
         GOKUS.push(new Goku(gridPostitionX, gridPostitionY));
         MONEY -= gokuCost;
       }
     });

     function handleGokus() {
       for (let i = 0; i < GOKUS.length; i++) {
         GOKUS[i].draw();
       }
     }

     // narutos

     function handleNarutos() {
        for (let i = 0; i < NARUTOS.length; i++) {
            NARUTOS[i].move();
            NARUTOS[i].draw();
        }
        if (frame % 200 === 0) {
            NARUTOS.push(new Naruto())
        }
     }

     // resources

     // utilities

     function handleGameStatus() {
       if (MONEY > 400) {
         ctx.fillStyle = "green";
         ctx.font = "15px Arial";
       } else {
         ctx.fillStyle = "red";
         ctx.font = "15px Arial";
       }
       ctx.fillText("Money: $" + MONEY, 802, 30);
     }

     function animate() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.fillStyle = "lightgray";
       ctx.fillRect(
         canvas.width - CELLSIZE * 2,
         0,
         CELLSIZE * 2,
         canvas.height
       );

       createMap(ctx);
       handleGameGrid();
       handleGokus();
       handleNarutos();
       handleGameStatus(ctx);
       frame++;       
       requestAnimationFrame(animate);
     }
     animate();
}


// export default Game;