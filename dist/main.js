/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/game */ \"./src/scripts/game.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById(\"canvas\");\n  canvas.width = 900;\n  canvas.height = 600;\n  const ctx = canvas.getContext(\"2d\");\n\n\n  (0,_scripts_game__WEBPACK_IMPORTED_MODULE_0__.game)(canvas, ctx);\n\n})\n\n\n\n\n//# sourceURL=webpack://Defend-My-Food/./src/index.js?");

/***/ }),

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ \"./src/scripts/utilities.js\");\nconst CELLSIZE = 50;\n\n\n\nconst mouse = {\n  x: undefined,\n  y: undefined,\n  width: 0.1,\n  height: 0.1,\n};\n\n// let canvasPosition = canvas.getBoundingClientRect();\n// canvas.addEventListener(\"mousemove\", function (e) {\n//   // mouse.x = e.x - canvasPosition.left;\n//   mouse.x = e.offsetX;\n//   mouse.y = e.offsetY;\n//   // mouse.y = e.y - canvasPosition.top;\n// });\n\n// canvas.addEventListener(\"mouseleave\", function () {\n//   mouse.x = undefined;\n//   mouse.y = undefined;\n// });\n\n\nclass Cell {\n  constructor(x, y) {\n    this.canvas = document.getElementById('canvas')\n    this.ctx = this.canvas.getContext('2d')\n    this.x = x;\n    this.y = y;\n    this.width = CELLSIZE;\n    this.height = CELLSIZE;\n    this.canvas.addEventListener(\"mousemove\", function (e) {\n      mouse.x = e.offsetX;\n      mouse.y = e.offsetY;\n    });\n\n    this.canvas.addEventListener(\"mouseleave\", function () {\n      mouse.x = undefined;\n      mouse.y = undefined;\n    });\n  }\n  draw() {\n    if (mouse.x && mouse.y && (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.collision)(this, mouse)) {\n      this.ctx.strokeStyle = \"red\";\n      this.ctx.strokeRect(this.x, this.y, this.width, this.height);\n    }\n  }\n}\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cell);\n\n\n//# sourceURL=webpack://Defend-My-Food/./src/scripts/board.js?");

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"killCount\": function() { return /* binding */ killCount; },\n/* harmony export */   \"game\": function() { return /* binding */ game; }\n/* harmony export */ });\n/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ \"./src/scripts/board.js\");\n/* harmony import */ var _goku__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goku */ \"./src/scripts/goku.js\");\n/* harmony import */ var _naruto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./naruto */ \"./src/scripts/naruto.js\");\n/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectile */ \"./src/scripts/projectile.js\");\n/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ \"./src/scripts/utilities.js\");\n// import { animate } from './utilities';\n\n\n\n\n\n\nlet killCount = 0;\n\nfunction game(canvas, ctx) {\n  const ramen = document.getElementById('ramen')\n  const goku = document.getElementById('goku')\n  const naruto = document.getElementById('naruto')\n  const goku2 = document.getElementById('goku2')\n  const start = document.getElementById('start')\n\n     const CELLSIZE = 50;\n     const GAMEGRID = [];\n     const GOKUS = [];\n     const NARUTOS = [];\n     let MONEY = 300;\n     let frame = 0;\n     let gameOver = false;\n    //  const projectiles = [];\n\n     // mouse\n     const mouse = {\n       x: undefined,\n       y: undefined,\n       width: 0.1,\n       height: 0.1,\n     };\n\n     canvas.addEventListener(\"mousemove\", function (e) {\n       mouse.x = e.offsetX;\n       mouse.y = e.offsetY;\n     });\n\n     canvas.addEventListener(\"mouseleave\", function () {\n       mouse.x = undefined;\n       mouse.y = undefined;\n     });\n     // board\n\n     function createGrid() {\n       for (let y = 0; y < canvas.height; y += CELLSIZE) {\n         for (let x = 0; x < canvas.width - CELLSIZE * 2; x += CELLSIZE) {\n           GAMEGRID.push(new _board__WEBPACK_IMPORTED_MODULE_0__.default(x, y));\n         }\n       }\n     }\n\n     createGrid();\n\n     function handleGameGrid() {\n       for (let i = 0; i < GAMEGRID.length; i++) {\n         GAMEGRID[i].draw();\n       }\n     }\n\n     // projectiles\n\n     function handleProjectiles() {\n       for (let i = 0; i < _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles.length; i++) {\n         if (i % 2 === 0 && i%4 !== 0 && i%5 !== 0) {\n           _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNE();\n         }\n         if (i % 3 === 0) {\n           _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootSE();\n         }\n         if (i%4 == 0) {\n           _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNW();\n         }\n         if (i % 5 === 0) {\n           _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootSW();\n         }\n         else {_goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNW();}\n\n         _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].draw();\n\n         for (let j = 0; j < NARUTOS.length; j++) {\n           if (NARUTOS[j] && _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i] && (0,_utilities__WEBPACK_IMPORTED_MODULE_4__.collision)(_goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i], NARUTOS[j])) {\n             NARUTOS[j].health -= _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].power\n             _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles.splice(i, 1);\n             i--;\n           }\n         }\n\n         if (_goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i] && _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].x > canvas.width - CELLSIZE) {\n           _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles.splice(i, 1);\n           i--;\n         }\n       }\n     }\n\n     // gokus\n\n     canvas.addEventListener(\"click\", function () {\n       const gridPostitionX = mouse.x - (mouse.x % CELLSIZE);\n       const gridPostitionY = mouse.y - (mouse.y % CELLSIZE);\n       if (gridPostitionX > canvas.width - CELLSIZE * 3) return;\n       for (let i = 0; i < GOKUS.length; i++) {\n         if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY)\n           return;\n       }\n       let gokuCost = 250;\n       if (MONEY >= gokuCost) {\n         GOKUS.push(new _goku__WEBPACK_IMPORTED_MODULE_1__.default(gridPostitionX, gridPostitionY));\n         MONEY -= gokuCost;\n         if (NARUTOS.length <= 0) animateNarutos()\n       }\n     });\n\n     function handleGokus() {\n       for (let i = 0; i < GOKUS.length; i++) {\n         GOKUS[i].draw();\n         GOKUS[i].shoot();\n         for (let j = 0; j < NARUTOS.length; j++) {\n           if (GOKUS[i] && (0,_utilities__WEBPACK_IMPORTED_MODULE_4__.collision)(GOKUS[i], NARUTOS[j])) {\n             MONEY -= .05\n           }\n          //  if (GOKUS[i].health < 0) {\n          //    GOKUS.splice(i, 1);\n          //    i--;\n          //  }\n         }\n       }\n     }\n\n     // narutos\n\n     function handleNarutos() {\n        for (let i = 0; i < NARUTOS.length; i++) {\n            NARUTOS[i].move();\n            NARUTOS[i].draw();\n            if (NARUTOS[i].x === CELLSIZE*6 && NARUTOS[i].y === CELLSIZE*8) {\n              gameOver = true\n            }\n            if (NARUTOS[i].health <= 0) {\n              NARUTOS.splice(i, 1);\n              i--;\n              MONEY+=100\n              killCount+=1\n            }\n        }\n        if (frame % 200 === 0) {\n            NARUTOS.push(new _naruto__WEBPACK_IMPORTED_MODULE_2__.default())\n        }\n     }\n\n     // resources\n\n     // utilities\n\n     function handleGameStatus() {\n        ctx.shadowColor = \"green\";\n        ctx.shadowBlur = 15;\n       if (MONEY >= 250) {\n         ctx.fillStyle = \"green\";\n         ctx.font = \"15px Fantasy\";\n       } else {\n         ctx.fillStyle = \"red\";\n         ctx.font = \"15px Fantasy\";\n       }\n       ctx.fillText(\"Money: $\" + MONEY, 802, 30);\n       if (gameOver) {\n         ctx.fillStyle = 'black';\n         ctx.font = '60px Fantasy';\n         ctx.fillText(\"Game Over\", 250, 248)\n       }\n        ctx.fillStyle = \"red\";\n        ctx.font = \"15px Fantasy\";\n        ctx.fillText(\"Kill Count: \" + killCount, 802, 60);\n\n        ctx.shadowColor = \"white\";\n        ctx.shadowBlur = 15;\n        ctx.drawImage(\n          ramen,\n          CELLSIZE*6,\n          CELLSIZE*8,\n          70,\n          50\n        );\n        ctx.shadowColor = \"orange\";\n        ctx.shadowBlur = 5;\n        ctx.drawImage(\n          goku,\n          CELLSIZE*6 + 50,\n          CELLSIZE*8 -20,\n          70,\n          70\n        );\n        ctx.shadowColor = \"red\";\n        ctx.shadowBlur = 15;\n        ctx.drawImage(\n          naruto,\n          0,\n          0,\n          50,\n          50\n        );\n        ctx.shadowColor = \"aqua\";\n        ctx.shadowBlur = 15;\n        ctx.drawImage(\n          goku2,\n          830,\n          300,\n          39,\n          49\n        );\n        // ctx.drawImage(start, 809, 500, 80, 37);\n     }\n\n     function animateNarutos() {\n        handleNarutos();\n        if (!gameOver) requestAnimationFrame(animateNarutos);\n     }\n     \n     \n     function animate() {\n       ctx.clearRect(0, 0, canvas.width, canvas.height);\n       ctx.shadowColor = \"black\";\n       ctx.shadowBlur = 10;\n       ctx.fillStyle = \"lightgray\";\n       ctx.fillRect(\n         canvas.width - CELLSIZE * 2,\n         0,\n         CELLSIZE * 2,\n         canvas.height\n         );\n         \n         (0,_utilities__WEBPACK_IMPORTED_MODULE_4__.createMap)(ctx);\n         handleGameGrid();\n         handleGokus();\n         handleProjectiles();\n        //  handleNarutos();\n         handleGameStatus(ctx);\n         frame++;       \n       if (!gameOver) requestAnimationFrame(animate);\n     }\n     animate();\n    //  animateNarutos();\n}\n\n\n// export default Game;\n\n//# sourceURL=webpack://Defend-My-Food/./src/scripts/game.js?");

/***/ }),

/***/ "./src/scripts/goku.js":
/*!*****************************!*\
  !*** ./src/scripts/goku.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"projectiles\": function() { return /* binding */ projectiles; }\n/* harmony export */ });\n/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ \"./src/scripts/projectile.js\");\n\n\nconst CELLSIZE = 50;\nconst projectiles = []\nconst GAMEGRID = [];\nconst GOKUS = [];\nlet MONEY = 1000;\n// const img = document.getElementById('goku');\n\nconst mouse = {\n  x: undefined,\n  y: undefined,\n  width: 0.1,\n  height: 0.1,\n};\n\nclass Goku {\n  constructor(x, y) {\n    this.canvas = document.getElementById(\"canvas\");\n    this.ctx = this.canvas.getContext(\"2d\");\n    this.x = x;\n    this.y = y;\n    this.width = 49;\n    this.height = 49;\n    this.shooting = false;\n    this.projectiles = [];\n    this.timer = 0;\n    this.img = document.getElementById(\"goku2\");\n    // this.health = 100\n     \n  }\n  draw() {\n     this.ctx.shadowColor = \"aqua\";\n     this.ctx.shadowBlur = 15;\n    this.ctx.drawImage(this.img, this.x+8, this.y,this.width-10, this.height)\n    // this.ctx.fillStyle = \"blue\";\n    // this.ctx.fillRect(this.x, this.y, this.width, this.height);\n    // this.ctx.fillStyle = \"yellow\";\n    // this.ctx.fillRect(this.x, this.y, this.width, this.height-35);\n    // this.ctx.fillStyle = \"gold\";\n    // this.ctx.font = \"10px Arial\";\n    // //     this.ctx.fillText(\n    // //       Math.floor(this.health) + \"HP\",\n    // //       this.x + 12,\n    // //       this.y + 10\n    // //     );\n    // this.ctx.fillText(\"Goku\", this.x + 15, this.y + 30);\n  }\n\n  shoot() {\n    this.timer++;\n    if (this.timer % 50 === 0) {\n      projectiles.push(new _projectile__WEBPACK_IMPORTED_MODULE_0__.default(this.x + 25, this.y - 10))\n    }\n  }\n}\n\n\n// export function handleGokus() {\n//   for (let i = 0; i < GOKUS.length; i++) {\n//     GOKUS[i].draw();\n//   }\n// }\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Goku);\n\n\n //  this.canvas.addEventListener(\"mousemove\", function (e) {\n      //    mouse.x = e.offsetX;\n      //    mouse.y = e.offsetY;\n      //  });\n\n      //  this.canvas.addEventListener(\"mouseleave\", function () {\n      //    mouse.x = undefined;\n      //    mouse.y = undefined;\n      //  });\n      //  this.canvas.addEventListener(\"click\", function () {\n      //    const gridPostitionX = mouse.x - (mouse.x % CELLSIZE);\n      //    const gridPostitionY = mouse.y - (mouse.y % CELLSIZE);\n      //    if (gridPostitionY < CELLSIZE) return;\n      //    for (let i = 0; i < GOKUS.length; i++) {\n      //      if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY) return;\n      //    }\n      //    let gokuCost = 100;\n      //    if (MONEY >= gokuCost) {\n      //      GOKUS.push(new Goku(gridPostitionX, gridPostitionY));\n      //      MONEY -= gokuCost;\n      //    }\n      //  });\n\n//# sourceURL=webpack://Defend-My-Food/./src/scripts/goku.js?");

/***/ }),

/***/ "./src/scripts/naruto.js":
/*!*******************************!*\
  !*** ./src/scripts/naruto.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/scripts/game.js\");\nconst CELLSIZE = 50;\n\n// const runRight = new Image();\n// runRight.src = '../src/images/run_1.png';\n\nclass Naruto {\n    constructor() {\n        this.canvas = document.getElementById(\"canvas\");\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.x = 0;\n        this.y = 0;\n        this.width = 49;\n        this.height = 49;\n        if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount < 8) {\n            this.speed = 1;\n            this.health = Math.floor(Math.random() * 50) + 25;\n        }\n        if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 8 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 15) {\n            this.speed = 1;\n            this.health = Math.floor(Math.random() * 300) + 50;\n        }\n        if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 15 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 30) {\n            this.speed = 1;\n            this.health = Math.floor(Math.random() * 900) + 30;\n        }\n        if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 30 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 50) {\n            this.speed = 1;\n            this.health = Math.floor(Math.random() * 1200) + 900;\n        } \n        if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 50 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 90) {\n            this.speed = 1;\n            this.health = Math.floor(Math.random() * 1500) + 1200;\n        } \n        if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 90 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 150) {\n          this.speed = 2;\n          this.health = Math.floor(Math.random() * 2000) + 2500;\n        } \n        if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 150) {\n            this.speed = 3;\n            this.health = Math.floor(Math.random() * 10000) + 5000;\n        } \n        this.movement = this.speed;\n        // this.health = Math.floor(Math.random() * 400) + 50;\n        this.maxHealth = this.health;\n        this.img = document.getElementById(\"naruto1\");\n\n        // this.runRight = runRight;\n        // this.frameX = 0;\n        // this.frameY = 0;\n        // this.minFrame = 0;\n        // this.maxFrame = 4;\n        // this.spriteWidth = 90;\n        // this.spriteHeight = 117\n        \n    }\n\n    move() {\n        // this.y += 1;\n        if (this.x >= 0 && this.x <= CELLSIZE*15 && this.y === 0) {\n            this.x += this.movement\n        }\n\n        if (this.x === CELLSIZE*15 && this.y >= 0  && this.y <= CELLSIZE*11) {\n            this.y += this.movement\n        }\n\n        if (this.y === CELLSIZE*11 && this.x <= CELLSIZE*15  && this.x >= 0) {\n            this.x -= this.movement\n        }\n\n        if (this.y <= CELLSIZE*11 && this.y >= CELLSIZE*3  && this.x === 0) {\n            this.y -= this.movement\n        }\n\n        if (this.y === CELLSIZE*3 && this.x >= 0  && this.x <= CELLSIZE*12) {\n            this.x += this.movement\n        }\n\n        if (this.y >= CELLSIZE*3 && this.y <= CELLSIZE*8  && this.x === CELLSIZE*12) {\n            this.y += this.movement\n        }\n\n        if (this.y === CELLSIZE*8 && this.x <= CELLSIZE*12  && this.x >= CELLSIZE*6) {\n            this.x -= this.movement\n        }\n\n        // if (this.frameX < this.maxFrame) this.frameX++;\n        // else this.frameX = this.minFrame;\n    \n    }\n\n    draw() {\n         this.ctx.shadowColor = \"red\";\n         this.ctx.shadowBlur = 15;\n        this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);\n        // this.ctx.fillStyle = \"black\";\n        // this.ctx.fillRect(this.x, this.y, this.width, this.height);\n        // this.ctx.fillStyle = \"gray\";\n        // this.ctx.fillRect(this.x, this.y, this.width, this.height-35);\n        this.ctx.fillStyle = \"blue\";\n        this.ctx.font = \"10px Arial\";\n        this.ctx.fillText(Math.floor(this.health)+\"HP\", this.x + 5, this.y + 60);\n        // this.ctx.fillText(\"Naruto\", this.x + 12, this.y + 30);\n        // this.ctx.drawImage(this.runRight, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Naruto);\n\n//# sourceURL=webpack://Defend-My-Food/./src/scripts/naruto.js?");

/***/ }),

/***/ "./src/scripts/projectile.js":
/*!***********************************!*\
  !*** ./src/scripts/projectile.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _goku__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goku */ \"./src/scripts/goku.js\");\n\n\nclass Projectile {\n    constructor(x, y) {\n        this.canvas = document.getElementById(\"canvas\");\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.x = x;\n        this.y = y;\n        this.width = 15;\n        this.height = 15;\n        this.power = 25;\n        this.speed = 7;\n         this.img = document.getElementById(\"kame\");\n    }\n\n    shootNE() {\n        this.y -= this.speed;\n        this.x += this.speed;\n    }\n    shootSE() {\n        this.y += this.speed;\n        this.x += this.speed;\n    }\n    shootNW() {\n        this.y -= this.speed;\n        this.x -= this.speed;\n    }\n    shootSW() {\n        this.y += this.speed;\n        this.x -= this.speed;\n    }\n\n\n    draw() {\n         this.ctx.shadowColor = \"aqua\";\n         this.ctx.shadowBlur = 15;\n        this.ctx.drawImage(this.img, this.x-20, this.y+20, this.width+20, this.height+20);\n\n        // this.ctx.fillStyle = 'aqua';\n        // this.ctx.beginPath();\n        // this.ctx.arc(this.x, this.y, this.width, 0 , Math.PI*2);\n        // this.ctx.fill();\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Projectile);\n\n//# sourceURL=webpack://Defend-My-Food/./src/scripts/projectile.js?");

/***/ }),

/***/ "./src/scripts/utilities.js":
/*!**********************************!*\
  !*** ./src/scripts/utilities.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createMap\": function() { return /* binding */ createMap; },\n/* harmony export */   \"collision\": function() { return /* binding */ collision; }\n/* harmony export */ });\n// import { handleGameGrid } from './board';\n// import { handleGokus } from './goku';\n\nconst CELLSIZE = 50;\n\n\n  function createMap(ctx) {\n    ctx.shadowColor = \"black\";\n    ctx.shadowBlur = 15;\n    ctx.fillStyle = \"#7cfc00\";\n    ctx.fillRect(0, CELLSIZE, canvas.width - CELLSIZE * 4, CELLSIZE);\n\n    ctx.fillStyle = \"#7cfc00\";\n    ctx.fillRect(\n      canvas.width - CELLSIZE * 4,\n      CELLSIZE,\n      CELLSIZE,\n      canvas.height - CELLSIZE * 2\n    );\n\n    ctx.fillStyle = \"#7cfc00\";\n    ctx.fillRect(\n      CELLSIZE,\n      canvas.height - CELLSIZE * 2,\n      canvas.width - CELLSIZE * 4,\n      CELLSIZE\n    );\n\n    ctx.fillStyle = \"#7cfc00\";\n    ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE, CELLSIZE * 6);\n\n    ctx.fillStyle = \"#7cfc00\";\n    ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE * 11, CELLSIZE);\n\n    ctx.fillStyle = \"#7cfc00\";\n    ctx.fillRect(CELLSIZE * 11, CELLSIZE * 4, CELLSIZE, CELLSIZE * 4);\n  }\n\nfunction collision(first, second) {\n  // if (\n  //   !(\n  //     first.x > second.x + second.width ||\n  //     first.x + first.width < second.x ||\n  //     first.y > second.y + second.height ||\n  //     first.y + first.height < second.y\n  //   )\n  // ) {\n  //   return true;\n  // }\n  return (\n    first.x < second.x + second.width &&\n    first.x + first.width > second.x &&\n    first.y < second.y + second.height &&\n    first.y + first.height > second.y\n  ) \n}\n\n\n//# sourceURL=webpack://Defend-My-Food/./src/scripts/utilities.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;