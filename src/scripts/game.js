// import { animate } from './utilities';
import Cell from "./board";
import Goku, { projectiles } from "./goku";
import Naruto from './naruto';
import Projectile from './projectile'
import { collision, createMap } from "./utilities";

export let killCount = 0;

export function game(canvas, ctx) {
  const ramen = document.getElementById('ramen')
  const goku = document.getElementById('goku')
  const naruto = document.getElementById('naruto')
  const goku2 = document.getElementById('goku2')
  // const start = document.getElementById('start')
  const itachi = document.getElementById('itachi')
  const shenron = document.getElementById('shenron')
  const broly = document.getElementById('broly')
  const coming = document.getElementById('coming')

     const CELLSIZE = 50;
     const GAMEGRID = [];
     const GOKUS = [];
     const NARUTOS = [];
     let MONEY = 300;
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
// console.log(i)
        // if (i == 0) {
        //   projectiles[i].shootNW();
        // }
        // if (i == 1) {
        //   projectiles[i].shootNE();
        // }
        // if (i == 2) {
        //   projectiles[i].shootSE();
        // }
        // if (i == 3) {
        //   projectiles[i].shootSW();
        // }

        // else { projectiles[i].shootNW()}

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
         if (NARUTOS.length <= 0) animateNarutos()
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
        ctx.shadowColor = "green";
        ctx.shadowBlur = 15;
       if (MONEY >= 250) {
         ctx.fillStyle = "green";
         ctx.font = "13px Fantasy";
       } else {
         ctx.fillStyle = "red";
         ctx.font = "13px Fantasy";
       }
       ctx.fillText("Money: $" + MONEY, 802, 30);
       if (gameOver) {
         ctx.fillStyle = 'black';
         ctx.font = '60px Fantasy';
         ctx.fillText("Game Over", 250, 248)
       }
        ctx.fillStyle = "red";
        ctx.font = "13px Fantasy";
        ctx.fillText("Kill Count: " + killCount, 802, 60);

        ctx.shadowColor = "white";
        ctx.shadowBlur = 15;
        ctx.drawImage(
          ramen,
          CELLSIZE*6,
          CELLSIZE*8,
          70,
          50
        );
        ctx.shadowColor = "orange";
        ctx.shadowBlur = 5;
        ctx.drawImage(
          goku,
          CELLSIZE*6 + 50,
          CELLSIZE*8 -20,
          70,
          70
        );
        ctx.shadowColor = "red";
        ctx.shadowBlur = 15;
        ctx.drawImage(
          naruto,
          0,
          0,
          50,
          50
        );
        ctx.shadowColor = "aqua";
        ctx.shadowBlur = 15;
        ctx.drawImage(
          goku2,
          830,
          250,
          39,
          49
        );

        ctx.shadowBlur = 0
        
        ctx.drawImage(coming, 809, 360, 80, 37);

        ctx.drawImage(itachi, 803, 415, 40, 50);
        ctx.drawImage(broly, 853, 415, 40, 50);
        ctx.drawImage(shenron, 809, 490, 80, 50);
     }

     function animateNarutos() {
        handleNarutos();
        if (!gameOver) requestAnimationFrame(animateNarutos);
     }
     
    //  function restartGame() {
    //     if (gameOver == true) {
    //       game(canvas, ctx)
    //     }
    //  }

    //  canvas.addEventListener("click", function () {
    //    console.log(mouse.x)
    //    console.log(mouse.y)

    //    if (mouse.x > 803  && mouse.y < 415) {
    //      restartGame()
    //    }
    //  })
     
     function animate() {
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.shadowColor = "black";
       ctx.shadowBlur = 10;
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
        //  handleNarutos();
         handleGameStatus(ctx);
         frame++;       
       if (!gameOver) requestAnimationFrame(animate);
     }
     animate();
    //  animateNarutos();
}


// export default Game;