// import { animate } from './utilities';
import Cell from "./board";
import Goku, { projectiles } from "./goku";
import Naruto from './naruto';
import Projectile from './projectile'
import { collision, createMap } from "./utilities";

export let killCount = 0;

export function game(canvas, ctx) {
     const CELLSIZE = 50;
     const GAMEGRID = [];
     const GOKUS = [];
     const NARUTOS = [];
     let MONEY = 1000;
     let frame = 0;
     let gameOver = false;
    //  const projectiles = [];

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

     function handleProjectiles() {
       for (let i = 0; i < projectiles.length; i++) {
         if (i % 2 === 0 && i%4 !== 0 && i%5 !== 0) {
           projectiles[i].shootNE();
         }
         if (i % 3 === 0) {
           projectiles[i].shootSE();
         }
         if (i%4 == 0) {
           projectiles[i].shootNW();
         }
         if (i % 5 === 0) {
           projectiles[i].shootSW();
         }
         else {projectiles[i].shootNW();}

         projectiles[i].draw();

         for (let j = 0; j < NARUTOS.length; j++) {
           if (NARUTOS[j] && projectiles[i] && collision(projectiles[i], NARUTOS[j])) {
             NARUTOS[j].health -= projectiles[i].power
             projectiles.splice(i, 1);
             i--;
           }
         }

         if (projectiles[i] && projectiles[i].x > canvas.width - CELLSIZE) {
           projectiles.splice(i, 1);
           i--;
         }
       }
     }

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
         GOKUS[i].shoot();
         for (let j = 0; j < NARUTOS.length; j++) {
           if (GOKUS[i] && collision(GOKUS[i], NARUTOS[j])) {
             MONEY -= .05
           }
          //  if (GOKUS[i].health < 0) {
          //    GOKUS.splice(i, 1);
          //    i--;
          //  }
         }
       }
     }

     // narutos

     function handleNarutos() {
        for (let i = 0; i < NARUTOS.length; i++) {
            NARUTOS[i].move();
            NARUTOS[i].draw();
            if (NARUTOS[i].x === CELLSIZE*6 && NARUTOS[i].y === CELLSIZE*8) {
              gameOver = true
            }
            if (NARUTOS[i].health <= 0) {
              NARUTOS.splice(i, 1);
              i--;
              MONEY+=100
              killCount+=1
            }
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
         ctx.font = "15px Fantasy";
       } else {
         ctx.fillStyle = "red";
         ctx.font = "15px Fantasy";
       }
       ctx.fillText("Money: $" + MONEY, 802, 30);
       if (gameOver) {
         ctx.fillStyle = 'black';
         ctx.font = '60px Fantasy';
         ctx.fillText("Game Over", 250, 248)
       }
        ctx.fillStyle = "red";
        ctx.font = "15px Fantasy";
        ctx.fillText("Kill Count: " + killCount, 802, 60);
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
       handleProjectiles();
       handleNarutos();
       handleGameStatus(ctx);
       frame++;       
       if (!gameOver) requestAnimationFrame(animate);
     }
     animate();
}


// export default Game;