let capture;
let button;
let grayBtn;
let invertBtn;
let normalBtn;
let shader;
let inverseShader;
let ascciShader;
let shaderName = '';
let shaderTexture;



function setup() {
  shaderTexture = createGraphics(393, 393, WEBGL);
  shaderTexture.noStroke();
  createCanvas(393, 393, WEBGL);
  background(0,0,0);
  button = createButton('Start!');
  
  ascciShader = loadShader('/vc/content/sketches/ascii.vert', '/vc/content/sketches/ascii.frag');
}

function startCapture() {
  capture = createCapture(VIDEO);
  capture.size(393, 393);
  capture.hide();
}




function draw() {
 
  
  if (capture) {
    button.hide();
      shaderTexture.shader(ascciShader);
      ascciShader.setUniform('tex', capture);
      texture(shaderTexture);
      shaderTexture.rect(0,0,393,393);
      rect(-393/2.0,-393.0/2.0,393,393)

  } else {
    button.position(180, 300);
    button.mousePressed(startCapture); 
  }
}
