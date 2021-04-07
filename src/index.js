// import './styles/index.css';

import Game from "./scripts/game";
import { loadImage } from "./scripts/image_loader";
// import { loadImage } from "./scripts/image_loader";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 600;



  // global variables
  const CELLSIZE = 50;
  const CELLGAP = 3;
  const GAMEGRID = [];
  const GOKUS = [];
  let MONEY = 1000;


  // mouse
const mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
}

// let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener('mousemove', function(e) {
  // mouse.x = e.x - canvasPosition.left;
  mouse.x = e.offsetX
  mouse.y = e.offsetY
  // mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener('mouseleave', function(){
  mouse.x = undefined;
  mouse.y = undefined
})
  // board
  const controlsBar = {
    width: canvas.width,
    height: CELLSIZE,
  }

  class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = CELLSIZE;
      this.height = CELLSIZE;

    }
    draw() {
      if (mouse.x && mouse.y && collision(this, mouse)) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
  }

  function createGrid() {
    for (let y = 0; y < canvas.height; y += CELLSIZE) {
      for (let x = 0; x < canvas.width-CELLSIZE*2; x += CELLSIZE) {
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

  function createMap() {
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
    ctx.fillRect(CELLSIZE*11, CELLSIZE * 4, CELLSIZE, CELLSIZE*4);

  }



    // ctx.fillStyle = 'white'
    // ctx.fillRect(0, 0, 700, 500);

    // ctx.fillStyle = '#7cfc00'
    // ctx.fillRect(0, 20, 270, 20);

    // ctx.fillStyle = '#7cfc00'
    // ctx.fillRect(240, 20, 30, 110);

    // ctx.fillStyle = '#7cfc00'
    // ctx.fillRect(30, 110, 240, 20);

    // ctx.fillStyle = "#7cfc00";
    // ctx.fillRect(30, 60, 30, 60);

    // ctx.fillStyle = "#7cfc00";
    // ctx.fillRect(30, 60, 180, 20);


    // projectiles


    // gokus

    class Goku {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = CELLSIZE;
        this.height = CELLSIZE;
        this.shooting = false;
        this.projectiles = [];
        this.timer = 0;
        // this.health = 100

      }
      draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '10px Arial';
        // ctx.fillText(Math.floor(this.health), this.x + 15, this.height + 30);
        ctx.fillText("Goku", this.x + 15, this.y + 30);
      }
    }

    canvas.addEventListener('click', function() {
      const gridPostitionX = mouse.x - (mouse.x % CELLSIZE);
      const gridPostitionY = mouse.y - (mouse.y % CELLSIZE);
      if (gridPostitionX > canvas.width-CELLSIZE*3) return;
      for (let i = 0; i < GOKUS.length; i++) {
        if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY)
        return;
      }
      let gokuCost = 100;
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

    // enemies


    // resources


    // utilities

    function handleGameStatus() {
      if (MONEY > 400) {
        ctx.fillStyle = 'green'
        ctx.font = '15px Arial';
      } else {
        ctx.fillStyle = "red";
        ctx.font = "15px Arial";
      }
      ctx.fillText('Money: ' + MONEY, 810, 30 )
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "lightgray";
      ctx.fillRect(canvas.width - CELLSIZE * 2, 0, CELLSIZE * 2, canvas.height);

      createMap();
      handleGameGrid();
      handleGokus();
      handleGameStatus();
      requestAnimationFrame(animate);
    }
    animate()


    function collision(first, second) {
      if ( !(first.x > second.x + second.width ||
            first.x + first.width < second.x ||
            first.y > second.y + second.height ||
            first.y + first.height < second.y)

      ) {
        return true;
      };
    };




// ctx.drawImage(document.getElementById('picture'),0,0);
    // function insertImage() {
    //   image = new Image();
    //   image.src = "images/ramen1.jpg"; //any img src
    //   image.onload = function () {
    //     content.drawImage(image, 300, 300);
    //   };
    // }

    // insertImage();
   

    // const game = new Game(canvas, ctx);
    // loadImage('./images/ramen1.jpg')
    
})


// document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementById("canvas");

//   canvasEl.width = 700;
//   canvasEl.height = 500;
//   const ctx = canvasEl.getContext("2d");

//   ctx.fixllRect(0, 0, 700, 500);

//   // let mo = new MovingObject({ pos: [100, 100], vel: [1, 2], radius: 50, color: "blue" })
//   // mo.draw(ctx);
//   // window.mo = mo;

// //   let g = new GameView(ctx);
// //   g.start();
// //   window.g = g;
// });
