function setup() {
  createCanvas(400, 350);
}

function draw() {
  background(0);
  const iResolutionXY = width/height;

  loadPixels()
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {

      const fragCoord = createVector(x, y).sub(width/2, height/2);
      const p = fragCoord.mult(2).sub(iResolutionXY).div(width);
      const a = atan(p.y, p.x);
      const r = pow(pow(p.x * p.x, 16) + pow(p.y * p.y, 16), 1 / 8);
      const uv = createVector(1 / r + 0.2 * frameCount, a);
      const f = cos(12 * uv.x) * cos(6 * uv.y);

      const colx = (0.5 + 0.5 * sin(PI/4 * f + 0.5)) * r;
      const coly = (0.5 + 0.5 * sin(PI/4 * f + 0.5)) * r;
      const colz = (0.5 + 0.5 * sin(PI/4 * f + 0.5)) * r;

      const index = 4 * (y * width + x);
      pixels[index + 0] = colx * 255;
      pixels[index + 1] = coly * 255;
      pixels[index + 2] = colz * 255;
      pixels[index + 3] = 255;
    }
  }
  updatePixels();

}

function applyFunction(fun, vec) {
  vec.x = fun(vec.x);
  vec.y = fun(vec.y);
  vec.z = fun(vec.z);
  return vec;
}