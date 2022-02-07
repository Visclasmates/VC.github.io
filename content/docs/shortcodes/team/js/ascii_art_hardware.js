let asciiShader;
let shaderTexture;


function preload() {
  img = loadImage('/vc/content/sketches/lenna.png');
  video = createVideo(['/vc/content/sketches/fingers.mov', '/vc/content/sketches/fingers.webm']);
  asciiShader = loadShader('/vc/content/sketches/ascii.vert', '/vc/content/sketches/ascii.frag');
  video.hide();
}

function setup() {
  createCanvas(768, 393, WEBGL);
  shaderTexture = createGraphics(393, 393, WEBGL);
  shaderTexture.noStroke();

  video.loop();
  noStroke();
}

function draw() {
  shaderTexture.shader(asciiShader);
  asciiShader.setUniform('tex', img);
  texture(shaderTexture);
  shaderTexture.rect(0,0,393,393);
  rect(-393,-393/2.0,393,393)
  asciiShader.setUniform('tex', video);
  texture(shaderTexture);
  shaderTexture.rect(0,0,393,393);
  rect(0,-393/2.0,393,393)
}
