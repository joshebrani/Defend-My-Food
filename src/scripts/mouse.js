// mouse
const mouse = {
  x: undefined,
  y: undefined,
  width: 0.1,
  height: 0.1,
};

// let canvasPosition = canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function (e) {
  // mouse.x = e.x - canvasPosition.left;
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  // mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener("mouseleave", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});
