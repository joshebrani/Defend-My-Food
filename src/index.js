// import './styles/index.css';

import Game from "./scripts/game";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(canvas, ctx);


// document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementById("canvas");

//   canvasEl.width = 700;
//   canvasEl.height = 500;
//   const ctx = canvasEl.getContext("2d");

//   ctx.fillRect(0, 0, 700, 500);

//   // let mo = new MovingObject({ pos: [100, 100], vel: [1, 2], radius: 50, color: "blue" })
//   // mo.draw(ctx);
//   // window.mo = mo;

// //   let g = new GameView(ctx);
// //   g.start();
// //   window.g = g;
// });
