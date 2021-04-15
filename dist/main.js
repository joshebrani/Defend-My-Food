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
/* harmony export */   "game": function() { return /* binding */ game; }
/* harmony export */ });
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./src/scripts/board.js");
/* harmony import */ var _goku__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./goku */ "./src/scripts/goku.js");
/* harmony import */ var _naruto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./naruto */ "./src/scripts/naruto.js");
/* harmony import */ var _projectile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./projectile */ "./src/scripts/projectile.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ "./src/scripts/utilities.js");
// import { animate } from './utilities';





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
      }
    }

    if (frame % 200 === 0) {
      NARUTOS.push(new _naruto__WEBPACK_IMPORTED_MODULE_2__.default());
    }
  } // resources
  // utilities


  function handleGameStatus() {
    if (MONEY > 400) {
      ctx.fillStyle = "green";
      ctx.font = "15px Arial";
    } else {
      ctx.fillStyle = "red";
      ctx.font = "15px Arial";
    }

    ctx.fillText("Money: $" + MONEY, 802, 30);

    if (gameOver) {
      ctx.fillStyle = 'black';
      ctx.font = '60px Fantasy';
      ctx.fillText("Game Over", 250, 248);
    }
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
var MONEY = 1000;
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
    this.timer = 0; // this.health = 100
  }

  _createClass(Goku, [{
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = "yellow";
      this.ctx.fillRect(this.x, this.y, this.width, this.height - 35);
      this.ctx.fillStyle = "gold";
      this.ctx.font = "10px Arial"; //     this.ctx.fillText(
      //       Math.floor(this.health) + "HP",
      //       this.x + 12,
      //       this.y + 10
      //     );

      this.ctx.fillText("Goku", this.x + 15, this.y + 30);
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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CELLSIZE = 50; // const runRight = new Image();
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
    this.speed = 1;
    this.movement = this.speed;
    this.health = Math.floor(Math.random() * 400) + 50;
    this.maxHealth = this.health; // this.runRight = runRight;
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
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = "gray";
      this.ctx.fillRect(this.x, this.y, this.width, this.height - 35);
      this.ctx.fillStyle = "orange";
      this.ctx.font = "10px Arial";
      this.ctx.fillText(Math.floor(this.health) + "HP", this.x + 12, this.y + 10);
      this.ctx.fillText("Naruto", this.x + 12, this.y + 30); // this.ctx.drawImage(this.runRight, this.frameX*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
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
      this.ctx.fillStyle = 'aqua';
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
      this.ctx.fill();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0IiwiZ2FtZSIsIkdBTUVHUklEIiwiR09LVVMiLCJOQVJVVE9TIiwiTU9ORVkiLCJmcmFtZSIsImdhbWVPdmVyIiwiY3JlYXRlR3JpZCIsInB1c2giLCJoYW5kbGVHYW1lR3JpZCIsImkiLCJsZW5ndGgiLCJkcmF3IiwiaGFuZGxlUHJvamVjdGlsZXMiLCJwcm9qZWN0aWxlcyIsInNob290TkUiLCJzaG9vdFNFIiwic2hvb3ROVyIsInNob290U1ciLCJqIiwiaGVhbHRoIiwicG93ZXIiLCJncmlkUG9zdGl0aW9uWCIsImdyaWRQb3N0aXRpb25ZIiwiZ29rdUNvc3QiLCJHb2t1IiwiaGFuZGxlR29rdXMiLCJzaG9vdCIsImhhbmRsZU5hcnV0b3MiLCJtb3ZlIiwic3BsaWNlIiwiTmFydXRvIiwiaGFuZGxlR2FtZVN0YXR1cyIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsImFuaW1hdGUiLCJjbGVhclJlY3QiLCJmaWxsUmVjdCIsImNyZWF0ZU1hcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNob290aW5nIiwidGltZXIiLCJQcm9qZWN0aWxlIiwic3BlZWQiLCJtb3ZlbWVudCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1heEhlYWx0aCIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbCIsImZpcnN0Iiwic2Vjb25kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRLEdBQUcsRUFBakI7QUFFQTtBQUVBLElBQU1DLEtBQUssR0FBRztBQUNaQyxHQUFDLEVBQUVDLFNBRFM7QUFFWkMsR0FBQyxFQUFFRCxTQUZTO0FBR1pFLE9BQUssRUFBRSxHQUhLO0FBSVpDLFFBQU0sRUFBRTtBQUpJLENBQWQsQyxDQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0lBR01DLEk7QUFDSixnQkFBWUwsQ0FBWixFQUFlRSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtJLE1BQUwsR0FBY0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVcsS0FBS0gsTUFBTCxDQUFZSSxVQUFaLENBQXVCLElB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cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuaW1wb3J0IHsgY29sbGlzaW9uIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuLy8gbGV0IGNhbnZhc1Bvc2l0aW9uID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4vLyAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4vLyAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4vLyAgIC8vIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG4vLyB9KTtcblxuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbi8vICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbi8vICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbi8vIH0pO1xuXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJylcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IENFTExTSVpFO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfVxuICBkcmF3KCkge1xuICAgIGlmIChtb3VzZS54ICYmIG1vdXNlLnkgJiYgY29sbGlzaW9uKHRoaXMsIG1vdXNlKSkge1xuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENlbGxcbiIsIi8vIGltcG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9ib2FyZFwiO1xuaW1wb3J0IEdva3UsIHsgcHJvamVjdGlsZXMgfSBmcm9tIFwiLi9nb2t1XCI7XG5pbXBvcnQgTmFydXRvIGZyb20gJy4vbmFydXRvJztcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSdcbmltcG9ydCB7IGNvbGxpc2lvbiwgY3JlYXRlTWFwIH0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lKGNhbnZhcywgY3R4KSB7XG4gICAgIGNvbnN0IENFTExTSVpFID0gNTA7XG4gICAgIGNvbnN0IEdBTUVHUklEID0gW107XG4gICAgIGNvbnN0IEdPS1VTID0gW107XG4gICAgIGNvbnN0IE5BUlVUT1MgPSBbXTtcbiAgICAgbGV0IE1PTkVZID0gMTAwMDtcbiAgICAgbGV0IGZyYW1lID0gMDtcbiAgICAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gICAgLy8gIGNvbnN0IHByb2plY3RpbGVzID0gW107XG5cbiAgICAgLy8gbW91c2VcbiAgICAgY29uc3QgbW91c2UgPSB7XG4gICAgICAgeDogdW5kZWZpbmVkLFxuICAgICAgIHk6IHVuZGVmaW5lZCxcbiAgICAgICB3aWR0aDogMC4xLFxuICAgICAgIGhlaWdodDogMC4xLFxuICAgICB9O1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuICAgICB9KTtcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgfSk7XG4gICAgIC8vIGJvYXJkXG5cbiAgICAgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNhbnZhcy5oZWlnaHQ7IHkgKz0gQ0VMTFNJWkUpIHtcbiAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAyOyB4ICs9IENFTExTSVpFKSB7XG4gICAgICAgICAgIEdBTUVHUklELnB1c2gobmV3IENlbGwoeCwgeSkpO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGNyZWF0ZUdyaWQoKTtcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHYW1lR3JpZCgpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdBTUVHUklELmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBHQU1FR1JJRFtpXS5kcmF3KCk7XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gcHJvamVjdGlsZXNcblxuICAgICBmdW5jdGlvbiBoYW5kbGVQcm9qZWN0aWxlcygpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBpZiAoaSAlIDIgPT09IDAgJiYgaSU0ICE9PSAwICYmIGklNSAhPT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdE5FKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSAlIDMgPT09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3RTRSgpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGklNCA9PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290TlcoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpICUgNSA9PT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdFNXKCk7XG4gICAgICAgICB9XG4gICAgICAgICBlbHNlIHtwcm9qZWN0aWxlc1tpXS5zaG9vdE5XKCk7fVxuXG4gICAgICAgICBwcm9qZWN0aWxlc1tpXS5kcmF3KCk7XG5cbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoTkFSVVRPU1tqXSAmJiBwcm9qZWN0aWxlc1tpXSAmJiBjb2xsaXNpb24ocHJvamVjdGlsZXNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgTkFSVVRPU1tqXS5oZWFsdGggLT0gcHJvamVjdGlsZXNbaV0ucG93ZXJcbiAgICAgICAgICAgICBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChwcm9qZWN0aWxlc1tpXSAmJiBwcm9qZWN0aWxlc1tpXS54ID4gY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUpIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICBpLS07XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gZ29rdXNcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgICBpZiAoZ3JpZFBvc3RpdGlvblggPiBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDMpIHJldHVybjtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBpZiAoR09LVVNbaV0ueCA9PT0gZ3JpZFBvc3RpdGlvblggJiYgR09LVVNbaV0ueSA9PT0gZ3JpZFBvc3RpdGlvblkpXG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgbGV0IGdva3VDb3N0ID0gMjUwO1xuICAgICAgIGlmIChNT05FWSA+PSBnb2t1Q29zdCkge1xuICAgICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgIH1cbiAgICAgfSk7XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlR29rdXMoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgR09LVVNbaV0uZHJhdygpO1xuICAgICAgICAgR09LVVNbaV0uc2hvb3QoKTtcbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoR09LVVNbaV0gJiYgY29sbGlzaW9uKEdPS1VTW2ldLCBOQVJVVE9TW2pdKSkge1xuICAgICAgICAgICAgIE1PTkVZIC09IC4wNVxuICAgICAgICAgICB9XG4gICAgICAgICAgLy8gIGlmIChHT0tVU1tpXS5oZWFsdGggPCAwKSB7XG4gICAgICAgICAgLy8gICAgR09LVVMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIC8vICAgIGktLTtcbiAgICAgICAgICAvLyAgfVxuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIG5hcnV0b3NcblxuICAgICBmdW5jdGlvbiBoYW5kbGVOYXJ1dG9zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5BUlVUT1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIE5BUlVUT1NbaV0ubW92ZSgpO1xuICAgICAgICAgICAgTkFSVVRPU1tpXS5kcmF3KCk7XG4gICAgICAgICAgICBpZiAoTkFSVVRPU1tpXS54ID09PSBDRUxMU0laRSo2ICYmIE5BUlVUT1NbaV0ueSA9PT0gQ0VMTFNJWkUqOCkge1xuICAgICAgICAgICAgICBnYW1lT3ZlciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOQVJVVE9TW2ldLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICAgIE5BUlVUT1Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIE1PTkVZKz0xMDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhbWUgJSAyMDAgPT09IDApIHtcbiAgICAgICAgICAgIE5BUlVUT1MucHVzaChuZXcgTmFydXRvKCkpXG4gICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIHJlc291cmNlc1xuXG4gICAgIC8vIHV0aWxpdGllc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVTdGF0dXMoKSB7XG4gICAgICAgaWYgKE1PTkVZID4gNDAwKSB7XG4gICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggQXJpYWxcIjtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICBjdHguZm9udCA9IFwiMTVweCBBcmlhbFwiO1xuICAgICAgIH1cbiAgICAgICBjdHguZmlsbFRleHQoXCJNb25leTogJFwiICsgTU9ORVksIDgwMiwgMzApO1xuICAgICAgIGlmIChnYW1lT3Zlcikge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICBjdHguZm9udCA9ICc2MHB4IEZhbnRhc3knO1xuICAgICAgICAgY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIDI1MCwgMjQ4KVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xuICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogMixcbiAgICAgICAgIDAsXG4gICAgICAgICBDRUxMU0laRSAqIDIsXG4gICAgICAgICBjYW52YXMuaGVpZ2h0XG4gICAgICAgKTtcblxuICAgICAgIGNyZWF0ZU1hcChjdHgpO1xuICAgICAgIGhhbmRsZUdhbWVHcmlkKCk7XG4gICAgICAgaGFuZGxlR29rdXMoKTtcbiAgICAgICBoYW5kbGVQcm9qZWN0aWxlcygpO1xuICAgICAgIGhhbmRsZU5hcnV0b3MoKTtcbiAgICAgICBoYW5kbGVHYW1lU3RhdHVzKGN0eCk7XG4gICAgICAgZnJhbWUrKzsgICAgICAgXG4gICAgICAgaWYgKCFnYW1lT3ZlcikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICB9XG4gICAgIGFuaW1hdGUoKTtcbn1cblxuXG4vLyBleHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSc7XG5cbmNvbnN0IENFTExTSVpFID0gNTA7XG5leHBvcnQgY29uc3QgcHJvamVjdGlsZXMgPSBbXVxuY29uc3QgR0FNRUdSSUQgPSBbXTtcbmNvbnN0IEdPS1VTID0gW107XG5sZXQgTU9ORVkgPSAxMDAwO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuY2xhc3MgR29rdSB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgdGhpcy5oZWlnaHQgPSA0OTtcbiAgICB0aGlzLnNob290aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wcm9qZWN0aWxlcyA9IFtdO1xuICAgIHRoaXMudGltZXIgPSAwO1xuICAgIC8vIHRoaXMuaGVhbHRoID0gMTAwXG4gICAgIFxuICB9XG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibHVlXCI7XG4gICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcInllbGxvd1wiO1xuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodC0zNSk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJnb2xkXCI7XG4gICAgdGhpcy5jdHguZm9udCA9IFwiMTBweCBBcmlhbFwiO1xuICAgIC8vICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAvLyAgICAgICBNYXRoLmZsb29yKHRoaXMuaGVhbHRoKSArIFwiSFBcIixcbiAgICAvLyAgICAgICB0aGlzLnggKyAxMixcbiAgICAvLyAgICAgICB0aGlzLnkgKyAxMFxuICAgIC8vICAgICApO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR29rdVwiLCB0aGlzLnggKyAxNSwgdGhpcy55ICsgMzApO1xuICB9XG5cbiAgc2hvb3QoKSB7XG4gICAgdGhpcy50aW1lcisrO1xuICAgIGlmICh0aGlzLnRpbWVyICUgNTAgPT09IDApIHtcbiAgICAgIHByb2plY3RpbGVzLnB1c2gobmV3IFByb2plY3RpbGUodGhpcy54ICsgMjUsIHRoaXMueSAtIDEwKSlcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBleHBvcnQgZnVuY3Rpb24gaGFuZGxlR29rdXMoKSB7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbi8vICAgICBHT0tVU1tpXS5kcmF3KCk7XG4vLyAgIH1cbi8vIH1cblxuXG5leHBvcnQgZGVmYXVsdCBHb2t1XG5cblxuIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgLy8gICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICAgIC8vICB9KTtcblxuICAgICAgLy8gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICAvLyAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gIH0pO1xuICAgICAgLy8gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGNvbnN0IGdyaWRQb3N0aXRpb25ZID0gbW91c2UueSAtIChtb3VzZS55ICUgQ0VMTFNJWkUpO1xuICAgICAgLy8gICAgaWYgKGdyaWRQb3N0aXRpb25ZIDwgQ0VMTFNJWkUpIHJldHVybjtcbiAgICAgIC8vICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vICAgICAgaWYgKEdPS1VTW2ldLnggPT09IGdyaWRQb3N0aXRpb25YICYmIEdPS1VTW2ldLnkgPT09IGdyaWRQb3N0aXRpb25ZKSByZXR1cm47XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgICBsZXQgZ29rdUNvc3QgPSAxMDA7XG4gICAgICAvLyAgICBpZiAoTU9ORVkgPj0gZ29rdUNvc3QpIHtcbiAgICAgIC8vICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgIC8vICAgICAgTU9ORVkgLT0gZ29rdUNvc3Q7XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgfSk7IiwiY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuLy8gY29uc3QgcnVuUmlnaHQgPSBuZXcgSW1hZ2UoKTtcbi8vIHJ1blJpZ2h0LnNyYyA9ICcuLi9zcmMvaW1hZ2VzL3J1bl8xLnBuZyc7XG5cbmNsYXNzIE5hcnV0byB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxXG4gICAgICAgIHRoaXMubW92ZW1lbnQgPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQwMCkgKyA1MDtcbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLmhlYWx0aDtcbiAgICAgICAgLy8gdGhpcy5ydW5SaWdodCA9IHJ1blJpZ2h0O1xuICAgICAgICAvLyB0aGlzLmZyYW1lWCA9IDA7XG4gICAgICAgIC8vIHRoaXMuZnJhbWVZID0gMDtcbiAgICAgICAgLy8gdGhpcy5taW5GcmFtZSA9IDA7XG4gICAgICAgIC8vIHRoaXMubWF4RnJhbWUgPSA0O1xuICAgICAgICAvLyB0aGlzLnNwcml0ZVdpZHRoID0gOTA7XG4gICAgICAgIC8vIHRoaXMuc3ByaXRlSGVpZ2h0ID0gMTE3XG5cbiAgICB9XG5cbiAgICBtb3ZlKCkge1xuICAgICAgICAvLyB0aGlzLnkgKz0gMTtcbiAgICAgICAgaWYgKHRoaXMueCA+PSAwICYmIHRoaXMueCA8PSBDRUxMU0laRSoxNSAmJiB0aGlzLnkgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy54ID09PSBDRUxMU0laRSoxNSAmJiB0aGlzLnkgPj0gMCAgJiYgdGhpcy55IDw9IENFTExTSVpFKjExKSB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA9PT0gQ0VMTFNJWkUqMTEgJiYgdGhpcy54IDw9IENFTExTSVpFKjE1ICAmJiB0aGlzLnggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPD0gQ0VMTFNJWkUqMTEgJiYgdGhpcy55ID49IENFTExTSVpFKjMgICYmIHRoaXMueCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy55IC09IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjMgJiYgdGhpcy54ID49IDAgICYmIHRoaXMueCA8PSBDRUxMU0laRSoxMikge1xuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPj0gQ0VMTFNJWkUqMyAmJiB0aGlzLnkgPD0gQ0VMTFNJWkUqOCAgJiYgdGhpcy54ID09PSBDRUxMU0laRSoxMikge1xuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjggJiYgdGhpcy54IDw9IENFTExTSVpFKjEyICAmJiB0aGlzLnggPj0gQ0VMTFNJWkUqNikge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmICh0aGlzLmZyYW1lWCA8IHRoaXMubWF4RnJhbWUpIHRoaXMuZnJhbWVYKys7XG4gICAgICAgIC8vIGVsc2UgdGhpcy5mcmFtZVggPSB0aGlzLm1pbkZyYW1lO1xuICAgIFxuICAgIH1cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmF5XCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodC0zNSk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwib3JhbmdlXCI7XG4gICAgICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEwcHggQXJpYWxcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoTWF0aC5mbG9vcih0aGlzLmhlYWx0aCkrXCJIUFwiLCB0aGlzLnggKyAxMiwgdGhpcy55ICsgMTApO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcIk5hcnV0b1wiLCB0aGlzLnggKyAxMiwgdGhpcy55ICsgMzApO1xuICAgICAgICAvLyB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5ydW5SaWdodCwgdGhpcy5mcmFtZVgqdGhpcy5zcHJpdGVXaWR0aCwgMCwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXJ1dG8iLCJpbXBvcnQge3Byb2plY3RpbGVzIH0gZnJvbSAnLi9nb2t1JztcblxuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDE1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE1O1xuICAgICAgICB0aGlzLnBvd2VyID0gMjU7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA3O1xuICAgIH1cblxuICAgIHNob290TkUoKSB7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3RTRSgpIHtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdE5XKCkge1xuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290U1coKSB7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgICB9XG5cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdhcXVhJztcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgMCAsIE1hdGguUEkqMik7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGUiLCIvLyBpbXBvcnQgeyBoYW5kbGVHYW1lR3JpZCB9IGZyb20gJy4vYm9hcmQnO1xuLy8gaW1wb3J0IHsgaGFuZGxlR29rdXMgfSBmcm9tICcuL2dva3UnO1xuXG5jb25zdCBDRUxMU0laRSA9IDUwO1xuXG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcChjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KDAsIENFTExTSVpFLCBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsIENFTExTSVpFKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoXG4gICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsXG4gICAgICBDRUxMU0laRSxcbiAgICAgIENFTExTSVpFLFxuICAgICAgY2FudmFzLmhlaWdodCAtIENFTExTSVpFICogMlxuICAgICk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBjYW52YXMuaGVpZ2h0IC0gQ0VMTFNJWkUgKiAyLFxuICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LFxuICAgICAgQ0VMTFNJWkVcbiAgICApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSwgQ0VMTFNJWkUgKiA2KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUsIENFTExTSVpFICogNCwgQ0VMTFNJWkUgKiAxMSwgQ0VMTFNJWkUpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSAqIDExLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSAqIDQpO1xuICB9XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb24oZmlyc3QsIHNlY29uZCkge1xuICBpZiAoXG4gICAgIShcbiAgICAgIGZpcnN0LnggPiBzZWNvbmQueCArIHNlY29uZC53aWR0aCB8fFxuICAgICAgZmlyc3QueCArIGZpcnN0LndpZHRoIDwgc2Vjb25kLnggfHxcbiAgICAgIGZpcnN0LnkgPiBzZWNvbmQueSArIHNlY29uZC5oZWlnaHQgfHxcbiAgICAgIGZpcnN0LnkgKyBmaXJzdC5oZWlnaHQgPCBzZWNvbmQueVxuICAgIClcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Z2FtZX0gZnJvbSAnLi9zY3JpcHRzL2dhbWUnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICBjYW52YXMud2lkdGggPSA5MDA7XG4gIGNhbnZhcy5oZWlnaHQgPSA2MDA7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuICBnYW1lKGNhbnZhcywgY3R4KTtcblxufSlcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9