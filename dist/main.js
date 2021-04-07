/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/game.js":
/*!*****************************!*\
  !*** ./src/scripts/game.js ***!
  \*****************************/
/***/ (function() {



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
// import './styles/index.css';

 // import { loadImage } from "./scripts/image_loader";

document.addEventListener("DOMContentLoaded", function () {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 700, 500);
  ctx.fillStyle = '#7cfc00';
  ctx.fillRect(0, 20, 270, 20);
  ctx.fillStyle = '#7cfc00';
  ctx.fillRect(240, 20, 30, 110);
  ctx.fillStyle = '#7cfc00';
  ctx.fillRect(30, 110, 240, 20);
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(30, 60, 30, 60);
  ctx.fillStyle = "#7cfc00";
  ctx.fillRect(30, 60, 180, 20);
  ctx.drawImage(document.getElementById('picture'), 0, 0); // function insertImage() {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC8uL3NyYy9zY3JpcHRzL2ltYWdlX2xvYWRlci5qcyIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vRGVmZW5kLU15LUZvb2Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9EZWZlbmQtTXktRm9vZC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0RlZmVuZC1NeS1Gb29kLy4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbImxvYWRJbWFnZSIsImltZyIsIlByb21pc2UiLCJyIiwiaW1hZ2UiLCJJbWFnZSIsIm9ubG9hZCIsInNyYyIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImNhbnZhcyIsImdldEVsZW1lbnRCeUlkIiwiY3R4IiwiZ2V0Q29udGV4dCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZHJhd0ltYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBTyxTQUFTQSxTQUFULENBQW1CQyxHQUFuQixFQUF3QjtBQUM3QixTQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxDQUFELEVBQU87QUFDeEIsUUFBSUMsS0FBSyxHQUFHLElBQUlDLEtBQUosRUFBWjs7QUFDQUQsU0FBSyxDQUFDRSxNQUFOLEdBQWU7QUFBQSxhQUFNSCxDQUFDLENBQUNDLEtBQUQsQ0FBUDtBQUFBLEtBQWY7O0FBQ0FBLFNBQUssQ0FBQ0csR0FBTixHQUFZTixHQUFaO0FBQ0QsR0FKTSxDQUFQO0FBS0QsQzs7Ozs7O1VDTkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0EsY0FBYywwQkFBMEIsRUFBRTtXQUMxQyxjQUFjLGVBQWU7V0FDN0IsZ0NBQWdDLFlBQVk7V0FDNUM7V0FDQSxFOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSw2Q0FBNkMsd0RBQXdELEU7Ozs7O1dDQXJHO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUVBO0NBRUE7O0FBRUFPLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsTUFBTUMsTUFBTSxHQUFHRixRQUFRLENBQUNHLGNBQVQsQ0FBd0IsUUFBeEIsQ0FBZjtBQUNBLE1BQU1DLEdBQUcsR0FBR0YsTUFBTSxDQUFDRyxVQUFQLENBQWtCLElBQWxCLENBQVo7QUFDRUQsS0FBRyxDQUFDRSxTQUFKLEdBQWdCLE9BQWhCO0FBQ0FGLEtBQUcsQ0FBQ0csUUFBSixDQUFhLENBQWIsRUFBZ0IsQ0FBaEIsRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEI7QUFFQUgsS0FBRyxDQUFDRSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FGLEtBQUcsQ0FBQ0csUUFBSixDQUFhLENBQWIsRUFBZ0IsRUFBaEIsRUFBb0IsR0FBcEIsRUFBeUIsRUFBekI7QUFFQUgsS0FBRyxDQUFDRSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FGLEtBQUcsQ0FBQ0csUUFBSixDQUFhLEdBQWIsRUFBa0IsRUFBbEIsRUFBc0IsRUFBdEIsRUFBMEIsR0FBMUI7QUFFQUgsS0FBRyxDQUFDRSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FGLEtBQUcsQ0FBQ0csUUFBSixDQUFhLEVBQWIsRUFBaUIsR0FBakIsRUFBc0IsR0FBdEIsRUFBMkIsRUFBM0I7QUFFQUgsS0FBRyxDQUFDRSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FGLEtBQUcsQ0FBQ0csUUFBSixDQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsRUFBckIsRUFBeUIsRUFBekI7QUFFQUgsS0FBRyxDQUFDRSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0FGLEtBQUcsQ0FBQ0csUUFBSixDQUFhLEVBQWIsRUFBaUIsRUFBakIsRUFBcUIsR0FBckIsRUFBMEIsRUFBMUI7QUFFSkgsS0FBRyxDQUFDSSxTQUFKLENBQWNSLFFBQVEsQ0FBQ0csY0FBVCxDQUF3QixTQUF4QixDQUFkLEVBQWlELENBQWpELEVBQW1ELENBQW5ELEVBckJvRCxDQXNCaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUdBO0FBQ0E7QUFFSCxDQXBDRCxFLENBdUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBLE0iLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBsb2FkSW1hZ2UoaW1nKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocikgPT4ge1xuICAgIGxldCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHIoaW1hZ2UpO1xuICAgIGltYWdlLnNyYyA9IGltZztcbiAgfSk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcblx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZTsgfTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIGRlZmluaXRpb24pIHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gaW1wb3J0ICcuL3N0eWxlcy9pbmRleC5jc3MnO1xuXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9zY3JpcHRzL2dhbWVcIjtcbmltcG9ydCB7IGxvYWRJbWFnZSB9IGZyb20gXCIuL3NjcmlwdHMvaW1hZ2VfbG9hZGVyXCI7XG4vLyBpbXBvcnQgeyBsb2FkSW1hZ2UgfSBmcm9tIFwiLi9zY3JpcHRzL2ltYWdlX2xvYWRlclwiO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XG4gIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIDcwMCwgNTAwKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSAnIzdjZmMwMCdcbiAgICBjdHguZmlsbFJlY3QoMCwgMjAsIDI3MCwgMjApO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjN2NmYzAwJ1xuICAgIGN0eC5maWxsUmVjdCgyNDAsIDIwLCAzMCwgMTEwKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSAnIzdjZmMwMCdcbiAgICBjdHguZmlsbFJlY3QoMzAsIDExMCwgMjQwLCAyMCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjN2NmYzAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KDMwLCA2MCwgMzAsIDYwKTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3Y2ZjMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoMzAsIDYwLCAxODAsIDIwKTtcblxuY3R4LmRyYXdJbWFnZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGljdHVyZScpLDAsMCk7XG4gICAgLy8gZnVuY3Rpb24gaW5zZXJ0SW1hZ2UoKSB7XG4gICAgLy8gICBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIC8vICAgaW1hZ2Uuc3JjID0gXCJpbWFnZXMvcmFtZW4xLmpwZ1wiOyAvL2FueSBpbWcgc3JjXG4gICAgLy8gICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gICAgIGNvbnRlbnQuZHJhd0ltYWdlKGltYWdlLCAzMDAsIDMwMCk7XG4gICAgLy8gICB9O1xuICAgIC8vIH1cblxuICAgIC8vIGluc2VydEltYWdlKCk7XG4gICBcblxuICAgIC8vIGNvbnN0IGdhbWUgPSBuZXcgR2FtZShjYW52YXMsIGN0eCk7XG4gICAgLy8gbG9hZEltYWdlKCcuL2ltYWdlcy9yYW1lbjEuanBnJylcbiAgICBcbn0pXG5cblxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuLy8gICBjb25zdCBjYW52YXNFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpO1xuXG4vLyAgIGNhbnZhc0VsLndpZHRoID0gNzAwO1xuLy8gICBjYW52YXNFbC5oZWlnaHQgPSA1MDA7XG4vLyAgIGNvbnN0IGN0eCA9IGNhbnZhc0VsLmdldENvbnRleHQoXCIyZFwiKTtcblxuLy8gICBjdHguZml4bGxSZWN0KDAsIDAsIDcwMCwgNTAwKTtcblxuLy8gICAvLyBsZXQgbW8gPSBuZXcgTW92aW5nT2JqZWN0KHsgcG9zOiBbMTAwLCAxMDBdLCB2ZWw6IFsxLCAyXSwgcmFkaXVzOiA1MCwgY29sb3I6IFwiYmx1ZVwiIH0pXG4vLyAgIC8vIG1vLmRyYXcoY3R4KTtcbi8vICAgLy8gd2luZG93Lm1vID0gbW87XG5cbi8vIC8vICAgbGV0IGcgPSBuZXcgR2FtZVZpZXcoY3R4KTtcbi8vIC8vICAgZy5zdGFydCgpO1xuLy8gLy8gICB3aW5kb3cuZyA9IGc7XG4vLyB9KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=