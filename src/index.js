// import './styles/index.css';

import Game from "./scripts/game";
import { loadImage } from "./scripts/image_loader";
// import { loadImage } from "./scripts/image_loader";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, 700, 500);

    ctx.fillStyle = '#7cfc00'
    ctx.fillRect(0, 20, 270, 20);

    ctx.fillStyle = '#7cfc00'
    ctx.fillRect(240, 20, 30, 110);

    ctx.fillStyle = '#7cfc00'
    ctx.fillRect(30, 110, 240, 20);

    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(30, 60, 30, 60);

    ctx.fillStyle = "#7cfc00";
    ctx.fillRect(30, 60, 180, 20);

ctx.drawImage(document.getElementById('picture'),0,0);
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
