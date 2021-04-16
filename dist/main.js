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
    if (MONEY > 400) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9uYXJ1dG8uanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9wcm9qZWN0aWxlLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOlsiQ0VMTFNJWkUiLCJtb3VzZSIsIngiLCJ1bmRlZmluZWQiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJDZWxsIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsIm9mZnNldFgiLCJvZmZzZXRZIiwiY29sbGlzaW9uIiwic3Ryb2tlU3R5bGUiLCJzdHJva2VSZWN0Iiwia2lsbENvdW50IiwiZ2FtZSIsIkdBTUVHUklEIiwiR09LVVMiLCJOQVJVVE9TIiwiTU9ORVkiLCJmcmFtZSIsImdhbWVPdmVyIiwiY3JlYXRlR3JpZCIsInB1c2giLCJoYW5kbGVHYW1lR3JpZCIsImkiLCJsZW5ndGgiLCJkcmF3IiwiaGFuZGxlUHJvamVjdGlsZXMiLCJwcm9qZWN0aWxlcyIsInNob290TkUiLCJzaG9vdFNFIiwic2hvb3ROVyIsInNob290U1ciLCJqIiwiaGVhbHRoIiwicG93ZXIiLCJncmlkUG9zdGl0aW9uWCIsImdyaWRQb3N0aXRpb25ZIiwiZ29rdUNvc3QiLCJHb2t1IiwiaGFuZGxlR29rdXMiLCJzaG9vdCIsImhhbmRsZU5hcnV0b3MiLCJtb3ZlIiwic3BsaWNlIiwiTmFydXRvIiwiaGFuZGxlR2FtZVN0YXR1cyIsImZpbGxTdHlsZSIsImZvbnQiLCJmaWxsVGV4dCIsImFuaW1hdGUiLCJjbGVhclJlY3QiLCJmaWxsUmVjdCIsImNyZWF0ZU1hcCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInNob290aW5nIiwidGltZXIiLCJpbWciLCJkcmF3SW1hZ2UiLCJQcm9qZWN0aWxlIiwic3BlZWQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJtb3ZlbWVudCIsIm1heEhlYWx0aCIsImJlZ2luUGF0aCIsImFyYyIsIlBJIiwiZmlsbCIsImZpcnN0Iiwic2Vjb25kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFNQSxRQUFRLEdBQUcsRUFBakI7QUFFQTtBQUVBLElBQU1DLEtBQUssR0FBRztBQUNaQyxHQUFDLEVBQUVDLFNBRFM7QUFFWkMsR0FBQyxFQUFFRCxTQUZTO0FBR1pFLE9BQUssRUFBRSxHQUhLO0FBSVpDLFFBQU0sRUFBRTtBQUpJLENBQWQsQyxDQU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0lBR01DLEk7QUFDSixnQkFBWUwsQ0FBWixFQUFlRSxDQUFmLEVBQWtCO0FBQUE7O0FBQ2hCLFNBQUtJLE1BQUwsR0FBY0MsUUFBUSxDQUFDQyxjQUFULENBQXdCLFFBQXhCLENBQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVcs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QTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLDZDQUE2Qyx3REFBd0QsRTs7Ozs7V0NBckc7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7OztBQ05BO0FBRUFLLFFBQVEsQ0FBQ0ksZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsTUFBTUwsTUFBTSxHQUFHQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBRixRQUFNLENBQUNILEtBQVAsR0FBZSxHQUFmO0FBQ0FHLFFBQU0sQ0FBQ0YsTUFBUCxHQUFnQixHQUFoQjtBQUNBLE1BQU1LLEdBQUcsR0FBR0gsTUFBTSxDQUFDSSxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFHQVMscURBQUksQ0FBQ2IsTUFBRCxFQUFTRyxHQUFULENBQUo7QUFFRCxDQVRELEUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IENFTExTSVpFID0gNTA7XG5cbmltcG9ydCB7IGNvbGxpc2lvbiB9IGZyb20gJy4vdXRpbGl0aWVzJztcblxuY29uc3QgbW91c2UgPSB7XG4gIHg6IHVuZGVmaW5lZCxcbiAgeTogdW5kZWZpbmVkLFxuICB3aWR0aDogMC4xLFxuICBoZWlnaHQ6IDAuMSxcbn07XG5cbi8vIGxldCBjYW52YXNQb3NpdGlvbiA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbi8vIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4vLyAgIC8vIG1vdXNlLnggPSBlLnggLSBjYW52YXNQb3NpdGlvbi5sZWZ0O1xuLy8gICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuLy8gICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuLy8gICAvLyBtb3VzZS55ID0gZS55IC0gY2FudmFzUG9zaXRpb24udG9wO1xuLy8gfSk7XG5cbi8vIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4vLyAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4vLyAgIG1vdXNlLnkgPSB1bmRlZmluZWQ7XG4vLyB9KTtcblxuXG5jbGFzcyBDZWxsIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpXG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSBDRUxMU0laRTtcbiAgICB0aGlzLmhlaWdodCA9IENFTExTSVpFO1xuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIG1vdXNlLnggPSBlLm9mZnNldFg7XG4gICAgICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuICAgIH0pO1xuXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgbW91c2UueCA9IHVuZGVmaW5lZDtcbiAgICAgIG1vdXNlLnkgPSB1bmRlZmluZWQ7XG4gICAgfSk7XG4gIH1cbiAgZHJhdygpIHtcbiAgICBpZiAobW91c2UueCAmJiBtb3VzZS55ICYmIGNvbGxpc2lvbih0aGlzLCBtb3VzZSkpIHtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gXCJyZWRcIjtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9XG4gIH1cbn1cblxuXG5leHBvcnQgZGVmYXVsdCBDZWxsXG4iLCIvLyBpbXBvcnQgeyBhbmltYXRlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuaW1wb3J0IENlbGwgZnJvbSBcIi4vYm9hcmRcIjtcbmltcG9ydCBHb2t1LCB7IHByb2plY3RpbGVzIH0gZnJvbSBcIi4vZ29rdVwiO1xuaW1wb3J0IE5hcnV0byBmcm9tICcuL25hcnV0byc7XG5pbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnXG5pbXBvcnQgeyBjb2xsaXNpb24sIGNyZWF0ZU1hcCB9IGZyb20gXCIuL3V0aWxpdGllc1wiO1xuXG5leHBvcnQgbGV0IGtpbGxDb3VudCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBnYW1lKGNhbnZhcywgY3R4KSB7XG4gICAgIGNvbnN0IENFTExTSVpFID0gNTA7XG4gICAgIGNvbnN0IEdBTUVHUklEID0gW107XG4gICAgIGNvbnN0IEdPS1VTID0gW107XG4gICAgIGNvbnN0IE5BUlVUT1MgPSBbXTtcbiAgICAgbGV0IE1PTkVZID0gMTAwMDtcbiAgICAgbGV0IGZyYW1lID0gMDtcbiAgICAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gICAgLy8gIGNvbnN0IHByb2plY3RpbGVzID0gW107XG5cbiAgICAgLy8gbW91c2VcbiAgICAgY29uc3QgbW91c2UgPSB7XG4gICAgICAgeDogdW5kZWZpbmVkLFxuICAgICAgIHk6IHVuZGVmaW5lZCxcbiAgICAgICB3aWR0aDogMC4xLFxuICAgICAgIGhlaWdodDogMC4xLFxuICAgICB9O1xuXG4gICAgIGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgICBtb3VzZS55ID0gZS5vZmZzZXRZO1xuICAgICB9KTtcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgfSk7XG4gICAgIC8vIGJvYXJkXG5cbiAgICAgZnVuY3Rpb24gY3JlYXRlR3JpZCgpIHtcbiAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGNhbnZhcy5oZWlnaHQ7IHkgKz0gQ0VMTFNJWkUpIHtcbiAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAyOyB4ICs9IENFTExTSVpFKSB7XG4gICAgICAgICAgIEdBTUVHUklELnB1c2gobmV3IENlbGwoeCwgeSkpO1xuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIGNyZWF0ZUdyaWQoKTtcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHYW1lR3JpZCgpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdBTUVHUklELmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBHQU1FR1JJRFtpXS5kcmF3KCk7XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gcHJvamVjdGlsZXNcblxuICAgICBmdW5jdGlvbiBoYW5kbGVQcm9qZWN0aWxlcygpIHtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBpZiAoaSAlIDIgPT09IDAgJiYgaSU0ICE9PSAwICYmIGklNSAhPT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdE5FKCk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoaSAlIDMgPT09IDApIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXNbaV0uc2hvb3RTRSgpO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKGklNCA9PSAwKSB7XG4gICAgICAgICAgIHByb2plY3RpbGVzW2ldLnNob290TlcoKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmIChpICUgNSA9PT0gMCkge1xuICAgICAgICAgICBwcm9qZWN0aWxlc1tpXS5zaG9vdFNXKCk7XG4gICAgICAgICB9XG4gICAgICAgICBlbHNlIHtwcm9qZWN0aWxlc1tpXS5zaG9vdE5XKCk7fVxuXG4gICAgICAgICBwcm9qZWN0aWxlc1tpXS5kcmF3KCk7XG5cbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoTkFSVVRPU1tqXSAmJiBwcm9qZWN0aWxlc1tpXSAmJiBjb2xsaXNpb24ocHJvamVjdGlsZXNbaV0sIE5BUlVUT1Nbal0pKSB7XG4gICAgICAgICAgICAgTkFSVVRPU1tqXS5oZWFsdGggLT0gcHJvamVjdGlsZXNbaV0ucG93ZXJcbiAgICAgICAgICAgICBwcm9qZWN0aWxlcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgaS0tO1xuICAgICAgICAgICB9XG4gICAgICAgICB9XG5cbiAgICAgICAgIGlmIChwcm9qZWN0aWxlc1tpXSAmJiBwcm9qZWN0aWxlc1tpXS54ID4gY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUpIHtcbiAgICAgICAgICAgcHJvamVjdGlsZXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICBpLS07XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9XG5cbiAgICAgLy8gZ29rdXNcblxuICAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgICBpZiAoZ3JpZFBvc3RpdGlvblggPiBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDMpIHJldHVybjtcbiAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICBpZiAoR09LVVNbaV0ueCA9PT0gZ3JpZFBvc3RpdGlvblggJiYgR09LVVNbaV0ueSA9PT0gZ3JpZFBvc3RpdGlvblkpXG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICB9XG4gICAgICAgbGV0IGdva3VDb3N0ID0gMjUwO1xuICAgICAgIGlmIChNT05FWSA+PSBnb2t1Q29zdCkge1xuICAgICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgIH1cbiAgICAgfSk7XG5cbiAgICAgZnVuY3Rpb24gaGFuZGxlR29rdXMoKSB7XG4gICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgR09LVVNbaV0uZHJhdygpO1xuICAgICAgICAgR09LVVNbaV0uc2hvb3QoKTtcbiAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgTkFSVVRPUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICBpZiAoR09LVVNbaV0gJiYgY29sbGlzaW9uKEdPS1VTW2ldLCBOQVJVVE9TW2pdKSkge1xuICAgICAgICAgICAgIE1PTkVZIC09IC4wNVxuICAgICAgICAgICB9XG4gICAgICAgICAgLy8gIGlmIChHT0tVU1tpXS5oZWFsdGggPCAwKSB7XG4gICAgICAgICAgLy8gICAgR09LVVMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIC8vICAgIGktLTtcbiAgICAgICAgICAvLyAgfVxuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfVxuXG4gICAgIC8vIG5hcnV0b3NcblxuICAgICBmdW5jdGlvbiBoYW5kbGVOYXJ1dG9zKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IE5BUlVUT1MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIE5BUlVUT1NbaV0ubW92ZSgpO1xuICAgICAgICAgICAgTkFSVVRPU1tpXS5kcmF3KCk7XG4gICAgICAgICAgICBpZiAoTkFSVVRPU1tpXS54ID09PSBDRUxMU0laRSo2ICYmIE5BUlVUT1NbaV0ueSA9PT0gQ0VMTFNJWkUqOCkge1xuICAgICAgICAgICAgICBnYW1lT3ZlciA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChOQVJVVE9TW2ldLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgICAgICAgIE5BUlVUT1Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICBpLS07XG4gICAgICAgICAgICAgIE1PTkVZKz0xMDBcbiAgICAgICAgICAgICAga2lsbENvdW50Kz0xXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lICUgMjAwID09PSAwKSB7XG4gICAgICAgICAgICBOQVJVVE9TLnB1c2gobmV3IE5hcnV0bygpKVxuICAgICAgICB9XG4gICAgIH1cblxuICAgICAvLyByZXNvdXJjZXNcblxuICAgICAvLyB1dGlsaXRpZXNcblxuICAgICBmdW5jdGlvbiBoYW5kbGVHYW1lU3RhdHVzKCkge1xuICAgICAgIGlmIChNT05FWSA+IDQwMCkge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiZ3JlZW5cIjtcbiAgICAgICAgIGN0eC5mb250ID0gXCIxNXB4IEZhbnRhc3lcIjtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgICBjdHguZm9udCA9IFwiMTVweCBGYW50YXN5XCI7XG4gICAgICAgfVxuICAgICAgIGN0eC5maWxsVGV4dChcIk1vbmV5OiAkXCIgKyBNT05FWSwgODAyLCAzMCk7XG4gICAgICAgaWYgKGdhbWVPdmVyKSB7XG4gICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAgICAgIGN0eC5mb250ID0gJzYwcHggRmFudGFzeSc7XG4gICAgICAgICBjdHguZmlsbFRleHQoXCJHYW1lIE92ZXJcIiwgMjUwLCAyNDgpXG4gICAgICAgfVxuICAgICAgICBjdHguZmlsbFN0eWxlID0gXCJyZWRcIjtcbiAgICAgICAgY3R4LmZvbnQgPSBcIjE1cHggRmFudGFzeVwiO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJLaWxsIENvdW50OiBcIiArIGtpbGxDb3VudCwgODAyLCA2MCk7XG4gICAgIH1cblxuICAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICBjdHguZmlsbFN0eWxlID0gXCJsaWdodGdyYXlcIjtcbiAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDIsXG4gICAgICAgICAwLFxuICAgICAgICAgQ0VMTFNJWkUgKiAyLFxuICAgICAgICAgY2FudmFzLmhlaWdodFxuICAgICAgICk7XG5cbiAgICAgICBjcmVhdGVNYXAoY3R4KTtcbiAgICAgICBoYW5kbGVHYW1lR3JpZCgpO1xuICAgICAgIGhhbmRsZUdva3VzKCk7XG4gICAgICAgaGFuZGxlUHJvamVjdGlsZXMoKTtcbiAgICAgICBoYW5kbGVOYXJ1dG9zKCk7XG4gICAgICAgaGFuZGxlR2FtZVN0YXR1cyhjdHgpO1xuICAgICAgIGZyYW1lKys7ICAgICAgIFxuICAgICAgIGlmICghZ2FtZU92ZXIpIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICAgfVxuICAgICBhbmltYXRlKCk7XG59XG5cblxuLy8gZXhwb3J0IGRlZmF1bHQgR2FtZTsiLCJpbXBvcnQgUHJvamVjdGlsZSBmcm9tICcuL3Byb2plY3RpbGUnO1xuXG5jb25zdCBDRUxMU0laRSA9IDUwO1xuZXhwb3J0IGNvbnN0IHByb2plY3RpbGVzID0gW11cbmNvbnN0IEdBTUVHUklEID0gW107XG5jb25zdCBHT0tVUyA9IFtdO1xubGV0IE1PTkVZID0gMTAwMDtcbi8vIGNvbnN0IGltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb2t1Jyk7XG5cbmNvbnN0IG1vdXNlID0ge1xuICB4OiB1bmRlZmluZWQsXG4gIHk6IHVuZGVmaW5lZCxcbiAgd2lkdGg6IDAuMSxcbiAgaGVpZ2h0OiAwLjEsXG59O1xuXG5jbGFzcyBHb2t1IHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSA0OTtcbiAgICB0aGlzLmhlaWdodCA9IDQ5O1xuICAgIHRoaXMuc2hvb3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgdGhpcy50aW1lciA9IDA7XG4gICAgdGhpcy5pbWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdva3UyXCIpO1xuICAgIC8vIHRoaXMuaGVhbHRoID0gMTAwXG4gICAgIFxuICB9XG4gIGRyYXcoKSB7XG4gICAgdGhpcy5jdHguZHJhd0ltYWdlKHRoaXMuaW1nLCB0aGlzLngrOCwgdGhpcy55LHRoaXMud2lkdGgtMTAsIHRoaXMuaGVpZ2h0KVxuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJ5ZWxsb3dcIjtcbiAgICAvLyB0aGlzLmN0eC5maWxsUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQtMzUpO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiZ29sZFwiO1xuICAgIC8vIHRoaXMuY3R4LmZvbnQgPSBcIjEwcHggQXJpYWxcIjtcbiAgICAvLyAvLyAgICAgdGhpcy5jdHguZmlsbFRleHQoXG4gICAgLy8gLy8gICAgICAgTWF0aC5mbG9vcih0aGlzLmhlYWx0aCkgKyBcIkhQXCIsXG4gICAgLy8gLy8gICAgICAgdGhpcy54ICsgMTIsXG4gICAgLy8gLy8gICAgICAgdGhpcy55ICsgMTBcbiAgICAvLyAvLyAgICAgKTtcbiAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIkdva3VcIiwgdGhpcy54ICsgMTUsIHRoaXMueSArIDMwKTtcbiAgfVxuXG4gIHNob290KCkge1xuICAgIHRoaXMudGltZXIrKztcbiAgICBpZiAodGhpcy50aW1lciAlIDUwID09PSAwKSB7XG4gICAgICBwcm9qZWN0aWxlcy5wdXNoKG5ldyBQcm9qZWN0aWxlKHRoaXMueCArIDI1LCB0aGlzLnkgLSAxMCkpXG4gICAgfVxuICB9XG59XG5cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUdva3VzKCkge1xuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4vLyAgICAgR09LVVNbaV0uZHJhdygpO1xuLy8gICB9XG4vLyB9XG5cblxuZXhwb3J0IGRlZmF1bHQgR29rdVxuXG5cbiAvLyAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgLy8gICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbiAgICAgIC8vICAgIG1vdXNlLnkgPSBlLm9mZnNldFk7XG4gICAgICAvLyAgfSk7XG5cbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gICAgbW91c2UueSA9IHVuZGVmaW5lZDtcbiAgICAgIC8vICB9KTtcbiAgICAgIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgLy8gICAgY29uc3QgZ3JpZFBvc3RpdGlvblggPSBtb3VzZS54IC0gKG1vdXNlLnggJSBDRUxMU0laRSk7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWSA9IG1vdXNlLnkgLSAobW91c2UueSAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGlmIChncmlkUG9zdGl0aW9uWSA8IENFTExTSVpFKSByZXR1cm47XG4gICAgICAvLyAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdPS1VTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAvLyAgICAgIGlmIChHT0tVU1tpXS54ID09PSBncmlkUG9zdGl0aW9uWCAmJiBHT0tVU1tpXS55ID09PSBncmlkUG9zdGl0aW9uWSkgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gICAgbGV0IGdva3VDb3N0ID0gMTAwO1xuICAgICAgLy8gICAgaWYgKE1PTkVZID49IGdva3VDb3N0KSB7XG4gICAgICAvLyAgICAgIEdPS1VTLnB1c2gobmV3IEdva3UoZ3JpZFBvc3RpdGlvblgsIGdyaWRQb3N0aXRpb25ZKSk7XG4gICAgICAvLyAgICAgIE1PTkVZIC09IGdva3VDb3N0O1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0pOyIsImNvbnN0IENFTExTSVpFID0gNTA7XG5pbXBvcnQgeyBraWxsQ291bnQgfSBmcm9tICcuL2dhbWUnO1xuLy8gY29uc3QgcnVuUmlnaHQgPSBuZXcgSW1hZ2UoKTtcbi8vIHJ1blJpZ2h0LnNyYyA9ICcuLi9zcmMvaW1hZ2VzL3J1bl8xLnBuZyc7XG5cbmNsYXNzIE5hcnV0byB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gNDk7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNDk7XG4gICAgICAgIGlmIChraWxsQ291bnQgPCAxNSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgICAgICB0aGlzLmhlYWx0aCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDMwMCkgKyA1MDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDE1ICYmIGtpbGxDb3VudCA8IDMwKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOTAwKSArIDUwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChraWxsQ291bnQgPj0gMzAgJiYga2lsbENvdW50IDwgOTApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSAyO1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMjAwKSArIDUwO1xuICAgICAgICB9IFxuICAgICAgICBpZiAoa2lsbENvdW50ID49IDkwICYmIGtpbGxDb3VudCA8IDE1MCkge1xuICAgICAgICAgIHRoaXMuc3BlZWQgPSAzO1xuICAgICAgICAgIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNzAwMCkgKyA1MDtcbiAgICAgICAgfSBcbiAgICAgICAgaWYgKGtpbGxDb3VudCA+PSAxNTApIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWQgPSA2O1xuICAgICAgICAgICAgdGhpcy5oZWFsdGggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyMDAwMCkgKyA1MDtcbiAgICAgICAgfSBcbiAgICAgICAgdGhpcy5tb3ZlbWVudCA9IHRoaXMuc3BlZWQ7XG4gICAgICAgIC8vIHRoaXMuaGVhbHRoID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNDAwKSArIDUwO1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IHRoaXMuaGVhbHRoO1xuICAgICAgICB0aGlzLmltZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFydXRvMVwiKTtcblxuICAgICAgICAvLyB0aGlzLnJ1blJpZ2h0ID0gcnVuUmlnaHQ7XG4gICAgICAgIC8vIHRoaXMuZnJhbWVYID0gMDtcbiAgICAgICAgLy8gdGhpcy5mcmFtZVkgPSAwO1xuICAgICAgICAvLyB0aGlzLm1pbkZyYW1lID0gMDtcbiAgICAgICAgLy8gdGhpcy5tYXhGcmFtZSA9IDQ7XG4gICAgICAgIC8vIHRoaXMuc3ByaXRlV2lkdGggPSA5MDtcbiAgICAgICAgLy8gdGhpcy5zcHJpdGVIZWlnaHQgPSAxMTdcbiAgICAgICAgXG4gICAgfVxuXG4gICAgbW92ZSgpIHtcbiAgICAgICAgLy8gdGhpcy55ICs9IDE7XG4gICAgICAgIGlmICh0aGlzLnggPj0gMCAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5tb3ZlbWVudFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMueCA9PT0gQ0VMTFNJWkUqMTUgJiYgdGhpcy55ID49IDAgICYmIHRoaXMueSA8PSBDRUxMU0laRSoxMSkge1xuICAgICAgICAgICAgdGhpcy55ICs9IHRoaXMubW92ZW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnkgPT09IENFTExTSVpFKjExICYmIHRoaXMueCA8PSBDRUxMU0laRSoxNSAgJiYgdGhpcy54ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55IDw9IENFTExTSVpFKjExICYmIHRoaXMueSA+PSBDRUxMU0laRSozICAmJiB0aGlzLnggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMueSAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSozICYmIHRoaXMueCA+PSAwICAmJiB0aGlzLnggPD0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID49IENFTExTSVpFKjMgJiYgdGhpcy55IDw9IENFTExTSVpFKjggICYmIHRoaXMueCA9PT0gQ0VMTFNJWkUqMTIpIHtcbiAgICAgICAgICAgIHRoaXMueSArPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy55ID09PSBDRUxMU0laRSo4ICYmIHRoaXMueCA8PSBDRUxMU0laRSoxMiAgJiYgdGhpcy54ID49IENFTExTSVpFKjYpIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLm1vdmVtZW50XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiAodGhpcy5mcmFtZVggPCB0aGlzLm1heEZyYW1lKSB0aGlzLmZyYW1lWCsrO1xuICAgICAgICAvLyBlbHNlIHRoaXMuZnJhbWVYID0gdGhpcy5taW5GcmFtZTtcbiAgICBcbiAgICB9XG5cbiAgICBkcmF3KCkge1xuICAgICAgICB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5pbWcsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgLy8gdGhpcy5jdHguZmlsbFN0eWxlID0gXCJncmF5XCI7XG4gICAgICAgIC8vIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodC0zNSk7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgICAgICB0aGlzLmN0eC5mb250ID0gXCIxMHB4IEFyaWFsXCI7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxUZXh0KE1hdGguZmxvb3IodGhpcy5oZWFsdGgpK1wiSFBcIiwgdGhpcy54ICsgNSwgdGhpcy55ICsgNjApO1xuICAgICAgICAvLyB0aGlzLmN0eC5maWxsVGV4dChcIk5hcnV0b1wiLCB0aGlzLnggKyAxMiwgdGhpcy55ICsgMzApO1xuICAgICAgICAvLyB0aGlzLmN0eC5kcmF3SW1hZ2UodGhpcy5ydW5SaWdodCwgdGhpcy5mcmFtZVgqdGhpcy5zcHJpdGVXaWR0aCwgMCwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXJ1dG8iLCJpbXBvcnQge3Byb2plY3RpbGVzIH0gZnJvbSAnLi9nb2t1JztcblxuY2xhc3MgUHJvamVjdGlsZSB7XG4gICAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDE1O1xuICAgICAgICB0aGlzLmhlaWdodCA9IDE1O1xuICAgICAgICB0aGlzLnBvd2VyID0gMjU7XG4gICAgICAgIHRoaXMuc3BlZWQgPSA3O1xuICAgIH1cblxuICAgIHNob290TkUoKSB7XG4gICAgICAgIHRoaXMueSAtPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICB9XG4gICAgc2hvb3RTRSgpIHtcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIH1cbiAgICBzaG9vdE5XKCkge1xuICAgICAgICB0aGlzLnkgLT0gdGhpcy5zcGVlZDtcbiAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgfVxuICAgIHNob290U1coKSB7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xuICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgICB9XG5cblxuICAgIGRyYXcoKSB7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICdhcXVhJztcbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgMCAsIE1hdGguUEkqMik7XG4gICAgICAgIHRoaXMuY3R4LmZpbGwoKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2plY3RpbGUiLCIvLyBpbXBvcnQgeyBoYW5kbGVHYW1lR3JpZCB9IGZyb20gJy4vYm9hcmQnO1xuLy8gaW1wb3J0IHsgaGFuZGxlR29rdXMgfSBmcm9tICcuL2dva3UnO1xuXG5jb25zdCBDRUxMU0laRSA9IDUwO1xuXG5cbiAgZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU1hcChjdHgpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KDAsIENFTExTSVpFLCBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsIENFTExTSVpFKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoXG4gICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsXG4gICAgICBDRUxMU0laRSxcbiAgICAgIENFTExTSVpFLFxuICAgICAgY2FudmFzLmhlaWdodCAtIENFTExTSVpFICogMlxuICAgICk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBjYW52YXMuaGVpZ2h0IC0gQ0VMTFNJWkUgKiAyLFxuICAgICAgY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiA0LFxuICAgICAgQ0VMTFNJWkVcbiAgICApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSwgQ0VMTFNJWkUgKiA2KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoQ0VMTFNJWkUsIENFTExTSVpFICogNCwgQ0VMTFNJWkUgKiAxMSwgQ0VMTFNJWkUpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSAqIDExLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSAqIDQpO1xuICB9XG5cbmV4cG9ydCBmdW5jdGlvbiBjb2xsaXNpb24oZmlyc3QsIHNlY29uZCkge1xuICBpZiAoXG4gICAgIShcbiAgICAgIGZpcnN0LnggPiBzZWNvbmQueCArIHNlY29uZC53aWR0aCB8fFxuICAgICAgZmlyc3QueCArIGZpcnN0LndpZHRoIDwgc2Vjb25kLnggfHxcbiAgICAgIGZpcnN0LnkgPiBzZWNvbmQueSArIHNlY29uZC5oZWlnaHQgfHxcbiAgICAgIGZpcnN0LnkgKyBmaXJzdC5oZWlnaHQgPCBzZWNvbmQueVxuICAgIClcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7Z2FtZX0gZnJvbSAnLi9zY3JpcHRzL2dhbWUnO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICBjYW52YXMud2lkdGggPSA5MDA7XG4gIGNhbnZhcy5oZWlnaHQgPSA2MDA7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblxuICBnYW1lKGNhbnZhcywgY3R4KTtcblxufSlcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9