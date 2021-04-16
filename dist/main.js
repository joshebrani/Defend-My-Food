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
      this.health = Math.floor(Math.random() * 900) + 50;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 30 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 90) {
      this.speed = 2;
      this.health = Math.floor(Math.random() * 1200) + 50;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 90 && _game__WEBPACK_IMPORTED_MODULE_0__.killCount < 150) {
      this.speed = 3;
      this.health = Math.floor(Math.random() * 7000) + 50;
    }

    if (_game__WEBPACK_IMPORTED_MODULE_0__.killCount >= 150) {
      this.speed = 6;
      this.health = Math.floor(Math.random() * 20000) + 50;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0Iiwia2lsbENvdW50IiwiZ2FtZSIsIkdBTUVHUklEIiwiR09LVVMiLCJOQVJVVE9TIiwiTU9ORVkiLCJmcmFtZSIsImdhbWVPdmVyIiwiY3JlYXRlR3JpZCIsInB1c2giLCJoYW5kbGVHYW1lR3JpZCIsImkiLCJsZW5ndGgiLCJkcmF3IiwiaGFuZGxlUHJvamVjdGlsZXMiLCJwcm9qZWN0aWxlcyIsInNob290TkUiLCJzaG9vdFNFIiwic2hvb3ROVyIsInNob290U1ciLCJqIiwiaGVhbHRoIiwicG93ZXIiLCJncmlkUG9zdGl0aW9uWCIsImdyaWRQb3N0aXRpb25ZIiwiZ29rdUNvc3QiLCJHb2t1IiwiaGFuZGxlR29rdXMiLCJzaG9vdCIsImhhbmRsZU5hcnV0b3MiLCJtb3ZlIiwic3BsaWNlIiwiTmFydXRvIiwiaGFuZGxlR2FtZVN0YXR1cyIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsImFuaW1hdGUiLCJjbGVhclJlY3QiLCJmaWxsUmVjdCIsImNyZWF0ZU1hcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNob290aW5nIiwidGltZXIiLCJpbWciLCJkcmF3SW1hZ2UiLCJQcm9qZWN0aWxlIiwic3BlZWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtb3ZlbWVudCIsIm1heEhlYWx0aCIsImZpcnN0Iiwic2Vjb25kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRLEdBQUcsRUFBakI7QUFFQTtBQUVBLElBQU1DLEtBQUssR0FBRztBQUNaQyxHQUFDLEVBQUVDLFNBRFM7QUFFWkMsR0FBQyxFQUFFRCxTQUZTO0FBR1pFLE9BQUssRUFBRSxHQUhLO0FBSVpDLFFBQU0sRUFBRTtBQUpJLENBQWQsQyxDQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0lBR01DLEk7QUFDSixnQkFBWUwsQ0FBWixFQUFlRSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtJLE1BQUwsR0FBY0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0gsTUFBTCxDQUFZSSxVQUFaLENBQXVCLElB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VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsNkNBQTZDLHdEQUF3RCxFOzs7OztXQ0FyRztXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQUssUUFBUSxDQUFDSSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFNTCxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0FGLFFBQU0sQ0FBQ0gsS0FBUCxHQUFlLEdBQWY7QUFDQUcsUUFBTSxDQUFDRixNQUFQLEdBQWdCLEdBQWhCO0FBQ0EsTUFBTUssR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUdBUyxxREFBSSxDQUFDYixNQUFELEVBQVNHLEdBQVQsQ0FBSjtBQUVELENBVEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuaW1wb3J0IHsgY29sbGlzaW9uIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuLy8gbGV0IGNhbnZhc1Bvc2l0aW9uID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4vLyAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4vLyAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4vLyAgIC8vIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG4vLyB9KTtcblxuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbi8vICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbi8vICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbi8vIH0pO1xuXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJylcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IENFTExTSVpFO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfVxuICBkcmF3KCkge1xuICAgIGlmIChtb3VzZS54ICYmIG1vdXNlLnkgJiYgY29sbGlzaW9uKHRoaXMsIG1vdXNlKSkge1xuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENlbGxcbiIsIi8vIGltcG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9ib2FyZFwiO1xuaW1wb3J0IEdva3UsIHsgcHJvamVjdGlsZXMgfSBmcm9tIFwiLi9nb2t1XCI7XG5pbXBvcnQgTmFydXRvIGZyb20gJy4vbmFydXRvJztcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSdcbmltcG9ydCB7IGNvbGxpc2lvbiwgY3JlYXRlTWFwIH0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBsZXQga2lsbENvdW50ID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGdhbWUoY2FudmFzLCBjdHgpIHtcbiAgICAgY29uc3QgQ0VMTFNJWkUgPSA1MDtcbiAgICAgY29uc3QgR0FNRUdSSUQgPSBbXTtcbiAgICAgY29uc3QgR09LVVMgPSBbXTtcbiAgICAgY29uc3QgTkFSVVRPUyA9IFtdO1xuICAgICBsZXQgTU9ORVkgPSAxMDAwO1xuICAgICBsZXQgZnJhbWUgPSAwO1xuICAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAvLyAgY29uc3QgcHJvamVjdGlsZXMgPSBbXTtcblxuICAgICAvLyBtb3VzZVxuICAgICBjb25zdCBtb3VzZSA9IHtcbiAgICAgICB4OiB1bmRlZmluZWQsXG4gICAgICAgeTogdW5kZWZpbmVkLFxuICAgICAgIHdpZHRoOiAwLjEsXG4gICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgIH07XG5cbiAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgIH0pO1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbiAgICAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgICB9KTtcbiAgICAgLy8gYm9hcmRcblxuICAgICBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSArPSBDRUxMU0laRSkge1xuICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDI7IHggKz0gQ0VMTFNJWkUpIHtcbiAgICAgICAgICAgR0FNRUdSSUQucHVzaChuZXcgQ2VsbCh4LCB5KSk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgY3JlYXRlR3JpZCgpO1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVHcmlkKCkge1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FNRUdSSUQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIEdBTUVHUklEW2ldLmRyYXcoKTtcbiAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyBwcm9qZWN0aWxlc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZVByb2plY3RpbGVzKCkge1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIGlmIChpICUgMiA9PT0gMCAmJiBpJTQgIT09IDAgJiYgaSU1ICE9PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290TkUoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpICUgMyA9PT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdFNFKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSU0ID09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3ROVygpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGkgJSA1ID09PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290U1coKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge3Byb2plY3RpbGVzW2ldLnNob290TlcoKTt9XG5cbiAgICAgICAgIHByb2plY3RpbGVzW2ldLmRyYXcoKTtcblxuICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBOQVJVVE9TLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgIGlmIChOQVJVVE9TW2pdICYmIHByb2plY3RpbGVzW2ldICYmIGNvbGxpc2lvbihwcm9qZWN0aWxlc1tpXSwgTkFSVVRPU1tqXSkpIHtcbiAgICAgICAgICAgICBOQVJVVE9TW2pdLmhlYWx0aCAtPSBwcm9qZWN0aWxlc1tpXS5wb3dlclxuICAgICAgICAgICAgIHByb2plY3RpbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKHByb2plY3RpbGVzW2ldICYmIHByb2plY3RpbGVzW2ldLnggPiBjYW52YXMud2lkdGggLSBDRUxMU0laRSkge1xuICAgICAgICAgICBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgIGktLTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyBnb2t1c1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25YID0gbW91c2UueCAtIChtb3VzZS54ICUgQ0VMTFNJWkUpO1xuICAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25ZID0gbW91c2UueSAtIChtb3VzZS55ICUgQ0VMTFNJWkUpO1xuICAgICAgIGlmIChncmlkUG9zdGl0aW9uWCA+IGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogMykgcmV0dXJuO1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSlcbiAgICAgICAgICAgcmV0dXJuO1xuICAgICAgIH1cbiAgICAgICBsZXQgZ29rdUNvc3QgPSAyNTA7XG4gICAgICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAgICBHT0tVUy5wdXNoKG5ldyBHb2t1KGdyaWRQb3N0aXRpb25YLCBncmlkUG9zdGl0aW9uWSkpO1xuICAgICAgICAgTU9ORVkgLT0gZ29rdUNvc3Q7XG4gICAgICAgfVxuICAgICB9KTtcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHb2t1cygpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBHT0tVU1tpXS5kcmF3KCk7XG4gICAgICAgICBHT0tVU1tpXS5zaG9vdCgpO1xuICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBOQVJVVE9TLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgIGlmIChHT0tVU1tpXSAmJiBjb2xsaXNpb24oR09LVVNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgTU9ORVkgLT0gLjA1XG4gICAgICAgICAgIH1cbiAgICAgICAgICAvLyAgaWYgKEdPS1VTW2ldLmhlYWx0aCA8IDApIHtcbiAgICAgICAgICAvLyAgICBHT0tVUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgLy8gICAgaS0tO1xuICAgICAgICAgIC8vICB9XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gbmFydXRvc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZU5hcnV0b3MoKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTkFSVVRPUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTkFSVVRPU1tpXS5tb3ZlKCk7XG4gICAgICAgICAgICBOQVJVVE9TW2ldLmRyYXcoKTtcbiAgICAgICAgICAgIGlmIChOQVJVVE9TW2ldLnggPT09IENFTExTSVpFKjYgJiYgTkFSVVRPU1tpXS55ID09PSBDRUxMU0laRSo4KSB7XG4gICAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKE5BUlVUT1NbaV0uaGVhbHRoIDw9IDApIHtcbiAgICAgICAgICAgICAgTkFSVVRPUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgICAgTU9ORVkrPTEwMFxuICAgICAgICAgICAgICBraWxsQ291bnQrPTFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhbWUgJSAyMDAgPT09IDApIHtcbiAgICAgICAgICAgIE5BUlVUT1MucHVzaChuZXcgTmFydXRvKCkpXG4gICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIHJlc291cmNlc1xuXG4gICAgIC8vIHV0aWxpdGllc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVTdGF0dXMoKSB7XG4gICAgICAgaWYgKE1PTkVZID49IDI1MCkge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgIGN0eC5mb250ID0gXCIxNXB4IEZhbnRhc3lcIjtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICBjdHguZm9udCA9IFwiMTVweCBGYW50YXN5XCI7XG4gICAgICAgfVxuICAgICAgIGN0eC5maWxsVGV4dChcIk1vbmV5OiAkXCIgKyBNT05FWSwgODAyLCAzMCk7XG4gICAgICAgaWYgKGdhbWVPdmVyKSB7XG4gICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgIGN0eC5mb250ID0gJzYwcHggRmFudGFzeSc7XG4gICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgMjUwLCAyNDgpXG4gICAgICAgfVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggRmFudGFzeVwiO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJLaWxsIENvdW50OiBcIiArIGtpbGxDb3VudCwgODAyLCA2MCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICBjdHguZmlsbFN0eWxlID0gXCJsaWdodGdyYXlcIjtcbiAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDIsXG4gICAgICAgICAwLFxuICAgICAgICAgQ0VMTFNJWkUgKiAyLFxuICAgICAgICAgY2FudmFzLmhlaWdodFxuICAgICAgICk7XG5cbiAgICAgICBjcmVhdGVNYXAoY3R4KTtcbiAgICAgICBoYW5kbGVHYW1lR3JpZCgpO1xuICAgICAgIGhhbmRsZUdva3VzKCk7XG4gICAgICAgaGFuZGxlUHJvamVjdGlsZXMoKTtcbiAgICAgICBoYW5kbGVOYXJ1dG9zKCk7XG4gICAgICAgaGFuZGxlR2FtZVN0YXR1cyhjdHgpO1xuICAgICAgIGZyYW1lKys7ICAgICAgIFxuICAgICAgIGlmICghZ2FtZU92ZXIpIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgfVxuICAgICBhbmltYXRlKCk7XG59XG5cblxuLy8gZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnO1xuXG5jb25zdCBDRUxMU0laRSA9IDUwO1xuZXhwb3J0IGNvbnN0IHByb2plY3RpbGVzID0gW11cbmNvbnN0IEdBTUVHUklEID0gW107XG5jb25zdCBHT0tVUyA9IFtdO1xubGV0IE1PTkVZID0gMTAwMDtcbi8vIGNvbnN0IGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2t1Jyk7XG5cbmNvbnN0IG1vdXNlID0ge1xuICB4OiB1bmRlZmluZWQsXG4gIHk6IHVuZGVmaW5lZCxcbiAgd2lkdGg6IDAuMSxcbiAgaGVpZ2h0OiAwLjEsXG59O1xuXG5jbGFzcyBHb2t1IHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSA0OTtcbiAgICB0aGlzLmhlaWdodCA9IDQ5O1xuICAgIHRoaXMuc2hvb3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgdGhpcy50aW1lciA9IDA7XG4gICAgdGhpcy5pbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdva3UyXCIpO1xuICAgIC8vIHRoaXMuaGVhbHRoID0gMTAwXG4gICAgIFxuICB9XG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngrOCwgdGhpcy55LHRoaXMud2lkdGgtMTAsIHRoaXMuaGVpZ2h0KVxuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ5ZWxsb3dcIjtcbiAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQtMzUpO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ29sZFwiO1xuICAgIC8vIHRoaXMuY3R4LmZvbnQgPSBcIjEwcHggQXJpYWxcIjtcbiAgICAvLyAvLyAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgLy8gLy8gICAgICAgTWF0aC5mbG9vcih0aGlzLmhlYWx0aCkgKyBcIkhQXCIsXG4gICAgLy8gLy8gICAgICAgdGhpcy54ICsgMTIsXG4gICAgLy8gLy8gICAgICAgdGhpcy55ICsgMTBcbiAgICAvLyAvLyAgICAgKTtcbiAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIkdva3VcIiwgdGhpcy54ICsgMTUsIHRoaXMueSArIDMwKTtcbiAgfVxuXG4gIHNob290KCkge1xuICAgIHRoaXMudGltZXIrKztcbiAgICBpZiAodGhpcy50aW1lciAlIDUwID09PSAwKSB7XG4gICAgICBwcm9qZWN0aWxlcy5wdXNoKG5ldyBQcm9qZWN0aWxlKHRoaXMueCArIDI1LCB0aGlzLnkgLSAxMCkpXG4gICAgfVxuICB9XG59XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUdva3VzKCkge1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgR09LVVNbaV0uZHJhdygpO1xuLy8gICB9XG4vLyB9XG5cblxuZXhwb3J0IGRlZmF1bHQgR29rdVxuXG5cbiAvLyAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIC8vICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgICAvLyAgfSk7XG5cbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgIC8vICB9KTtcbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gICAgY29uc3QgZ3JpZFBvc3RpdGlvblggPSBtb3VzZS54IC0gKG1vdXNlLnggJSBDRUxMU0laRSk7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGlmIChncmlkUG9zdGl0aW9uWSA8IENFTExTSVpFKSByZXR1cm47XG4gICAgICAvLyAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSkgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gICAgbGV0IGdva3VDb3N0ID0gMTAwO1xuICAgICAgLy8gICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAvLyAgICAgIEdPS1VTLnB1c2gobmV3IEdva3UoZ3JpZFBvc3RpdGlvblgsIGdyaWRQb3N0aXRpb25ZKSk7XG4gICAgICAvLyAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0pOyIsImNvbnN0IENFTExTSVpFID0gNTA7XG5pbXBvcnQgeyBraWxsQ291bnQgfSBmcm9tICcuL2dhbWUnO1xuLy8gY29uc3QgcnVuUmlnaHQgPSBuZXcgSW1hZ2UoKTtcbi8vIHJ1blJpZ2h0LnNyYyA9ICcuLi9zcmMvaW1hZ2VzL3J1bl8xLnBuZyc7XG5cbmNsYXNzIE5hcnV0byB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDk7XG4gICAgICAgIGlmIChraWxsQ291bnQgPCAxNSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwMCkgKyA1MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDE1ICYmIGtpbGxDb3VudCA8IDMwKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwKSArIDUwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChraWxsQ291bnQgPj0gMzAgJiYga2lsbENvdW50IDwgOTApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMjAwKSArIDUwO1xuICAgICAgICB9IFxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDkwICYmIGtpbGxDb3VudCA8IDE1MCkge1xuICAgICAgICAgIHRoaXMuc3BlZWQgPSAzO1xuICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNzAwMCkgKyA1MDtcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSAxNTApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSA2O1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMDAwMCkgKyA1MDtcbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy5tb3ZlbWVudCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIC8vIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNDAwKSArIDUwO1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IHRoaXMuaGVhbHRoO1xuICAgICAgICB0aGlzLmltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFydXRvMVwiKTtcblxuICAgICAgICAvLyB0aGlzLnJ1blJpZ2h0ID0gcnVuUmlnaHQ7XG4gICAgICAgIC8vIHRoaXMuZnJhbWVYID0gMDtcbiAgICAgICAgLy8gdGhpcy5mcmFtZVkgPSAwO1xuICAgICAgICAvLyB0aGlzLm1pbkZyYW1lID0gMDtcbiAgICAgICAgLy8gdGhpcy5tYXhGcmFtZSA9IDQ7XG4gICAgICAgIC8vIHRoaXMuc3ByaXRlV2lkdGggPSA5MDtcbiAgICAgICAgLy8gdGhpcy5zcHJpdGVIZWlnaHQgPSAxMTdcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgLy8gdGhpcy55ICs9IDE7XG4gICAgICAgIGlmICh0aGlzLnggPj0gMCAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueCA9PT0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID49IDAgICYmIHRoaXMueSA8PSBDRUxMU0laRSoxMSkge1xuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjExICYmIHRoaXMueCA8PSBDRUxMU0laRSoxNSAgJiYgdGhpcy54ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDw9IENFTExTSVpFKjExICYmIHRoaXMueSA+PSBDRUxMU0laRSozICAmJiB0aGlzLnggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSozICYmIHRoaXMueCA+PSAwICAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID49IENFTExTSVpFKjMgJiYgdGhpcy55IDw9IENFTExTSVpFKjggICYmIHRoaXMueCA9PT0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSo4ICYmIHRoaXMueCA8PSBDRUxMU0laRSoxMiAgJiYgdGhpcy54ID49IENFTExTSVpFKjYpIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAodGhpcy5mcmFtZVggPCB0aGlzLm1heEZyYW1lKSB0aGlzLmZyYW1lWCsrO1xuICAgICAgICAvLyBlbHNlIHRoaXMuZnJhbWVYID0gdGhpcy5taW5GcmFtZTtcbiAgICBcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmF5XCI7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodC0zNSk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMHB4IEFyaWFsXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KE1hdGguZmxvb3IodGhpcy5oZWFsdGgpK1wiSFBcIiwgdGhpcy54ICsgNSwgdGhpcy55ICsgNjApO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIk5hcnV0b1wiLCB0aGlzLnggKyAxMiwgdGhpcy55ICsgMzApO1xuICAgICAgICAvLyB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5ydW5SaWdodCwgdGhpcy5mcmFtZVgqdGhpcy5zcHJpdGVXaWR0aCwgMCwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXJ1dG8iLCJpbXBvcnQge3Byb2plY3RpbGVzIH0gZnJvbSAnLi9nb2t1JztcblxuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDE1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE1O1xuICAgICAgICB0aGlzLnBvd2VyID0gMjU7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA3O1xuICAgICAgICAgdGhpcy5pbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImthbWVcIik7XG4gICAgfVxuXG4gICAgc2hvb3RORSgpIHtcbiAgICAgICAgdGhpcy55IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdFNFKCkge1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290TlcoKSB7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3RTVygpIHtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkO1xuICAgIH1cblxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCsxNSwgdGhpcy5oZWlnaHQrMTUpO1xuXG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdhcXVhJztcbiAgICAgICAgLy8gdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgMCAsIE1hdGguUEkqMik7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGUiLCIvLyBpbXBvcnQgeyBoYW5kbGVHYW1lR3JpZCB9IGZyb20gJy4vYm9hcmQnO1xuLy8gaW1wb3J0IHsgaGFuZGxlR29rdXMgfSBmcm9tICcuL2dva3UnO1xuXG5jb25zdCBDRUxMU0laRSA9IDUwO1xuXG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcChjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KDAsIENFTExTSVpFLCBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsIENFTExTSVpFKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoXG4gICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsXG4gICAgICBDRUxMU0laRSxcbiAgICAgIENFTExTSVpFLFxuICAgICAgY2FudmFzLmhlaWdodCAtIENFTExTSVpFICogMlxuICAgICk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBjYW52YXMuaGVpZ2h0IC0gQ0VMTFNJWkUgKiAyLFxuICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LFxuICAgICAgQ0VMTFNJWkVcbiAgICApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSwgQ0VMTFNJWkUgKiA2KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUsIENFTExTSVpFICogNCwgQ0VMTFNJWkUgKiAxMSwgQ0VMTFNJWkUpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSAqIDExLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSAqIDQpO1xuICB9XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb24oZmlyc3QsIHNlY29uZCkge1xuICBpZiAoXG4gICAgIShcbiAgICAgIGZpcnN0LnggPiBzZWNvbmQueCArIHNlY29uZC53aWR0aCB8fFxuICAgICAgZmlyc3QueCArIGZpcnN0LndpZHRoIDwgc2Vjb25kLnggfHxcbiAgICAgIGZpcnN0LnkgPiBzZWNvbmQueSArIHNlY29uZC5oZWlnaHQgfHxcbiAgICAgIGZpcnN0LnkgKyBmaXJzdC5oZWlnaHQgPCBzZWNvbmQueVxuICAgIClcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Z2FtZX0gZnJvbSAnLi9zY3JpcHRzL2dhbWUnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICBjYW52YXMud2lkdGggPSA5MDA7XG4gIGNhbnZhcy5oZWlnaHQgPSA2MDA7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuICBnYW1lKGNhbnZhcywgY3R4KTtcblxufSlcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9