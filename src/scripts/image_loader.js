export function loadImage(img) {
  return new Promise((r) => {
    let image = new Image();
    image.onload = () => r(image);
    image.src = img;
  });
}
