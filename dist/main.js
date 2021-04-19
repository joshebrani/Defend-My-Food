/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/scripts/utilities.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CELLSIZE = 50;

var mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1
}; // let canvasPosition = canvas.getBoundingClientRect();
// canvas.addEventListener("mousemove", function (e) {
//   // mouse.x = e.x - canvasPosition.left;
//   mouse.x = e.offsetX;
//   mouse.y = e.offsetY;
//   // mouse.y = e.y - canvasPosition.top;
// });
// canvas.addEventListener("mouseleave", function () {
//   mouse.x = undefined;
//   mouse.y = undefined;
// });

var Cell = /*#__PURE__*/function () {
  function Cell(x, y) {
    _classCallCheck(this, Cell);

    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.x = x;
    this.y = y;
    this.width = CELLSIZE;
    this.height = CELLSIZE;
    this.canvas.addEventListener("mousemove", function (e) {
      mouse.x = e.offsetX;
      mouse.y = e.offsetY;
    });
    this.canvas.addEventListener("mouseleave", function () {
      mouse.x = undefined;
      mouse.y = undefined;
    });
  }

  _createClass(Cell, [{
    key: "draw",
    value: function draw() {
      if (mouse.x && mouse.y && (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.collision)(this, mouse)) {
        this.ctx.strokeStyle = "red";
        this.ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
  }]);

  return Cell;
}();

/* harmony default export */ __webpack_exports__["default"] = (Cell);

/***/ }),

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "killCount": function() { return /* binding */ killCount; },
/* harmony export */   "game": function() { return /* binding */ game; }
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/scripts/board.js");
/* harmony import */ var _goku__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goku */ "./src/scripts/goku.js");
/* harmony import */ var _naruto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./naruto */ "./src/scripts/naruto.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectile */ "./src/scripts/projectile.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ "./src/scripts/utilities.js");
// import { animate } from './utilities';





var killCount = 0;
function game(canvas, ctx) {
  var ramen = document.getElementById('ramen');
  var goku = document.getElementById('goku');
  var naruto = document.getElementById('naruto');
  var goku2 = document.getElementById('goku2');
  var start = document.getElementById('start');
  var CELLSIZE = 50;
  var GAMEGRID = [];
  var GOKUS = [];
  var NARUTOS = [];
  var MONEY = 300;
  var frame = 0;
  var gameOver = false; //  const projectiles = [];
  // mouse

  var mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1
  };
  canvas.addEventListener("mousemove", function (e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });
  canvas.addEventListener("mouseleave", function () {
    mouse.x = undefined;
    mouse.y = undefined;
  }); // board

  function createGrid() {
    for (var y = 0; y < canvas.height; y += CELLSIZE) {
      for (var x = 0; x < canvas.width - CELLSIZE * 2; x += CELLSIZE) {
        GAMEGRID.push(new _board__WEBPACK_IMPORTED_MODULE_0__.default(x, y));
      }
    }
  }

  createGrid();

  function handleGameGrid() {
    for (var i = 0; i < GAMEGRID.length; i++) {
      GAMEGRID[i].draw();
    }
  } // projectiles


  function handleProjectiles() {
    for (var i = 0; i < _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles.length; i++) {
      if (i % 2 === 0 && i % 4 !== 0 && i % 5 !== 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNE();
      }

      if (i % 3 === 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootSE();
      }

      if (i % 4 == 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNW();
      }

      if (i % 5 === 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootSW();
      } else {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNW();
      }

      _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].draw();

      for (var j = 0; j < NARUTOS.length; j++) {
        if (NARUTOS[j] && _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i] && (0,_utilities__WEBPACK_IMPORTED_MODULE_4__.collision)(_goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i], NARUTOS[j])) {
          NARUTOS[j].health -= _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].power;
          _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles.splice(i, 1);
          i--;
        }
      }

      if (_goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i] && _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].x > canvas.width - CELLSIZE) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles.splice(i, 1);
        i--;
      }
    }
  } // gokus


  canvas.addEventListener("click", function () {
    var gridPostitionX = mouse.x - mouse.x % CELLSIZE;
    var gridPostitionY = mouse.y - mouse.y % CELLSIZE;
    if (gridPostitionX > canvas.width - CELLSIZE * 3) return;

    for (var i = 0; i < GOKUS.length; i++) {
      if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY) return;
    }

    var gokuCost = 250;

    if (MONEY >= gokuCost) {
      GOKUS.push(new _goku__WEBPACK_IMPORTED_MODULE_1__.default(gridPostitionX, gridPostitionY));
      MONEY -= gokuCost;
      if (NARUTOS.length <= 0) animateNarutos();
    }
  });

  function handleGokus() {
    for (var i = 0; i < GOKUS.length; i++) {
      GOKUS[i].draw();
      GOKUS[i].shoot();

      for (var j = 0; j < NARUTOS.length; j++) {
        if (GOKUS[i] && (0,_utilities__WEBPACK_IMPORTED_MODULE_4__.collision)(GOKUS[i], NARUTOS[j])) {
          MONEY -= .05;
        } //  if (GOKUS[i].health < 0) {
        //    GOKUS.splice(i, 1);
        //    i--;
        //  }

      }
    }
  } // narutos


  function handleNarutos() {
    for (var i = 0; i < NARUTOS.length; i++) {
      NARUTOS[i].move();
      NARUTOS[i].draw();

      if (NARUTOS[i].x === CELLSIZE * 6 && NARUTOS[i].y === CELLSIZE * 8) {
        gameOver = true;
      }

      if (NARUTOS[i].health <= 0) {
        NARUTOS.splice(i, 1);
        i--;
        MONEY += 100;
        killCount += 1;
      }
    }

    if (frame % 200 === 0) {
      NARUTOS.push(new _naruto__WEBPACK_IMPORTED_MODULE_2__.default());
    }
  } // resources
  // utilities


  function handleGameStatus() {
    ctx.shadowColor = "green";
    ctx.shadowBlur = 15;

    if (MONEY >= 250) {
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
      ctx.fillText("Game Over", 250, 248);
    }

    ctx.fillStyle = "red";
    ctx.font = "15px Fantasy";
    ctx.fillText("Kill Count: " + killCount, 802, 60);
    ctx.shadowColor = "white";
    ctx.shadowBlur = 15;
    ctx.drawImage(ramen, CELLSIZE * 6, CELLSIZE * 8, 70, 50);
    ctx.shadowColor = "orange";
    ctx.shadowBlur = 5;
    ctx.drawImage(goku, CELLSIZE * 6 + 50, CELLSIZE * 8 - 20, 70, 70);
    ctx.shadowColor = "red";
    ctx.shadowBlur = 15;
    ctx.drawImage(naruto, 0, 0, 50, 50);
    ctx.shadowColor = "aqua";
    ctx.shadowBlur = 15;
    ctx.drawImage(goku2, 830, 300, 39, 49); // ctx.drawImage(start, 809, 500, 80, 37);
  }

  function animateNarutos() {
    handleNarutos();
    if (!gameOver) requestAnimationFrame(animateNarutos);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowColor = "black";
    ctx.shadowBlur = 10;
    ctx.fillStyle = "lightgray";
    ctx.fillRect(canvas.width - CELLSIZE * 2, 0, CELLSIZE * 2, canvas.height);
    (0,_utilities__WEBPACK_IMPORTED_MODULE_4__.createMap)(ctx);
    handleGameGrid();
    handleGokus();
    handleProjectiles(); //  handleNarutos();

    handleGameStatus(ctx);
    frame++;
    if (!gameOver) requestAnimationFrame(animate);
  }

  animate(); //  animateNarutos();
} // export default Game;

/***/ }),

/***/ "./src/scripts/goku.js":
/*!*****************************!*\
  !*** ./src/scripts/goku.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectiles": function() { return /* binding */ projectiles; }
/* harmony export */ });
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projectile */ "./src/scripts/projectile.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var CELLSIZE = 50;
var projectiles = [];
var GAMEGRID = [];
var GOKUS = [];
var MONEY = 1000; // const img = document.getElementById('goku');

var mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1
};

var Goku = /*#__PURE__*/function () {
  function Goku(x, y) {
    _classCallCheck(this, Goku);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 49;
    this.height = 49;
    this.shooting = false;
    this.projectiles = [];
    this.timer = 0;
    this.img = document.getElementById("goku2"); // this.health = 100
  }

  _createClass(Goku, [{
    key: "draw",
    value: function draw() {
      this.ctx.shadowColor = "aqua";
      this.ctx.shadowBlur = 15;
      this.ctx.drawImage(this.img, this.x + 8, this.y, this.width - 10, this.height); // this.ctx.fillStyle = "blue";
      // this.ctx.fillRect(this.x, this.y, this.width, this.height);
      // this.ctx.fillStyle = "yellow";
      // this.ctx.fillRect(this.x, this.y, this.width, this.height-35);
      // this.ctx.fillStyle = "gold";
      // this.ctx.font = "10px Arial";
      // //     this.ctx.fillText(
      // //       Math.floor(this.health) + "HP",
      // //       this.x + 12,
      // //       this.y + 10
      // //     );
      // this.ctx.fillText("Goku", this.x + 15, this.y + 30);
    }
  }, {
    key: "shoot",
    value: function shoot() {
      this.timer++;

      if (this.timer % 50 === 0) {
        projectiles.push(new _projectile__WEBPACK_IMPORTED_MODULE_0__.default(this.x + 25, this.y - 10));
      }
    }
  }]);

  return Goku;
}(); // export function handleGokus() {
//   for (let i = 0; i < GOKUS.length; i++) {
//     GOKUS[i].draw();
//   }
// }


/* harmony default export */ __webpack_exports__["default"] = (Goku); //  this.canvas.addEventListener("mousemove", function (e) {
//    mouse.x = e.offsetX;
//    mouse.y = e.offsetY;
//  });
//  this.canvas.addEventListener("mouseleave", function () {
//    mouse.x = undefined;
//    mouse.y = undefined;
//  });
//  this.canvas.addEventListener("click", function () {
//    const gridPostitionX = mouse.x - (mouse.x % CELLSIZE);
//    const gridPostitionY = mouse.y - (mouse.y % CELLSIZE);
//    if (gridPostitionY < CELLSIZE) return;
//    for (let i = 0; i < GOKUS.length; i++) {
//      if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY) return;
//    }
//    let gokuCost = 100;
//    if (MONEY >= gokuCost) {
//      GOKUS.push(new Goku(gridPostitionX, gridPostitionY));
//      MONEY -= gokuCost;
//    }
//  });

/***/ }),

/***/ "./src/scripts/naruto.js":
/*!*******************************!*\
  !*** ./src/scripts/naruto.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/scripts/game.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CELLSIZE = 50;
 // const runRight = new Image();
// runRight.src = '../src/images/run_1.png';

var Naruto = /*#__PURE__*/function () {
  function Naruto() {
    _classCallCheck(this, Naruto);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.width = 49;
    this.height = 49;

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount < 8) {
      this.speed = 1;
      this.health = Math.floor(Math.random() * 50) + 25;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 8 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 15) {
      this.speed = 1;
      this.health = Math.floor(Math.random() * 300) + 50;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 15 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 30) {
      this.speed = 1;
      this.health = Math.floor(Math.random() * 900) + 30;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 30 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 50) {
      this.speed = 1;
      this.health = Math.floor(Math.random() * 1200) + 900;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 50 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 90) {
      this.speed = 1;
      this.health = Math.floor(Math.random() * 1500) + 1200;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 90 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 150) {
      this.speed = 2;
      this.health = Math.floor(Math.random() * 3000) + 2500;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 150) {
      this.speed = 6;
      this.health = Math.floor(Math.random() * 20000) + 5000;
    }

    this.movement = this.speed; // this.health = Math.floor(Math.random() * 400) + 50;

    this.maxHealth = this.health;
    this.img = document.getElementById("naruto1"); // this.runRight = runRight;
    // this.frameX = 0;
    // this.frameY = 0;
    // this.minFrame = 0;
    // this.maxFrame = 4;
    // this.spriteWidth = 90;
    // this.spriteHeight = 117
  }

  _createClass(Naruto, [{
    key: "move",
    value: function move() {
      // this.y += 1;
      if (this.x >= 0 && this.x <= CELLSIZE * 15 && this.y === 0) {
        this.x += this.movement;
      }

      if (this.x === CELLSIZE * 15 && this.y >= 0 && this.y <= CELLSIZE * 11) {
        this.y += this.movement;
      }

      if (this.y === CELLSIZE * 11 && this.x <= CELLSIZE * 15 && this.x >= 0) {
        this.x -= this.movement;
      }

      if (this.y <= CELLSIZE * 11 && this.y >= CELLSIZE * 3 && this.x === 0) {
        this.y -= this.movement;
      }

      if (this.y === CELLSIZE * 3 && this.x >= 0 && this.x <= CELLSIZE * 12) {
        this.x += this.movement;
      }

      if (this.y >= CELLSIZE * 3 && this.y <= CELLSIZE * 8 && this.x === CELLSIZE * 12) {
        this.y += this.movement;
      }

      if (this.y === CELLSIZE * 8 && this.x <= CELLSIZE * 12 && this.x >= CELLSIZE * 6) {
        this.x -= this.movement;
      } // if (this.frameX < this.maxFrame) this.frameX++;
      // else this.frameX = this.minFrame;

    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.shadowColor = "red";
      this.ctx.shadowBlur = 15;
      this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height); // this.ctx.fillStyle = "black";
      // this.ctx.fillRect(this.x, this.y, this.width, this.height);
      // this.ctx.fillStyle = "gray";
      // this.ctx.fillRect(this.x, this.y, this.width, this.height-35);

      this.ctx.fillStyle = "blue";
      this.ctx.font = "10px Arial";
      this.ctx.fillText(Math.floor(this.health) + "HP", this.x + 5, this.y + 60); // this.ctx.fillText("Naruto", this.x + 12, this.y + 30);
      // this.ctx.drawImage(this.runRight, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
  }]);

  return Naruto;
}();

/* harmony default export */ __webpack_exports__["default"] = (Naruto);

/***/ }),

/***/ "./src/scripts/projectile.js":
/*!***********************************!*\
  !*** ./src/scripts/projectile.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _goku__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./goku */ "./src/scripts/goku.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Projectile = /*#__PURE__*/function () {
  function Projectile(x, y) {
    _classCallCheck(this, Projectile);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.width = 15;
    this.height = 15;
    this.power = 25;
    this.speed = 7;
    this.img = document.getElementById("kame");
  }

  _createClass(Projectile, [{
    key: "shootNE",
    value: function shootNE() {
      this.y -= this.speed;
      this.x += this.speed;
    }
  }, {
    key: "shootSE",
    value: function shootSE() {
      this.y += this.speed;
      this.x += this.speed;
    }
  }, {
    key: "shootNW",
    value: function shootNW() {
      this.y -= this.speed;
      this.x -= this.speed;
    }
  }, {
    key: "shootSW",
    value: function shootSW() {
      this.y += this.speed;
      this.x -= this.speed;
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.shadowColor = "aqua";
      this.ctx.shadowBlur = 15;
      this.ctx.drawImage(this.img, this.x - 20, this.y + 20, this.width + 20, this.height + 20); // this.ctx.fillStyle = 'aqua';
      // this.ctx.beginPath();
      // this.ctx.arc(this.x, this.y, this.width, 0 , Math.PI*2);
      // this.ctx.fill();
    }
  }]);

  return Projectile;
}();

/* harmony default export */ __webpack_exports__["default"] = (Projectile);

/***/ }),

/***/ "./src/scripts/utilities.js":
/*!**********************************!*\
  !*** ./src/scripts/utilities.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMap": function() { return /* binding */ createMap; },
/* harmony export */   "collision": function() { return /* binding */ collision; }
/* harmony export */ });
// import { handleGameGrid } from './board';
// import { handleGokus } from './goku';
var CELLSIZE = 50;
function createMap(ctx) {
  ctx.shadowColor = "#7cfc00";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(0, CELLSIZE, canvas.width - CELLSIZE * 4, CELLSIZE);
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(canvas.width - CELLSIZE * 4, CELLSIZE, CELLSIZE, canvas.height - CELLSIZE * 2);
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(CELLSIZE, canvas.height - CELLSIZE * 2, canvas.width - CELLSIZE * 4, CELLSIZE);
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE, CELLSIZE * 6);
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(CELLSIZE, CELLSIZE * 4, CELLSIZE * 11, CELLSIZE);
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(CELLSIZE * 11, CELLSIZE * 4, CELLSIZE, CELLSIZE * 4);
}
function collision(first, second) {
  if (!(first.x > second.x + second.width || first.x + first.width < second.x || first.y > second.y + second.height || first.y + first.height < second.y)) {
    return true;
  }
}

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  canvas.width = 900;
  canvas.height = 600;
  var ctx = canvas.getContext("2d");
  (0,_scripts_game__WEBPACK_IMPORTED_MODULE_0__.game)(canvas, ctx);
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0Iiwia2lsbENvdW50IiwiZ2FtZSIsInJhbWVuIiwiZ29rdSIsIm5hcnV0byIsImdva3UyIiwic3RhcnQiLCJHQU1FR1JJRCIsIkdPS1VTIiwiTkFSVVRPUyIsIk1PTkVZIiwiZnJhbWUiLCJnYW1lT3ZlciIsImNyZWF0ZUdyaWQiLCJwdXNoIiwiaGFuZGxlR2FtZUdyaWQiLCJpIiwibGVuZ3RoIiwiZHJhdyIsImhhbmRsZVByb2plY3RpbGVzIiwicHJvamVjdGlsZXMiLCJzaG9vdE5FIiwic2hvb3RTRSIsInNob290TlciLCJzaG9vdFNXIiwiaiIsImhlYWx0aCIsInBvd2VyIiwiZ3JpZFBvc3RpdGlvblgiLCJncmlkUG9zdGl0aW9uWSIsImdva3VDb3N0IiwiR29rdSIsImFuaW1hdGVOYXJ1dG9zIiwiaGFuZGxlR29rdXMiLCJzaG9vdCIsImhhbmRsZU5hcnV0b3MiLCJtb3ZlIiwic3BsaWNlIiwiTmFydXRvIiwiaGFuZGxlR2FtZVN0YXR1cyIsInNoYWRvd0NvbG9yIiwic2hhZG93Qmx1ciIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsImRyYXdJbWFnZSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImFuaW1hdGUiLCJjbGVhclJlY3QiLCJmaWxsUmVjdCIsImNyZWF0ZU1hcCIsInNob290aW5nIiwidGltZXIiLCJpbWciLCJQcm9qZWN0aWxlIiwic3BlZWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtb3ZlbWVudCIsIm1heEhlYWx0aCIsImZpcnN0Iiwic2Vjb25kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRLEdBQUcsRUFBakI7QUFFQTtBQUVBLElBQU1DLEtBQUssR0FBRztBQUNaQyxHQUFDLEVBQUVDLFNBRFM7QUFFWkMsR0FBQyxFQUFFRCxTQUZTO0FBR1pFLE9BQUssRUFBRSxHQUhLO0FBSVpDLFFBQU0sRUFBRTtBQUpJLENBQWQsQyxDQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0lBR01DLEk7QUFDSixnQkFBWUwsQ0FBWixFQUFlRSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtJLE1BQUwsR0FBY0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0gsTUFBTCxDQUFZSSxVQUFaLENBQXVCLElBQXZCLENBQVg7QUFDQSxTQUFLVixDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLRSxDQUFMLEdBQVNBLENBQVQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFMLFFBQWI7QUFDQSxTQUFLTSxNQUFMLEdBQWNOLFFBQWQ7QUFDQSxTQUFLUSxNQUFMLENBQVlLLGdCQUFaLENBQTZCLFdBQTdCLEVBQTBDLFVBQVVDLENBQVYsRUFBYTtBQUNyRGIsV0FBSyxDQUFDQyxDQUFOLEdBQVVZLENBQUMsQ0FBQ0MsT0FBWjtBQUNBZCxXQUFLLENBQUNHLENBQU4sR0FBVVUsQ0FBQyxDQUFDRSxPQUFaO0FBQ0QsS0FIRDtBQUtBLFNBQUtSLE1BQUwsQ0FBWUssZ0JBQVosQ0FBNkIsWUFBN0IsRUFBMkMsWUFBWTtBQUNyRFosV0FBSyxDQUFDQyxDQUFOLEdBQVVDLFNBQVY7QUFDQUYsV0FBSyxDQUFDRyxDQUFOLEdBQVVELFNBQVY7QUFDRCxLQUhEO0FBSUQ7Ozs7V0FDRCxnQkFBTztBQUNMLFVBQUlGLEtBQUssQ0FBQ0MsQ0FBTixJQUFXRCxLQUFLLENBQUNHLENBQWpCLElBQXNCYSxxREFBUyxDQUFDLElBQUQsRUFBT2hCLEtBQVAsQ0FBbkMsRUFBa0Q7QUFDaEQsYUFBS1UsR0FBTCxDQUFTTyxXQUFULEdBQXVCLEtBQXZCO0FBQ0EsYUFBS1AsR0FBTCxDQUFTUSxVQUFULENBQW9CLEtBQUtqQixDQUF6QixFQUE0QixLQUFLRSxDQUFqQyxFQUFvQyxLQUFLQyxLQUF6QyxFQUFnRCxLQUFLQyxNQUFyRDtBQUNEO0FBQ0Y7Ozs7OztBQUlILCtEQUFlQyxJQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLElBQUlhLFNBQVMsR0FBRyxDQUFoQjtBQUVBLFNBQVNDLElBQVQsQ0FBY2IsTUFBZCxFQUFzQkcsR0FBdEIsRUFBMkI7QUFDaEMsTUFBTVcsS0FBSyxHQUFHYixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBZDtBQUNBLE1BQU1hLElBQUksR0FBR2QsUUFBUSxDQUFDQyxjQUFULENBQXdCLE1BQXhCLENBQWI7QUFDQSxNQUFNYyxNQUFNLEdBQUdmLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0EsTUFBTWUsS0FBSyxHQUFHaEIsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQWQ7QUFDQSxNQUFNZ0IsS0FBSyxHQUFHakIsUUFBUSxDQUFDQyxjQUFULENBQXdCLE9BQXhCLENBQWQ7QUFFRyxNQUFNVixRQUFRLEdBQUcsRUFBakI7QUFDQSxNQUFNMkIsUUFBUSxHQUFHLEVBQWpCO0FBQ0EsTUFBTUMsS0FBSyxHQUFHLEVBQWQ7QUFDQSxNQUFNQyxPQUFPLEdBQUcsRUFBaEI7QUFDQSxNQUFJQyxLQUFLLEdBQUcsR0FBWjtBQUNBLE1BQUlDLEtBQUssR0FBRyxDQUFaO0FBQ0EsTUFBSUMsUUFBUSxHQUFHLEtBQWYsQ0FiNkIsQ0FjOUI7QUFFQzs7QUFDQSxNQUFNL0IsS0FBSyxHQUFHO0FBQ1pDLEtBQUMsRUFBRUMsU0FEUztBQUVaQyxLQUFDLEVBQUVELFNBRlM7QUFHWkUsU0FBSyxFQUFFLEdBSEs7QUFJWkMsVUFBTSxFQUFFO0FBSkksR0FBZDtBQU9BRSxRQUFNLENBQUNLLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFVBQVVDLENBQVYsRUFBYTtBQUNoRGIsU0FBSyxDQUFDQyxDQUFOLEdBQVVZLENBQUMsQ0FBQ0MsT0FBWjtBQUNBZCxTQUFLLENBQUNHLENBQU4sR0FBVVUsQ0FBQyxDQUFDRSxPQUFaO0FBQ0QsR0FIRDtBQUtBUixRQUFNLENBQUNLLGdCQUFQLENBQXdCLFlBQXhCLEVBQXNDLFlBQVk7QUFDaERaLFNBQUssQ0FBQ0MsQ0FBTixHQUFVQyxTQUFWO0FBQ0FGLFNBQUssQ0FBQ0csQ0FBTixHQUFVRCxTQUFWO0FBQ0QsR0FIRCxFQTdCNkIsQ0FpQzdCOztBQUVBLFdBQVM4QixVQUFULEdBQXNCO0FBQ3BCLFNBQUssSUFBSTdCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdJLE1BQU0sQ0FBQ0YsTUFBM0IsRUFBbUNGLENBQUMsSUFBSUosUUFBeEMsRUFBa0Q7QUFDaEQsV0FBSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHTSxNQUFNLENBQUNILEtBQVAsR0FBZUwsUUFBUSxHQUFHLENBQTlDLEVBQWlERSxDQUFDLElBQUlGLFFBQXRELEVBQWdFO0FBQzlEMkIsZ0JBQVEsQ0FBQ08sSUFBVCxDQUFjLElBQUkzQiwyQ0FBSixDQUFTTCxDQUFULEVBQVlFLENBQVosQ0FBZDtBQUNEO0FBQ0Y7QUFDRjs7QUFFRDZCLFlBQVU7O0FBRVYsV0FBU0UsY0FBVCxHQUEwQjtBQUN4QixTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdULFFBQVEsQ0FBQ1UsTUFBN0IsRUFBcUNELENBQUMsRUFBdEMsRUFBMEM7QUFDeENULGNBQVEsQ0FBQ1MsQ0FBRCxDQUFSLENBQVlFLElBQVo7QUFDRDtBQUNGLEdBakQ0QixDQW1EN0I7OztBQUVBLFdBQVNDLGlCQUFULEdBQTZCO0FBQzNCLFNBQUssSUFBSUgsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0kscURBQXBCLEVBQXdDSixDQUFDLEVBQXpDLEVBQTZDO0FBQzNDLFVBQUlBLENBQUMsR0FBRyxDQUFKLEtBQVUsQ0FBVixJQUFlQSxDQUFDLEdBQUMsQ0FBRixLQUFRLENBQXZCLElBQTRCQSxDQUFDLEdBQUMsQ0FBRixLQUFRLENBQXhDLEVBQTJDO0FBQ3pDSSxzREFBVyxDQUFDSixDQUFELENBQVgsQ0FBZUssT0FBZjtBQUNEOztBQUNELFVBQUlMLENBQUMsR0FBRyxDQUFKLEtBQVUsQ0FBZCxFQUFpQjtBQUNmSSxzREFBVyxDQUFDSixDQUFELENBQVgsQ0FBZU0sT0FBZjtBQUNEOztBQUNELFVBQUlOLENBQUMsR0FBQyxDQUFGLElBQU8sQ0FBWCxFQUFjO0FBQ1pJLHNEQUFXLENBQUNKLENBQUQsQ0FBWCxDQUFlTyxPQUFmO0FBQ0Q7O0FBQ0QsVUFBSVAsQ0FBQyxHQUFHLENBQUosS0FBVSxDQUFkLEVBQWlCO0FBQ2ZJLHNEQUFXLENBQUNKLENBQUQsQ0FBWCxDQUFlUSxPQUFmO0FBQ0QsT0FGRCxNQUdLO0FBQUNKLHNEQUFXLENBQUNKLENBQUQsQ0FBWCxDQUFlTyxPQUFmO0FBQTBCOztBQUVoQ0gsb0RBQVcsQ0FBQ0osQ0FBRCxDQUFYLENBQWVFLElBQWY7O0FBRUEsV0FBSyxJQUFJTyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaEIsT0FBTyxDQUFDUSxNQUE1QixFQUFvQ1EsQ0FBQyxFQUFyQyxFQUF5QztBQUN2QyxZQUFJaEIsT0FBTyxDQUFDZ0IsQ0FBRCxDQUFQLElBQWNMLDhDQUFXLENBQUNKLENBQUQsQ0FBekIsSUFBZ0NuQixxREFBUyxDQUFDdUIsOENBQVcsQ0FBQ0osQ0FBRCxDQUFaLEVBQWlCUCxPQUFPLENBQUNnQixDQUFELENBQXhCLENBQTdDLEVBQTJFO0FBQ3pFaEIsaUJBQU8sQ0FBQ2dCLENBQUQsQ0FBUCxDQUFXQyxNQUFYLElBQXFCTiw4Q0FBVyxDQUFDSixDQUFELENBQVgsQ0FBZVcsS0FBcEM7QUFDQVAsK0RBQUEsQ0FBbUJKLENBQW5CLEVBQXNCLENBQXRCO0FBQ0FBLFdBQUM7QUFDRjtBQUNGOztBQUVELFVBQUlJLDhDQUFXLENBQUNKLENBQUQsQ0FBWCxJQUFrQkksOENBQVcsQ0FBQ0osQ0FBRCxDQUFYLENBQWVsQyxDQUFmLEdBQW1CTSxNQUFNLENBQUNILEtBQVAsR0FBZUwsUUFBeEQsRUFBa0U7QUFDaEV3Qyw2REFBQSxDQUFtQkosQ0FBbkIsRUFBc0IsQ0FBdEI7QUFDQUEsU0FBQztBQUNGO0FBQ0Y7QUFDRixHQXBGNEIsQ0FzRjdCOzs7QUFFQTVCLFFBQU0sQ0FBQ0ssZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBWTtBQUMzQyxRQUFNbUMsY0FBYyxHQUFHL0MsS0FBSyxDQUFDQyxDQUFOLEdBQVdELEtBQUssQ0FBQ0MsQ0FBTixHQUFVRixRQUE1QztBQUNBLFFBQU1pRCxjQUFjLEdBQUdoRCxLQUFLLENBQUNHLENBQU4sR0FBV0gsS0FBSyxDQUFDRyxDQUFOLEdBQVVKLFFBQTVDO0FBQ0EsUUFBSWdELGNBQWMsR0FBR3hDLE1BQU0sQ0FBQ0gsS0FBUCxHQUFlTCxRQUFRLEdBQUcsQ0FBL0MsRUFBa0Q7O0FBQ2xELFNBQUssSUFBSW9DLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLEtBQUssQ0FBQ1MsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDckMsVUFBSVIsS0FBSyxDQUFDUSxDQUFELENBQUwsQ0FBU2xDLENBQVQsS0FBZThDLGNBQWYsSUFBaUNwQixLQUFLLENBQUNRLENBQUQsQ0FBTCxDQUFTaEMsQ0FBVCxLQUFlNkMsY0FBcEQsRUFDRTtBQUNIOztBQUNELFFBQUlDLFFBQVEsR0FBRyxHQUFmOztBQUNBLFFBQUlwQixLQUFLLElBQUlvQixRQUFiLEVBQXVCO0FBQ3JCdEIsV0FBSyxDQUFDTSxJQUFOLENBQVcsSUFBSWlCLDBDQUFKLENBQVNILGNBQVQsRUFBeUJDLGNBQXpCLENBQVg7QUFDQW5CLFdBQUssSUFBSW9CLFFBQVQ7QUFDQSxVQUFJckIsT0FBTyxDQUFDUSxNQUFSLElBQWtCLENBQXRCLEVBQXlCZSxjQUFjO0FBQ3hDO0FBQ0YsR0FkRDs7QUFnQkEsV0FBU0MsV0FBVCxHQUF1QjtBQUNyQixTQUFLLElBQUlqQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUixLQUFLLENBQUNTLE1BQTFCLEVBQWtDRCxDQUFDLEVBQW5DLEVBQXVDO0FBQ3JDUixXQUFLLENBQUNRLENBQUQsQ0FBTCxDQUFTRSxJQUFUO0FBQ0FWLFdBQUssQ0FBQ1EsQ0FBRCxDQUFMLENBQVNrQixLQUFUOztBQUNBLFdBQUssSUFBSVQsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2hCLE9BQU8sQ0FBQ1EsTUFBNUIsRUFBb0NRLENBQUMsRUFBckMsRUFBeUM7QUFDdkMsWUFBSWpCLEtBQUssQ0FBQ1EsQ0FBRCxDQUFMLElBQVluQixxREFBUyxDQUFDVyxLQUFLLENBQUNRLENBQUQsQ0FBTixFQUFXUCxPQUFPLENBQUNnQixDQUFELENBQWxCLENBQXpCLEVBQWlEO0FBQy9DZixlQUFLLElBQUksR0FBVDtBQUNELFNBSHNDLENBSXhDO0FBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0Y7QUFDRixHQXRINEIsQ0F3SDdCOzs7QUFFQSxXQUFTeUIsYUFBVCxHQUF5QjtBQUN0QixTQUFLLElBQUluQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUCxPQUFPLENBQUNRLE1BQTVCLEVBQW9DRCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3JDUCxhQUFPLENBQUNPLENBQUQsQ0FBUCxDQUFXb0IsSUFBWDtBQUNBM0IsYUFBTyxDQUFDTyxDQUFELENBQVAsQ0FBV0UsSUFBWDs7QUFDQSxVQUFJVCxPQUFPLENBQUNPLENBQUQsQ0FBUCxDQUFXbEMsQ0FBWCxLQUFpQkYsUUFBUSxHQUFDLENBQTFCLElBQStCNkIsT0FBTyxDQUFDTyxDQUFELENBQVAsQ0FBV2hDLENBQVgsS0FBaUJKLFFBQVEsR0FBQyxDQUE3RCxFQUFnRTtBQUM5RGdDLGdCQUFRLEdBQUcsSUFBWDtBQUNEOztBQUNELFVBQUlILE9BQU8sQ0FBQ08sQ0FBRCxDQUFQLENBQVdVLE1BQVgsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUJqQixlQUFPLENBQUM0QixNQUFSLENBQWVyQixDQUFmLEVBQWtCLENBQWxCO0FBQ0FBLFNBQUM7QUFDRE4sYUFBSyxJQUFFLEdBQVA7QUFDQVYsaUJBQVMsSUFBRSxDQUFYO0FBQ0Q7QUFDSjs7QUFDRCxRQUFJVyxLQUFLLEdBQUcsR0FBUixLQUFnQixDQUFwQixFQUF1QjtBQUNuQkYsYUFBTyxDQUFDSyxJQUFSLENBQWEsSUFBSXdCLDRDQUFKLEVBQWI7QUFDSDtBQUNILEdBM0k0QixDQTZJN0I7QUFFQTs7O0FBRUEsV0FBU0MsZ0JBQVQsR0FBNEI7QUFDekJoRCxPQUFHLENBQUNpRCxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FqRCxPQUFHLENBQUNrRCxVQUFKLEdBQWlCLEVBQWpCOztBQUNELFFBQUkvQixLQUFLLElBQUksR0FBYixFQUFrQjtBQUNoQm5CLFNBQUcsQ0FBQ21ELFNBQUosR0FBZ0IsT0FBaEI7QUFDQW5ELFNBQUcsQ0FBQ29ELElBQUosR0FBVyxjQUFYO0FBQ0QsS0FIRCxNQUdPO0FBQ0xwRCxTQUFHLENBQUNtRCxTQUFKLEdBQWdCLEtBQWhCO0FBQ0FuRCxTQUFHLENBQUNvRCxJQUFKLEdBQVcsY0FBWDtBQUNEOztBQUNEcEQsT0FBRyxDQUFDcUQsUUFBSixDQUFhLGFBQWFsQyxLQUExQixFQUFpQyxHQUFqQyxFQUFzQyxFQUF0Qzs7QUFDQSxRQUFJRSxRQUFKLEVBQWM7QUFDWnJCLFNBQUcsQ0FBQ21ELFNBQUosR0FBZ0IsT0FBaEI7QUFDQW5ELFNBQUcsQ0FBQ29ELElBQUosR0FBVyxjQUFYO0FBQ0FwRCxTQUFHLENBQUNxRCxRQUFKLENBQWEsV0FBYixFQUEwQixHQUExQixFQUErQixHQUEvQjtBQUNEOztBQUNBckQsT0FBRyxDQUFDbUQsU0FBSixHQUFnQixLQUFoQjtBQUNBbkQsT0FBRyxDQUFDb0QsSUFBSixHQUFXLGNBQVg7QUFDQXBELE9BQUcsQ0FBQ3FELFFBQUosQ0FBYSxpQkFBaUI1QyxTQUE5QixFQUF5QyxHQUF6QyxFQUE4QyxFQUE5QztBQUVBVCxPQUFHLENBQUNpRCxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FqRCxPQUFHLENBQUNrRCxVQUFKLEdBQWlCLEVBQWpCO0FBQ0FsRCxPQUFHLENBQUNzRCxTQUFKLENBQ0UzQyxLQURGLEVBRUV0QixRQUFRLEdBQUMsQ0FGWCxFQUdFQSxRQUFRLEdBQUMsQ0FIWCxFQUlFLEVBSkYsRUFLRSxFQUxGO0FBT0FXLE9BQUcsQ0FBQ2lELFdBQUosR0FBa0IsUUFBbEI7QUFDQWpELE9BQUcsQ0FBQ2tELFVBQUosR0FBaUIsQ0FBakI7QUFDQWxELE9BQUcsQ0FBQ3NELFNBQUosQ0FDRTFDLElBREYsRUFFRXZCLFFBQVEsR0FBQyxDQUFULEdBQWEsRUFGZixFQUdFQSxRQUFRLEdBQUMsQ0FBVCxHQUFZLEVBSGQsRUFJRSxFQUpGLEVBS0UsRUFMRjtBQU9BVyxPQUFHLENBQUNpRCxXQUFKLEdBQWtCLEtBQWxCO0FBQ0FqRCxPQUFHLENBQUNrRCxVQUFKLEdBQWlCLEVBQWpCO0FBQ0FsRCxPQUFHLENBQUNzRCxTQUFKLENBQ0V6QyxNQURGLEVBRUUsQ0FGRixFQUdFLENBSEYsRUFJRSxFQUpGLEVBS0UsRUFMRjtBQU9BYixPQUFHLENBQUNpRCxXQUFKLEdBQWtCLE1BQWxCO0FBQ0FqRCxPQUFHLENBQUNrRCxVQUFKLEdBQWlCLEVBQWpCO0FBQ0FsRCxPQUFHLENBQUNzRCxTQUFKLENBQ0V4QyxLQURGLEVBRUUsR0FGRixFQUdFLEdBSEYsRUFJRSxFQUpGLEVBS0UsRUFMRixFQWpEeUIsQ0F3RHpCO0FBQ0Y7O0FBRUQsV0FBUzJCLGNBQVQsR0FBMEI7QUFDdkJHLGlCQUFhO0FBQ2IsUUFBSSxDQUFDdkIsUUFBTCxFQUFla0MscUJBQXFCLENBQUNkLGNBQUQsQ0FBckI7QUFDakI7O0FBR0QsV0FBU2UsT0FBVCxHQUFtQjtBQUNqQnhELE9BQUcsQ0FBQ3lELFNBQUosQ0FBYyxDQUFkLEVBQWlCLENBQWpCLEVBQW9CNUQsTUFBTSxDQUFDSCxLQUEzQixFQUFrQ0csTUFBTSxDQUFDRixNQUF6QztBQUNBSyxPQUFHLENBQUNpRCxXQUFKLEdBQWtCLE9BQWxCO0FBQ0FqRCxPQUFHLENBQUNrRCxVQUFKLEdBQWlCLEVBQWpCO0FBQ0FsRCxPQUFHLENBQUNtRCxTQUFKLEdBQWdCLFdBQWhCO0FBQ0FuRCxPQUFHLENBQUMwRCxRQUFKLENBQ0U3RCxNQUFNLENBQUNILEtBQVAsR0FBZUwsUUFBUSxHQUFHLENBRDVCLEVBRUUsQ0FGRixFQUdFQSxRQUFRLEdBQUcsQ0FIYixFQUlFUSxNQUFNLENBQUNGLE1BSlQ7QUFPRWdFLHlEQUFTLENBQUMzRCxHQUFELENBQVQ7QUFDQXdCLGtCQUFjO0FBQ2RrQixlQUFXO0FBQ1hkLHFCQUFpQixHQWZGLENBZ0JoQjs7QUFDQ29CLG9CQUFnQixDQUFDaEQsR0FBRCxDQUFoQjtBQUNBb0IsU0FBSztBQUNQLFFBQUksQ0FBQ0MsUUFBTCxFQUFla0MscUJBQXFCLENBQUNDLE9BQUQsQ0FBckI7QUFDaEI7O0FBQ0RBLFNBQU8sR0F2T3NCLENBd085QjtBQUNILEMsQ0FHRCx1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDclBBO0FBRUEsSUFBTW5FLFFBQVEsR0FBRyxFQUFqQjtBQUNPLElBQU13QyxXQUFXLEdBQUcsRUFBcEI7QUFDUCxJQUFNYixRQUFRLEdBQUcsRUFBakI7QUFDQSxJQUFNQyxLQUFLLEdBQUcsRUFBZDtBQUNBLElBQUlFLEtBQUssR0FBRyxJQUFaLEMsQ0FDQTs7QUFFQSxJQUFNN0IsS0FBSyxHQUFHO0FBQ1pDLEdBQUMsRUFBRUMsU0FEUztBQUVaQyxHQUFDLEVBQUVELFNBRlM7QUFHWkUsT0FBSyxFQUFFLEdBSEs7QUFJWkMsUUFBTSxFQUFFO0FBSkksQ0FBZDs7SUFPTTZDLEk7QUFDSixnQkFBWWpELENBQVosRUFBZUUsQ0FBZixFQUFrQjtBQUFBOztBQUNoQixTQUFLSSxNQUFMLEdBQWNDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEtBQUtILE1BQUwsQ0FBWUksVUFBWixDQUF1QixJQUF2QixDQUFYO0FBQ0EsU0FBS1YsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFNBQUtpRSxRQUFMLEdBQWdCLEtBQWhCO0FBQ0EsU0FBSy9CLFdBQUwsR0FBbUIsRUFBbkI7QUFDQSxTQUFLZ0MsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxHQUFMLEdBQVdoRSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsT0FBeEIsQ0FBWCxDQVZnQixDQVdoQjtBQUVEOzs7O1dBQ0QsZ0JBQU87QUFDSixXQUFLQyxHQUFMLENBQVNpRCxXQUFULEdBQXVCLE1BQXZCO0FBQ0EsV0FBS2pELEdBQUwsQ0FBU2tELFVBQVQsR0FBc0IsRUFBdEI7QUFDRCxXQUFLbEQsR0FBTCxDQUFTc0QsU0FBVCxDQUFtQixLQUFLUSxHQUF4QixFQUE2QixLQUFLdkUsQ0FBTCxHQUFPLENBQXBDLEVBQXVDLEtBQUtFLENBQTVDLEVBQThDLEtBQUtDLEtBQUwsR0FBVyxFQUF6RCxFQUE2RCxLQUFLQyxNQUFsRSxFQUhLLENBSUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7OztXQUVELGlCQUFRO0FBQ04sV0FBS2tFLEtBQUw7O0FBQ0EsVUFBSSxLQUFLQSxLQUFMLEdBQWEsRUFBYixLQUFvQixDQUF4QixFQUEyQjtBQUN6QmhDLG1CQUFXLENBQUNOLElBQVosQ0FBaUIsSUFBSXdDLGdEQUFKLENBQWUsS0FBS3hFLENBQUwsR0FBUyxFQUF4QixFQUE0QixLQUFLRSxDQUFMLEdBQVMsRUFBckMsQ0FBakI7QUFDRDtBQUNGOzs7O0tBSUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsK0RBQWUrQyxJQUFmLEUsQ0FHQztBQUNLO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekZOLElBQU1uRCxRQUFRLEdBQUcsRUFBakI7Q0FFQTtBQUNBOztJQUVNMEQsTTtBQUNGLG9CQUFjO0FBQUE7O0FBQ1YsU0FBS2xELE1BQUwsR0FBY0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0gsTUFBTCxDQUFZSSxVQUFaLENBQXVCLElBQXZCLENBQVg7QUFDQSxTQUFLVixDQUFMLEdBQVMsQ0FBVDtBQUNBLFNBQUtFLENBQUwsR0FBUyxDQUFUO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLQyxNQUFMLEdBQWMsRUFBZDs7QUFDQSxRQUFJYyw0Q0FBUyxHQUFHLENBQWhCLEVBQW1CO0FBQ2YsV0FBS3VELEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBSzdCLE1BQUwsR0FBYzhCLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsRUFBM0IsSUFBaUMsRUFBL0M7QUFDSDs7QUFDRCxRQUFJMUQsNENBQVMsSUFBSSxDQUFiLElBQWtCQSw0Q0FBUyxHQUFHLEVBQWxDLEVBQXNDO0FBQ2xDLFdBQUt1RCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUs3QixNQUFMLEdBQWM4QixJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEdBQTNCLElBQWtDLEVBQWhEO0FBQ0g7O0FBQ0QsUUFBSTFELDRDQUFTLElBQUksRUFBYixJQUFtQkEsNENBQVMsR0FBRyxFQUFuQyxFQUF1QztBQUNuQyxXQUFLdUQsS0FBTCxHQUFhLENBQWI7QUFDQSxXQUFLN0IsTUFBTCxHQUFjOEIsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixHQUEzQixJQUFrQyxFQUFoRDtBQUNIOztBQUNELFFBQUkxRCw0Q0FBUyxJQUFJLEVBQWIsSUFBbUJBLDRDQUFTLEdBQUcsRUFBbkMsRUFBdUM7QUFDbkMsV0FBS3VELEtBQUwsR0FBYSxDQUFiO0FBQ0EsV0FBSzdCLE1BQUwsR0FBYzhCLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0IsSUFBM0IsSUFBbUMsR0FBakQ7QUFDSDs7QUFDRCxRQUFJMUQsNENBQVMsSUFBSSxFQUFiLElBQW1CQSw0Q0FBUyxHQUFHLEVBQW5DLEVBQXVDO0FBQ25DLFdBQUt1RCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUs3QixNQUFMLEdBQWM4QixJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLElBQTNCLElBQW1DLElBQWpEO0FBQ0g7O0FBQ0QsUUFBSTFELDRDQUFTLElBQUksRUFBYixJQUFtQkEsNENBQVMsR0FBRyxHQUFuQyxFQUF3QztBQUN0QyxXQUFLdUQsS0FBTCxHQUFhLENBQWI7QUFDQSxXQUFLN0IsTUFBTCxHQUFjOEIsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixJQUEzQixJQUFtQyxJQUFqRDtBQUNEOztBQUNELFFBQUkxRCw0Q0FBUyxJQUFJLEdBQWpCLEVBQXNCO0FBQ2xCLFdBQUt1RCxLQUFMLEdBQWEsQ0FBYjtBQUNBLFdBQUs3QixNQUFMLEdBQWM4QixJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDRSxNQUFMLEtBQWdCLEtBQTNCLElBQW9DLElBQWxEO0FBQ0g7O0FBQ0QsU0FBS0MsUUFBTCxHQUFnQixLQUFLSixLQUFyQixDQW5DVSxDQW9DVjs7QUFDQSxTQUFLSyxTQUFMLEdBQWlCLEtBQUtsQyxNQUF0QjtBQUNBLFNBQUsyQixHQUFMLEdBQVdoRSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsU0FBeEIsQ0FBWCxDQXRDVSxDQXdDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVIOzs7O1dBRUQsZ0JBQU87QUFDSDtBQUNBLFVBQUksS0FBS1IsQ0FBTCxJQUFVLENBQVYsSUFBZSxLQUFLQSxDQUFMLElBQVVGLFFBQVEsR0FBQyxFQUFsQyxJQUF3QyxLQUFLSSxDQUFMLEtBQVcsQ0FBdkQsRUFBMEQ7QUFDdEQsYUFBS0YsQ0FBTCxJQUFVLEtBQUs2RSxRQUFmO0FBQ0g7O0FBRUQsVUFBSSxLQUFLN0UsQ0FBTCxLQUFXRixRQUFRLEdBQUMsRUFBcEIsSUFBMEIsS0FBS0ksQ0FBTCxJQUFVLENBQXBDLElBQTBDLEtBQUtBLENBQUwsSUFBVUosUUFBUSxHQUFDLEVBQWpFLEVBQXFFO0FBQ2pFLGFBQUtJLENBQUwsSUFBVSxLQUFLMkUsUUFBZjtBQUNIOztBQUVELFVBQUksS0FBSzNFLENBQUwsS0FBV0osUUFBUSxHQUFDLEVBQXBCLElBQTBCLEtBQUtFLENBQUwsSUFBVUYsUUFBUSxHQUFDLEVBQTdDLElBQW9ELEtBQUtFLENBQUwsSUFBVSxDQUFsRSxFQUFxRTtBQUNqRSxhQUFLQSxDQUFMLElBQVUsS0FBSzZFLFFBQWY7QUFDSDs7QUFFRCxVQUFJLEtBQUszRSxDQUFMLElBQVVKLFFBQVEsR0FBQyxFQUFuQixJQUF5QixLQUFLSSxDQUFMLElBQVVKLFFBQVEsR0FBQyxDQUE1QyxJQUFrRCxLQUFLRSxDQUFMLEtBQVcsQ0FBakUsRUFBb0U7QUFDaEUsYUFBS0UsQ0FBTCxJQUFVLEtBQUsyRSxRQUFmO0FBQ0g7O0FBRUQsVUFBSSxLQUFLM0UsQ0FBTCxLQUFXSixRQUFRLEdBQUMsQ0FBcEIsSUFBeUIsS0FBS0UsQ0FBTCxJQUFVLENBQW5DLElBQXlDLEtBQUtBLENBQUwsSUFBVUYsUUFBUSxHQUFDLEVBQWhFLEVBQW9FO0FBQ2hFLGFBQUtFLENBQUwsSUFBVSxLQUFLNkUsUUFBZjtBQUNIOztBQUVELFVBQUksS0FBSzNFLENBQUwsSUFBVUosUUFBUSxHQUFDLENBQW5CLElBQXdCLEtBQUtJLENBQUwsSUFBVUosUUFBUSxHQUFDLENBQTNDLElBQWlELEtBQUtFLENBQUwsS0FBV0YsUUFBUSxHQUFDLEVBQXpFLEVBQTZFO0FBQ3pFLGFBQUtJLENBQUwsSUFBVSxLQUFLMkUsUUFBZjtBQUNIOztBQUVELFVBQUksS0FBSzNFLENBQUwsS0FBV0osUUFBUSxHQUFDLENBQXBCLElBQXlCLEtBQUtFLENBQUwsSUFBVUYsUUFBUSxHQUFDLEVBQTVDLElBQW1ELEtBQUtFLENBQUwsSUFBVUYsUUFBUSxHQUFDLENBQTFFLEVBQTZFO0FBQ3pFLGFBQUtFLENBQUwsSUFBVSxLQUFLNkUsUUFBZjtBQUNILE9BNUJFLENBOEJIO0FBQ0E7O0FBRUg7OztXQUVELGdCQUFPO0FBQ0YsV0FBS3BFLEdBQUwsQ0FBU2lELFdBQVQsR0FBdUIsS0FBdkI7QUFDQSxXQUFLakQsR0FBTCxDQUFTa0QsVUFBVCxHQUFzQixFQUF0QjtBQUNELFdBQUtsRCxHQUFMLENBQVNzRCxTQUFULENBQW1CLEtBQUtRLEdBQXhCLEVBQTZCLEtBQUt2RSxDQUFsQyxFQUFxQyxLQUFLRSxDQUExQyxFQUE2QyxLQUFLQyxLQUFsRCxFQUF5RCxLQUFLQyxNQUE5RCxFQUhHLENBSUg7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsV0FBS0ssR0FBTCxDQUFTbUQsU0FBVCxHQUFxQixNQUFyQjtBQUNBLFdBQUtuRCxHQUFMLENBQVNvRCxJQUFULEdBQWdCLFlBQWhCO0FBQ0EsV0FBS3BELEdBQUwsQ0FBU3FELFFBQVQsQ0FBa0JZLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUsvQixNQUFoQixJQUF3QixJQUExQyxFQUFnRCxLQUFLNUMsQ0FBTCxHQUFTLENBQXpELEVBQTRELEtBQUtFLENBQUwsR0FBUyxFQUFyRSxFQVZHLENBV0g7QUFDQTtBQUNIOzs7Ozs7QUFHTCwrREFBZXNELE1BQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0dBOztJQUVNZ0IsVTtBQUNGLHNCQUFZeEUsQ0FBWixFQUFlRSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2QsU0FBS0ksTUFBTCxHQUFjQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLFNBQUtDLEdBQUwsR0FBVyxLQUFLSCxNQUFMLENBQVlJLFVBQVosQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBLFNBQUtWLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtFLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLeUMsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLNEIsS0FBTCxHQUFhLENBQWI7QUFDQyxTQUFLRixHQUFMLEdBQVdoRSxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsTUFBeEIsQ0FBWDtBQUNKOzs7O1dBRUQsbUJBQVU7QUFDTixXQUFLTixDQUFMLElBQVUsS0FBS3VFLEtBQWY7QUFDQSxXQUFLekUsQ0FBTCxJQUFVLEtBQUt5RSxLQUFmO0FBQ0g7OztXQUNELG1CQUFVO0FBQ04sV0FBS3ZFLENBQUwsSUFBVSxLQUFLdUUsS0FBZjtBQUNBLFdBQUt6RSxDQUFMLElBQVUsS0FBS3lFLEtBQWY7QUFDSDs7O1dBQ0QsbUJBQVU7QUFDTixXQUFLdkUsQ0FBTCxJQUFVLEtBQUt1RSxLQUFmO0FBQ0EsV0FBS3pFLENBQUwsSUFBVSxLQUFLeUUsS0FBZjtBQUNIOzs7V0FDRCxtQkFBVTtBQUNOLFdBQUt2RSxDQUFMLElBQVUsS0FBS3VFLEtBQWY7QUFDQSxXQUFLekUsQ0FBTCxJQUFVLEtBQUt5RSxLQUFmO0FBQ0g7OztXQUdELGdCQUFPO0FBQ0YsV0FBS2hFLEdBQUwsQ0FBU2lELFdBQVQsR0FBdUIsTUFBdkI7QUFDQSxXQUFLakQsR0FBTCxDQUFTa0QsVUFBVCxHQUFzQixFQUF0QjtBQUNELFdBQUtsRCxHQUFMLENBQVNzRCxTQUFULENBQW1CLEtBQUtRLEdBQXhCLEVBQTZCLEtBQUt2RSxDQUFMLEdBQU8sRUFBcEMsRUFBd0MsS0FBS0UsQ0FBTCxHQUFPLEVBQS9DLEVBQW1ELEtBQUtDLEtBQUwsR0FBVyxFQUE5RCxFQUFrRSxLQUFLQyxNQUFMLEdBQVksRUFBOUUsRUFIRyxDQUtIO0FBQ0E7QUFDQTtBQUNBO0FBQ0g7Ozs7OztBQUdMLCtEQUFlb0UsVUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUVBLElBQU0xRSxRQUFRLEdBQUcsRUFBakI7QUFHUyxTQUFTc0UsU0FBVCxDQUFtQjNELEdBQW5CLEVBQXdCO0FBQzdCQSxLQUFHLENBQUNpRCxXQUFKLEdBQWtCLFNBQWxCO0FBQ0FqRCxLQUFHLENBQUNrRCxVQUFKLEdBQWlCLEVBQWpCO0FBQ0FsRCxLQUFHLENBQUNtRCxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FuRCxLQUFHLENBQUMwRCxRQUFKLENBQWEsQ0FBYixFQUFnQnJFLFFBQWhCLEVBQTBCUSxNQUFNLENBQUNILEtBQVAsR0FBZUwsUUFBUSxHQUFHLENBQXBELEVBQXVEQSxRQUF2RDtBQUVBVyxLQUFHLENBQUNtRCxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FuRCxLQUFHLENBQUMwRCxRQUFKLENBQ0U3RCxNQUFNLENBQUNILEtBQVAsR0FBZUwsUUFBUSxHQUFHLENBRDVCLEVBRUVBLFFBRkYsRUFHRUEsUUFIRixFQUlFUSxNQUFNLENBQUNGLE1BQVAsR0FBZ0JOLFFBQVEsR0FBRyxDQUo3QjtBQU9BVyxLQUFHLENBQUNtRCxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FuRCxLQUFHLENBQUMwRCxRQUFKLENBQ0VyRSxRQURGLEVBRUVRLE1BQU0sQ0FBQ0YsTUFBUCxHQUFnQk4sUUFBUSxHQUFHLENBRjdCLEVBR0VRLE1BQU0sQ0FBQ0gsS0FBUCxHQUFlTCxRQUFRLEdBQUcsQ0FINUIsRUFJRUEsUUFKRjtBQU9BVyxLQUFHLENBQUNtRCxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FuRCxLQUFHLENBQUMwRCxRQUFKLENBQWFyRSxRQUFiLEVBQXVCQSxRQUFRLEdBQUcsQ0FBbEMsRUFBcUNBLFFBQXJDLEVBQStDQSxRQUFRLEdBQUcsQ0FBMUQ7QUFFQVcsS0FBRyxDQUFDbUQsU0FBSixHQUFnQixTQUFoQjtBQUNBbkQsS0FBRyxDQUFDMEQsUUFBSixDQUFhckUsUUFBYixFQUF1QkEsUUFBUSxHQUFHLENBQWxDLEVBQXFDQSxRQUFRLEdBQUcsRUFBaEQsRUFBb0RBLFFBQXBEO0FBRUFXLEtBQUcsQ0FBQ21ELFNBQUosR0FBZ0IsU0FBaEI7QUFDQW5ELEtBQUcsQ0FBQzBELFFBQUosQ0FBYXJFLFFBQVEsR0FBRyxFQUF4QixFQUE0QkEsUUFBUSxHQUFHLENBQXZDLEVBQTBDQSxRQUExQyxFQUFvREEsUUFBUSxHQUFHLENBQS9EO0FBQ0Q7QUFFSSxTQUFTaUIsU0FBVCxDQUFtQmdFLEtBQW5CLEVBQTBCQyxNQUExQixFQUFrQztBQUN2QyxNQUNFLEVBQ0VELEtBQUssQ0FBQy9FLENBQU4sR0FBVWdGLE1BQU0sQ0FBQ2hGLENBQVAsR0FBV2dGLE1BQU0sQ0FBQzdFLEtBQTVCLElBQ0E0RSxLQUFLLENBQUMvRSxDQUFOLEdBQVUrRSxLQUFLLENBQUM1RSxLQUFoQixHQUF3QjZFLE1BQU0sQ0FBQ2hGLENBRC9CLElBRUErRSxLQUFLLENBQUM3RSxDQUFOLEdBQVU4RSxNQUFNLENBQUM5RSxDQUFQLEdBQVc4RSxNQUFNLENBQUM1RSxNQUY1QixJQUdBMkUsS0FBSyxDQUFDN0UsQ0FBTixHQUFVNkUsS0FBSyxDQUFDM0UsTUFBaEIsR0FBeUI0RSxNQUFNLENBQUM5RSxDQUpsQyxDQURGLEVBT0U7QUFDQSxXQUFPLElBQVA7QUFDRDtBQUNGLEM7Ozs7OztVQ2pERDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsNkNBQTZDLHdEQUF3RCxFOzs7OztXQ0FyRztXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQUssUUFBUSxDQUFDSSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFNTCxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0FGLFFBQU0sQ0FBQ0gsS0FBUCxHQUFlLEdBQWY7QUFDQUcsUUFBTSxDQUFDRixNQUFQLEdBQWdCLEdBQWhCO0FBQ0EsTUFBTUssR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUdBUyxxREFBSSxDQUFDYixNQUFELEVBQVNHLEdBQVQsQ0FBSjtBQUVELENBVEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuaW1wb3J0IHsgY29sbGlzaW9uIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuLy8gbGV0IGNhbnZhc1Bvc2l0aW9uID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4vLyAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4vLyAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4vLyAgIC8vIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG4vLyB9KTtcblxuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbi8vICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbi8vICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbi8vIH0pO1xuXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJylcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IENFTExTSVpFO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfVxuICBkcmF3KCkge1xuICAgIGlmIChtb3VzZS54ICYmIG1vdXNlLnkgJiYgY29sbGlzaW9uKHRoaXMsIG1vdXNlKSkge1xuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENlbGxcbiIsIi8vIGltcG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9ib2FyZFwiO1xuaW1wb3J0IEdva3UsIHsgcHJvamVjdGlsZXMgfSBmcm9tIFwiLi9nb2t1XCI7XG5pbXBvcnQgTmFydXRvIGZyb20gJy4vbmFydXRvJztcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSdcbmltcG9ydCB7IGNvbGxpc2lvbiwgY3JlYXRlTWFwIH0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBsZXQga2lsbENvdW50ID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWUoY2FudmFzLCBjdHgpIHtcbiAgY29uc3QgcmFtZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFtZW4nKVxuICBjb25zdCBnb2t1ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dva3UnKVxuICBjb25zdCBuYXJ1dG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJylcbiAgY29uc3QgZ29rdTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29rdTInKVxuICBjb25zdCBzdGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydCcpXG5cbiAgICAgY29uc3QgQ0VMTFNJWkUgPSA1MDtcbiAgICAgY29uc3QgR0FNRUdSSUQgPSBbXTtcbiAgICAgY29uc3QgR09LVVMgPSBbXTtcbiAgICAgY29uc3QgTkFSVVRPUyA9IFtdO1xuICAgICBsZXQgTU9ORVkgPSAzMDA7XG4gICAgIGxldCBmcmFtZSA9IDA7XG4gICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIC8vICBjb25zdCBwcm9qZWN0aWxlcyA9IFtdO1xuXG4gICAgIC8vIG1vdXNlXG4gICAgIGNvbnN0IG1vdXNlID0ge1xuICAgICAgIHg6IHVuZGVmaW5lZCxcbiAgICAgICB5OiB1bmRlZmluZWQsXG4gICAgICAgd2lkdGg6IDAuMSxcbiAgICAgICBoZWlnaHQ6IDAuMSxcbiAgICAgfTtcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4gICAgICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICAgfSk7XG5cbiAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgIG1vdXNlLnkgPSB1bmRlZmluZWQ7XG4gICAgIH0pO1xuICAgICAvLyBib2FyZFxuXG4gICAgIGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyB5ICs9IENFTExTSVpFKSB7XG4gICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogMjsgeCArPSBDRUxMU0laRSkge1xuICAgICAgICAgICBHQU1FR1JJRC5wdXNoKG5ldyBDZWxsKHgsIHkpKTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1cblxuICAgICBjcmVhdGVHcmlkKCk7XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlR2FtZUdyaWQoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHQU1FR1JJRC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgR0FNRUdSSURbaV0uZHJhdygpO1xuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIHByb2plY3RpbGVzXG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlUHJvamVjdGlsZXMoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0aWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgaWYgKGkgJSAyID09PSAwICYmIGklNCAhPT0gMCAmJiBpJTUgIT09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3RORSgpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGkgJSAzID09PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290U0UoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpJTQgPT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdE5XKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSAlIDUgPT09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3RTVygpO1xuICAgICAgICAgfVxuICAgICAgICAgZWxzZSB7cHJvamVjdGlsZXNbaV0uc2hvb3ROVygpO31cblxuICAgICAgICAgcHJvamVjdGlsZXNbaV0uZHJhdygpO1xuXG4gICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IE5BUlVUT1MubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgaWYgKE5BUlVUT1Nbal0gJiYgcHJvamVjdGlsZXNbaV0gJiYgY29sbGlzaW9uKHByb2plY3RpbGVzW2ldLCBOQVJVVE9TW2pdKSkge1xuICAgICAgICAgICAgIE5BUlVUT1Nbal0uaGVhbHRoIC09IHByb2plY3RpbGVzW2ldLnBvd2VyXG4gICAgICAgICAgICAgcHJvamVjdGlsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfVxuXG4gICAgICAgICBpZiAocHJvamVjdGlsZXNbaV0gJiYgcHJvamVjdGlsZXNbaV0ueCA+IGNhbnZhcy53aWR0aCAtIENFTExTSVpFKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgaS0tO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIGdva3VzXG5cbiAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgY29uc3QgZ3JpZFBvc3RpdGlvblggPSBtb3VzZS54IC0gKG1vdXNlLnggJSBDRUxMU0laRSk7XG4gICAgICAgY29uc3QgZ3JpZFBvc3RpdGlvblkgPSBtb3VzZS55IC0gKG1vdXNlLnkgJSBDRUxMU0laRSk7XG4gICAgICAgaWYgKGdyaWRQb3N0aXRpb25YID4gY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAzKSByZXR1cm47XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgaWYgKEdPS1VTW2ldLnggPT09IGdyaWRQb3N0aXRpb25YICYmIEdPS1VTW2ldLnkgPT09IGdyaWRQb3N0aXRpb25ZKVxuICAgICAgICAgICByZXR1cm47XG4gICAgICAgfVxuICAgICAgIGxldCBnb2t1Q29zdCA9IDI1MDtcbiAgICAgICBpZiAoTU9ORVkgPj0gZ29rdUNvc3QpIHtcbiAgICAgICAgIEdPS1VTLnB1c2gobmV3IEdva3UoZ3JpZFBvc3RpdGlvblgsIGdyaWRQb3N0aXRpb25ZKSk7XG4gICAgICAgICBNT05FWSAtPSBnb2t1Q29zdDtcbiAgICAgICAgIGlmIChOQVJVVE9TLmxlbmd0aCA8PSAwKSBhbmltYXRlTmFydXRvcygpXG4gICAgICAgfVxuICAgICB9KTtcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHb2t1cygpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBHT0tVU1tpXS5kcmF3KCk7XG4gICAgICAgICBHT0tVU1tpXS5zaG9vdCgpO1xuICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBOQVJVVE9TLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgIGlmIChHT0tVU1tpXSAmJiBjb2xsaXNpb24oR09LVVNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgTU9ORVkgLT0gLjA1XG4gICAgICAgICAgIH1cbiAgICAgICAgICAvLyAgaWYgKEdPS1VTW2ldLmhlYWx0aCA8IDApIHtcbiAgICAgICAgICAvLyAgICBHT0tVUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgLy8gICAgaS0tO1xuICAgICAgICAgIC8vICB9XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gbmFydXRvc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZU5hcnV0b3MoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTkFSVVRPUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTkFSVVRPU1tpXS5tb3ZlKCk7XG4gICAgICAgICAgICBOQVJVVE9TW2ldLmRyYXcoKTtcbiAgICAgICAgICAgIGlmIChOQVJVVE9TW2ldLnggPT09IENFTExTSVpFKjYgJiYgTkFSVVRPU1tpXS55ID09PSBDRUxMU0laRSo4KSB7XG4gICAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5BUlVUT1NbaV0uaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgICAgTkFSVVRPUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgTU9ORVkrPTEwMFxuICAgICAgICAgICAgICBraWxsQ291bnQrPTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhbWUgJSAyMDAgPT09IDApIHtcbiAgICAgICAgICAgIE5BUlVUT1MucHVzaChuZXcgTmFydXRvKCkpXG4gICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIHJlc291cmNlc1xuXG4gICAgIC8vIHV0aWxpdGllc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVTdGF0dXMoKSB7XG4gICAgICAgIGN0eC5zaGFkb3dDb2xvciA9IFwiZ3JlZW5cIjtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAxNTtcbiAgICAgICBpZiAoTU9ORVkgPj0gMjUwKSB7XG4gICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggRmFudGFzeVwiO1xuICAgICAgIH0gZWxzZSB7XG4gICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgIGN0eC5mb250ID0gXCIxNXB4IEZhbnRhc3lcIjtcbiAgICAgICB9XG4gICAgICAgY3R4LmZpbGxUZXh0KFwiTW9uZXk6ICRcIiArIE1PTkVZLCA4MDIsIDMwKTtcbiAgICAgICBpZiAoZ2FtZU92ZXIpIHtcbiAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgY3R4LmZvbnQgPSAnNjBweCBGYW50YXN5JztcbiAgICAgICAgIGN0eC5maWxsVGV4dChcIkdhbWUgT3ZlclwiLCAyNTAsIDI0OClcbiAgICAgICB9XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICBjdHguZm9udCA9IFwiMTVweCBGYW50YXN5XCI7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIktpbGwgQ291bnQ6IFwiICsga2lsbENvdW50LCA4MDIsIDYwKTtcblxuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTU7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgcmFtZW4sXG4gICAgICAgICAgQ0VMTFNJWkUqNixcbiAgICAgICAgICBDRUxMU0laRSo4LFxuICAgICAgICAgIDcwLFxuICAgICAgICAgIDUwXG4gICAgICAgICk7XG4gICAgICAgIGN0eC5zaGFkb3dDb2xvciA9IFwib3JhbmdlXCI7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gNTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICBnb2t1LFxuICAgICAgICAgIENFTExTSVpFKjYgKyA1MCxcbiAgICAgICAgICBDRUxMU0laRSo4IC0yMCxcbiAgICAgICAgICA3MCxcbiAgICAgICAgICA3MFxuICAgICAgICApO1xuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSBcInJlZFwiO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDE1O1xuICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgIG5hcnV0byxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgNTAsXG4gICAgICAgICAgNTBcbiAgICAgICAgKTtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gXCJhcXVhXCI7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTU7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgZ29rdTIsXG4gICAgICAgICAgODMwLFxuICAgICAgICAgIDMwMCxcbiAgICAgICAgICAzOSxcbiAgICAgICAgICA0OVxuICAgICAgICApO1xuICAgICAgICAvLyBjdHguZHJhd0ltYWdlKHN0YXJ0LCA4MDksIDUwMCwgODAsIDM3KTtcbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGFuaW1hdGVOYXJ1dG9zKCkge1xuICAgICAgICBoYW5kbGVOYXJ1dG9zKCk7XG4gICAgICAgIGlmICghZ2FtZU92ZXIpIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlTmFydXRvcyk7XG4gICAgIH1cbiAgICAgXG4gICAgIFxuICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICBjdHguc2hhZG93Q29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgY3R4LnNoYWRvd0JsdXIgPSAxMDtcbiAgICAgICBjdHguZmlsbFN0eWxlID0gXCJsaWdodGdyYXlcIjtcbiAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDIsXG4gICAgICAgICAwLFxuICAgICAgICAgQ0VMTFNJWkUgKiAyLFxuICAgICAgICAgY2FudmFzLmhlaWdodFxuICAgICAgICAgKTtcbiAgICAgICAgIFxuICAgICAgICAgY3JlYXRlTWFwKGN0eCk7XG4gICAgICAgICBoYW5kbGVHYW1lR3JpZCgpO1xuICAgICAgICAgaGFuZGxlR29rdXMoKTtcbiAgICAgICAgIGhhbmRsZVByb2plY3RpbGVzKCk7XG4gICAgICAgIC8vICBoYW5kbGVOYXJ1dG9zKCk7XG4gICAgICAgICBoYW5kbGVHYW1lU3RhdHVzKGN0eCk7XG4gICAgICAgICBmcmFtZSsrOyAgICAgICBcbiAgICAgICBpZiAoIWdhbWVPdmVyKSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgIH1cbiAgICAgYW5pbWF0ZSgpO1xuICAgIC8vICBhbmltYXRlTmFydXRvcygpO1xufVxuXG5cbi8vIGV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJztcblxuY29uc3QgQ0VMTFNJWkUgPSA1MDtcbmV4cG9ydCBjb25zdCBwcm9qZWN0aWxlcyA9IFtdXG5jb25zdCBHQU1FR1JJRCA9IFtdO1xuY29uc3QgR09LVVMgPSBbXTtcbmxldCBNT05FWSA9IDEwMDA7XG4vLyBjb25zdCBpbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29rdScpO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuY2xhc3MgR29rdSB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgdGhpcy5oZWlnaHQgPSA0OTtcbiAgICB0aGlzLnNob290aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgIHRoaXMudGltZXIgPSAwO1xuICAgIHRoaXMuaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb2t1MlwiKTtcbiAgICAvLyB0aGlzLmhlYWx0aCA9IDEwMFxuICAgICBcbiAgfVxuICBkcmF3KCkge1xuICAgICB0aGlzLmN0eC5zaGFkb3dDb2xvciA9IFwiYXF1YVwiO1xuICAgICB0aGlzLmN0eC5zaGFkb3dCbHVyID0gMTU7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngrOCwgdGhpcy55LHRoaXMud2lkdGgtMTAsIHRoaXMuaGVpZ2h0KVxuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ5ZWxsb3dcIjtcbiAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQtMzUpO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ29sZFwiO1xuICAgIC8vIHRoaXMuY3R4LmZvbnQgPSBcIjEwcHggQXJpYWxcIjtcbiAgICAvLyAvLyAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgLy8gLy8gICAgICAgTWF0aC5mbG9vcih0aGlzLmhlYWx0aCkgKyBcIkhQXCIsXG4gICAgLy8gLy8gICAgICAgdGhpcy54ICsgMTIsXG4gICAgLy8gLy8gICAgICAgdGhpcy55ICsgMTBcbiAgICAvLyAvLyAgICAgKTtcbiAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIkdva3VcIiwgdGhpcy54ICsgMTUsIHRoaXMueSArIDMwKTtcbiAgfVxuXG4gIHNob290KCkge1xuICAgIHRoaXMudGltZXIrKztcbiAgICBpZiAodGhpcy50aW1lciAlIDUwID09PSAwKSB7XG4gICAgICBwcm9qZWN0aWxlcy5wdXNoKG5ldyBQcm9qZWN0aWxlKHRoaXMueCArIDI1LCB0aGlzLnkgLSAxMCkpXG4gICAgfVxuICB9XG59XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUdva3VzKCkge1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgR09LVVNbaV0uZHJhdygpO1xuLy8gICB9XG4vLyB9XG5cblxuZXhwb3J0IGRlZmF1bHQgR29rdVxuXG5cbiAvLyAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIC8vICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgICAvLyAgfSk7XG5cbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgIC8vICB9KTtcbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gICAgY29uc3QgZ3JpZFBvc3RpdGlvblggPSBtb3VzZS54IC0gKG1vdXNlLnggJSBDRUxMU0laRSk7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGlmIChncmlkUG9zdGl0aW9uWSA8IENFTExTSVpFKSByZXR1cm47XG4gICAgICAvLyAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSkgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gICAgbGV0IGdva3VDb3N0ID0gMTAwO1xuICAgICAgLy8gICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAvLyAgICAgIEdPS1VTLnB1c2gobmV3IEdva3UoZ3JpZFBvc3RpdGlvblgsIGdyaWRQb3N0aXRpb25ZKSk7XG4gICAgICAvLyAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0pOyIsImNvbnN0IENFTExTSVpFID0gNTA7XG5pbXBvcnQgeyBraWxsQ291bnQgfSBmcm9tICcuL2dhbWUnO1xuLy8gY29uc3QgcnVuUmlnaHQgPSBuZXcgSW1hZ2UoKTtcbi8vIHJ1blJpZ2h0LnNyYyA9ICcuLi9zcmMvaW1hZ2VzL3J1bl8xLnBuZyc7XG5cbmNsYXNzIE5hcnV0byB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDk7XG4gICAgICAgIGlmIChraWxsQ291bnQgPCA4KSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTApICsgMjU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSA4ICYmIGtpbGxDb3VudCA8IDE1KSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzAwKSArIDUwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChraWxsQ291bnQgPj0gMTUgJiYga2lsbENvdW50IDwgMzApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5MDApICsgMzA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSAzMCAmJiBraWxsQ291bnQgPCA1MCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEyMDApICsgOTAwO1xuICAgICAgICB9IFxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDUwICYmIGtpbGxDb3VudCA8IDkwKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTUwMCkgKyAxMjAwO1xuICAgICAgICB9IFxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDkwICYmIGtpbGxDb3VudCA8IDE1MCkge1xuICAgICAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzAwMCkgKyAyNTAwO1xuICAgICAgICB9IFxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDE1MCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDY7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIwMDAwKSArIDUwMDA7XG4gICAgICAgIH0gXG4gICAgICAgIHRoaXMubW92ZW1lbnQgPSB0aGlzLnNwZWVkO1xuICAgICAgICAvLyB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQwMCkgKyA1MDtcbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLmhlYWx0aDtcbiAgICAgICAgdGhpcy5pbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hcnV0bzFcIik7XG5cbiAgICAgICAgLy8gdGhpcy5ydW5SaWdodCA9IHJ1blJpZ2h0O1xuICAgICAgICAvLyB0aGlzLmZyYW1lWCA9IDA7XG4gICAgICAgIC8vIHRoaXMuZnJhbWVZID0gMDtcbiAgICAgICAgLy8gdGhpcy5taW5GcmFtZSA9IDA7XG4gICAgICAgIC8vIHRoaXMubWF4RnJhbWUgPSA0O1xuICAgICAgICAvLyB0aGlzLnNwcml0ZVdpZHRoID0gOTA7XG4gICAgICAgIC8vIHRoaXMuc3ByaXRlSGVpZ2h0ID0gMTE3XG4gICAgICAgIFxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIC8vIHRoaXMueSArPSAxO1xuICAgICAgICBpZiAodGhpcy54ID49IDAgJiYgdGhpcy54IDw9IENFTExTSVpFKjE1ICYmIHRoaXMueSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnggPT09IENFTExTSVpFKjE1ICYmIHRoaXMueSA+PSAwICAmJiB0aGlzLnkgPD0gQ0VMTFNJWkUqMTEpIHtcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSoxMSAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTUgICYmIHRoaXMueCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA8PSBDRUxMU0laRSoxMSAmJiB0aGlzLnkgPj0gQ0VMTFNJWkUqMyAgJiYgdGhpcy54ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA9PT0gQ0VMTFNJWkUqMyAmJiB0aGlzLnggPj0gMCAgJiYgdGhpcy54IDw9IENFTExTSVpFKjEyKSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA+PSBDRUxMU0laRSozICYmIHRoaXMueSA8PSBDRUxMU0laRSo4ICAmJiB0aGlzLnggPT09IENFTExTSVpFKjEyKSB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA9PT0gQ0VMTFNJWkUqOCAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTIgICYmIHRoaXMueCA+PSBDRUxMU0laRSo2KSB7XG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgKHRoaXMuZnJhbWVYIDwgdGhpcy5tYXhGcmFtZSkgdGhpcy5mcmFtZVgrKztcbiAgICAgICAgLy8gZWxzZSB0aGlzLmZyYW1lWCA9IHRoaXMubWluRnJhbWU7XG4gICAgXG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgIHRoaXMuY3R4LnNoYWRvd0NvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgIHRoaXMuY3R4LnNoYWRvd0JsdXIgPSAxNTtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ3JheVwiO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQtMzUpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICAgICAgdGhpcy5jdHguZm9udCA9IFwiMTBweCBBcmlhbFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChNYXRoLmZsb29yKHRoaXMuaGVhbHRoKStcIkhQXCIsIHRoaXMueCArIDUsIHRoaXMueSArIDYwKTtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFRleHQoXCJOYXJ1dG9cIiwgdGhpcy54ICsgMTIsIHRoaXMueSArIDMwKTtcbiAgICAgICAgLy8gdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMucnVuUmlnaHQsIHRoaXMuZnJhbWVYKnRoaXMuc3ByaXRlV2lkdGgsIDAsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmFydXRvIiwiaW1wb3J0IHtwcm9qZWN0aWxlcyB9IGZyb20gJy4vZ29rdSc7XG5cbmNsYXNzIFByb2plY3RpbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSAxNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNTtcbiAgICAgICAgdGhpcy5wb3dlciA9IDI1O1xuICAgICAgICB0aGlzLnNwZWVkID0gNztcbiAgICAgICAgIHRoaXMuaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJrYW1lXCIpO1xuICAgIH1cblxuICAgIHNob290TkUoKSB7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3RTRSgpIHtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdE5XKCkge1xuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290U1coKSB7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgICB9XG5cblxuICAgIGRyYXcoKSB7XG4gICAgICAgICB0aGlzLmN0eC5zaGFkb3dDb2xvciA9IFwiYXF1YVwiO1xuICAgICAgICAgdGhpcy5jdHguc2hhZG93Qmx1ciA9IDE1O1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIHRoaXMueC0yMCwgdGhpcy55KzIwLCB0aGlzLndpZHRoKzIwLCB0aGlzLmhlaWdodCsyMCk7XG5cbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gJ2FxdWEnO1xuICAgICAgICAvLyB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgLy8gdGhpcy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCAwICwgTWF0aC5QSSoyKTtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZSIsIi8vIGltcG9ydCB7IGhhbmRsZUdhbWVHcmlkIH0gZnJvbSAnLi9ib2FyZCc7XG4vLyBpbXBvcnQgeyBoYW5kbGVHb2t1cyB9IGZyb20gJy4vZ29rdSc7XG5cbmNvbnN0IENFTExTSVpFID0gNTA7XG5cblxuICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGN0eCkge1xuICAgIGN0eC5zaGFkb3dDb2xvciA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdCgwLCBDRUxMU0laRSwgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KFxuICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBDRUxMU0laRSxcbiAgICAgIGNhbnZhcy5oZWlnaHQgLSBDRUxMU0laRSAqIDJcbiAgICApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChcbiAgICAgIENFTExTSVpFLFxuICAgICAgY2FudmFzLmhlaWdodCAtIENFTExTSVpFICogMixcbiAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCxcbiAgICAgIENFTExTSVpFXG4gICAgKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUsIENFTExTSVpFICogNCwgQ0VMTFNJWkUsIENFTExTSVpFICogNik7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFLCBDRUxMU0laRSAqIDQsIENFTExTSVpFICogMTEsIENFTExTSVpFKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUgKiAxMSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSwgQ0VMTFNJWkUgKiA0KTtcbiAgfVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGlzaW9uKGZpcnN0LCBzZWNvbmQpIHtcbiAgaWYgKFxuICAgICEoXG4gICAgICBmaXJzdC54ID4gc2Vjb25kLnggKyBzZWNvbmQud2lkdGggfHxcbiAgICAgIGZpcnN0LnggKyBmaXJzdC53aWR0aCA8IHNlY29uZC54IHx8XG4gICAgICBmaXJzdC55ID4gc2Vjb25kLnkgKyBzZWNvbmQuaGVpZ2h0IHx8XG4gICAgICBmaXJzdC55ICsgZmlyc3QuaGVpZ2h0IDwgc2Vjb25kLnlcbiAgICApXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2dhbWV9IGZyb20gJy4vc2NyaXB0cy9nYW1lJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgY2FudmFzLndpZHRoID0gOTAwO1xuICBjYW52YXMuaGVpZ2h0ID0gNjAwO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cbiAgZ2FtZShjYW52YXMsIGN0eCk7XG5cbn0pXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==