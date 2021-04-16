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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0Iiwia2lsbENvdW50IiwiZ2FtZSIsInJhbWVuIiwiZ29rdSIsIm5hcnV0byIsImdva3UyIiwiR0FNRUdSSUQiLCJHT0tVUyIsIk5BUlVUT1MiLCJNT05FWSIsImZyYW1lIiwiZ2FtZU92ZXIiLCJjcmVhdGVHcmlkIiwicHVzaCIsImhhbmRsZUdhbWVHcmlkIiwiaSIsImxlbmd0aCIsImRyYXciLCJoYW5kbGVQcm9qZWN0aWxlcyIsInByb2plY3RpbGVzIiwic2hvb3RORSIsInNob290U0UiLCJzaG9vdE5XIiwic2hvb3RTVyIsImoiLCJoZWFsdGgiLCJwb3dlciIsImdyaWRQb3N0aXRpb25YIiwiZ3JpZFBvc3RpdGlvblkiLCJnb2t1Q29zdCIsIkdva3UiLCJoYW5kbGVHb2t1cyIsInNob290IiwiaGFuZGxlTmFydXRvcyIsIm1vdmUiLCJzcGxpY2UiLCJOYXJ1dG8iLCJoYW5kbGVHYW1lU3RhdHVzIiwiZmlsbFN0eWxlIiwiZm9udCIsImZpbGxUZXh0IiwiZHJhd0ltYWdlIiwiYW5pbWF0ZSIsImNsZWFyUmVjdCIsImZpbGxSZWN0IiwiY3JlYXRlTWFwIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwic2hvb3RpbmciLCJ0aW1lciIsImltZyIsIlByb2plY3RpbGUiLCJzcGVlZCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1vdmVtZW50IiwibWF4SGVhbHRoIiwiZmlyc3QiLCJzZWNvbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBRyxFQUFqQjtBQUVBO0FBRUEsSUFBTUMsS0FBSyxHQUFHO0FBQ1pDLEdBQUMsRUFBRUMsU0FEUztBQUVaQyxHQUFDLEVBQUVELFNBRlM7QUFHWkUsT0FBSyxFQUFFLEdBSEs7QUFJWkMsUUFBTSxFQUFFO0FBSkksQ0FBZCxDLENBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7SUFHTUMsSTtBQUNKLGdCQUFZTCxDQUFaLEVBQWVFLENBQWYsRUFBa0I7QUFBQTs7QUFDaEIsU0FBS0ksTUFBTCxHQUFjQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLFNBQUtDLEdBQUwsR0FB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QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7QUNOQTtBQUVBSyxRQUFRLENBQUNJLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxZQUFNO0FBQ2xELE1BQU1MLE1BQU0sR0FBR0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWY7QUFDQUYsUUFBTSxDQUFDSCxLQUFQLEdBQWUsR0FBZjtBQUNBRyxRQUFNLENBQUNGLE1BQVAsR0FBZ0IsR0FBaEI7QUFDQSxNQUFNSyxHQUFHLEdBQUdILE1BQU0sQ0FBQ0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBR0FTLHFEQUFJLENBQUNiLE1BQUQsRUFBU0csR0FBVCxDQUFKO0FBRUQsQ0FURCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDRUxMU0laRSA9IDUwO1xuXG5pbXBvcnQgeyBjb2xsaXNpb24gfSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmNvbnN0IG1vdXNlID0ge1xuICB4OiB1bmRlZmluZWQsXG4gIHk6IHVuZGVmaW5lZCxcbiAgd2lkdGg6IDAuMSxcbiAgaGVpZ2h0OiAwLjEsXG59O1xuXG4vLyBsZXQgY2FudmFzUG9zaXRpb24gPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4vLyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuLy8gICAvLyBtb3VzZS54ID0gZS54IC0gY2FudmFzUG9zaXRpb24ubGVmdDtcbi8vICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbi8vICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbi8vICAgLy8gbW91c2UueSA9IGUueSAtIGNhbnZhc1Bvc2l0aW9uLnRvcDtcbi8vIH0pO1xuXG4vLyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuLy8gICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuLy8gICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuLy8gfSk7XG5cblxuY2xhc3MgQ2VsbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKVxuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5oZWlnaHQgPSBDRUxMU0laRTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgIH0pO1xuICB9XG4gIGRyYXcoKSB7XG4gICAgaWYgKG1vdXNlLnggJiYgbW91c2UueSAmJiBjb2xsaXNpb24odGhpcywgbW91c2UpKSB7XG4gICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2VsbFxuIiwiLy8gaW1wb3J0IHsgYW5pbWF0ZSB9IGZyb20gJy4vdXRpbGl0aWVzJztcbmltcG9ydCBDZWxsIGZyb20gXCIuL2JvYXJkXCI7XG5pbXBvcnQgR29rdSwgeyBwcm9qZWN0aWxlcyB9IGZyb20gXCIuL2dva3VcIjtcbmltcG9ydCBOYXJ1dG8gZnJvbSAnLi9uYXJ1dG8nO1xuaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJ1xuaW1wb3J0IHsgY29sbGlzaW9uLCBjcmVhdGVNYXAgfSBmcm9tIFwiLi91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGxldCBraWxsQ291bnQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZShjYW52YXMsIGN0eCkge1xuICBjb25zdCByYW1lbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW1lbicpXG4gIGNvbnN0IGdva3UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29rdScpXG4gIGNvbnN0IG5hcnV0byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXJ1dG8nKVxuICBjb25zdCBnb2t1MiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2t1MicpXG5cbiAgICAgY29uc3QgQ0VMTFNJWkUgPSA1MDtcbiAgICAgY29uc3QgR0FNRUdSSUQgPSBbXTtcbiAgICAgY29uc3QgR09LVVMgPSBbXTtcbiAgICAgY29uc3QgTkFSVVRPUyA9IFtdO1xuICAgICBsZXQgTU9ORVkgPSAxMDAwO1xuICAgICBsZXQgZnJhbWUgPSAwO1xuICAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAvLyAgY29uc3QgcHJvamVjdGlsZXMgPSBbXTtcblxuICAgICAvLyBtb3VzZVxuICAgICBjb25zdCBtb3VzZSA9IHtcbiAgICAgICB4OiB1bmRlZmluZWQsXG4gICAgICAgeTogdW5kZWZpbmVkLFxuICAgICAgIHdpZHRoOiAwLjEsXG4gICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgIH07XG5cbiAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgIH0pO1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbiAgICAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgICB9KTtcbiAgICAgLy8gYm9hcmRcblxuICAgICBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSArPSBDRUxMU0laRSkge1xuICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDI7IHggKz0gQ0VMTFNJWkUpIHtcbiAgICAgICAgICAgR0FNRUdSSUQucHVzaChuZXcgQ2VsbCh4LCB5KSk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgY3JlYXRlR3JpZCgpO1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVHcmlkKCkge1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FNRUdSSUQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIEdBTUVHUklEW2ldLmRyYXcoKTtcbiAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyBwcm9qZWN0aWxlc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZVByb2plY3RpbGVzKCkge1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIGlmIChpICUgMiA9PT0gMCAmJiBpJTQgIT09IDAgJiYgaSU1ICE9PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290TkUoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpICUgMyA9PT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdFNFKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSU0ID09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3ROVygpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGkgJSA1ID09PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290U1coKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge3Byb2plY3RpbGVzW2ldLnNob290TlcoKTt9XG5cbiAgICAgICAgIHByb2plY3RpbGVzW2ldLmRyYXcoKTtcblxuICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBOQVJVVE9TLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgIGlmIChOQVJVVE9TW2pdICYmIHByb2plY3RpbGVzW2ldICYmIGNvbGxpc2lvbihwcm9qZWN0aWxlc1tpXSwgTkFSVVRPU1tqXSkpIHtcbiAgICAgICAgICAgICBOQVJVVE9TW2pdLmhlYWx0aCAtPSBwcm9qZWN0aWxlc1tpXS5wb3dlclxuICAgICAgICAgICAgIHByb2plY3RpbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKHByb2plY3RpbGVzW2ldICYmIHByb2plY3RpbGVzW2ldLnggPiBjYW52YXMud2lkdGggLSBDRUxMU0laRSkge1xuICAgICAgICAgICBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgIGktLTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyBnb2t1c1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25YID0gbW91c2UueCAtIChtb3VzZS54ICUgQ0VMTFNJWkUpO1xuICAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25ZID0gbW91c2UueSAtIChtb3VzZS55ICUgQ0VMTFNJWkUpO1xuICAgICAgIGlmIChncmlkUG9zdGl0aW9uWCA+IGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogMykgcmV0dXJuO1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSlcbiAgICAgICAgICAgcmV0dXJuO1xuICAgICAgIH1cbiAgICAgICBsZXQgZ29rdUNvc3QgPSAyNTA7XG4gICAgICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAgICBHT0tVUy5wdXNoKG5ldyBHb2t1KGdyaWRQb3N0aXRpb25YLCBncmlkUG9zdGl0aW9uWSkpO1xuICAgICAgICAgTU9ORVkgLT0gZ29rdUNvc3Q7XG4gICAgICAgfVxuICAgICB9KTtcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHb2t1cygpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBHT0tVU1tpXS5kcmF3KCk7XG4gICAgICAgICBHT0tVU1tpXS5zaG9vdCgpO1xuICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBOQVJVVE9TLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgIGlmIChHT0tVU1tpXSAmJiBjb2xsaXNpb24oR09LVVNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgTU9ORVkgLT0gLjA1XG4gICAgICAgICAgIH1cbiAgICAgICAgICAvLyAgaWYgKEdPS1VTW2ldLmhlYWx0aCA8IDApIHtcbiAgICAgICAgICAvLyAgICBHT0tVUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgLy8gICAgaS0tO1xuICAgICAgICAgIC8vICB9XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gbmFydXRvc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZU5hcnV0b3MoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTkFSVVRPUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTkFSVVRPU1tpXS5tb3ZlKCk7XG4gICAgICAgICAgICBOQVJVVE9TW2ldLmRyYXcoKTtcbiAgICAgICAgICAgIGlmIChOQVJVVE9TW2ldLnggPT09IENFTExTSVpFKjYgJiYgTkFSVVRPU1tpXS55ID09PSBDRUxMU0laRSo4KSB7XG4gICAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5BUlVUT1NbaV0uaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgICAgTkFSVVRPUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgTU9ORVkrPTEwMFxuICAgICAgICAgICAgICBraWxsQ291bnQrPTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhbWUgJSAyMDAgPT09IDApIHtcbiAgICAgICAgICAgIE5BUlVUT1MucHVzaChuZXcgTmFydXRvKCkpXG4gICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIHJlc291cmNlc1xuXG4gICAgIC8vIHV0aWxpdGllc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVTdGF0dXMoKSB7XG4gICAgICAgaWYgKE1PTkVZID49IDI1MCkge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgIGN0eC5mb250ID0gXCIxNXB4IEZhbnRhc3lcIjtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICBjdHguZm9udCA9IFwiMTVweCBGYW50YXN5XCI7XG4gICAgICAgfVxuICAgICAgIGN0eC5maWxsVGV4dChcIk1vbmV5OiAkXCIgKyBNT05FWSwgODAyLCAzMCk7XG4gICAgICAgaWYgKGdhbWVPdmVyKSB7XG4gICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgIGN0eC5mb250ID0gJzYwcHggRmFudGFzeSc7XG4gICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgMjUwLCAyNDgpXG4gICAgICAgfVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggRmFudGFzeVwiO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJLaWxsIENvdW50OiBcIiArIGtpbGxDb3VudCwgODAyLCA2MCk7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICByYW1lbixcbiAgICAgICAgICBDRUxMU0laRSo2LFxuICAgICAgICAgIENFTExTSVpFKjgsXG4gICAgICAgICAgNzAsXG4gICAgICAgICAgNTBcbiAgICAgICAgKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICBnb2t1LFxuICAgICAgICAgIENFTExTSVpFKjYgKyA1MCxcbiAgICAgICAgICBDRUxMU0laRSo4IC0yMCxcbiAgICAgICAgICA3MCxcbiAgICAgICAgICA3MFxuICAgICAgICApO1xuICAgICAgICBjdHguZHJhd0ltYWdlKFxuICAgICAgICAgIG5hcnV0byxcbiAgICAgICAgICAwLFxuICAgICAgICAgIDAsXG4gICAgICAgICAgNTAsXG4gICAgICAgICAgNTBcbiAgICAgICAgKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShcbiAgICAgICAgICBnb2t1MixcbiAgICAgICAgICA4MzAsXG4gICAgICAgICAgMzAwLFxuICAgICAgICAgIDM5LFxuICAgICAgICAgIDQ5XG4gICAgICAgICk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICBjdHguZmlsbFN0eWxlID0gXCJsaWdodGdyYXlcIjtcbiAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDIsXG4gICAgICAgICAwLFxuICAgICAgICAgQ0VMTFNJWkUgKiAyLFxuICAgICAgICAgY2FudmFzLmhlaWdodFxuICAgICAgICk7XG5cbiAgICAgICBjcmVhdGVNYXAoY3R4KTtcbiAgICAgICBoYW5kbGVHYW1lR3JpZCgpO1xuICAgICAgIGhhbmRsZUdva3VzKCk7XG4gICAgICAgaGFuZGxlUHJvamVjdGlsZXMoKTtcbiAgICAgICBoYW5kbGVOYXJ1dG9zKCk7XG4gICAgICAgaGFuZGxlR2FtZVN0YXR1cyhjdHgpO1xuICAgICAgIGZyYW1lKys7ICAgICAgIFxuICAgICAgIGlmICghZ2FtZU92ZXIpIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgfVxuICAgICBhbmltYXRlKCk7XG59XG5cblxuLy8gZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnO1xuXG5jb25zdCBDRUxMU0laRSA9IDUwO1xuZXhwb3J0IGNvbnN0IHByb2plY3RpbGVzID0gW11cbmNvbnN0IEdBTUVHUklEID0gW107XG5jb25zdCBHT0tVUyA9IFtdO1xubGV0IE1PTkVZID0gMTAwMDtcbi8vIGNvbnN0IGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2t1Jyk7XG5cbmNvbnN0IG1vdXNlID0ge1xuICB4OiB1bmRlZmluZWQsXG4gIHk6IHVuZGVmaW5lZCxcbiAgd2lkdGg6IDAuMSxcbiAgaGVpZ2h0OiAwLjEsXG59O1xuXG5jbGFzcyBHb2t1IHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSA0OTtcbiAgICB0aGlzLmhlaWdodCA9IDQ5O1xuICAgIHRoaXMuc2hvb3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgdGhpcy50aW1lciA9IDA7XG4gICAgdGhpcy5pbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdva3UyXCIpO1xuICAgIC8vIHRoaXMuaGVhbHRoID0gMTAwXG4gICAgIFxuICB9XG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngrOCwgdGhpcy55LHRoaXMud2lkdGgtMTAsIHRoaXMuaGVpZ2h0KVxuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ5ZWxsb3dcIjtcbiAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQtMzUpO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ29sZFwiO1xuICAgIC8vIHRoaXMuY3R4LmZvbnQgPSBcIjEwcHggQXJpYWxcIjtcbiAgICAvLyAvLyAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgLy8gLy8gICAgICAgTWF0aC5mbG9vcih0aGlzLmhlYWx0aCkgKyBcIkhQXCIsXG4gICAgLy8gLy8gICAgICAgdGhpcy54ICsgMTIsXG4gICAgLy8gLy8gICAgICAgdGhpcy55ICsgMTBcbiAgICAvLyAvLyAgICAgKTtcbiAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIkdva3VcIiwgdGhpcy54ICsgMTUsIHRoaXMueSArIDMwKTtcbiAgfVxuXG4gIHNob290KCkge1xuICAgIHRoaXMudGltZXIrKztcbiAgICBpZiAodGhpcy50aW1lciAlIDUwID09PSAwKSB7XG4gICAgICBwcm9qZWN0aWxlcy5wdXNoKG5ldyBQcm9qZWN0aWxlKHRoaXMueCArIDI1LCB0aGlzLnkgLSAxMCkpXG4gICAgfVxuICB9XG59XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUdva3VzKCkge1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgR09LVVNbaV0uZHJhdygpO1xuLy8gICB9XG4vLyB9XG5cblxuZXhwb3J0IGRlZmF1bHQgR29rdVxuXG5cbiAvLyAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIC8vICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgICAvLyAgfSk7XG5cbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgIC8vICB9KTtcbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gICAgY29uc3QgZ3JpZFBvc3RpdGlvblggPSBtb3VzZS54IC0gKG1vdXNlLnggJSBDRUxMU0laRSk7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGlmIChncmlkUG9zdGl0aW9uWSA8IENFTExTSVpFKSByZXR1cm47XG4gICAgICAvLyAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSkgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gICAgbGV0IGdva3VDb3N0ID0gMTAwO1xuICAgICAgLy8gICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAvLyAgICAgIEdPS1VTLnB1c2gobmV3IEdva3UoZ3JpZFBvc3RpdGlvblgsIGdyaWRQb3N0aXRpb25ZKSk7XG4gICAgICAvLyAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0pOyIsImNvbnN0IENFTExTSVpFID0gNTA7XG5pbXBvcnQgeyBraWxsQ291bnQgfSBmcm9tICcuL2dhbWUnO1xuLy8gY29uc3QgcnVuUmlnaHQgPSBuZXcgSW1hZ2UoKTtcbi8vIHJ1blJpZ2h0LnNyYyA9ICcuLi9zcmMvaW1hZ2VzL3J1bl8xLnBuZyc7XG5cbmNsYXNzIE5hcnV0byB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDk7XG4gICAgICAgIGlmIChraWxsQ291bnQgPCAxNSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwMCkgKyA1MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDE1ICYmIGtpbGxDb3VudCA8IDMwKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwKSArIDMwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChraWxsQ291bnQgPj0gMzAgJiYga2lsbENvdW50IDwgNTApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMjAwKSArIDkwMDtcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSA1MCAmJiBraWxsQ291bnQgPCA5MCkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDI7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1MDApICsgMTIwMDtcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSA5MCAmJiBraWxsQ291bnQgPCAxNTApIHtcbiAgICAgICAgICB0aGlzLnNwZWVkID0gMztcbiAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwMDApICsgMjUwMDtcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSAxNTApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSA2O1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMDAwMCkgKyA1MDAwO1xuICAgICAgICB9IFxuICAgICAgICB0aGlzLm1vdmVtZW50ID0gdGhpcy5zcGVlZDtcbiAgICAgICAgLy8gdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0MDApICsgNTA7XG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5oZWFsdGg7XG4gICAgICAgIHRoaXMuaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXJ1dG8xXCIpO1xuXG4gICAgICAgIC8vIHRoaXMucnVuUmlnaHQgPSBydW5SaWdodDtcbiAgICAgICAgLy8gdGhpcy5mcmFtZVggPSAwO1xuICAgICAgICAvLyB0aGlzLmZyYW1lWSA9IDA7XG4gICAgICAgIC8vIHRoaXMubWluRnJhbWUgPSAwO1xuICAgICAgICAvLyB0aGlzLm1heEZyYW1lID0gNDtcbiAgICAgICAgLy8gdGhpcy5zcHJpdGVXaWR0aCA9IDkwO1xuICAgICAgICAvLyB0aGlzLnNwcml0ZUhlaWdodCA9IDExN1xuICAgICAgICBcbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICAvLyB0aGlzLnkgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMueCA+PSAwICYmIHRoaXMueCA8PSBDRUxMU0laRSoxNSAmJiB0aGlzLnkgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID09PSBDRUxMU0laRSoxNSAmJiB0aGlzLnkgPj0gMCAgJiYgdGhpcy55IDw9IENFTExTSVpFKjExKSB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA9PT0gQ0VMTFNJWkUqMTEgJiYgdGhpcy54IDw9IENFTExTSVpFKjE1ICAmJiB0aGlzLnggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPD0gQ0VMTFNJWkUqMTEgJiYgdGhpcy55ID49IENFTExTSVpFKjMgICYmIHRoaXMueCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy55IC09IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjMgJiYgdGhpcy54ID49IDAgICYmIHRoaXMueCA8PSBDRUxMU0laRSoxMikge1xuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPj0gQ0VMTFNJWkUqMyAmJiB0aGlzLnkgPD0gQ0VMTFNJWkUqOCAgJiYgdGhpcy54ID09PSBDRUxMU0laRSoxMikge1xuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjggJiYgdGhpcy54IDw9IENFTExTSVpFKjEyICAmJiB0aGlzLnggPj0gQ0VMTFNJWkUqNikge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmICh0aGlzLmZyYW1lWCA8IHRoaXMubWF4RnJhbWUpIHRoaXMuZnJhbWVYKys7XG4gICAgICAgIC8vIGVsc2UgdGhpcy5mcmFtZVggPSB0aGlzLm1pbkZyYW1lO1xuICAgIFxuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLmltZywgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImdyYXlcIjtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LTM1KTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibHVlXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEwcHggQXJpYWxcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoTWF0aC5mbG9vcih0aGlzLmhlYWx0aCkrXCJIUFwiLCB0aGlzLnggKyA1LCB0aGlzLnkgKyA2MCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KFwiTmFydXRvXCIsIHRoaXMueCArIDEyLCB0aGlzLnkgKyAzMCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmRyYXdJbWFnZSh0aGlzLnJ1blJpZ2h0LCB0aGlzLmZyYW1lWCp0aGlzLnNwcml0ZVdpZHRoLCAwLCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCwgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hcnV0byIsImltcG9ydCB7cHJvamVjdGlsZXMgfSBmcm9tICcuL2dva3UnO1xuXG5jbGFzcyBQcm9qZWN0aWxlIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gMTU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gMTU7XG4gICAgICAgIHRoaXMucG93ZXIgPSAyNTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDc7XG4gICAgICAgICB0aGlzLmltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwia2FtZVwiKTtcbiAgICB9XG5cbiAgICBzaG9vdE5FKCkge1xuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290U0UoKSB7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3ROVygpIHtcbiAgICAgICAgdGhpcy55IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdFNXKCkge1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgfVxuXG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIHRoaXMueC0yMCwgdGhpcy55KzIwLCB0aGlzLndpZHRoKzIwLCB0aGlzLmhlaWdodCsyMCk7XG5cbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gJ2FxdWEnO1xuICAgICAgICAvLyB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgLy8gdGhpcy5jdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCAwICwgTWF0aC5QSSoyKTtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbCgpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJvamVjdGlsZSIsIi8vIGltcG9ydCB7IGhhbmRsZUdhbWVHcmlkIH0gZnJvbSAnLi9ib2FyZCc7XG4vLyBpbXBvcnQgeyBoYW5kbGVHb2t1cyB9IGZyb20gJy4vZ29rdSc7XG5cbmNvbnN0IENFTExTSVpFID0gNTA7XG5cblxuICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGN0eCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwgQ0VMTFNJWkUsIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCwgQ0VMTFNJWkUpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChcbiAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCxcbiAgICAgIENFTExTSVpFLFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBjYW52YXMuaGVpZ2h0IC0gQ0VMTFNJWkUgKiAyXG4gICAgKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoXG4gICAgICBDRUxMU0laRSxcbiAgICAgIGNhbnZhcy5oZWlnaHQgLSBDRUxMU0laRSAqIDIsXG4gICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsXG4gICAgICBDRUxMU0laRVxuICAgICk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSAqIDYpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSAqIDExLCBDRUxMU0laRSk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFICogMTEsIENFTExTSVpFICogNCwgQ0VMTFNJWkUsIENFTExTSVpFICogNCk7XG4gIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpc2lvbihmaXJzdCwgc2Vjb25kKSB7XG4gIGlmIChcbiAgICAhKFxuICAgICAgZmlyc3QueCA+IHNlY29uZC54ICsgc2Vjb25kLndpZHRoIHx8XG4gICAgICBmaXJzdC54ICsgZmlyc3Qud2lkdGggPCBzZWNvbmQueCB8fFxuICAgICAgZmlyc3QueSA+IHNlY29uZC55ICsgc2Vjb25kLmhlaWdodCB8fFxuICAgICAgZmlyc3QueSArIGZpcnN0LmhlaWdodCA8IHNlY29uZC55XG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtnYW1lfSBmcm9tICcuL3NjcmlwdHMvZ2FtZSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gIGNhbnZhcy53aWR0aCA9IDkwMDtcbiAgY2FudmFzLmhlaWdodCA9IDYwMDtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG4gIGdhbWUoY2FudmFzLCBjdHgpO1xuXG59KVxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=