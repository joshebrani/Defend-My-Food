/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function() {

// import { animate } from './utilities';
// class Game {
// }
// animate()
// export default Game;

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
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import './styles/index.css';

 // import { loadImage } from "./scripts/image_loader";

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = 900;
  canvas.height = 600; // global variables

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
  }; // let canvasPosition = canvas.getBoundingClientRect();

  canvas.addEventListener('mousemove', function (e) {
    // mouse.x = e.x - canvasPosition.left;
    mouse.x = e.offsetX;
    mouse.y = e.offsetY; // mouse.y = e.y - canvasPosition.top;
  });
  canvas.addEventListener('mouseleave', function () {
    mouse.x = undefined;
    mouse.y = undefined;
  }); // board

  var controlsBar = {
    width: canvas.width,
    height: CELLSIZE
  };

  var Cell = /*#__PURE__*/function () {
    function Cell(x, y) {
      _classCallCheck(this, Cell);

      this.x = x;
      this.y = y;
      this.width = CELLSIZE;
      this.height = CELLSIZE;
    }

    _createClass(Cell, [{
      key: "draw",
      value: function draw() {
        if (mouse.x && mouse.y && collision(this, mouse)) {
          ctx.strokeStyle = 'red';
          ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
      }
    }]);

    return Cell;
  }();

  function createGrid() {
    for (var y = 0; y < canvas.height; y += CELLSIZE) {
      for (var x = 0; x < canvas.width - CELLSIZE * 2; x += CELLSIZE) {
        GAMEGRID.push(new Cell(x, y));
      }
    }
  }

  createGrid();

  function handleGameGrid() {
    for (var i = 0; i < GAMEGRID.length; i++) {
      GAMEGRID[i].draw();
    }
  }

  function createMap() {
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
  } // ctx.fillStyle = 'white'
  // ctx.fillRect(0, 0, 700, 500);
  // ctx.fillStyle = '#7cfc00'
  // ctx.fillRect(0, 20, 270, 20);
  // ctx.fillStyle = '#7cfc00'
  // ctx.fillRect(240, 20, 30, 110);
  // ctx.fillStyle = '#7cfc00'
  // ctx.fillRect(30, 110, 240, 20);
  // ctx.fillStyle = "#7cfc00";
  // ctx.fillRect(30, 60, 30, 60);
  // ctx.fillStyle = "#7cfc00";
  // ctx.fillRect(30, 60, 180, 20);
  // projectiles
  // gokus


  var Goku = /*#__PURE__*/function () {
    function Goku(x, y) {
      _classCallCheck(this, Goku);

      this.x = x;
      this.y = y;
      this.width = CELLSIZE;
      this.height = CELLSIZE;
      this.shooting = false;
      this.projectiles = [];
      this.timer = 0; // this.health = 100
    }

    _createClass(Goku, [{
      key: "draw",
      value: function draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'gold';
        ctx.font = '10px Arial'; // ctx.fillText(Math.floor(this.health), this.x + 15, this.height + 30);

        ctx.fillText("Goku", this.x + 15, this.y + 30);
      }
    }]);

    return Goku;
  }();

  canvas.addEventListener('click', function () {
    var gridPostitionX = mouse.x - mouse.x % CELLSIZE;
    var gridPostitionY = mouse.y - mouse.y % CELLSIZE;
    if (gridPostitionX > canvas.width - CELLSIZE * 3) return;

    for (var i = 0; i < GOKUS.length; i++) {
      if (GOKUS[i].x === gridPostitionX && GOKUS[i].y === gridPostitionY) return;
    }

    var gokuCost = 100;

    if (MONEY >= gokuCost) {
      GOKUS.push(new Goku(gridPostitionX, gridPostitionY));
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

    ctx.fillText('Money: ' + MONEY, 810, 30);
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "lightgray";
    ctx.fillRect(canvas.width - CELLSIZE * 2, 0, CELLSIZE * 2, canvas.height);
    createMap();
    handleGameGrid();
    handleGokus();
    handleGameStatus();
    requestAnimationFrame(animate);
  }

  animate();

  function collision(first, second) {
    if (!(first.x > second.x + second.width || first.x + first.width < second.x || first.y > second.y + second.height || first.y + first.height < second.y)) {
      return true;
    }

    ;
  }

  ; // ctx.drawImage(document.getElementById('picture'),0,0);
  // function insertImage() {
  //   image = new Image();
  //   image.src = "images/ramen1.jpg"; //any img src
  //   image.onload = function () {
  //     content.drawImage(image, 300, 300);
  //   };
  // }
  // insertImage();
  // const game = new Game(canvas, ctx);
  // loadImage('./images/ramen1.jpg')
}); // document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementById("canvas");
//   canvasEl.width = 700;
//   canvasEl.height = 500;
//   const ctx = canvasEl.getContext("2d");
//   ctx.fixllRect(0, 0, 700, 500);
//   // let mo = new MovingObject({ pos: [100, 100], vel: [1, 2], radius: 50, color: "blue" })
//   // mo.draw(ctx);
//   // window.mo = mo;
// //   let g = new GameView(ctx);
// //   g.start();
// //   window.g = g;
// });
}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2dhbWUuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2QvLi9zcmMvc2NyaXB0cy9pbWFnZV9sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJsb2FkSW1hZ2UiLCJpbWciLCJQcm9taXNlIiwiciIsImltYWdlIiwiSW1hZ2UiLCJvbmxvYWQiLCJzcmMiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjYW52YXMiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJ3aWR0aCIsImhlaWdodCIsIkNFTExTSVpFIiwiQ0VMTEdBUCIsIkdBTUVHUklEIiwiR09LVVMiLCJNT05FWSIsIm1vdXNlIiwieCIsInVuZGVmaW5lZCIsInkiLCJlIiwib2Zmc2V0WCIsIm9mZnNldFkiLCJjb250cm9sc0JhciIsIkNlbGwiLCJjb2xsaXNpb24iLCJzdHJva2VTdHlsZSIsInN0cm9rZVJlY3QiLCJjcmVhdGVHcmlkIiwicHVzaCIsImhhbmRsZUdhbWVHcmlkIiwiaSIsImxlbmd0aCIsImRyYXciLCJjcmVhdGVNYXAiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsIkdva3UiLCJzaG9vdGluZyIsInByb2plY3RpbGVzIiwidGltZXIiLCJmb250IiwiZmlsbFRleHQiLCJncmlkUG9zdGl0aW9uWCIsImdyaWRQb3N0aXRpb25ZIiwiZ29rdUNvc3QiLCJoYW5kbGVHb2t1cyIsImhhbmRsZUdhbWVTdGF0dXMiLCJhbmltYXRlIiwiY2xlYXJSZWN0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZmlyc3QiLCJzZWNvbmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBRUE7QUFFQTtBQUNBO0FBR0EsdUI7Ozs7Ozs7Ozs7Ozs7OztBQ1JPLFNBQVNBLFNBQVQsQ0FBbUJDLEdBQW5CLEVBQXdCO0FBQzdCLFNBQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLENBQUQsRUFBTztBQUN4QixRQUFJQyxLQUFLLEdBQUcsSUFBSUMsS0FBSixFQUFaOztBQUNBRCxTQUFLLENBQUNFLE1BQU4sR0FBZTtBQUFBLGFBQU1ILENBQUMsQ0FBQ0MsS0FBRCxDQUFQO0FBQUEsS0FBZjs7QUFDQUEsU0FBSyxDQUFDRyxHQUFOLEdBQVlOLEdBQVo7QUFDRCxHQUpNLENBQVA7QUFLRCxDOzs7Ozs7VUNORDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSxjQUFjLDBCQUEwQixFQUFFO1dBQzFDLGNBQWMsZUFBZTtXQUM3QixnQ0FBZ0MsWUFBWTtXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLDZDQUE2Qyx3REFBd0QsRTs7Ozs7V0NBckc7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBRUE7Q0FFQTs7QUFF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OztBQUFBO0FBQ0Y7O0FBQUEsR0F6TitDLENBOE5wRDtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBRUgsQ0E3T0QsRSxDQWdQQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBhbmltYXRlIH0gZnJvbSAnLi91dGlsaXRpZXMnO1xuXG4vLyBjbGFzcyBHYW1lIHtcbiAgICBcbi8vIH1cbi8vIGFuaW1hdGUoKVxuXG5cbi8vIGV4cG9ydCBkZWZhdWx0IEdhbWU7IiwiZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShpbWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyKSA9PiB7XG4gICAgbGV0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uub25sb2FkID0gKCkgPT4gcihpbWFnZSk7XG4gICAgaW1hZ2Uuc3JjID0gaW1nO1xuICB9KTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuXHRcdGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmosIHByb3ApIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApOyB9IiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBpbXBvcnQgJy4vc3R5bGVzL2luZGV4LmNzcyc7XG5cbmltcG9ydCBHYW1lIGZyb20gXCIuL3NjcmlwdHMvZ2FtZVwiO1xuaW1wb3J0IHsgbG9hZEltYWdlIH0gZnJvbSBcIi4vc2NyaXB0cy9pbWFnZV9sb2FkZXJcIjtcbi8vIGltcG9ydCB7IGxvYWRJbWFnZSB9IGZyb20gXCIuL3NjcmlwdHMvaW1hZ2VfbG9hZGVyXCI7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gIGNhbnZhcy53aWR0aCA9IDkwMDtcbiAgY2FudmFzLmhlaWdodCA9IDYwMDtcblxuXG5cbiAgLy8gZ2xvYmFsIHZhcmlhYmxlc1xuICBjb25zdCBDRUxMU0laRSA9IDUwO1xuICBjb25zdCBDRUxMR0FQID0gMztcbiAgY29uc3QgR0FNRUdSSUQgPSBbXTtcbiAgY29uc3QgR09LVVMgPSBbXTtcbiAgbGV0IE1PTkVZID0gMTAwMDtcblxuXG4gIC8vIG1vdXNlXG5jb25zdCBtb3VzZSA9IHtcbiAgeDogdW5kZWZpbmVkLFxuICB5OiB1bmRlZmluZWQsXG4gIHdpZHRoOiAwLjEsXG4gIGhlaWdodDogMC4xLFxufVxuXG4vLyBsZXQgY2FudmFzUG9zaXRpb24gPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSkge1xuICAvLyBtb3VzZS54ID0gZS54IC0gY2FudmFzUG9zaXRpb24ubGVmdDtcbiAgbW91c2UueCA9IGUub2Zmc2V0WFxuICBtb3VzZS55ID0gZS5vZmZzZXRZXG4gIC8vIG1vdXNlLnkgPSBlLnkgLSBjYW52YXNQb3NpdGlvbi50b3A7XG59KTtcblxuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBmdW5jdGlvbigpe1xuICBtb3VzZS54ID0gdW5kZWZpbmVkO1xuICBtb3VzZS55ID0gdW5kZWZpbmVkXG59KVxuICAvLyBib2FyZFxuICBjb25zdCBjb250cm9sc0JhciA9IHtcbiAgICB3aWR0aDogY2FudmFzLndpZHRoLFxuICAgIGhlaWdodDogQ0VMTFNJWkUsXG4gIH1cblxuICBjbGFzcyBDZWxsIHtcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICB0aGlzLnggPSB4O1xuICAgICAgdGhpcy55ID0geTtcbiAgICAgIHRoaXMud2lkdGggPSBDRUxMU0laRTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gQ0VMTFNJWkU7XG5cbiAgICB9XG4gICAgZHJhdygpIHtcbiAgICAgIGlmIChtb3VzZS54ICYmIG1vdXNlLnkgJiYgY29sbGlzaW9uKHRoaXMsIG1vdXNlKSkge1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmVkJztcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVHcmlkKCkge1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgY2FudmFzLmhlaWdodDsgeSArPSBDRUxMU0laRSkge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBjYW52YXMud2lkdGgtQ0VMTFNJWkUqMjsgeCArPSBDRUxMU0laRSkge1xuICAgICAgICBHQU1FR1JJRC5wdXNoKG5ldyBDZWxsKHgsIHkpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVHcmlkKCk7XG5cblxuICBmdW5jdGlvbiBoYW5kbGVHYW1lR3JpZCgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IEdBTUVHUklELmxlbmd0aDsgaSsrKSB7XG4gICAgICBHQU1FR1JJRFtpXS5kcmF3KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTWFwKCkge1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwgQ0VMTFNJWkUsIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCwgQ0VMTFNJWkUpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChcbiAgICAgIGNhbnZhcy53aWR0aCAtIENFTExTSVpFICogNCxcbiAgICAgIENFTExTSVpFLFxuICAgICAgQ0VMTFNJWkUsXG4gICAgICBjYW52YXMuaGVpZ2h0IC0gQ0VMTFNJWkUgKiAyXG4gICAgKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoXG4gICAgICBDRUxMU0laRSxcbiAgICAgIGNhbnZhcy5oZWlnaHQgLSBDRUxMU0laRSAqIDIsXG4gICAgICBjYW52YXMud2lkdGggLSBDRUxMU0laRSAqIDQsXG4gICAgICBDRUxMU0laRVxuICAgICk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSAqIDYpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIGN0eC5maWxsUmVjdChDRUxMU0laRSwgQ0VMTFNJWkUgKiA0LCBDRUxMU0laRSAqIDExLCBDRUxMU0laRSk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KENFTExTSVpFKjExLCBDRUxMU0laRSAqIDQsIENFTExTSVpFLCBDRUxMU0laRSo0KTtcblxuICB9XG5cblxuXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9ICd3aGl0ZSdcbiAgICAvLyBjdHguZmlsbFJlY3QoMCwgMCwgNzAwLCA1MDApO1xuXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9ICcjN2NmYzAwJ1xuICAgIC8vIGN0eC5maWxsUmVjdCgwLCAyMCwgMjcwLCAyMCk7XG5cbiAgICAvLyBjdHguZmlsbFN0eWxlID0gJyM3Y2ZjMDAnXG4gICAgLy8gY3R4LmZpbGxSZWN0KDI0MCwgMjAsIDMwLCAxMTApO1xuXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9ICcjN2NmYzAwJ1xuICAgIC8vIGN0eC5maWxsUmVjdCgzMCwgMTEwLCAyNDAsIDIwKTtcblxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICAvLyBjdHguZmlsbFJlY3QoMzAsIDYwLCAzMCwgNjApO1xuXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9IFwiIzdjZmMwMFwiO1xuICAgIC8vIGN0eC5maWxsUmVjdCgzMCwgNjAsIDE4MCwgMjApO1xuXG5cbiAgICAvLyBwcm9qZWN0aWxlc1xuXG5cbiAgICAvLyBnb2t1c1xuXG4gICAgY2xhc3MgR29rdSB7XG4gICAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIHRoaXMud2lkdGggPSBDRUxMU0laRTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBDRUxMU0laRTtcbiAgICAgICAgdGhpcy5zaG9vdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByb2plY3RpbGVzID0gW107XG4gICAgICAgIHRoaXMudGltZXIgPSAwO1xuICAgICAgICAvLyB0aGlzLmhlYWx0aCA9IDEwMFxuXG4gICAgICB9XG4gICAgICBkcmF3KCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2JsdWUnO1xuICAgICAgICBjdHguZmlsbFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdnb2xkJztcbiAgICAgICAgY3R4LmZvbnQgPSAnMTBweCBBcmlhbCc7XG4gICAgICAgIC8vIGN0eC5maWxsVGV4dChNYXRoLmZsb29yKHRoaXMuaGVhbHRoKSwgdGhpcy54ICsgMTUsIHRoaXMuaGVpZ2h0ICsgMzApO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJHb2t1XCIsIHRoaXMueCArIDE1LCB0aGlzLnkgKyAzMCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBncmlkUG9zdGl0aW9uWCA9IG1vdXNlLnggLSAobW91c2UueCAlIENFTExTSVpFKTtcbiAgICAgIGNvbnN0IGdyaWRQb3N0aXRpb25ZID0gbW91c2UueSAtIChtb3VzZS55ICUgQ0VMTFNJWkUpO1xuICAgICAgaWYgKGdyaWRQb3N0aXRpb25YID4gY2FudmFzLndpZHRoLUNFTExTSVpFKjMpIHJldHVybjtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKEdPS1VTW2ldLnggPT09IGdyaWRQb3N0aXRpb25YICYmIEdPS1VTW2ldLnkgPT09IGdyaWRQb3N0aXRpb25ZKVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBsZXQgZ29rdUNvc3QgPSAxMDA7XG4gICAgICBpZiAoTU9ORVkgPj0gZ29rdUNvc3QpIHtcbiAgICAgICAgR09LVVMucHVzaChuZXcgR29rdShncmlkUG9zdGl0aW9uWCwgZ3JpZFBvc3RpdGlvblkpKTtcbiAgICAgICAgTU9ORVkgLT0gZ29rdUNvc3Q7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVHb2t1cygpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgR09LVVMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgR09LVVNbaV0uZHJhdygpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGVuZW1pZXNcblxuXG4gICAgLy8gcmVzb3VyY2VzXG5cblxuICAgIC8vIHV0aWxpdGllc1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlR2FtZVN0YXR1cygpIHtcbiAgICAgIGlmIChNT05FWSA+IDQwMCkge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ2dyZWVuJ1xuICAgICAgICBjdHguZm9udCA9ICcxNXB4IEFyaWFsJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBcInJlZFwiO1xuICAgICAgICBjdHguZm9udCA9IFwiMTVweCBBcmlhbFwiO1xuICAgICAgfVxuICAgICAgY3R4LmZpbGxUZXh0KCdNb25leTogJyArIE1PTkVZLCA4MTAsIDMwIClcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhbmltYXRlKCkge1xuICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IFwibGlnaHRncmF5XCI7XG4gICAgICBjdHguZmlsbFJlY3QoY2FudmFzLndpZHRoIC0gQ0VMTFNJWkUgKiAyLCAwLCBDRUxMU0laRSAqIDIsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgICBjcmVhdGVNYXAoKTtcbiAgICAgIGhhbmRsZUdhbWVHcmlkKCk7XG4gICAgICBoYW5kbGVHb2t1cygpO1xuICAgICAgaGFuZGxlR2FtZVN0YXR1cygpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICAgIH1cbiAgICBhbmltYXRlKClcblxuXG4gICAgZnVuY3Rpb24gY29sbGlzaW9uKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgIGlmICggIShmaXJzdC54ID4gc2Vjb25kLnggKyBzZWNvbmQud2lkdGggfHxcbiAgICAgICAgICAgIGZpcnN0LnggKyBmaXJzdC53aWR0aCA8IHNlY29uZC54IHx8XG4gICAgICAgICAgICBmaXJzdC55ID4gc2Vjb25kLnkgKyBzZWNvbmQuaGVpZ2h0IHx8XG4gICAgICAgICAgICBmaXJzdC55ICsgZmlyc3QuaGVpZ2h0IDwgc2Vjb25kLnkpXG5cbiAgICAgICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfTtcblxuXG5cblxuLy8gY3R4LmRyYXdJbWFnZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGljdHVyZScpLDAsMCk7XG4gICAgLy8gZnVuY3Rpb24gaW5zZXJ0SW1hZ2UoKSB7XG4gICAgLy8gICBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIC8vICAgaW1hZ2Uuc3JjID0gXCJpbWFnZXMvcmFtZW4xLmpwZ1wiOyAvL2FueSBpbWcgc3JjXG4gICAgLy8gICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIGNvbnRlbnQuZHJhd0ltYWdlKGltYWdlLCAzMDAsIDMwMCk7XG4gICAgLy8gICB9O1xuICAgIC8vIH1cblxuICAgIC8vIGluc2VydEltYWdlKCk7XG4gICBcblxuICAgIC8vIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjYW52YXMsIGN0eCk7XG4gICAgLy8gbG9hZEltYWdlKCcuL2ltYWdlcy9yYW1lbjEuanBnJylcbiAgICBcbn0pXG5cblxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuLy8gICBjb25zdCBjYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuXG4vLyAgIGNhbnZhc0VsLndpZHRoID0gNzAwO1xuLy8gICBjYW52YXNFbC5oZWlnaHQgPSA1MDA7XG4vLyAgIGNvbnN0IGN0eCA9IGNhbnZhc0VsLmdldENvbnRleHQoXCIyZFwiKTtcblxuLy8gICBjdHguZml4bGxSZWN0KDAsIDAsIDcwMCwgNTAwKTtcblxuLy8gICAvLyBsZXQgbW8gPSBuZXcgTW92aW5nT2JqZWN0KHsgcG9zOiBbMTAwLCAxMDBdLCB2ZWw6IFsxLCAyXSwgcmFkaXVzOiA1MCwgY29sb3I6IFwiYmx1ZVwiIH0pXG4vLyAgIC8vIG1vLmRyYXcoY3R4KTtcbi8vICAgLy8gd2luZG93Lm1vID0gbW87XG5cbi8vIC8vICAgbGV0IGcgPSBuZXcgR2FtZVZpZXcoY3R4KTtcbi8vIC8vICAgZy5zdGFydCgpO1xuLy8gLy8gICB3aW5kb3cuZyA9IGc7XG4vLyB9KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=