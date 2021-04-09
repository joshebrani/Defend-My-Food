/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/board.js":
/*!******************************!*\
  !*** ./src/scripts/board.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/***/ (function() {

// import { animate } from './utilities';
// class Game {
//     constructor(canvas, ctx) {
//         this.canvas = canvas;
//         this.ctx = ctx;
//     }
// }
// animate()
// export default Game;

/***/ }),

/***/ "./src/scripts/goku.js":
/*!*****************************!*\
  !*** ./src/scripts/goku.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CELLSIZE = 50;
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
    this.projectiles = []; // this.timer = 0;
    // this.health = 100
  }

  _createClass(Goku, [{
    key: "draw",
    value: function draw() {
      this.ctx.fillStyle = "blue";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
      this.ctx.fillStyle = "gold";
      this.ctx.font = "10px Arial"; // this.ctx.fillText(Math.floor(this.health), this.x + 15, this.height + 30);

      this.ctx.fillText("Goku", this.x + 15, this.y + 30);
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

/***/ "./src/scripts/image_loader.js":
/*!*************************************!*\
  !*** ./src/scripts/image_loader.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadImage": function() { return /* binding */ loadImage; }
/* harmony export */ });
function loadImage(img) {
  return new Promise(function (r) {
    var image = new Image();

    image.onload = function () {
      return r(image);
    };

    image.src = img;
  });
}

/***/ }),

/***/ "./src/scripts/utilities.js":
/*!**********************************!*\
  !*** ./src/scripts/utilities.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/game */ "./src/scripts/game.js");
/* harmony import */ var _scripts_game__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_scripts_game__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scripts_image_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scripts/image_loader */ "./src/scripts/image_loader.js");
/* harmony import */ var _scripts_board__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scripts/board */ "./src/scripts/board.js");
/* harmony import */ var _scripts_goku__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./scripts/goku */ "./src/scripts/goku.js");
/* harmony import */ var _scripts_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scripts/utilities */ "./src/scripts/utilities.js");
// import './styles/index.css';

 // import { loadImage } from "./scripts/image_loader";




document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  canvas.width = 900;
  canvas.height = 600;
  var ctx = canvas.getContext("2d"); // global variables

  var CELLSIZE = 50;
  var CELLGAP = 3;
  var GAMEGRID = [];
  var GOKUS = [];
  var MONEY = 1000; // mouse

  var mouse = {
    x: undefined,
    y: undefined,
    width: 0.1,
    height: 0.1
  };
  canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.offsetX;
    mouse.y = e.offsetY;
  });
  canvas.addEventListener('mouseleave', function () {
    mouse.x = undefined;
    mouse.y = undefined;
  }); // board

  function createGrid() {
    for (var y = 0; y < canvas.height; y += CELLSIZE) {
      for (var x = 0; x < canvas.width - CELLSIZE * 2; x += CELLSIZE) {
        GAMEGRID.push(new _scripts_board__WEBPACK_IMPORTED_MODULE_2__.default(x, y));
      }
    }
  }

  createGrid();

  function handleGameGrid() {
    for (var i = 0; i < GAMEGRID.length; i++) {
      GAMEGRID[i].draw();
    }
  } // projectiles
  // gokus


  canvas.addEventListener('click', function () {
    var gridPostitionX = mouse.x - mouse.x % CELLSIZE;
    var gridPostitionY = mouse.y - mouse.y % CELLSIZE;
    if (gridPostitionX > canvas.width - CELLSIZE * 3) return;

    for (var i = 0; i < GOKUS.length; i++) {
      if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY) return;
    }

    var gokuCost = 250;

    if (MONEY >= gokuCost) {
      GOKUS.push(new _scripts_goku__WEBPACK_IMPORTED_MODULE_3__.default(gridPostitionX, gridPostitionY));
      MONEY -= gokuCost;
    }
  });

  function handleGokus() {
    for (var i = 0; i < GOKUS.length; i++) {
      GOKUS[i].draw();
    }
  } // enemies
  // resources
  // utilities


  function handleGameStatus() {
    if (MONEY > 400) {
      ctx.fillStyle = 'green';
      ctx.font = '15px Arial';
    } else {
      ctx.fillStyle = "red";
      ctx.font = "15px Arial";
    }

    ctx.fillText('Money: $' + MONEY, 802, 30);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lightgray";
    ctx.fillRect(canvas.width - CELLSIZE * 2, 0, CELLSIZE * 2, canvas.height);
    (0,_scripts_utilities__WEBPACK_IMPORTED_MODULE_4__.createMap)(ctx);
    handleGameGrid();
    handleGokus();
    handleGameStatus(ctx);
    requestAnimationFrame(animate);
  }

  animate();
});
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2JvYXJkLmpzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL3NjcmlwdHMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dva3UuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9pbWFnZV9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJDRUxMU0laRSIsIm1vdXNlIiwieCIsInVuZGVmaW5lZCIsInkiLCJ3aWR0aCIsImhlaWdodCIsIkNlbGwiLCJjYW52YXMiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJjb2xsaXNpb24iLCJzdHJva2VTdHlsZSIsInN0cm9rZVJlY3QiLCJDRUxMR0FQIiwiR0FNRUdSSUQiLCJHT0tVUyIsIk1PTkVZIiwiR29rdSIsInNob290aW5nIiwicHJvamVjdGlsZXMiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImZvbnQiLCJmaWxsVGV4dCIsImxvYWRJbWFnZSIsImltZyIsIlByb21pc2UiLCJyIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInNyYyIsImNyZWF0ZU1hcCIsImZpcnN0Iiwic2Vjb25kIiwiY3JlYXRlR3JpZCIsInB1c2giLCJoYW5kbGVHYW1lR3JpZCIsImkiLCJsZW5ndGgiLCJkcmF3IiwiZ3JpZFBvc3RpdGlvblgiLCJncmlkUG9zdGl0aW9uWSIsImdva3VDb3N0IiwiaGFuZGxlR29rdXMiLCJoYW5kbGVHYW1lU3RhdHVzIiwiYW5pbWF0ZSIsImNsZWFyUmVjdCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBTUEsUUFBUSxHQUFHLEVBQWpCO0FBRUE7QUFFQSxJQUFNQyxLQUFLLEdBQUc7QUFDWkMsR0FBQyxFQUFFQyxTQURTO0FBRVpDLEdBQUMsRUFBRUQsU0FGUztBQUdaRSxPQUFLLEVBQUUsR0FISztBQUlaQyxRQUFNLEVBQUU7QUFKSSxDQUFkLEMsQ0FPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOztJQUdNQyxJO0FBQ0osZ0JBQVlMLENBQVosRUFBZUUsQ0FBZixFQUFrQjtBQUFBOztBQUNoQixTQUFLSSxNQUFMLEdBQWNDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixRQUF4QixDQUFkO0FBQ0EsU0FBS0MsR0FBTCxHQUFXLEtBQUtILE1BQUwsQ0FBWUksVUFBWixDQUF1QixJQUF2QixDQUFYO0FBQ0EsU0FBS1YsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0UsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsU0FBS0MsS0FBTCxHQUFhTCxRQUFiO0FBQ0EsU0FBS00sTUFBTCxHQUFjTixRQUFkO0FBQ0EsU0FBS1EsTUFBTCxDQUFZSyxnQkFBWixDQUE2QixXQUE3QixFQUEwQyxVQUFVQyxDQUFWLEVBQWE7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QUNGLE1BQXpDO0FBQ0FLLE9BQUcsQ0FBQ2dCLFNBQUosR0FBZ0IsV0FBaEI7QUFDQWhCLE9BQUcsQ0FBQ2lCLFFBQUosQ0FBYXBCLE1BQU0sQ0FBQ0gsS0FBUCxHQUFlTCxRQUFRLEdBQUcsQ0FBdkMsRUFBMEMsQ0FBMUMsRUFBNkNBLFFBQVEsR0FBRyxDQUF4RCxFQUEyRFEsTUFBTSxDQUFDRixNQUFsRTtBQUVBaUMsaUVBQVMsQ0FBQzVCLEdBQUQsQ0FBVDtBQUNBaUMsa0JBQWM7QUFDZE8sZUFBVztBQUNYQyxvQkFBZ0IsQ0FBQ3pDLEdBQUQsQ0FBaEI7QUFDQTRDLHlCQUFxQixDQUFDRixPQUFELENBQXJCO0FBQ0Q7O0FBQ0RBLFNBQU87QUFFVixDQWxIRCxFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBDRUxMU0laRSA9IDUwO1xuXG5pbXBvcnQgeyBjb2xsaXNpb24gfSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmNvbnN0IG1vdXNlID0ge1xuICB4OiB1bmRlZmluZWQsXG4gIHk6IHVuZGVmaW5lZCxcbiAgd2lkdGg6IDAuMSxcbiAgaGVpZ2h0OiAwLjEsXG59O1xuXG4vLyBsZXQgY2FudmFzUG9zaXRpb24gPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4vLyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBmdW5jdGlvbiAoZSkge1xuLy8gICAvLyBtb3VzZS54ID0gZS54IC0gY2FudmFzUG9zaXRpb24ubGVmdDtcbi8vICAgbW91c2UueCA9IGUub2Zmc2V0WDtcbi8vICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbi8vICAgLy8gbW91c2UueSA9IGUueSAtIGNhbnZhc1Bvc2l0aW9uLnRvcDtcbi8vIH0pO1xuXG4vLyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xuLy8gICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuLy8gICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuLy8gfSk7XG5cblxuY2xhc3MgQ2VsbCB7XG4gIGNvbnN0cnVjdG9yKHgsIHkpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYW52YXMnKVxuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLndpZHRoID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5oZWlnaHQgPSBDRUxMU0laRTtcbiAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgIH0pO1xuICB9XG4gIGRyYXcoKSB7XG4gICAgaWYgKG1vdXNlLnggJiYgbW91c2UueSAmJiBjb2xsaXNpb24odGhpcywgbW91c2UpKSB7XG4gICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XG4gICAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfVxuICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQ2VsbFxuIiwiLy8gaW1wb3J0IHsgYW5pbWF0ZSB9IGZyb20gJy4vdXRpbGl0aWVzJztcblxuLy8gY2xhc3MgR2FtZSB7XG4vLyAgICAgY29uc3RydWN0b3IoY2FudmFzLCBjdHgpIHtcbi8vICAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4vLyAgICAgICAgIHRoaXMuY3R4ID0gY3R4O1xuXG5cblxuLy8gICAgIH1cblxuXG4gICAgXG4vLyB9XG4vLyBhbmltYXRlKClcblxuXG4vLyBleHBvcnQgZGVmYXVsdCBHYW1lOyIsImNvbnN0IENFTExTSVpFID0gNTA7XG5jb25zdCBDRUxMR0FQID0gMztcbmNvbnN0IEdBTUVHUklEID0gW107XG5jb25zdCBHT0tVUyA9IFtdO1xubGV0IE1PTkVZID0gMTAwMDtcblxuY29uc3QgbW91c2UgPSB7XG4gIHg6IHVuZGVmaW5lZCxcbiAgeTogdW5kZWZpbmVkLFxuICB3aWR0aDogMC4xLFxuICBoZWlnaHQ6IDAuMSxcbn07XG5cbmNsYXNzIEdva3Uge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IENFTExTSVpFO1xuICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG4gICAgdGhpcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgIHRoaXMucHJvamVjdGlsZXMgPSBbXTtcbiAgICAvLyB0aGlzLnRpbWVyID0gMDtcbiAgICAvLyB0aGlzLmhlYWx0aCA9IDEwMFxuICAgICBcbiAgfVxuICBkcmF3KCkge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IFwiYmx1ZVwiO1xuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgdGhpcy5jdHguZmlsbFN0eWxlID0gXCJnb2xkXCI7XG4gICAgdGhpcy5jdHguZm9udCA9IFwiMTBweCBBcmlhbFwiO1xuICAgIC8vIHRoaXMuY3R4LmZpbGxUZXh0KE1hdGguZmxvb3IodGhpcy5oZWFsdGgpLCB0aGlzLnggKyAxNSwgdGhpcy5oZWlnaHQgKyAzMCk7XG4gICAgdGhpcy5jdHguZmlsbFRleHQoXCJHb2t1XCIsIHRoaXMueCArIDE1LCB0aGlzLnkgKyAzMCk7XG4gIH1cbn1cblxuXG4vLyBleHBvcnQgZnVuY3Rpb24gaGFuZGxlR29rdXMoKSB7XG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbi8vICAgICBHT0tVU1tpXS5kcmF3KCk7XG4vLyAgIH1cbi8vIH1cblxuXG5leHBvcnQgZGVmYXVsdCBHb2t1XG5cblxuIC8vICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAvLyAgICBtb3VzZS54ID0gZS5vZmZzZXRYO1xuICAgICAgLy8gICAgbW91c2UueSA9IGUub2Zmc2V0WTtcbiAgICAgIC8vICB9KTtcblxuICAgICAgLy8gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICAgIG1vdXNlLnggPSB1bmRlZmluZWQ7XG4gICAgICAvLyAgICBtb3VzZS55ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gIH0pO1xuICAgICAgLy8gIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgIC8vICAgIGNvbnN0IGdyaWRQb3N0aXRpb25ZID0gbW91c2UueSAtIChtb3VzZS55ICUgQ0VMTFNJWkUpO1xuICAgICAgLy8gICAgaWYgKGdyaWRQb3N0aXRpb25ZIDwgQ0VMTFNJWkUpIHJldHVybjtcbiAgICAgIC8vICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vICAgICAgaWYgKEdPS1VTW2ldLnggPT09IGdyaWRQb3N0aXRpb25YICYmIEdPS1VTW2ldLnkgPT09IGdyaWRQb3N0aXRpb25ZKSByZXR1cm47XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgICBsZXQgZ29rdUNvc3QgPSAxMDA7XG4gICAgICAvLyAgICBpZiAoTU9ORVkgPj0gZ29rdUNvc3QpIHtcbiAgICAgIC8vICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgIC8vICAgICAgTU9ORVkgLT0gZ29rdUNvc3Q7XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgfSk7IiwiZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShpbWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gcihpbWFnZSk7XG4gICAgaW1hZ2Uuc3JjID0gaW1nO1xuICB9KTtcbn1cbiIsIi8vIGltcG9ydCB7IGhhbmRsZUdhbWVHcmlkIH0gZnJvbSAnLi9ib2FyZCc7XG4vLyBpbXBvcnQgeyBoYW5kbGVHb2t1cyB9IGZyb20gJy4vZ29rdSc7XG5cbmNvbnN0IENFTExTSVpFID0gNTA7XG5cblxuICBleHBvcnQgZnVuY3Rpb24gY3JlYXRlTWFwKGN0eCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwgQ0VMTFNJWkUsIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCwgQ0VMTFNJWkUpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChcbiAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCxcbiAgICAgIENFTExTSVpFLFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBjYW52YXMuaGVpZ2h0IC0gQ0VMTFNJWkUgKiAyXG4gICAgKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoXG4gICAgICBDRUxMU0laRSxcbiAgICAgIGNhbnZhcy5oZWlnaHQgLSBDRUxMU0laRSAqIDIsXG4gICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsXG4gICAgICBDRUxMU0laRVxuICAgICk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSAqIDYpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSAqIDExLCBDRUxMU0laRSk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFICogMTEsIENFTExTSVpFICogNCwgQ0VMTFNJWkUsIENFTExTSVpFICogNCk7XG4gIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpc2lvbihmaXJzdCwgc2Vjb25kKSB7XG4gIGlmIChcbiAgICAhKFxuICAgICAgZmlyc3QueCA+IHNlY29uZC54ICsgc2Vjb25kLndpZHRoIHx8XG4gICAgICBmaXJzdC54ICsgZmlyc3Qud2lkdGggPCBzZWNvbmQueCB8fFxuICAgICAgZmlyc3QueSA+IHNlY29uZC55ICsgc2Vjb25kLmhlaWdodCB8fFxuICAgICAgZmlyc3QueSArIGZpcnN0LmhlaWdodCA8IHNlY29uZC55XG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG5cdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCAnLi9zdHlsZXMvaW5kZXguY3NzJztcblxuaW1wb3J0IEdhbWUgZnJvbSBcIi4vc2NyaXB0cy9nYW1lXCI7XG5pbXBvcnQgeyBsb2FkSW1hZ2UgfSBmcm9tIFwiLi9zY3JpcHRzL2ltYWdlX2xvYWRlclwiO1xuLy8gaW1wb3J0IHsgbG9hZEltYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9pbWFnZV9sb2FkZXJcIjtcbmltcG9ydCBDZWxsIGZyb20gJy4vc2NyaXB0cy9ib2FyZCc7XG5pbXBvcnQgR29rdSBmcm9tICcuL3NjcmlwdHMvZ29rdSc7XG5pbXBvcnQgeyBjcmVhdGVNYXAgfSBmcm9tICcuL3NjcmlwdHMvdXRpbGl0aWVzJztcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhc1wiKTtcbiAgY2FudmFzLndpZHRoID0gOTAwO1xuICBjYW52YXMuaGVpZ2h0ID0gNjAwO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cblxuICAvLyBnbG9iYWwgdmFyaWFibGVzXG4gIGNvbnN0IENFTExTSVpFID0gNTA7XG4gIGNvbnN0IENFTExHQVAgPSAzO1xuICBjb25zdCBHQU1FR1JJRCA9IFtdO1xuICBjb25zdCBHT0tVUyA9IFtdO1xuICBsZXQgTU9ORVkgPSAxMDAwO1xuXG5cbiAgLy8gbW91c2VcbmNvbnN0IG1vdXNlID0ge1xuICB4OiB1bmRlZmluZWQsXG4gIHk6IHVuZGVmaW5lZCxcbiAgd2lkdGg6IDAuMSxcbiAgaGVpZ2h0OiAwLjEsXG59XG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKSB7XG4gIG1vdXNlLnggPSBlLm9mZnNldFhcbiAgbW91c2UueSA9IGUub2Zmc2V0WVxufSk7XG5cbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oKXtcbiAgbW91c2UueCA9IHVuZGVmaW5lZDtcbiAgbW91c2UueSA9IHVuZGVmaW5lZFxufSlcbiAgLy8gYm9hcmRcblxuXG4gIGZ1bmN0aW9uIGNyZWF0ZUdyaWQoKSB7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBjYW52YXMuaGVpZ2h0OyB5ICs9IENFTExTSVpFKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGNhbnZhcy53aWR0aC1DRUxMU0laRSoyOyB4ICs9IENFTExTSVpFKSB7XG4gICAgICAgIEdBTUVHUklELnB1c2gobmV3IENlbGwoeCwgeSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNyZWF0ZUdyaWQoKTtcblxuXG4gIGZ1bmN0aW9uIGhhbmRsZUdhbWVHcmlkKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR0FNRUdSSUQubGVuZ3RoOyBpKyspIHtcbiAgICAgIEdBTUVHUklEW2ldLmRyYXcoKTtcbiAgICB9XG4gIH1cblxuXG4gICBcbiAgICAvLyBwcm9qZWN0aWxlc1xuXG5cbiAgICAvLyBnb2t1c1xuXG5cbiAgICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25YID0gbW91c2UueCAtIChtb3VzZS54ICUgQ0VMTFNJWkUpO1xuICAgICAgY29uc3QgZ3JpZFBvc3RpdGlvblkgPSBtb3VzZS55IC0gKG1vdXNlLnkgJSBDRUxMU0laRSk7XG4gICAgICBpZiAoZ3JpZFBvc3RpdGlvblggPiBjYW52YXMud2lkdGgtQ0VMTFNJWkUqMykgcmV0dXJuO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoR09LVVNbaV0ueCA9PT0gZ3JpZFBvc3RpdGlvblggJiYgR09LVVNbaV0ueSA9PT0gZ3JpZFBvc3RpdGlvblkpXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGxldCBnb2t1Q29zdCA9IDI1MDtcbiAgICAgIGlmIChNT05FWSA+PSBnb2t1Q29zdCkge1xuICAgICAgICBHT0tVUy5wdXNoKG5ldyBHb2t1KGdyaWRQb3N0aXRpb25YLCBncmlkUG9zdGl0aW9uWSkpO1xuICAgICAgICBNT05FWSAtPSBnb2t1Q29zdDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUdva3VzKCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBHT0tVUy5sZW5ndGg7IGkrKykge1xuICAgICAgICBHT0tVU1tpXS5kcmF3KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gZW5lbWllc1xuXG5cbiAgICAvLyByZXNvdXJjZXNcblxuXG4gICAgLy8gdXRpbGl0aWVzXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVHYW1lU3RhdHVzKCkge1xuICAgICAgaWYgKE1PTkVZID4gNDAwKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnZ3JlZW4nXG4gICAgICAgIGN0eC5mb250ID0gJzE1cHggQXJpYWwnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmVkXCI7XG4gICAgICAgIGN0eC5mb250ID0gXCIxNXB4IEFyaWFsXCI7XG4gICAgICB9XG4gICAgICBjdHguZmlsbFRleHQoJ01vbmV5OiAkJyArIE1PTkVZLCA4MDIsIDMwIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XG4gICAgICBjdHguZmlsbFJlY3QoY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAyLCAwLCBDRUxMU0laRSAqIDIsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjcmVhdGVNYXAoY3R4KTtcbiAgICAgIGhhbmRsZUdhbWVHcmlkKCk7XG4gICAgICBoYW5kbGVHb2t1cygpO1xuICAgICAgaGFuZGxlR2FtZVN0YXR1cyhjdHgpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH1cbiAgICBhbmltYXRlKClcbiAgICBcbn0pXG5cblxuIl0sInNvdXJjZVJvb3QiOiIifQ==