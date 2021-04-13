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
  var CELLGAP = 3;
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
      if (i % 2 === 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNE();
      }

      if (i % 3 === 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootSE();
      }

      if (i % i === 0 && i % 2 !== 0 && i % 3 !== 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootNW();
      }

      if (i % 5 === 0) {
        _goku__WEBPACK_IMPORTED_MODULE_1__.projectiles[i].shootSW();
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
          GOKUS[i].health -= .2;
        }

        if (GOKUS[i].health <= 0) {
          GOKUS.splice(i, 1);
          i--;
        }
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

    if (frame % 100 === 0) {
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
      ctx.font = '60px Arial';
      ctx.fillText("Game Over", 250, 200);
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
var CELLGAP = 3;
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
    this.width = CELLSIZE;
    this.height = CELLSIZE;
    this.shooting = false;
    this.projectiles = [];
    this.timer = 0;
    this.health = 100;
  }

  _createClass(Goku, [{
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = "gold";
      this.ctx.font = "10px Arial";
      this.ctx.fillText(Math.floor(this.health) + "HP", this.x + 12, this.y + 10);
      this.ctx.fillText("Goku", this.x + 15, this.y + 30);
    }
  }, {
    key: "shoot",
    value: function shoot() {
      this.timer++;

      if (this.timer % 50 === 0) {
        projectiles.push(new _projectile__WEBPACK_IMPORTED_MODULE_0__.default(this.x + 70, this.y + 25));
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

var CELLSIZE = 50;

var Naruto = /*#__PURE__*/function () {
  function Naruto() {
    _classCallCheck(this, Naruto);

    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.x = 0;
    this.y = 0;
    this.width = CELLSIZE;
    this.height = CELLSIZE;
    this.speed = 1;
    this.movement = this.speed;
    this.health = Math.floor(Math.random() * 400) + 50;
    this.maxHealth = this.health;
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
      }
    }
  }, {
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = "orange";
      this.ctx.font = "10px Arial";
      this.ctx.fillText(Math.floor(this.health) + "HP", this.x + 12, this.y + 10);
      this.ctx.fillText("Naruto", this.x + 12, this.y + 30);
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
  if (!(first.x > second.x - 1 + second.width - 1 || first.x + first.width - 1 < second.x - 1 || first.y > second.y - 1 + second.height - 1 || first.y + first.height - 1 < second.y - 1)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0IiwiZ2FtZSIsIkNFTExHQVAiLCJHQU1FR1JJRCIsIkdPS1VTIiwiTkFSVVRPUyIsIk1PTkVZIiwiZnJhbWUiLCJnYW1lT3ZlciIsImNyZWF0ZUdyaWQiLCJwdXNoIiwiaGFuZGxlR2FtZUdyaWQiLCJpIiwibGVuZ3RoIiwiZHJhdyIsImhhbmRsZVByb2plY3RpbGVzIiwicHJvamVjdGlsZXMiLCJzaG9vdE5FIiwic2hvb3RTRSIsInNob290TlciLCJzaG9vdFNXIiwiaiIsImhlYWx0aCIsInBvd2VyIiwiZ3JpZFBvc3RpdGlvblgiLCJncmlkUG9zdGl0aW9uWSIsImdva3VDb3N0IiwiR29rdSIsImhhbmRsZUdva3VzIiwic2hvb3QiLCJzcGxpY2UiLCJoYW5kbGVOYXJ1dG9zIiwibW92ZSIsIk5hcnV0byIsImhhbmRsZUdhbWVTdGF0dXMiLCJmaWxsU3R5bGUiLCJmb250IiwiZmlsbFRleHQiLCJhbmltYXRlIiwiY2xlYXJSZWN0IiwiZmlsbFJlY3QiLCJjcmVhdGVNYXAiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzaG9vdGluZyIsInRpbWVyIiwiTWF0aCIsImZsb29yIiwiUHJvamVjdGlsZSIsInNwZWVkIiwibW92ZW1lbnQiLCJyYW5kb20iLCJtYXhIZWFsdGgiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGwiLCJmaXJzdCIsInNlY29uZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHLEVBQWpCO0FBRUE7QUFFQSxJQUFNQyxLQUFLLEdBQUc7QUFDWkMsR0FBQyxFQUFFQyxTQURTO0FBRVpDLEdBQUMsRUFBRUQsU0FGUztBQUdaRSxPQUFLLEVBQUUsR0FISztBQUlaQyxRQUFNLEVBQUU7QUFKSSxDQUFkLEMsQ0FPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztJQUdNQyxJO0FBQ0osZ0JBQVlMLENBQVosRUFBZUUsQ0FBZixFQUFrQjtBQUFBOztBQUNoQixTQUFLSSxNQUFMLEdBQWNDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEtBQUtILE1BQUwsQ0FBWUksVUFBWixDQUF1QixJQUF2QixDQUFYO0FBQ0EsU0FBS1YsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsS0FBTCxHQUFhTCxRQUFiO0FBQ0EsU0FBS00sTUFBTCxHQUFjTixRQUFkO0FBQ0EsU0FBS1EsTUFBTCxDQUFZSyxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxVQUFVQyxDQUFWLEVBQWE7QUFDckRiLFdBQUssQ0FBQ0MsQ0FBTixHQUFVWSxDQUFDLENBQUNDLE9BQVo7QUFDQWQsV0FBSyxDQUFDRyxDQUFOLEdBQVVVLENBQUMsQ0FBQ0UsT0FBWjtBQUNELEtBSEQ7QUFLQSxTQUFLUixNQUFMLENBQVlLLGdCQUFaLENBQTZCLFlBQTdCLEVBQTJDLFlBQVk7QUFDckRaLFdBQUssQ0FBQ0MsQ0FBTixHQUFVQyxTQUFWO0FBQ0FGLFdBQUssQ0FBQ0csQ0FBTixHQUFVRCxTQUFWO0FBQ0QsS0FIRDtBQUlEOzs7O1dBQ0QsZ0JBQU87QUFDTCxVQUFJRixLQUFLLENBQUNDLENBQU4sSUFBV0QsS0FBSyxDQUFDRyxDQUFqQixJQUFzQmEscURBQVMsQ0FBQyxJQUFELEVBQU9oQixLQUFQLENBQW5DLEVBQWtEO0FBQ2hELGFBQUtVLEdBQUwsQ0FBU08sV0FBVCxHQUF1QixLQUF2QjtBQUNBLGFBQUtQLEdBQUwsQ0FBU1EsVUFBVCxDQUFvQixLQUFLakIsQ0FBekIsRUFBNEIsS0FBS0UsQ0FBakMsRUFBb0MsS0FBS0MsS0FBekMsRUFBZ0QsS0FBS0MsTUFBckQ7QUFDRDtBQUNGOzs7Ozs7QUFJSCwrREFBZUMsSUFBZixFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVPLFNBQVNhLElBQVQsQ0FBY1osTUFBZCxFQUFzQkcsR0FBdEIsRUFBMkI7QUFDN0IsTUFBTVgsUUFBUSxHQUFHLEVBQWpCO0FBQ0EsTUFBTXFCLE9BQU8sR0FBRyxDQUFoQjtBQUNBLE1BQU1DLFFBQVEsR0FBRyxFQUFqQjtBQUNBLE1BQU1DLEtBQUssR0FBRyxFQUFkO0FBQ0EsTUFBTUMsT0FBTyxHQUFHLEVBQWhCO0FBQ0EsTUFBSUMsS0FBSyxHQUFHLElBQVo7QUFDQSxNQUFJQyxLQUFLLEdBQUcsQ0FBWjtBQUNBLE1BQUlDLFFBQVEsR0FBRyxLQUFmLENBUjZCLENBUzlCO0FBRUM7O0FBQ0EsTUFBTTFCLEtBQUssR0FBRztBQUNaQyxLQUFDLEVBQUVDLFNBRFM7QUFFWkMsS0FBQyxFQUFFRCxTQUZTO0FBR1pFLFNBQUssRUFBRSxHQUhLO0FBSVpDLFVBQU0sRUFBRTtBQUpJLEdBQWQ7QUFPQUUsUUFBTSxDQUFDSyxnQkFBUCxDQUF3QixXQUF4QixFQUFxQyxVQUFVQyxDQUFWLEVBQWE7QUFDaERiLFNBQUssQ0FBQ0MsQ0FBTixHQUFVWSxDQUFDLENBQUNDLE9BQVo7QUFDQWQsU0FBSyxDQUFDRyxDQUFOLEdBQVVVLENBQUMsQ0FBQ0UsT0FBWjtBQUNELEdBSEQ7QUFLQVIsUUFBTSxDQUFDSyxnQkFBUCxDQUF3QixZQUF4QixFQUFzQyxZQUFZO0FBQ2hEWixTQUFLLENBQUNDLENBQU4sR0FBVUMsU0FBVjtBQUNBRixTQUFLLENBQUNHLENBQU4sR0FBVUQsU0FBVjtBQUNELEdBSEQsRUF4QjZCLENBNEI3Qjs7QUFFQSxXQUFTeUIsVUFBVCxHQUFzQjtBQUNwQixTQUFLLElBQUl4QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSSxNQUFNLENBQUNGLE1BQTNCLEVBQW1DRixDQUFDLElBQUlKLFFBQXhDLEVBQWtEO0FBQ2hELFdBQUssSUFBSUUsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR00sTUFBTSxDQUFDSCxLQUFQLEdBQWVMLFFBQVEsR0FBRyxDQUE5QyxFQUFpREUsQ0FBQyxJQUFJRixRQUF0RCxFQUFnRTtBQUM5RHNCLGdCQUFRLENBQUNPLElBQVQsQ0FBYyxJQUFJdEIsMkNBQUosQ0FBU0wsQ0FBVCxFQUFZRSxDQUFaLENBQWQ7QUFDRDtBQUNGO0FBQ0Y7O0FBRUR3QixZQUFVOztBQUVWLFdBQVNFLGNBQVQsR0FBMEI7QUFDeEIsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHVCxRQUFRLENBQUNVLE1BQTdCLEVBQXFDRCxDQUFDLEVBQXRDLEVBQTBDO0FBQ3hDVCxjQUFRLENBQUNTLENBQUQsQ0FBUixDQUFZRSxJQUFaO0FBQ0Q7QUFDRixHQTVDNEIsQ0E4QzdCOzs7QUFFQSxXQUFTQyxpQkFBVCxHQUE2QjtBQUMzQixTQUFLLElBQUlILENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdJLHFEQUFwQixFQUF3Q0osQ0FBQyxFQUF6QyxFQUE2QztBQUMzQyxVQUFJQSxDQUFDLEdBQUcsQ0FBSixLQUFVLENBQWQsRUFBaUI7QUFDZkksc0RBQVcsQ0FBQ0osQ0FBRCxDQUFYLENBQWVLLE9BQWY7QUFDRDs7QUFDRCxVQUFJTCxDQUFDLEdBQUcsQ0FBSixLQUFVLENBQWQsRUFBaUI7QUFDZkksc0RBQVcsQ0FBQ0osQ0FBRCxDQUFYLENBQWVNLE9BQWY7QUFDRDs7QUFDRCxVQUFJTixDQUFDLEdBQUdBLENBQUosS0FBVSxDQUFWLElBQWVBLENBQUMsR0FBQyxDQUFGLEtBQVEsQ0FBdkIsSUFBNEJBLENBQUMsR0FBQyxDQUFGLEtBQVEsQ0FBeEMsRUFBMkM7QUFDekNJLHNEQUFXLENBQUNKLENBQUQsQ0FBWCxDQUFlTyxPQUFmO0FBQ0Q7O0FBQ0QsVUFBSVAsQ0FBQyxHQUFHLENBQUosS0FBVSxDQUFkLEVBQWlCO0FBQ2ZJLHNEQUFXLENBQUNKLENBQUQsQ0FBWCxDQUFlUSxPQUFmO0FBQ0Q7O0FBRURKLG9EQUFXLENBQUNKLENBQUQsQ0FBWCxDQUFlRSxJQUFmOztBQUVBLFdBQUssSUFBSU8sQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2hCLE9BQU8sQ0FBQ1EsTUFBNUIsRUFBb0NRLENBQUMsRUFBckMsRUFBeUM7QUFDdkMsWUFBSWhCLE9BQU8sQ0FBQ2dCLENBQUQsQ0FBUCxJQUFjTCw4Q0FBVyxDQUFDSixDQUFELENBQXpCLElBQWdDZCxxREFBUyxDQUFDa0IsOENBQVcsQ0FBQ0osQ0FBRCxDQUFaLEVBQWlCUCxPQUFPLENBQUNnQixDQUFELENBQXhCLENBQTdDLEVBQTJFO0FBQ3pFaEIsaUJBQU8sQ0FBQ2dCLENBQUQsQ0FBUCxDQUFXQyxNQUFYLElBQXFCTiw4Q0FBVyxDQUFDSixDQUFELENBQVgsQ0FBZVcsS0FBcEM7QUFDQVAsK0RBQUEsQ0FBbUJKLENBQW5CLEVBQXNCLENBQXRCO0FBQ0FBLFdBQUM7QUFDRjtBQUNGOztBQUVELFVBQUlJLDhDQUFXLENBQUNKLENBQUQsQ0FBWCxJQUFrQkksOENBQVcsQ0FBQ0osQ0FBRCxDQUFYLENBQWU3QixDQUFmLEdBQW1CTSxNQUFNLENBQUNILEtBQVAsR0FBZUwsUUFBeEQsRUFBa0U7QUFDaEVtQyw2REFBQSxDQUFtQkosQ0FBbkIsRUFBc0IsQ0FBdEI7QUFDQUEsU0FBQztBQUNGO0FBQ0Y7QUFDRixHQTlFNEIsQ0FnRjdCOzs7QUFFQXZCLFFBQU0sQ0FBQ0ssZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBWTtBQUMzQyxRQUFNOEIsY0FBYyxHQUFHMUMsS0FBSyxDQUFDQyxDQUFOLEdBQVdELEtBQUssQ0FBQ0MsQ0FBTixHQUFVRixRQUE1QztBQUNBLFFBQU00QyxjQUFjLEdBQUczQyxLQUFLLENBQUNHLENBQU4sR0FBV0gsS0FBSyxDQUFDRyxDQUFOLEdBQVVKLFFBQTVDO0FBQ0EsUUFBSTJDLGNBQWMsR0FBR25DLE1BQU0sQ0FBQ0gsS0FBUCxHQUFlTCxRQUFRLEdBQUcsQ0FBL0MsRUFBa0Q7O0FBQ2xELFNBQUssSUFBSStCLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLEtBQUssQ0FBQ1MsTUFBMUIsRUFBa0NELENBQUMsRUFBbkMsRUFBdUM7QUFDckMsVUFBSVIsS0FBSyxDQUFDUSxDQUFELENBQUwsQ0FBUzdCLENBQVQsS0FBZXlDLGNBQWYsSUFBaUNwQixLQUFLLENBQUNRLENBQUQsQ0FBTCxDQUFTM0IsQ0FBVCxLQUFld0MsY0FBcEQsRUFDRTtBQUNIOztBQUNELFFBQUlDLFFBQVEsR0FBRyxHQUFmOztBQUNBLFFBQUlwQixLQUFLLElBQUlvQixRQUFiLEVBQXVCO0FBQ3JCdEIsV0FBSyxDQUFDTSxJQUFOLENBQVcsSUFBSWlCLDBDQUFKLENBQVNILGNBQVQsRUFBeUJDLGNBQXpCLENBQVg7QUFDQW5CLFdBQUssSUFBSW9CLFFBQVQ7QUFDRDtBQUNGLEdBYkQ7O0FBZUEsV0FBU0UsV0FBVCxHQUF1QjtBQUNyQixTQUFLLElBQUloQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUixLQUFLLENBQUNTLE1BQTFCLEVBQWtDRCxDQUFDLEVBQW5DLEVBQXVDO0FBQ3JDUixXQUFLLENBQUNRLENBQUQsQ0FBTCxDQUFTRSxJQUFUO0FBQ0FWLFdBQUssQ0FBQ1EsQ0FBRCxDQUFMLENBQVNpQixLQUFUOztBQUNBLFdBQUssSUFBSVIsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2hCLE9BQU8sQ0FBQ1EsTUFBNUIsRUFBb0NRLENBQUMsRUFBckMsRUFBeUM7QUFDdkMsWUFBSWpCLEtBQUssQ0FBQ1EsQ0FBRCxDQUFMLElBQVlkLHFEQUFTLENBQUNNLEtBQUssQ0FBQ1EsQ0FBRCxDQUFOLEVBQVdQLE9BQU8sQ0FBQ2dCLENBQUQsQ0FBbEIsQ0FBekIsRUFBaUQ7QUFDL0NqQixlQUFLLENBQUNRLENBQUQsQ0FBTCxDQUFTVSxNQUFULElBQW1CLEVBQW5CO0FBQ0Q7O0FBQ0QsWUFBSWxCLEtBQUssQ0FBQ1EsQ0FBRCxDQUFMLENBQVNVLE1BQVQsSUFBbUIsQ0FBdkIsRUFBMEI7QUFDeEJsQixlQUFLLENBQUMwQixNQUFOLENBQWFsQixDQUFiLEVBQWdCLENBQWhCO0FBQ0FBLFdBQUM7QUFDRjtBQUNGO0FBQ0Y7QUFDRixHQS9HNEIsQ0FpSDdCOzs7QUFFQSxXQUFTbUIsYUFBVCxHQUF5QjtBQUN0QixTQUFLLElBQUluQixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHUCxPQUFPLENBQUNRLE1BQTVCLEVBQW9DRCxDQUFDLEVBQXJDLEVBQXlDO0FBQ3JDUCxhQUFPLENBQUNPLENBQUQsQ0FBUCxDQUFXb0IsSUFBWDtBQUNBM0IsYUFBTyxDQUFDTyxDQUFELENBQVAsQ0FBV0UsSUFBWDs7QUFDQSxVQUFJVCxPQUFPLENBQUNPLENBQUQsQ0FBUCxDQUFXN0IsQ0FBWCxLQUFpQkYsUUFBUSxHQUFDLENBQTFCLElBQStCd0IsT0FBTyxDQUFDTyxDQUFELENBQVAsQ0FBVzNCLENBQVgsS0FBaUJKLFFBQVEsR0FBQyxDQUE3RCxFQUFnRTtBQUM5RDJCLGdCQUFRLEdBQUcsSUFBWDtBQUNEOztBQUNELFVBQUlILE9BQU8sQ0FBQ08sQ0FBRCxDQUFQLENBQVdVLE1BQVgsSUFBcUIsQ0FBekIsRUFBNEI7QUFDMUJqQixlQUFPLENBQUN5QixNQUFSLENBQWVsQixDQUFmLEVBQWtCLENBQWxCO0FBQ0FBLFNBQUM7QUFDRE4sYUFBSyxJQUFFLEdBQVA7QUFDRDtBQUNKOztBQUNELFFBQUlDLEtBQUssR0FBRyxHQUFSLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CRixhQUFPLENBQUNLLElBQVIsQ0FBYSxJQUFJdUIsNENBQUosRUFBYjtBQUNIO0FBQ0gsR0FuSTRCLENBcUk3QjtBQUVBOzs7QUFFQSxXQUFTQyxnQkFBVCxHQUE0QjtBQUMxQixRQUFJNUIsS0FBSyxHQUFHLEdBQVosRUFBaUI7QUFDZmQsU0FBRyxDQUFDMkMsU0FBSixHQUFnQixPQUFoQjtBQUNBM0MsU0FBRyxDQUFDNEMsSUFBSixHQUFXLFlBQVg7QUFDRCxLQUhELE1BR087QUFDTDVDLFNBQUcsQ0FBQzJDLFNBQUosR0FBZ0IsS0FBaEI7QUFDQTNDLFNBQUcsQ0FBQzRDLElBQUosR0FBVyxZQUFYO0FBQ0Q7O0FBQ0Q1QyxPQUFHLENBQUM2QyxRQUFKLENBQWEsYUFBYS9CLEtBQTFCLEVBQWlDLEdBQWpDLEVBQXNDLEVBQXRDOztBQUNBLFFBQUlFLFFBQUosRUFBYztBQUNaaEIsU0FBRyxDQUFDMkMsU0FBSixHQUFnQixPQUFoQjtBQUNBM0MsU0FBRyxDQUFDNEMsSUFBSixHQUFXLFlBQVg7QUFDQTVDLFNBQUcsQ0FBQzZDLFFBQUosQ0FBYSxXQUFiLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CO0FBQ0Q7QUFDRjs7QUFFRCxXQUFTQyxPQUFULEdBQW1CO0FBQ2pCOUMsT0FBRyxDQUFDK0MsU0FBSixDQUFjLENBQWQsRUFBaUIsQ0FBakIsRUFBb0JsRCxNQUFNLENBQUNILEtBQTNCLEVBQWtDRyxNQUFNLENBQUNGLE1BQXpDO0FBQ0FLLE9BQUcsQ0FBQzJDLFNBQUosR0FBZ0IsV0FBaEI7QUFDQTNDLE9BQUcsQ0FBQ2dELFFBQUosQ0FDRW5ELE1BQU0sQ0FBQ0gsS0FBUCxHQUFlTCxRQUFRLEdBQUcsQ0FENUIsRUFFRSxDQUZGLEVBR0VBLFFBQVEsR0FBRyxDQUhiLEVBSUVRLE1BQU0sQ0FBQ0YsTUFKVDtBQU9Bc0QseURBQVMsQ0FBQ2pELEdBQUQsQ0FBVDtBQUNBbUIsa0JBQWM7QUFDZGlCLGVBQVc7QUFDWGIscUJBQWlCO0FBQ2pCZ0IsaUJBQWE7QUFDYkcsb0JBQWdCLENBQUMxQyxHQUFELENBQWhCO0FBQ0FlLFNBQUs7QUFDTCxRQUFJLENBQUNDLFFBQUwsRUFBZWtDLHFCQUFxQixDQUFDSixPQUFELENBQXJCO0FBQ2hCOztBQUNEQSxTQUFPO0FBQ1gsQyxDQUdELHVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2TEE7QUFFQSxJQUFNekQsUUFBUSxHQUFHLEVBQWpCO0FBQ08sSUFBTW1DLFdBQVcsR0FBRyxFQUFwQjtBQUNQLElBQU1kLE9BQU8sR0FBRyxDQUFoQjtBQUNBLElBQU1DLFFBQVEsR0FBRyxFQUFqQjtBQUNBLElBQU1DLEtBQUssR0FBRyxFQUFkO0FBQ0EsSUFBSUUsS0FBSyxHQUFHLElBQVo7QUFFQSxJQUFNeEIsS0FBSyxHQUFHO0FBQ1pDLEdBQUMsRUFBRUMsU0FEUztBQUVaQyxHQUFDLEVBQUVELFNBRlM7QUFHWkUsT0FBSyxFQUFFLEdBSEs7QUFJWkMsUUFBTSxFQUFFO0FBSkksQ0FBZDs7SUFPTXdDLEk7QUFDSixnQkFBWTVDLENBQVosRUFBZUUsQ0FBZixFQUFrQjtBQUFBOztBQUNoQixTQUFLSSxNQUFMLEdBQWNDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEtBQUtILE1BQUwsQ0FBWUksVUFBWixDQUF1QixJQUF2QixDQUFYO0FBQ0EsU0FBS1YsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsS0FBTCxHQUFhTCxRQUFiO0FBQ0EsU0FBS00sTUFBTCxHQUFjTixRQUFkO0FBQ0EsU0FBSzhELFFBQUwsR0FBZ0IsS0FBaEI7QUFDQSxTQUFLM0IsV0FBTCxHQUFtQixFQUFuQjtBQUNBLFNBQUs0QixLQUFMLEdBQWEsQ0FBYjtBQUNBLFNBQUt0QixNQUFMLEdBQWMsR0FBZDtBQUVEOzs7O1dBQ0QsZ0JBQU87QUFDTCxXQUFLOUIsR0FBTCxDQUFTMkMsU0FBVCxHQUFxQixNQUFyQjtBQUNBLFdBQUszQyxHQUFMLENBQVNnRCxRQUFULENBQWtCLEtBQUt6RCxDQUF2QixFQUEwQixLQUFLRSxDQUEvQixFQUFrQyxLQUFLQyxLQUF2QyxFQUE4QyxLQUFLQyxNQUFuRDtBQUNBLFdBQUtLLEdBQUwsQ0FBUzJDLFNBQVQsR0FBcUIsTUFBckI7QUFDQSxXQUFLM0MsR0FBTCxDQUFTNEMsSUFBVCxHQUFnQixZQUFoQjtBQUNJLFdBQUs1QyxHQUFMLENBQVM2QyxRQUFULENBQ0VRLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUt4QixNQUFoQixJQUEwQixJQUQ1QixFQUVFLEtBQUt2QyxDQUFMLEdBQVMsRUFGWCxFQUdFLEtBQUtFLENBQUwsR0FBUyxFQUhYO0FBS0osV0FBS08sR0FBTCxDQUFTNkMsUUFBVCxDQUFrQixNQUFsQixFQUEwQixLQUFLdEQsQ0FBTCxHQUFTLEVBQW5DLEVBQXVDLEtBQUtFLENBQUwsR0FBUyxFQUFoRDtBQUNEOzs7V0FFRCxpQkFBUTtBQUNOLFdBQUsyRCxLQUFMOztBQUNBLFVBQUksS0FBS0EsS0FBTCxHQUFhLEVBQWIsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDekI1QixtQkFBVyxDQUFDTixJQUFaLENBQWlCLElBQUlxQyxnREFBSixDQUFlLEtBQUtoRSxDQUFMLEdBQVMsRUFBeEIsRUFBNEIsS0FBS0UsQ0FBTCxHQUFTLEVBQXJDLENBQWpCO0FBQ0Q7QUFDRjs7OztLQUlIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLCtEQUFlMEMsSUFBZixFLENBR0M7QUFDSztBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkZOLElBQU05QyxRQUFRLEdBQUcsRUFBakI7O0lBRU1vRCxNO0FBQ0Ysb0JBQWM7QUFBQTs7QUFDVixTQUFLNUMsTUFBTCxHQUFjQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLFNBQUtDLEdBQUwsR0FBVyxLQUFLSCxNQUFMLENBQVlJLFVBQVosQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBLFNBQUtWLENBQUwsR0FBUyxDQUFUO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTLENBQVQ7QUFDQSxTQUFLQyxLQUFMLEdBQWFMLFFBQWI7QUFDQSxTQUFLTSxNQUFMLEdBQWNOLFFBQWQ7QUFDQSxTQUFLbUUsS0FBTCxHQUFhLENBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCLEtBQUtELEtBQXJCO0FBQ0EsU0FBSzFCLE1BQUwsR0FBY3VCLElBQUksQ0FBQ0MsS0FBTCxDQUFXRCxJQUFJLENBQUNLLE1BQUwsS0FBZ0IsR0FBM0IsSUFBa0MsRUFBaEQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCLEtBQUs3QixNQUF0QjtBQUVIOzs7O1dBRUQsZ0JBQU87QUFDSDtBQUNBLFVBQUksS0FBS3ZDLENBQUwsSUFBVSxDQUFWLElBQWUsS0FBS0EsQ0FBTCxJQUFVRixRQUFRLEdBQUMsRUFBbEMsSUFBd0MsS0FBS0ksQ0FBTCxLQUFXLENBQXZELEVBQTBEO0FBQ3RELGFBQUtGLENBQUwsSUFBVSxLQUFLa0UsUUFBZjtBQUNIOztBQUVELFVBQUksS0FBS2xFLENBQUwsS0FBV0YsUUFBUSxHQUFDLEVBQXBCLElBQTBCLEtBQUtJLENBQUwsSUFBVSxDQUFwQyxJQUEwQyxLQUFLQSxDQUFMLElBQVVKLFFBQVEsR0FBQyxFQUFqRSxFQUFxRTtBQUNqRSxhQUFLSSxDQUFMLElBQVUsS0FBS2dFLFFBQWY7QUFDSDs7QUFFRCxVQUFJLEtBQUtoRSxDQUFMLEtBQVdKLFFBQVEsR0FBQyxFQUFwQixJQUEwQixLQUFLRSxDQUFMLElBQVVGLFFBQVEsR0FBQyxFQUE3QyxJQUFvRCxLQUFLRSxDQUFMLElBQVUsQ0FBbEUsRUFBcUU7QUFDakUsYUFBS0EsQ0FBTCxJQUFVLEtBQUtrRSxRQUFmO0FBQ0g7O0FBRUQsVUFBSSxLQUFLaEUsQ0FBTCxJQUFVSixRQUFRLEdBQUMsRUFBbkIsSUFBeUIsS0FBS0ksQ0FBTCxJQUFVSixRQUFRLEdBQUMsQ0FBNUMsSUFBa0QsS0FBS0UsQ0FBTCxLQUFXLENBQWpFLEVBQW9FO0FBQ2hFLGFBQUtFLENBQUwsSUFBVSxLQUFLZ0UsUUFBZjtBQUNIOztBQUVELFVBQUksS0FBS2hFLENBQUwsS0FBV0osUUFBUSxHQUFDLENBQXBCLElBQXlCLEtBQUtFLENBQUwsSUFBVSxDQUFuQyxJQUF5QyxLQUFLQSxDQUFMLElBQVVGLFFBQVEsR0FBQyxFQUFoRSxFQUFvRTtBQUNoRSxhQUFLRSxDQUFMLElBQVUsS0FBS2tFLFFBQWY7QUFDSDs7QUFFRCxVQUFJLEtBQUtoRSxDQUFMLElBQVVKLFFBQVEsR0FBQyxDQUFuQixJQUF3QixLQUFLSSxDQUFMLElBQVVKLFFBQVEsR0FBQyxDQUEzQyxJQUFpRCxLQUFLRSxDQUFMLEtBQVdGLFFBQVEsR0FBQyxFQUF6RSxFQUE2RTtBQUN6RSxhQUFLSSxDQUFMLElBQVUsS0FBS2dFLFFBQWY7QUFDSDs7QUFFRCxVQUFJLEtBQUtoRSxDQUFMLEtBQVdKLFFBQVEsR0FBQyxDQUFwQixJQUF5QixLQUFLRSxDQUFMLElBQVVGLFFBQVEsR0FBQyxFQUE1QyxJQUFtRCxLQUFLRSxDQUFMLElBQVVGLFFBQVEsR0FBQyxDQUExRSxFQUE2RTtBQUN6RSxhQUFLRSxDQUFMLElBQVUsS0FBS2tFLFFBQWY7QUFDSDtBQU1KOzs7V0FFRCxnQkFBTztBQUNILFdBQUt6RCxHQUFMLENBQVMyQyxTQUFULEdBQXFCLE9BQXJCO0FBQ0EsV0FBSzNDLEdBQUwsQ0FBU2dELFFBQVQsQ0FBa0IsS0FBS3pELENBQXZCLEVBQTBCLEtBQUtFLENBQS9CLEVBQWtDLEtBQUtDLEtBQXZDLEVBQThDLEtBQUtDLE1BQW5EO0FBQ0EsV0FBS0ssR0FBTCxDQUFTMkMsU0FBVCxHQUFxQixRQUFyQjtBQUNBLFdBQUszQyxHQUFMLENBQVM0QyxJQUFULEdBQWdCLFlBQWhCO0FBQ0EsV0FBSzVDLEdBQUwsQ0FBUzZDLFFBQVQsQ0FBa0JRLElBQUksQ0FBQ0MsS0FBTCxDQUFXLEtBQUt4QixNQUFoQixJQUF3QixJQUExQyxFQUFnRCxLQUFLdkMsQ0FBTCxHQUFTLEVBQXpELEVBQTZELEtBQUtFLENBQUwsR0FBUyxFQUF0RTtBQUNBLFdBQUtPLEdBQUwsQ0FBUzZDLFFBQVQsQ0FBa0IsUUFBbEIsRUFBNEIsS0FBS3RELENBQUwsR0FBUyxFQUFyQyxFQUF5QyxLQUFLRSxDQUFMLEdBQVMsRUFBbEQ7QUFFSDs7Ozs7O0FBR0wsK0RBQWVnRCxNQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hFQTs7SUFFTWMsVTtBQUNGLHNCQUFZaEUsQ0FBWixFQUFlRSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2QsU0FBS0ksTUFBTCxHQUFjQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZDtBQUNBLFNBQUtDLEdBQUwsR0FBVyxLQUFLSCxNQUFMLENBQVlJLFVBQVosQ0FBdUIsSUFBdkIsQ0FBWDtBQUNBLFNBQUtWLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtFLENBQUwsR0FBU0EsQ0FBVDtBQUNBLFNBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxTQUFLb0MsS0FBTCxHQUFhLEVBQWI7QUFDQSxTQUFLeUIsS0FBTCxHQUFhLENBQWI7QUFDSDs7OztXQUVELG1CQUFVO0FBQ04sV0FBSy9ELENBQUwsSUFBVSxLQUFLK0QsS0FBZjtBQUNBLFdBQUtqRSxDQUFMLElBQVUsS0FBS2lFLEtBQWY7QUFDSDs7O1dBQ0QsbUJBQVU7QUFDTixXQUFLL0QsQ0FBTCxJQUFVLEtBQUsrRCxLQUFmO0FBQ0EsV0FBS2pFLENBQUwsSUFBVSxLQUFLaUUsS0FBZjtBQUNIOzs7V0FDRCxtQkFBVTtBQUNOLFdBQUsvRCxDQUFMLElBQVUsS0FBSytELEtBQWY7QUFDQSxXQUFLakUsQ0FBTCxJQUFVLEtBQUtpRSxLQUFmO0FBQ0g7OztXQUNELG1CQUFVO0FBQ04sV0FBSy9ELENBQUwsSUFBVSxLQUFLK0QsS0FBZjtBQUNBLFdBQUtqRSxDQUFMLElBQVUsS0FBS2lFLEtBQWY7QUFDSDs7O1dBR0QsZ0JBQU87QUFDSCxXQUFLeEQsR0FBTCxDQUFTMkMsU0FBVCxHQUFxQixNQUFyQjtBQUNBLFdBQUszQyxHQUFMLENBQVM0RCxTQUFUO0FBQ0EsV0FBSzVELEdBQUwsQ0FBUzZELEdBQVQsQ0FBYSxLQUFLdEUsQ0FBbEIsRUFBcUIsS0FBS0UsQ0FBMUIsRUFBNkIsS0FBS0MsS0FBbEMsRUFBeUMsQ0FBekMsRUFBNkMyRCxJQUFJLENBQUNTLEVBQUwsR0FBUSxDQUFyRDtBQUNBLFdBQUs5RCxHQUFMLENBQVMrRCxJQUFUO0FBQ0g7Ozs7OztBQUdMLCtEQUFlUixVQUFmLEU7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTtBQUNBO0FBRUEsSUFBTWxFLFFBQVEsR0FBRyxFQUFqQjtBQUdTLFNBQVM0RCxTQUFULENBQW1CakQsR0FBbkIsRUFBd0I7QUFDN0JBLEtBQUcsQ0FBQzJDLFNBQUosR0FBZ0IsU0FBaEI7QUFDQTNDLEtBQUcsQ0FBQ2dELFFBQUosQ0FBYSxDQUFiLEVBQWdCM0QsUUFBaEIsRUFBMEJRLE1BQU0sQ0FBQ0gsS0FBUCxHQUFlTCxRQUFRLEdBQUcsQ0FBcEQsRUFBdURBLFFBQXZEO0FBRUFXLEtBQUcsQ0FBQzJDLFNBQUosR0FBZ0IsU0FBaEI7QUFDQTNDLEtBQUcsQ0FBQ2dELFFBQUosQ0FDRW5ELE1BQU0sQ0FBQ0gsS0FBUCxHQUFlTCxRQUFRLEdBQUcsQ0FENUIsRUFFRUEsUUFGRixFQUdFQSxRQUhGLEVBSUVRLE1BQU0sQ0FBQ0YsTUFBUCxHQUFnQk4sUUFBUSxHQUFHLENBSjdCO0FBT0FXLEtBQUcsQ0FBQzJDLFNBQUosR0FBZ0IsU0FBaEI7QUFDQTNDLEtBQUcsQ0FBQ2dELFFBQUosQ0FDRTNELFFBREYsRUFFRVEsTUFBTSxDQUFDRixNQUFQLEdBQWdCTixRQUFRLEdBQUcsQ0FGN0IsRUFHRVEsTUFBTSxDQUFDSCxLQUFQLEdBQWVMLFFBQVEsR0FBRyxDQUg1QixFQUlFQSxRQUpGO0FBT0FXLEtBQUcsQ0FBQzJDLFNBQUosR0FBZ0IsU0FBaEI7QUFDQTNDLEtBQUcsQ0FBQ2dELFFBQUosQ0FBYTNELFFBQWIsRUFBdUJBLFFBQVEsR0FBRyxDQUFsQyxFQUFxQ0EsUUFBckMsRUFBK0NBLFFBQVEsR0FBRyxDQUExRDtBQUVBVyxLQUFHLENBQUMyQyxTQUFKLEdBQWdCLFNBQWhCO0FBQ0EzQyxLQUFHLENBQUNnRCxRQUFKLENBQWEzRCxRQUFiLEVBQXVCQSxRQUFRLEdBQUcsQ0FBbEMsRUFBcUNBLFFBQVEsR0FBRyxFQUFoRCxFQUFvREEsUUFBcEQ7QUFFQVcsS0FBRyxDQUFDMkMsU0FBSixHQUFnQixTQUFoQjtBQUNBM0MsS0FBRyxDQUFDZ0QsUUFBSixDQUFhM0QsUUFBUSxHQUFHLEVBQXhCLEVBQTRCQSxRQUFRLEdBQUcsQ0FBdkMsRUFBMENBLFFBQTFDLEVBQW9EQSxRQUFRLEdBQUcsQ0FBL0Q7QUFDRDtBQUVJLFNBQVNpQixTQUFULENBQW1CMEQsS0FBbkIsRUFBMEJDLE1BQTFCLEVBQWtDO0FBQ3ZDLE1BQ0UsRUFDRUQsS0FBSyxDQUFDekUsQ0FBTixHQUFVMEUsTUFBTSxDQUFDMUUsQ0FBUCxHQUFTLENBQVQsR0FBYTBFLE1BQU0sQ0FBQ3ZFLEtBQXBCLEdBQTBCLENBQXBDLElBQ0FzRSxLQUFLLENBQUN6RSxDQUFOLEdBQVV5RSxLQUFLLENBQUN0RSxLQUFoQixHQUFzQixDQUF0QixHQUEwQnVFLE1BQU0sQ0FBQzFFLENBQVAsR0FBUyxDQURuQyxJQUVBeUUsS0FBSyxDQUFDdkUsQ0FBTixHQUFVd0UsTUFBTSxDQUFDeEUsQ0FBUCxHQUFTLENBQVQsR0FBYXdFLE1BQU0sQ0FBQ3RFLE1BQXBCLEdBQTJCLENBRnJDLElBR0FxRSxLQUFLLENBQUN2RSxDQUFOLEdBQVV1RSxLQUFLLENBQUNyRSxNQUFoQixHQUF1QixDQUF2QixHQUEyQnNFLE1BQU0sQ0FBQ3hFLENBQVAsR0FBUyxDQUp0QyxDQURGLEVBT0U7QUFDQSxXQUFPLElBQVA7QUFDRDtBQUNGLEM7Ozs7OztVQy9DRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsNkNBQTZDLHdEQUF3RCxFOzs7OztXQ0FyRztXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7O0FDTkE7QUFFQUssUUFBUSxDQUFDSSxnQkFBVCxDQUEwQixrQkFBMUIsRUFBOEMsWUFBTTtBQUNsRCxNQUFNTCxNQUFNLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFmO0FBQ0FGLFFBQU0sQ0FBQ0gsS0FBUCxHQUFlLEdBQWY7QUFDQUcsUUFBTSxDQUFDRixNQUFQLEdBQWdCLEdBQWhCO0FBQ0EsTUFBTUssR0FBRyxHQUFHSCxNQUFNLENBQUNJLFVBQVAsQ0FBa0IsSUFBbEIsQ0FBWjtBQUdBUSxxREFBSSxDQUFDWixNQUFELEVBQVNHLEdBQVQsQ0FBSjtBQUVELENBVEQsRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuaW1wb3J0IHsgY29sbGlzaW9uIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufTtcblxuLy8gbGV0IGNhbnZhc1Bvc2l0aW9uID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbi8vICAgLy8gbW91c2UueCA9IGUueCAtIGNhbnZhc1Bvc2l0aW9uLmxlZnQ7XG4vLyAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4vLyAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4vLyAgIC8vIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG4vLyB9KTtcblxuLy8gY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbi8vICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbi8vICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbi8vIH0pO1xuXG5cbmNsYXNzIENlbGwge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FudmFzJylcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IENFTExTSVpFO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICB9KTtcbiAgfVxuICBkcmF3KCkge1xuICAgIGlmIChtb3VzZS54ICYmIG1vdXNlLnkgJiYgY29sbGlzaW9uKHRoaXMsIG1vdXNlKSkge1xuICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBcInJlZFwiO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IENlbGxcbiIsIi8vIGltcG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5pbXBvcnQgQ2VsbCBmcm9tIFwiLi9ib2FyZFwiO1xuaW1wb3J0IEdva3UsIHsgcHJvamVjdGlsZXMgfSBmcm9tIFwiLi9nb2t1XCI7XG5pbXBvcnQgTmFydXRvIGZyb20gJy4vbmFydXRvJztcbmltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSdcbmltcG9ydCB7IGNvbGxpc2lvbiwgY3JlYXRlTWFwIH0gZnJvbSBcIi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lKGNhbnZhcywgY3R4KSB7XG4gICAgIGNvbnN0IENFTExTSVpFID0gNTA7XG4gICAgIGNvbnN0IENFTExHQVAgPSAzO1xuICAgICBjb25zdCBHQU1FR1JJRCA9IFtdO1xuICAgICBjb25zdCBHT0tVUyA9IFtdO1xuICAgICBjb25zdCBOQVJVVE9TID0gW107XG4gICAgIGxldCBNT05FWSA9IDEwMDA7XG4gICAgIGxldCBmcmFtZSA9IDA7XG4gICAgIGxldCBnYW1lT3ZlciA9IGZhbHNlO1xuICAgIC8vICBjb25zdCBwcm9qZWN0aWxlcyA9IFtdO1xuXG4gICAgIC8vIG1vdXNlXG4gICAgIGNvbnN0IG1vdXNlID0ge1xuICAgICAgIHg6IHVuZGVmaW5lZCxcbiAgICAgICB5OiB1bmRlZmluZWQsXG4gICAgICAgd2lkdGg6IDAuMSxcbiAgICAgICBoZWlnaHQ6IDAuMSxcbiAgICAgfTtcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4gICAgICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICAgfSk7XG5cbiAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgIG1vdXNlLnkgPSB1bmRlZmluZWQ7XG4gICAgIH0pO1xuICAgICAvLyBib2FyZFxuXG4gICAgIGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyB5ICs9IENFTExTSVpFKSB7XG4gICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogMjsgeCArPSBDRUxMU0laRSkge1xuICAgICAgICAgICBHQU1FR1JJRC5wdXNoKG5ldyBDZWxsKHgsIHkpKTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1cblxuICAgICBjcmVhdGVHcmlkKCk7XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlR2FtZUdyaWQoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHQU1FR1JJRC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgR0FNRUdSSURbaV0uZHJhdygpO1xuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIHByb2plY3RpbGVzXG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlUHJvamVjdGlsZXMoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0aWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgaWYgKGkgJSAyID09PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290TkUoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpICUgMyA9PT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdFNFKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSAlIGkgPT09IDAgJiYgaSUyICE9PSAwICYmIGklMyAhPT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdE5XKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSAlIDUgPT09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3RTVygpO1xuICAgICAgICAgfVxuXG4gICAgICAgICBwcm9qZWN0aWxlc1tpXS5kcmF3KCk7XG5cbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoTkFSVVRPU1tqXSAmJiBwcm9qZWN0aWxlc1tpXSAmJiBjb2xsaXNpb24ocHJvamVjdGlsZXNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgTkFSVVRPU1tqXS5oZWFsdGggLT0gcHJvamVjdGlsZXNbaV0ucG93ZXJcbiAgICAgICAgICAgICBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChwcm9qZWN0aWxlc1tpXSAmJiBwcm9qZWN0aWxlc1tpXS54ID4gY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUpIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICBpLS07XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gZ29rdXNcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgICBpZiAoZ3JpZFBvc3RpdGlvblggPiBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDMpIHJldHVybjtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBpZiAoR09LVVNbaV0ueCA9PT0gZ3JpZFBvc3RpdGlvblggJiYgR09LVVNbaV0ueSA9PT0gZ3JpZFBvc3RpdGlvblkpXG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgbGV0IGdva3VDb3N0ID0gMjUwO1xuICAgICAgIGlmIChNT05FWSA+PSBnb2t1Q29zdCkge1xuICAgICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgIH1cbiAgICAgfSk7XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlR29rdXMoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgR09LVVNbaV0uZHJhdygpO1xuICAgICAgICAgR09LVVNbaV0uc2hvb3QoKTtcbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoR09LVVNbaV0gJiYgY29sbGlzaW9uKEdPS1VTW2ldLCBOQVJVVE9TW2pdKSkge1xuICAgICAgICAgICAgIEdPS1VTW2ldLmhlYWx0aCAtPSAuMlxuICAgICAgICAgICB9XG4gICAgICAgICAgIGlmIChHT0tVU1tpXS5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgIEdPS1VTLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyBuYXJ1dG9zXG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlTmFydXRvcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBOQVJVVE9TLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBOQVJVVE9TW2ldLm1vdmUoKTtcbiAgICAgICAgICAgIE5BUlVUT1NbaV0uZHJhdygpO1xuICAgICAgICAgICAgaWYgKE5BUlVUT1NbaV0ueCA9PT0gQ0VMTFNJWkUqNiAmJiBOQVJVVE9TW2ldLnkgPT09IENFTExTSVpFKjgpIHtcbiAgICAgICAgICAgICAgZ2FtZU92ZXIgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoTkFSVVRPU1tpXS5oZWFsdGggPD0gMCkge1xuICAgICAgICAgICAgICBOQVJVVE9TLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICAgICBNT05FWSs9MTAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lICUgMTAwID09PSAwKSB7XG4gICAgICAgICAgICBOQVJVVE9TLnB1c2gobmV3IE5hcnV0bygpKVxuICAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyByZXNvdXJjZXNcblxuICAgICAvLyB1dGlsaXRpZXNcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHYW1lU3RhdHVzKCkge1xuICAgICAgIGlmIChNT05FWSA+IDQwMCkge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgIGN0eC5mb250ID0gXCIxNXB4IEFyaWFsXCI7XG4gICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggQXJpYWxcIjtcbiAgICAgICB9XG4gICAgICAgY3R4LmZpbGxUZXh0KFwiTW9uZXk6ICRcIiArIE1PTkVZLCA4MDIsIDMwKTtcbiAgICAgICBpZiAoZ2FtZU92ZXIpIHtcbiAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgICAgICAgY3R4LmZvbnQgPSAnNjBweCBBcmlhbCc7XG4gICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgMjUwLCAyMDApXG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgZnVuY3Rpb24gYW5pbWF0ZSgpIHtcbiAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XG4gICAgICAgY3R4LmZpbGxSZWN0KFxuICAgICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAyLFxuICAgICAgICAgMCxcbiAgICAgICAgIENFTExTSVpFICogMixcbiAgICAgICAgIGNhbnZhcy5oZWlnaHRcbiAgICAgICApO1xuXG4gICAgICAgY3JlYXRlTWFwKGN0eCk7XG4gICAgICAgaGFuZGxlR2FtZUdyaWQoKTtcbiAgICAgICBoYW5kbGVHb2t1cygpO1xuICAgICAgIGhhbmRsZVByb2plY3RpbGVzKCk7XG4gICAgICAgaGFuZGxlTmFydXRvcygpO1xuICAgICAgIGhhbmRsZUdhbWVTdGF0dXMoY3R4KTtcbiAgICAgICBmcmFtZSsrOyAgICAgICBcbiAgICAgICBpZiAoIWdhbWVPdmVyKSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgIH1cbiAgICAgYW5pbWF0ZSgpO1xufVxuXG5cbi8vIGV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiaW1wb3J0IFByb2plY3RpbGUgZnJvbSAnLi9wcm9qZWN0aWxlJztcblxuY29uc3QgQ0VMTFNJWkUgPSA1MDtcbmV4cG9ydCBjb25zdCBwcm9qZWN0aWxlcyA9IFtdXG5jb25zdCBDRUxMR0FQID0gMztcbmNvbnN0IEdBTUVHUklEID0gW107XG5jb25zdCBHT0tVUyA9IFtdO1xubGV0IE1PTkVZID0gMTAwMDtcblxuY29uc3QgbW91c2UgPSB7XG4gIHg6IHVuZGVmaW5lZCxcbiAgeTogdW5kZWZpbmVkLFxuICB3aWR0aDogMC4xLFxuICBoZWlnaHQ6IDAuMSxcbn07XG5cbmNsYXNzIEdva3Uge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IENFTExTSVpFO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJvamVjdGlsZXMgPSBbXTtcbiAgICB0aGlzLnRpbWVyID0gMDtcbiAgICB0aGlzLmhlYWx0aCA9IDEwMFxuICAgICBcbiAgfVxuICBkcmF3KCkge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJnb2xkXCI7XG4gICAgdGhpcy5jdHguZm9udCA9IFwiMTBweCBBcmlhbFwiO1xuICAgICAgICB0aGlzLmN0eC5maWxsVGV4dChcbiAgICAgICAgICBNYXRoLmZsb29yKHRoaXMuaGVhbHRoKSArIFwiSFBcIixcbiAgICAgICAgICB0aGlzLnggKyAxMixcbiAgICAgICAgICB0aGlzLnkgKyAxMFxuICAgICAgICApO1xuICAgIHRoaXMuY3R4LmZpbGxUZXh0KFwiR29rdVwiLCB0aGlzLnggKyAxNSwgdGhpcy55ICsgMzApO1xuICB9XG5cbiAgc2hvb3QoKSB7XG4gICAgdGhpcy50aW1lcisrO1xuICAgIGlmICh0aGlzLnRpbWVyICUgNTAgPT09IDApIHtcbiAgICAgIHByb2plY3RpbGVzLnB1c2gobmV3IFByb2plY3RpbGUodGhpcy54ICsgNzAsIHRoaXMueSArIDI1KSlcbiAgICB9XG4gIH1cbn1cblxuXG4vLyBleHBvcnQgZnVuY3Rpb24gaGFuZGxlR29rdXMoKSB7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbi8vICAgICBHT0tVU1tpXS5kcmF3KCk7XG4vLyAgIH1cbi8vIH1cblxuXG5leHBvcnQgZGVmYXVsdCBHb2t1XG5cblxuIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgLy8gICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICAgIC8vICB9KTtcblxuICAgICAgLy8gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICAvLyAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gIH0pO1xuICAgICAgLy8gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGNvbnN0IGdyaWRQb3N0aXRpb25ZID0gbW91c2UueSAtIChtb3VzZS55ICUgQ0VMTFNJWkUpO1xuICAgICAgLy8gICAgaWYgKGdyaWRQb3N0aXRpb25ZIDwgQ0VMTFNJWkUpIHJldHVybjtcbiAgICAgIC8vICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vICAgICAgaWYgKEdPS1VTW2ldLnggPT09IGdyaWRQb3N0aXRpb25YICYmIEdPS1VTW2ldLnkgPT09IGdyaWRQb3N0aXRpb25ZKSByZXR1cm47XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgICBsZXQgZ29rdUNvc3QgPSAxMDA7XG4gICAgICAvLyAgICBpZiAoTU9ORVkgPj0gZ29rdUNvc3QpIHtcbiAgICAgIC8vICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgIC8vICAgICAgTU9ORVkgLT0gZ29rdUNvc3Q7XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgfSk7IiwiY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuY2xhc3MgTmFydXRvIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMud2lkdGggPSBDRUxMU0laRTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBDRUxMU0laRTtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDFcbiAgICAgICAgdGhpcy5tb3ZlbWVudCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNDAwKSArIDUwO1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IHRoaXMuaGVhbHRoO1xuXG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgLy8gdGhpcy55ICs9IDE7XG4gICAgICAgIGlmICh0aGlzLnggPj0gMCAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueCA9PT0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID49IDAgICYmIHRoaXMueSA8PSBDRUxMU0laRSoxMSkge1xuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjExICYmIHRoaXMueCA8PSBDRUxMU0laRSoxNSAgJiYgdGhpcy54ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDw9IENFTExTSVpFKjExICYmIHRoaXMueSA+PSBDRUxMU0laRSozICAmJiB0aGlzLnggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSozICYmIHRoaXMueCA+PSAwICAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID49IENFTExTSVpFKjMgJiYgdGhpcy55IDw9IENFTExTSVpFKjggICYmIHRoaXMueCA9PT0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSo4ICYmIHRoaXMueCA8PSBDRUxMU0laRSoxMiAgJiYgdGhpcy54ID49IENFTExTSVpFKjYpIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgXG4gICAgICAgIFxuXG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIm9yYW5nZVwiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMHB4IEFyaWFsXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KE1hdGguZmxvb3IodGhpcy5oZWFsdGgpK1wiSFBcIiwgdGhpcy54ICsgMTIsIHRoaXMueSArIDEwKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJOYXJ1dG9cIiwgdGhpcy54ICsgMTIsIHRoaXMueSArIDMwKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmFydXRvIiwiaW1wb3J0IHtwcm9qZWN0aWxlcyB9IGZyb20gJy4vZ29rdSc7XG5cbmNsYXNzIFByb2plY3RpbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSAxNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNTtcbiAgICAgICAgdGhpcy5wb3dlciA9IDI1O1xuICAgICAgICB0aGlzLnNwZWVkID0gNztcbiAgICB9XG5cbiAgICBzaG9vdE5FKCkge1xuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290U0UoKSB7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3ROVygpIHtcbiAgICAgICAgdGhpcy55IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdFNXKCkge1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgfVxuXG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYXF1YSc7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIDAgLCBNYXRoLlBJKjIpO1xuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlIiwiLy8gaW1wb3J0IHsgaGFuZGxlR2FtZUdyaWQgfSBmcm9tICcuL2JvYXJkJztcbi8vIGltcG9ydCB7IGhhbmRsZUdva3VzIH0gZnJvbSAnLi9nb2t1JztcblxuY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoY3R4KSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdCgwLCBDRUxMU0laRSwgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KFxuICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBDRUxMU0laRSxcbiAgICAgIGNhbnZhcy5oZWlnaHQgLSBDRUxMU0laRSAqIDJcbiAgICApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChcbiAgICAgIENFTExTSVpFLFxuICAgICAgY2FudmFzLmhlaWdodCAtIENFTExTSVpFICogMixcbiAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCxcbiAgICAgIENFTExTSVpFXG4gICAgKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUsIENFTExTSVpFICogNCwgQ0VMTFNJWkUsIENFTExTSVpFICogNik7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFLCBDRUxMU0laRSAqIDQsIENFTExTSVpFICogMTEsIENFTExTSVpFKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUgKiAxMSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSwgQ0VMTFNJWkUgKiA0KTtcbiAgfVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGlzaW9uKGZpcnN0LCBzZWNvbmQpIHtcbiAgaWYgKFxuICAgICEoXG4gICAgICBmaXJzdC54ID4gc2Vjb25kLngtMSArIHNlY29uZC53aWR0aC0xIHx8XG4gICAgICBmaXJzdC54ICsgZmlyc3Qud2lkdGgtMSA8IHNlY29uZC54LTEgfHxcbiAgICAgIGZpcnN0LnkgPiBzZWNvbmQueS0xICsgc2Vjb25kLmhlaWdodC0xIHx8XG4gICAgICBmaXJzdC55ICsgZmlyc3QuaGVpZ2h0LTEgPCBzZWNvbmQueS0xXG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtnYW1lfSBmcm9tICcuL3NjcmlwdHMvZ2FtZSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gIGNhbnZhcy53aWR0aCA9IDkwMDtcbiAgY2FudmFzLmhlaWdodCA9IDYwMDtcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXG4gIGdhbWUoY2FudmFzLCBjdHgpO1xuXG59KVxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=