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
  var CELLSIZE = 50;
  var GAMEGRID = [];
  var GOKUS = [];
  var NARUTOS = [];
  var MONEY = 1000;
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
    ctx.drawImage(ramen, CELLSIZE * 6, CELLSIZE * 8, 70, 50);
    ctx.drawImage(goku, CELLSIZE * 6 + 50, CELLSIZE * 8 - 20, 70, 70);
    ctx.drawImage(naruto, 0, 0, 50, 50);
    ctx.drawImage(goku2, 830, 300, 39, 49);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lightgray";
    ctx.fillRect(canvas.width - CELLSIZE * 2, 0, CELLSIZE * 2, canvas.height);
    (0,_utilities__WEBPACK_IMPORTED_MODULE_4__.createMap)(ctx);
    handleGameGrid();
    handleGokus();
    handleProjectiles();
    handleNarutos();
    handleGameStatus(ctx);
    frame++;
    if (!gameOver) requestAnimationFrame(animate);
  }

  animate();
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

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount < 15) {
      this.speed = 1;
      this.health = Math.floor(Math.random() * 300) + 50;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 15 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 30) {
      this.speed = 1;
      this.health = Math.floor(Math.random() * 900) + 30;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 30 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 50) {
      this.speed = 2;
      this.health = Math.floor(Math.random() * 1200) + 900;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 50 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 90) {
      this.speed = 2;
      this.health = Math.floor(Math.random() * 2500) + 1200;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 90 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 150) {
      this.speed = 3;
      this.health = Math.floor(Math.random() * 5000) + 2500;
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
      this.ctx.drawImage(this.img, this.x, this.y, this.width + 15, this.height + 15); // this.ctx.fillStyle = 'aqua';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0Iiwia2lsbENvdW50IiwiZ2FtZSIsInJhbWVuIiwiZ29rdSIsIm5hcnV0byIsImdva3UyIiwiR0FNRUdSSUQiLCJHT0tVUyIsIk5BUlVUT1MiLCJNT05FWSIsImZyYW1lIiwiZ2FtZU92ZXIiLCJjcmVhdGVHcmlkIiwicHVzaCIsImhhbmRsZUdhbWVHcmlkIiwiaSIsImxlbmd0aCIsImRyYXciLCJoYW5kbGVQcm9qZWN0aWxlcyIsInByb2plY3RpbGVzIiwic2hvb3RORSIsInNob290U0UiLCJzaG9vdE5XIiwic2hvb3RTVyIsImoiLCJoZWFsdGgiLCJwb3dlciIsImdyaWRQb3N0aXRpb25YIiwiZ3JpZFBvc3RpdGlvblkiLCJnb2t1Q29zdCIsIkdva3UiLCJoYW5kbGVHb2t1cyIsInNob290IiwiaGFuZGxlTmFydXRvcyIsIm1vdmUiLCJzcGxpY2UiLCJOYXJ1dG8iLCJoYW5kbGVHYW1lU3RhdHVzIiwiZmlsbFN0eWxlIiwiZm9udCIsImZpbGxUZXh0IiwiZHJhd0ltYWdlIiwiYW5pbWF0ZSIsImNsZWFyUmVjdCIsImZpbGxSZWN0IiwiY3JlYXRlTWFwIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2hvb3RpbmciLCJ0aW1lciIsImltZyIsIlByb2plY3RpbGUiLCJzcGVlZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1vdmVtZW50IiwibWF4SGVhbHRoIiwiZmlyc3QiLCJzZWNvbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBRyxFQUFqQjtBQUVBO0FBRUEsSUFBTUMsS0FBSyxHQUFHO0FBQ1pDLEdBQUMsRUFBRUMsU0FEUztBQUVaQyxHQUFDLEVBQUVELFNBRlM7QUFHWkUsT0FBSyxFQUFFLEdBSEs7QUFJWkMsUUFBTSxFQUFFO0FBSkksQ0FBZCxDLENBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7SUFHTUMsSTtBQUNKLGdCQUFZTCxDQUFaLEVBQWVFLENBQWYsRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0ksTUFBTCxHQUFjQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLFNBQUtDLEdBQUwsR0FB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Ozs7O1dDUEEsNkNBQTZDLHdEQUF3RCxFOzs7OztXQ0FyRztXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQUssUUFBUSxDQUFDSSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFNTCxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0FGLFFBQU0sQ0FBQ0gsS0FBUCxHQUFlLEdBQWY7QUFDQUcsUUFBTSxDQUFDRixNQUFQLEdBQWdCLEdBQWhCO0FBQ0EsTUFBTUssR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUdBUyxxREFBSSxDQUFDYixNQUFELEVBQVNHLEdBQVQsQ0FBSjtBQUVELENBVEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuaW1wb3J0IHsgY29sbGlzaW9uIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuLy8gbGV0IGNhbnZhc1Bvc2l0aW9uID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4vLyAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4vLyAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4vLyAgIC8vIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG4vLyB9KTtcblxuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbi8vICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbi8vICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbi8vIH0pO1xuXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJylcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IENFTExTSVpFO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfVxuICBkcmF3KCkge1xuICAgIGlmIChtb3VzZS54ICYmIG1vdXNlLnkgJiYgY29sbGlzaW9uKHRoaXMsIG1vdXNlKSkge1xuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENlbGxcbiIsIi8vIGltcG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9ib2FyZFwiO1xuaW1wb3J0IEdva3UsIHsgcHJvamVjdGlsZXMgfSBmcm9tIFwiLi9nb2t1XCI7XG5pbXBvcnQgTmFydXRvIGZyb20gJy4vbmFydXRvJztcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSdcbmltcG9ydCB7IGNvbGxpc2lvbiwgY3JlYXRlTWFwIH0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBsZXQga2lsbENvdW50ID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWUoY2FudmFzLCBjdHgpIHtcbiAgY29uc3QgcmFtZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFtZW4nKVxuICBjb25zdCBnb2t1ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dva3UnKVxuICBjb25zdCBuYXJ1dG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmFydXRvJylcbiAgY29uc3QgZ29rdTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29rdTInKVxuXG4gICAgIGNvbnN0IENFTExTSVpFID0gNTA7XG4gICAgIGNvbnN0IEdBTUVHUklEID0gW107XG4gICAgIGNvbnN0IEdPS1VTID0gW107XG4gICAgIGNvbnN0IE5BUlVUT1MgPSBbXTtcbiAgICAgbGV0IE1PTkVZID0gMTAwMDtcbiAgICAgbGV0IGZyYW1lID0gMDtcbiAgICAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gICAgLy8gIGNvbnN0IHByb2plY3RpbGVzID0gW107XG5cbiAgICAgLy8gbW91c2VcbiAgICAgY29uc3QgbW91c2UgPSB7XG4gICAgICAgeDogdW5kZWZpbmVkLFxuICAgICAgIHk6IHVuZGVmaW5lZCxcbiAgICAgICB3aWR0aDogMC4xLFxuICAgICAgIGhlaWdodDogMC4xLFxuICAgICB9O1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuICAgICB9KTtcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgfSk7XG4gICAgIC8vIGJvYXJkXG5cbiAgICAgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNhbnZhcy5oZWlnaHQ7IHkgKz0gQ0VMTFNJWkUpIHtcbiAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAyOyB4ICs9IENFTExTSVpFKSB7XG4gICAgICAgICAgIEdBTUVHUklELnB1c2gobmV3IENlbGwoeCwgeSkpO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGNyZWF0ZUdyaWQoKTtcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHYW1lR3JpZCgpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdBTUVHUklELmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBHQU1FR1JJRFtpXS5kcmF3KCk7XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gcHJvamVjdGlsZXNcblxuICAgICBmdW5jdGlvbiBoYW5kbGVQcm9qZWN0aWxlcygpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBpZiAoaSAlIDIgPT09IDAgJiYgaSU0ICE9PSAwICYmIGklNSAhPT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdE5FKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSAlIDMgPT09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3RTRSgpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGklNCA9PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290TlcoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpICUgNSA9PT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdFNXKCk7XG4gICAgICAgICB9XG4gICAgICAgICBlbHNlIHtwcm9qZWN0aWxlc1tpXS5zaG9vdE5XKCk7fVxuXG4gICAgICAgICBwcm9qZWN0aWxlc1tpXS5kcmF3KCk7XG5cbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoTkFSVVRPU1tqXSAmJiBwcm9qZWN0aWxlc1tpXSAmJiBjb2xsaXNpb24ocHJvamVjdGlsZXNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgTkFSVVRPU1tqXS5oZWFsdGggLT0gcHJvamVjdGlsZXNbaV0ucG93ZXJcbiAgICAgICAgICAgICBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChwcm9qZWN0aWxlc1tpXSAmJiBwcm9qZWN0aWxlc1tpXS54ID4gY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUpIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICBpLS07XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gZ29rdXNcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgICBpZiAoZ3JpZFBvc3RpdGlvblggPiBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDMpIHJldHVybjtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBpZiAoR09LVVNbaV0ueCA9PT0gZ3JpZFBvc3RpdGlvblggJiYgR09LVVNbaV0ueSA9PT0gZ3JpZFBvc3RpdGlvblkpXG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgbGV0IGdva3VDb3N0ID0gMjUwO1xuICAgICAgIGlmIChNT05FWSA+PSBnb2t1Q29zdCkge1xuICAgICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgIH1cbiAgICAgfSk7XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlR29rdXMoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgR09LVVNbaV0uZHJhdygpO1xuICAgICAgICAgR09LVVNbaV0uc2hvb3QoKTtcbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoR09LVVNbaV0gJiYgY29sbGlzaW9uKEdPS1VTW2ldLCBOQVJVVE9TW2pdKSkge1xuICAgICAgICAgICAgIE1PTkVZIC09IC4wNVxuICAgICAgICAgICB9XG4gICAgICAgICAgLy8gIGlmIChHT0tVU1tpXS5oZWFsdGggPCAwKSB7XG4gICAgICAgICAgLy8gICAgR09LVVMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIC8vICAgIGktLTtcbiAgICAgICAgICAvLyAgfVxuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIG5hcnV0b3NcblxuICAgICBmdW5jdGlvbiBoYW5kbGVOYXJ1dG9zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5BUlVUT1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIE5BUlVUT1NbaV0ubW92ZSgpO1xuICAgICAgICAgICAgTkFSVVRPU1tpXS5kcmF3KCk7XG4gICAgICAgICAgICBpZiAoTkFSVVRPU1tpXS54ID09PSBDRUxMU0laRSo2ICYmIE5BUlVUT1NbaV0ueSA9PT0gQ0VMTFNJWkUqOCkge1xuICAgICAgICAgICAgICBnYW1lT3ZlciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOQVJVVE9TW2ldLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICAgIE5BUlVUT1Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIE1PTkVZKz0xMDBcbiAgICAgICAgICAgICAga2lsbENvdW50Kz0xXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lICUgMjAwID09PSAwKSB7XG4gICAgICAgICAgICBOQVJVVE9TLnB1c2gobmV3IE5hcnV0bygpKVxuICAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyByZXNvdXJjZXNcblxuICAgICAvLyB1dGlsaXRpZXNcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHYW1lU3RhdHVzKCkge1xuICAgICAgIGlmIChNT05FWSA+PSAyNTApIHtcbiAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgICBjdHguZm9udCA9IFwiMTVweCBGYW50YXN5XCI7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggRmFudGFzeVwiO1xuICAgICAgIH1cbiAgICAgICBjdHguZmlsbFRleHQoXCJNb25leTogJFwiICsgTU9ORVksIDgwMiwgMzApO1xuICAgICAgIGlmIChnYW1lT3Zlcikge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICBjdHguZm9udCA9ICc2MHB4IEZhbnRhc3knO1xuICAgICAgICAgY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIDI1MCwgMjQ4KVxuICAgICAgIH1cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgIGN0eC5mb250ID0gXCIxNXB4IEZhbnRhc3lcIjtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiS2lsbCBDb3VudDogXCIgKyBraWxsQ291bnQsIDgwMiwgNjApO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgcmFtZW4sXG4gICAgICAgICAgQ0VMTFNJWkUqNixcbiAgICAgICAgICBDRUxMU0laRSo4LFxuICAgICAgICAgIDcwLFxuICAgICAgICAgIDUwXG4gICAgICAgICk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgZ29rdSxcbiAgICAgICAgICBDRUxMU0laRSo2ICsgNTAsXG4gICAgICAgICAgQ0VMTFNJWkUqOCAtMjAsXG4gICAgICAgICAgNzAsXG4gICAgICAgICAgNzBcbiAgICAgICAgKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICBuYXJ1dG8sXG4gICAgICAgICAgMCxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDUwLFxuICAgICAgICAgIDUwXG4gICAgICAgICk7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgZ29rdTIsXG4gICAgICAgICAgODMwLFxuICAgICAgICAgIDMwMCxcbiAgICAgICAgICAzOSxcbiAgICAgICAgICA0OVxuICAgICAgICApO1xuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XG4gICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAyLFxuICAgICAgICAgMCxcbiAgICAgICAgIENFTExTSVpFICogMixcbiAgICAgICAgIGNhbnZhcy5oZWlnaHRcbiAgICAgICApO1xuXG4gICAgICAgY3JlYXRlTWFwKGN0eCk7XG4gICAgICAgaGFuZGxlR2FtZUdyaWQoKTtcbiAgICAgICBoYW5kbGVHb2t1cygpO1xuICAgICAgIGhhbmRsZVByb2plY3RpbGVzKCk7XG4gICAgICAgaGFuZGxlTmFydXRvcygpO1xuICAgICAgIGhhbmRsZUdhbWVTdGF0dXMoY3R4KTtcbiAgICAgICBmcmFtZSsrOyAgICAgICBcbiAgICAgICBpZiAoIWdhbWVPdmVyKSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgIH1cbiAgICAgYW5pbWF0ZSgpO1xufVxuXG5cbi8vIGV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJztcblxuY29uc3QgQ0VMTFNJWkUgPSA1MDtcbmV4cG9ydCBjb25zdCBwcm9qZWN0aWxlcyA9IFtdXG5jb25zdCBHQU1FR1JJRCA9IFtdO1xuY29uc3QgR09LVVMgPSBbXTtcbmxldCBNT05FWSA9IDEwMDA7XG4vLyBjb25zdCBpbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29rdScpO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuY2xhc3MgR29rdSB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgdGhpcy5oZWlnaHQgPSA0OTtcbiAgICB0aGlzLnNob290aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgIHRoaXMudGltZXIgPSAwO1xuICAgIHRoaXMuaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnb2t1MlwiKTtcbiAgICAvLyB0aGlzLmhlYWx0aCA9IDEwMFxuICAgICBcbiAgfVxuICBkcmF3KCkge1xuICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgdGhpcy54KzgsIHRoaXMueSx0aGlzLndpZHRoLTEwLCB0aGlzLmhlaWdodClcbiAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwieWVsbG93XCI7XG4gICAgLy8gdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LTM1KTtcbiAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdvbGRcIjtcbiAgICAvLyB0aGlzLmN0eC5mb250ID0gXCIxMHB4IEFyaWFsXCI7XG4gICAgLy8gLy8gICAgIHRoaXMuY3R4LmZpbGxUZXh0KFxuICAgIC8vIC8vICAgICAgIE1hdGguZmxvb3IodGhpcy5oZWFsdGgpICsgXCJIUFwiLFxuICAgIC8vIC8vICAgICAgIHRoaXMueCArIDEyLFxuICAgIC8vIC8vICAgICAgIHRoaXMueSArIDEwXG4gICAgLy8gLy8gICAgICk7XG4gICAgLy8gdGhpcy5jdHguZmlsbFRleHQoXCJHb2t1XCIsIHRoaXMueCArIDE1LCB0aGlzLnkgKyAzMCk7XG4gIH1cblxuICBzaG9vdCgpIHtcbiAgICB0aGlzLnRpbWVyKys7XG4gICAgaWYgKHRoaXMudGltZXIgJSA1MCA9PT0gMCkge1xuICAgICAgcHJvamVjdGlsZXMucHVzaChuZXcgUHJvamVjdGlsZSh0aGlzLnggKyAyNSwgdGhpcy55IC0gMTApKVxuICAgIH1cbiAgfVxufVxuXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBoYW5kbGVHb2t1cygpIHtcbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuLy8gICAgIEdPS1VTW2ldLmRyYXcoKTtcbi8vICAgfVxuLy8gfVxuXG5cbmV4cG9ydCBkZWZhdWx0IEdva3VcblxuXG4gLy8gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIC8vICAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4gICAgICAvLyAgICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuICAgICAgLy8gIH0pO1xuXG4gICAgICAvLyAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbiAgICAgIC8vICAgIG1vdXNlLnkgPSB1bmRlZmluZWQ7XG4gICAgICAvLyAgfSk7XG4gICAgICAvLyAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICAgIGNvbnN0IGdyaWRQb3N0aXRpb25YID0gbW91c2UueCAtIChtb3VzZS54ICUgQ0VMTFNJWkUpO1xuICAgICAgLy8gICAgY29uc3QgZ3JpZFBvc3RpdGlvblkgPSBtb3VzZS55IC0gKG1vdXNlLnkgJSBDRUxMU0laRSk7XG4gICAgICAvLyAgICBpZiAoZ3JpZFBvc3RpdGlvblkgPCBDRUxMU0laRSkgcmV0dXJuO1xuICAgICAgLy8gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gICAgICBpZiAoR09LVVNbaV0ueCA9PT0gZ3JpZFBvc3RpdGlvblggJiYgR09LVVNbaV0ueSA9PT0gZ3JpZFBvc3RpdGlvblkpIHJldHVybjtcbiAgICAgIC8vICAgIH1cbiAgICAgIC8vICAgIGxldCBnb2t1Q29zdCA9IDEwMDtcbiAgICAgIC8vICAgIGlmIChNT05FWSA+PSBnb2t1Q29zdCkge1xuICAgICAgLy8gICAgICBHT0tVUy5wdXNoKG5ldyBHb2t1KGdyaWRQb3N0aXRpb25YLCBncmlkUG9zdGl0aW9uWSkpO1xuICAgICAgLy8gICAgICBNT05FWSAtPSBnb2t1Q29zdDtcbiAgICAgIC8vICAgIH1cbiAgICAgIC8vICB9KTsiLCJjb25zdCBDRUxMU0laRSA9IDUwO1xuaW1wb3J0IHsga2lsbENvdW50IH0gZnJvbSAnLi9nYW1lJztcbi8vIGNvbnN0IHJ1blJpZ2h0ID0gbmV3IEltYWdlKCk7XG4vLyBydW5SaWdodC5zcmMgPSAnLi4vc3JjL2ltYWdlcy9ydW5fMS5wbmcnO1xuXG5jbGFzcyBOYXJ1dG8ge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy53aWR0aCA9IDQ5O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDQ5O1xuICAgICAgICBpZiAoa2lsbENvdW50IDwgMTUpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzMDApICsgNTA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSAxNSAmJiBraWxsQ291bnQgPCAzMCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkwMCkgKyAzMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDMwICYmIGtpbGxDb3VudCA8IDUwKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gMjtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTIwMCkgKyA5MDA7XG4gICAgICAgIH0gXG4gICAgICAgIGlmIChraWxsQ291bnQgPj0gNTAgJiYga2lsbENvdW50IDwgOTApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyNTAwKSArIDEyMDA7XG4gICAgICAgIH0gXG4gICAgICAgIGlmIChraWxsQ291bnQgPj0gOTAgJiYga2lsbENvdW50IDwgMTUwKSB7XG4gICAgICAgICAgdGhpcy5zcGVlZCA9IDM7XG4gICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1MDAwKSArIDI1MDA7XG4gICAgICAgIH0gXG4gICAgICAgIGlmIChraWxsQ291bnQgPj0gMTUwKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gNjtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMjAwMDApICsgNTAwMDtcbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy5tb3ZlbWVudCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIC8vIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNDAwKSArIDUwO1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IHRoaXMuaGVhbHRoO1xuICAgICAgICB0aGlzLmltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFydXRvMVwiKTtcblxuICAgICAgICAvLyB0aGlzLnJ1blJpZ2h0ID0gcnVuUmlnaHQ7XG4gICAgICAgIC8vIHRoaXMuZnJhbWVYID0gMDtcbiAgICAgICAgLy8gdGhpcy5mcmFtZVkgPSAwO1xuICAgICAgICAvLyB0aGlzLm1pbkZyYW1lID0gMDtcbiAgICAgICAgLy8gdGhpcy5tYXhGcmFtZSA9IDQ7XG4gICAgICAgIC8vIHRoaXMuc3ByaXRlV2lkdGggPSA5MDtcbiAgICAgICAgLy8gdGhpcy5zcHJpdGVIZWlnaHQgPSAxMTdcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgLy8gdGhpcy55ICs9IDE7XG4gICAgICAgIGlmICh0aGlzLnggPj0gMCAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueCA9PT0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID49IDAgICYmIHRoaXMueSA8PSBDRUxMU0laRSoxMSkge1xuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjExICYmIHRoaXMueCA8PSBDRUxMU0laRSoxNSAgJiYgdGhpcy54ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDw9IENFTExTSVpFKjExICYmIHRoaXMueSA+PSBDRUxMU0laRSozICAmJiB0aGlzLnggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSozICYmIHRoaXMueCA+PSAwICAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID49IENFTExTSVpFKjMgJiYgdGhpcy55IDw9IENFTExTSVpFKjggICYmIHRoaXMueCA9PT0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSo4ICYmIHRoaXMueCA8PSBDRUxMU0laRSoxMiAgJiYgdGhpcy54ID49IENFTExTSVpFKjYpIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAodGhpcy5mcmFtZVggPCB0aGlzLm1heEZyYW1lKSB0aGlzLmZyYW1lWCsrO1xuICAgICAgICAvLyBlbHNlIHRoaXMuZnJhbWVYID0gdGhpcy5taW5GcmFtZTtcbiAgICBcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmF5XCI7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodC0zNSk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMHB4IEFyaWFsXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KE1hdGguZmxvb3IodGhpcy5oZWFsdGgpK1wiSFBcIiwgdGhpcy54ICsgNSwgdGhpcy55ICsgNjApO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIk5hcnV0b1wiLCB0aGlzLnggKyAxMiwgdGhpcy55ICsgMzApO1xuICAgICAgICAvLyB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5ydW5SaWdodCwgdGhpcy5mcmFtZVgqdGhpcy5zcHJpdGVXaWR0aCwgMCwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXJ1dG8iLCJpbXBvcnQge3Byb2plY3RpbGVzIH0gZnJvbSAnLi9nb2t1JztcblxuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDE1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE1O1xuICAgICAgICB0aGlzLnBvd2VyID0gMjU7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA3O1xuICAgICAgICAgdGhpcy5pbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImthbWVcIik7XG4gICAgfVxuXG4gICAgc2hvb3RORSgpIHtcbiAgICAgICAgdGhpcy55IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdFNFKCkge1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290TlcoKSB7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3RTVygpIHtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkO1xuICAgIH1cblxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCsxNSwgdGhpcy5oZWlnaHQrMTUpO1xuXG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdhcXVhJztcbiAgICAgICAgLy8gdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgMCAsIE1hdGguUEkqMik7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGUiLCIvLyBpbXBvcnQgeyBoYW5kbGVHYW1lR3JpZCB9IGZyb20gJy4vYm9hcmQnO1xuLy8gaW1wb3J0IHsgaGFuZGxlR29rdXMgfSBmcm9tICcuL2dva3UnO1xuXG5jb25zdCBDRUxMU0laRSA9IDUwO1xuXG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcChjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KDAsIENFTExTSVpFLCBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsIENFTExTSVpFKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoXG4gICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsXG4gICAgICBDRUxMU0laRSxcbiAgICAgIENFTExTSVpFLFxuICAgICAgY2FudmFzLmhlaWdodCAtIENFTExTSVpFICogMlxuICAgICk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBjYW52YXMuaGVpZ2h0IC0gQ0VMTFNJWkUgKiAyLFxuICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LFxuICAgICAgQ0VMTFNJWkVcbiAgICApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSwgQ0VMTFNJWkUgKiA2KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUsIENFTExTSVpFICogNCwgQ0VMTFNJWkUgKiAxMSwgQ0VMTFNJWkUpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSAqIDExLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSAqIDQpO1xuICB9XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb24oZmlyc3QsIHNlY29uZCkge1xuICBpZiAoXG4gICAgIShcbiAgICAgIGZpcnN0LnggPiBzZWNvbmQueCArIHNlY29uZC53aWR0aCB8fFxuICAgICAgZmlyc3QueCArIGZpcnN0LndpZHRoIDwgc2Vjb25kLnggfHxcbiAgICAgIGZpcnN0LnkgPiBzZWNvbmQueSArIHNlY29uZC5oZWlnaHQgfHxcbiAgICAgIGZpcnN0LnkgKyBmaXJzdC5oZWlnaHQgPCBzZWNvbmQueVxuICAgIClcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Z2FtZX0gZnJvbSAnLi9zY3JpcHRzL2dhbWUnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICBjYW52YXMud2lkdGggPSA5MDA7XG4gIGNhbnZhcy5oZWlnaHQgPSA2MDA7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuICBnYW1lKGNhbnZhcywgY3R4KTtcblxufSlcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9