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
    this.width = 49;
    this.height = 49;
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
    this.width = 49;
    this.height = 49;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0IiwiZ2FtZSIsIkNFTExHQVAiLCJHQU1FR1JJRCIsIkdPS1VTIiwiTkFSVVRPUyIsIk1PTkVZIiwiZnJhbWUiLCJnYW1lT3ZlciIsImNyZWF0ZUdyaWQiLCJwdXNoIiwiaGFuZGxlR2FtZUdyaWQiLCJpIiwibGVuZ3RoIiwiZHJhdyIsImhhbmRsZVByb2plY3RpbGVzIiwicHJvamVjdGlsZXMiLCJzaG9vdE5FIiwic2hvb3RTRSIsInNob290TlciLCJzaG9vdFNXIiwiaiIsImhlYWx0aCIsInBvd2VyIiwiZ3JpZFBvc3RpdGlvblgiLCJncmlkUG9zdGl0aW9uWSIsImdva3VDb3N0IiwiR29rdSIsImhhbmRsZUdva3VzIiwic2hvb3QiLCJzcGxpY2UiLCJoYW5kbGVOYXJ1dG9zIiwibW92ZSIsIk5hcnV0byIsImhhbmRsZUdhbWVTdGF0dXMiLCJmaWxsU3R5bGUiLCJmb250IiwiZmlsbFRleHQiLCJhbmltYXRlIiwiY2xlYXJSZWN0IiwiZmlsbFJlY3QiLCJjcmVhdGVNYXAiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJzaG9vdGluZyIsInRpbWVyIiwiTWF0aCIsImZsb29yIiwiUHJvamVjdGlsZSIsInNwZWVkIiwibW92ZW1lbnQiLCJyYW5kb20iLCJtYXhIZWFsdGgiLCJiZWdpblBhdGgiLCJhcmMiLCJQSSIsImZpbGwiLCJmaXJzdCIsInNlY29uZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHLEVBQWpCO0FBRUE7QUFFQSxJQUFNQyxLQUFLLEdBQUc7QUFDWkMsR0FBQyxFQUFFQyxTQURTO0FBRVpDLEdBQUMsRUFBRUQsU0FGUztBQUdaRSxPQUFLLEVBQUUsR0FISztBQUlaQyxRQUFNLEVBQUU7QUFKSSxDQUFkLEMsQ0FPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztJQUdNQyxJO0FBQ0osZ0JBQVlMLENBQVosRUFBZUUsQ0FBZixFQUFrQjtBQUFBOztBQUNoQixTQUFLSSxNQUFMLEdBQWNDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEtBQUtILE1BQUwsQ0FBWUksVUFB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SyxDQUFDekUsQ0FBTixHQUFVeUUsS0FBSyxDQUFDdEUsS0FBaEIsR0FBd0J1RSxNQUFNLENBQUMxRSxDQUQvQixJQUVBeUUsS0FBSyxDQUFDdkUsQ0FBTixHQUFVd0UsTUFBTSxDQUFDeEUsQ0FBUCxHQUFXd0UsTUFBTSxDQUFDdEUsTUFGNUIsSUFHQXFFLEtBQUssQ0FBQ3ZFLENBQU4sR0FBVXVFLEtBQUssQ0FBQ3JFLE1BQWhCLEdBQXlCc0UsTUFBTSxDQUFDeEUsQ0FKbEMsQ0FERixFQU9FO0FBQ0EsV0FBTyxJQUFQO0FBQ0Q7QUFDRixDOzs7Ozs7VUMvQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLDZDQUE2Qyx3REFBd0QsRTs7Ozs7V0NBckc7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBRUFLLFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsTUFBTUwsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBRixRQUFNLENBQUNILEtBQVAsR0FBZSxHQUFmO0FBQ0FHLFFBQU0sQ0FBQ0YsTUFBUCxHQUFnQixHQUFoQjtBQUNBLE1BQU1LLEdBQUcsR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFHQVEscURBQUksQ0FBQ1osTUFBRCxFQUFTRyxHQUFULENBQUo7QUFFRCxDQVRELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENFTExTSVpFID0gNTA7XG5cbmltcG9ydCB7IGNvbGxpc2lvbiB9IGZyb20gJy4vdXRpbGl0aWVzJztcblxuY29uc3QgbW91c2UgPSB7XG4gIHg6IHVuZGVmaW5lZCxcbiAgeTogdW5kZWZpbmVkLFxuICB3aWR0aDogMC4xLFxuICBoZWlnaHQ6IDAuMSxcbn07XG5cbi8vIGxldCBjYW52YXNQb3NpdGlvbiA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbi8vIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4vLyAgIC8vIG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuLy8gICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuLy8gICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuLy8gICAvLyBtb3VzZS55ID0gZS55IC0gY2FudmFzUG9zaXRpb24udG9wO1xuLy8gfSk7XG5cbi8vIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4vLyAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4vLyAgIG1vdXNlLnkgPSB1bmRlZmluZWQ7XG4vLyB9KTtcblxuXG5jbGFzcyBDZWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpXG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSBDRUxMU0laRTtcbiAgICB0aGlzLmhlaWdodCA9IENFTExTSVpFO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4gICAgICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbiAgICAgIG1vdXNlLnkgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH1cbiAgZHJhdygpIHtcbiAgICBpZiAobW91c2UueCAmJiBtb3VzZS55ICYmIGNvbGxpc2lvbih0aGlzLCBtb3VzZSkpIHtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDZWxsXG4iLCIvLyBpbXBvcnQgeyBhbmltYXRlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IENlbGwgZnJvbSBcIi4vYm9hcmRcIjtcbmltcG9ydCBHb2t1LCB7IHByb2plY3RpbGVzIH0gZnJvbSBcIi4vZ29rdVwiO1xuaW1wb3J0IE5hcnV0byBmcm9tICcuL25hcnV0byc7XG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnXG5pbXBvcnQgeyBjb2xsaXNpb24sIGNyZWF0ZU1hcCB9IGZyb20gXCIuL3V0aWxpdGllc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2FtZShjYW52YXMsIGN0eCkge1xuICAgICBjb25zdCBDRUxMU0laRSA9IDUwO1xuICAgICBjb25zdCBDRUxMR0FQID0gMztcbiAgICAgY29uc3QgR0FNRUdSSUQgPSBbXTtcbiAgICAgY29uc3QgR09LVVMgPSBbXTtcbiAgICAgY29uc3QgTkFSVVRPUyA9IFtdO1xuICAgICBsZXQgTU9ORVkgPSAxMDAwO1xuICAgICBsZXQgZnJhbWUgPSAwO1xuICAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAvLyAgY29uc3QgcHJvamVjdGlsZXMgPSBbXTtcblxuICAgICAvLyBtb3VzZVxuICAgICBjb25zdCBtb3VzZSA9IHtcbiAgICAgICB4OiB1bmRlZmluZWQsXG4gICAgICAgeTogdW5kZWZpbmVkLFxuICAgICAgIHdpZHRoOiAwLjEsXG4gICAgICAgaGVpZ2h0OiAwLjEsXG4gICAgIH07XG5cbiAgICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgIH0pO1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbiAgICAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgICB9KTtcbiAgICAgLy8gYm9hcmRcblxuICAgICBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSArPSBDRUxMU0laRSkge1xuICAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDI7IHggKz0gQ0VMTFNJWkUpIHtcbiAgICAgICAgICAgR0FNRUdSSUQucHVzaChuZXcgQ2VsbCh4LCB5KSk7XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgY3JlYXRlR3JpZCgpO1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVHcmlkKCkge1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FNRUdSSUQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIEdBTUVHUklEW2ldLmRyYXcoKTtcbiAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyBwcm9qZWN0aWxlc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZVByb2plY3RpbGVzKCkge1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdGlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIGlmIChpICUgMiA9PT0gMCAmJiBpJTQgIT09IDAgJiYgaSU1ICE9PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290TkUoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpICUgMyA9PT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdFNFKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSU0ID09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3ROVygpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGkgJSA1ID09PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290U1coKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGVsc2Uge3Byb2plY3RpbGVzW2ldLnNob290TlcoKTt9XG5cbiAgICAgICAgIHByb2plY3RpbGVzW2ldLmRyYXcoKTtcblxuICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBOQVJVVE9TLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgIGlmIChOQVJVVE9TW2pdICYmIHByb2plY3RpbGVzW2ldICYmIGNvbGxpc2lvbihwcm9qZWN0aWxlc1tpXSwgTkFSVVRPU1tqXSkpIHtcbiAgICAgICAgICAgICBOQVJVVE9TW2pdLmhlYWx0aCAtPSBwcm9qZWN0aWxlc1tpXS5wb3dlclxuICAgICAgICAgICAgIHByb2plY3RpbGVzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cblxuICAgICAgICAgaWYgKHByb2plY3RpbGVzW2ldICYmIHByb2plY3RpbGVzW2ldLnggPiBjYW52YXMud2lkdGggLSBDRUxMU0laRSkge1xuICAgICAgICAgICBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgIGktLTtcbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyBnb2t1c1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25YID0gbW91c2UueCAtIChtb3VzZS54ICUgQ0VMTFNJWkUpO1xuICAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25ZID0gbW91c2UueSAtIChtb3VzZS55ICUgQ0VMTFNJWkUpO1xuICAgICAgIGlmIChncmlkUG9zdGl0aW9uWCA+IGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogMykgcmV0dXJuO1xuICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSlcbiAgICAgICAgICAgcmV0dXJuO1xuICAgICAgIH1cbiAgICAgICBsZXQgZ29rdUNvc3QgPSAyNTA7XG4gICAgICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAgICBHT0tVUy5wdXNoKG5ldyBHb2t1KGdyaWRQb3N0aXRpb25YLCBncmlkUG9zdGl0aW9uWSkpO1xuICAgICAgICAgTU9ORVkgLT0gZ29rdUNvc3Q7XG4gICAgICAgfVxuICAgICB9KTtcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHb2t1cygpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBHT0tVU1tpXS5kcmF3KCk7XG4gICAgICAgICBHT0tVU1tpXS5zaG9vdCgpO1xuICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBOQVJVVE9TLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgIGlmIChHT0tVU1tpXSAmJiBjb2xsaXNpb24oR09LVVNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgR09LVVNbaV0uaGVhbHRoIC09IC4yXG4gICAgICAgICAgIH1cbiAgICAgICAgICAgaWYgKEdPS1VTW2ldLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICAgR09LVVMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgIGktLTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIG5hcnV0b3NcblxuICAgICBmdW5jdGlvbiBoYW5kbGVOYXJ1dG9zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5BUlVUT1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIE5BUlVUT1NbaV0ubW92ZSgpO1xuICAgICAgICAgICAgTkFSVVRPU1tpXS5kcmF3KCk7XG4gICAgICAgICAgICBpZiAoTkFSVVRPU1tpXS54ID09PSBDRUxMU0laRSo2ICYmIE5BUlVUT1NbaV0ueSA9PT0gQ0VMTFNJWkUqOCkge1xuICAgICAgICAgICAgICBnYW1lT3ZlciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOQVJVVE9TW2ldLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICAgIE5BUlVUT1Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIE1PTkVZKz0xMDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhbWUgJSAyMDAgPT09IDApIHtcbiAgICAgICAgICAgIE5BUlVUT1MucHVzaChuZXcgTmFydXRvKCkpXG4gICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIHJlc291cmNlc1xuXG4gICAgIC8vIHV0aWxpdGllc1xuXG4gICAgIGZ1bmN0aW9uIGhhbmRsZUdhbWVTdGF0dXMoKSB7XG4gICAgICAgaWYgKE1PTkVZID4gNDAwKSB7XG4gICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJncmVlblwiO1xuICAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggQXJpYWxcIjtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICBjdHguZm9udCA9IFwiMTVweCBBcmlhbFwiO1xuICAgICAgIH1cbiAgICAgICBjdHguZmlsbFRleHQoXCJNb25leTogJFwiICsgTU9ORVksIDgwMiwgMzApO1xuICAgICAgIGlmIChnYW1lT3Zlcikge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgICAgICBjdHguZm9udCA9ICc2MHB4IEZhbnRhc3knO1xuICAgICAgICAgY3R4LmZpbGxUZXh0KFwiR2FtZSBPdmVyXCIsIDI1MCwgMjQ4KVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGZ1bmN0aW9uIGFuaW1hdGUoKSB7XG4gICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgIGN0eC5maWxsU3R5bGUgPSBcImxpZ2h0Z3JheVwiO1xuICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogMixcbiAgICAgICAgIDAsXG4gICAgICAgICBDRUxMU0laRSAqIDIsXG4gICAgICAgICBjYW52YXMuaGVpZ2h0XG4gICAgICAgKTtcblxuICAgICAgIGNyZWF0ZU1hcChjdHgpO1xuICAgICAgIGhhbmRsZUdhbWVHcmlkKCk7XG4gICAgICAgaGFuZGxlR29rdXMoKTtcbiAgICAgICBoYW5kbGVQcm9qZWN0aWxlcygpO1xuICAgICAgIGhhbmRsZU5hcnV0b3MoKTtcbiAgICAgICBoYW5kbGVHYW1lU3RhdHVzKGN0eCk7XG4gICAgICAgZnJhbWUrKzsgICAgICAgXG4gICAgICAgaWYgKCFnYW1lT3ZlcikgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgICB9XG4gICAgIGFuaW1hdGUoKTtcbn1cblxuXG4vLyBleHBvcnQgZGVmYXVsdCBHYW1lOyIsImltcG9ydCBQcm9qZWN0aWxlIGZyb20gJy4vcHJvamVjdGlsZSc7XG5cbmNvbnN0IENFTExTSVpFID0gNTA7XG5leHBvcnQgY29uc3QgcHJvamVjdGlsZXMgPSBbXVxuY29uc3QgQ0VMTEdBUCA9IDM7XG5jb25zdCBHQU1FR1JJRCA9IFtdO1xuY29uc3QgR09LVVMgPSBbXTtcbmxldCBNT05FWSA9IDEwMDA7XG5cbmNvbnN0IG1vdXNlID0ge1xuICB4OiB1bmRlZmluZWQsXG4gIHk6IHVuZGVmaW5lZCxcbiAgd2lkdGg6IDAuMSxcbiAgaGVpZ2h0OiAwLjEsXG59O1xuXG5jbGFzcyBHb2t1IHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSA0OTtcbiAgICB0aGlzLmhlaWdodCA9IDQ5O1xuICAgIHRoaXMuc2hvb3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgdGhpcy50aW1lciA9IDA7XG4gICAgdGhpcy5oZWFsdGggPSAxMDBcbiAgICAgXG4gIH1cbiAgZHJhdygpIHtcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcImJsdWVcIjtcbiAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ29sZFwiO1xuICAgIHRoaXMuY3R4LmZvbnQgPSBcIjEwcHggQXJpYWxcIjtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgICAgICAgTWF0aC5mbG9vcih0aGlzLmhlYWx0aCkgKyBcIkhQXCIsXG4gICAgICAgICAgdGhpcy54ICsgMTIsXG4gICAgICAgICAgdGhpcy55ICsgMTBcbiAgICAgICAgKTtcbiAgICB0aGlzLmN0eC5maWxsVGV4dChcIkdva3VcIiwgdGhpcy54ICsgMTUsIHRoaXMueSArIDMwKTtcbiAgfVxuXG4gIHNob290KCkge1xuICAgIHRoaXMudGltZXIrKztcbiAgICBpZiAodGhpcy50aW1lciAlIDUwID09PSAwKSB7XG4gICAgICBwcm9qZWN0aWxlcy5wdXNoKG5ldyBQcm9qZWN0aWxlKHRoaXMueCArIDcwLCB0aGlzLnkgKyAyNSkpXG4gICAgfVxuICB9XG59XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUdva3VzKCkge1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgR09LVVNbaV0uZHJhdygpO1xuLy8gICB9XG4vLyB9XG5cblxuZXhwb3J0IGRlZmF1bHQgR29rdVxuXG5cbiAvLyAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIC8vICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgICAvLyAgfSk7XG5cbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgIC8vICB9KTtcbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gICAgY29uc3QgZ3JpZFBvc3RpdGlvblggPSBtb3VzZS54IC0gKG1vdXNlLnggJSBDRUxMU0laRSk7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGlmIChncmlkUG9zdGl0aW9uWSA8IENFTExTSVpFKSByZXR1cm47XG4gICAgICAvLyAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSkgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gICAgbGV0IGdva3VDb3N0ID0gMTAwO1xuICAgICAgLy8gICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAvLyAgICAgIEdPS1VTLnB1c2gobmV3IEdva3UoZ3JpZFBvc3RpdGlvblgsIGdyaWRQb3N0aXRpb25ZKSk7XG4gICAgICAvLyAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0pOyIsImNvbnN0IENFTExTSVpFID0gNTA7XG5cbmNsYXNzIE5hcnV0byB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDk7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxXG4gICAgICAgIHRoaXMubW92ZW1lbnQgPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQwMCkgKyA1MDtcbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLmhlYWx0aDtcblxuICAgIH1cblxuICAgIG1vdmUoKSB7XG4gICAgICAgIC8vIHRoaXMueSArPSAxO1xuICAgICAgICBpZiAodGhpcy54ID49IDAgJiYgdGhpcy54IDw9IENFTExTSVpFKjE1ICYmIHRoaXMueSA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnggPT09IENFTExTSVpFKjE1ICYmIHRoaXMueSA+PSAwICAmJiB0aGlzLnkgPD0gQ0VMTFNJWkUqMTEpIHtcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSoxMSAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTUgICYmIHRoaXMueCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA8PSBDRUxMU0laRSoxMSAmJiB0aGlzLnkgPj0gQ0VMTFNJWkUqMyAgJiYgdGhpcy54ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnkgLT0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA9PT0gQ0VMTFNJWkUqMyAmJiB0aGlzLnggPj0gMCAgJiYgdGhpcy54IDw9IENFTExTSVpFKjEyKSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA+PSBDRUxMU0laRSozICYmIHRoaXMueSA8PSBDRUxMU0laRSo4ICAmJiB0aGlzLnggPT09IENFTExTSVpFKjEyKSB7XG4gICAgICAgICAgICB0aGlzLnkgKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueSA9PT0gQ0VMTFNJWkUqOCAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTIgICYmIHRoaXMueCA+PSBDRUxMU0laRSo2KSB7XG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG4gICAgXG4gICAgfVxuXG4gICAgZHJhdygpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJibGFja1wiO1xuICAgICAgICB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSBcIm9yYW5nZVwiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMHB4IEFyaWFsXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KE1hdGguZmxvb3IodGhpcy5oZWFsdGgpK1wiSFBcIiwgdGhpcy54ICsgMTIsIHRoaXMueSArIDEwKTtcbiAgICAgICAgdGhpcy5jdHguZmlsbFRleHQoXCJOYXJ1dG9cIiwgdGhpcy54ICsgMTIsIHRoaXMueSArIDMwKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTmFydXRvIiwiaW1wb3J0IHtwcm9qZWN0aWxlcyB9IGZyb20gJy4vZ29rdSc7XG5cbmNsYXNzIFByb2plY3RpbGUge1xuICAgIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSAxNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAxNTtcbiAgICAgICAgdGhpcy5wb3dlciA9IDI1O1xuICAgICAgICB0aGlzLnNwZWVkID0gNztcbiAgICB9XG5cbiAgICBzaG9vdE5FKCkge1xuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290U0UoKSB7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3ROVygpIHtcbiAgICAgICAgdGhpcy55IC09IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdFNXKCkge1xuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgfVxuXG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnYXF1YSc7XG4gICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICB0aGlzLmN0eC5hcmModGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIDAgLCBNYXRoLlBJKjIpO1xuICAgICAgICB0aGlzLmN0eC5maWxsKCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0aWxlIiwiLy8gaW1wb3J0IHsgaGFuZGxlR2FtZUdyaWQgfSBmcm9tICcuL2JvYXJkJztcbi8vIGltcG9ydCB7IGhhbmRsZUdva3VzIH0gZnJvbSAnLi9nb2t1JztcblxuY29uc3QgQ0VMTFNJWkUgPSA1MDtcblxuXG4gIGV4cG9ydCBmdW5jdGlvbiBjcmVhdGVNYXAoY3R4KSB7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdCgwLCBDRUxMU0laRSwgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KFxuICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBDRUxMU0laRSxcbiAgICAgIGNhbnZhcy5oZWlnaHQgLSBDRUxMU0laRSAqIDJcbiAgICApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChcbiAgICAgIENFTExTSVpFLFxuICAgICAgY2FudmFzLmhlaWdodCAtIENFTExTSVpFICogMixcbiAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCxcbiAgICAgIENFTExTSVpFXG4gICAgKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUsIENFTExTSVpFICogNCwgQ0VMTFNJWkUsIENFTExTSVpFICogNik7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFLCBDRUxMU0laRSAqIDQsIENFTExTSVpFICogMTEsIENFTExTSVpFKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUgKiAxMSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSwgQ0VMTFNJWkUgKiA0KTtcbiAgfVxuXG5leHBvcnQgZnVuY3Rpb24gY29sbGlzaW9uKGZpcnN0LCBzZWNvbmQpIHtcbiAgaWYgKFxuICAgICEoXG4gICAgICBmaXJzdC54ID4gc2Vjb25kLnggKyBzZWNvbmQud2lkdGggfHxcbiAgICAgIGZpcnN0LnggKyBmaXJzdC53aWR0aCA8IHNlY29uZC54IHx8XG4gICAgICBmaXJzdC55ID4gc2Vjb25kLnkgKyBzZWNvbmQuaGVpZ2h0IHx8XG4gICAgICBmaXJzdC55ICsgZmlyc3QuaGVpZ2h0IDwgc2Vjb25kLnlcbiAgICApXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2dhbWV9IGZyb20gJy4vc2NyaXB0cy9nYW1lJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgY2FudmFzLndpZHRoID0gOTAwO1xuICBjYW52YXMuaGVpZ2h0ID0gNjAwO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cbiAgZ2FtZShjYW52YXMsIGN0eCk7XG5cbn0pXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==