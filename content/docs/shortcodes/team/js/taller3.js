var sclDiv =50; 
var w, h;
var imgAmount = 100;

let brightnessValues = [];
var foui = [];
var bim = [];
var bigPicture;
var smaller;

function preload() {
  
  bigPicture = loadImage('../images/sun.jpg');
  for (i = 0; i < imgAmount; i++) {
    foui[i] = loadImage(`../images/pm/pm${i+1}.jpg`);
  }
  for (i = 0; i < 10; i++) {
    bim[i] = loadImage(`../images/pm/pm${i+1}.jpg`);
  }
}


function setup() {
  
  createCanvas(bigPicture.width, bigPicture.height);
  scl = width / sclDiv;
  // Repeat the following for all images
  for (var i = 0; i < foui.length; i++) {

    // Shrink it down images
    foui[i].resize(scl, scl);
    
    //foui[i].copy(img, 0, 0, img.width, img.height, 0, 0, scl, scl);
    foui[i].loadPixels();
    
    // Calculate average brightness
    let avg = 0;
    // ORIGINALLY foui[k].width / height
    for (var j = 0; j < foui[i].height; j++) {
      for (var k = 0; k < foui[i].width; k++) {
        let b = brightness(getColorAtIndex(foui[i], k, j))
        avg += b;
      }
    }
    avg /= foui[i].width * foui[i].height;
    brightnessValues[i] = avg;
  }
  
  
  // Find the closest image for each brightness value
  for ( i = 0; i < 256; i++) {
    let record = 256;
    for ( j = 0; j < brightnessValues.length; j++) {
      let diff = abs(i - brightnessValues[j]);
      if (diff < record) {
        record = diff;
        bim[i] = foui[j];
      }
    }
  }
  
  // Calculate the amount of columns and rows
  w = bigPicture.width / scl;
  h = bigPicture.height / scl;
  smaller = createImage(w, h);
  smaller.copy(bigPicture, 0, 0, bigPicture.width, bigPicture.height, 0, 0, w, h);
  
}

function draw() {
  background(0);
  smaller.loadPixels();

  // For every column and row..
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      // ..draw an image that has the closest brightness value
      var index = x + y * w;
      c = getColorAtIndex(smaller, x, y);
      var imageIndex = floor(brightness(c));
      image(bim[imageIndex], x * scl, y * scl, scl, scl);
    }
  }
  
}

function reset(){
  sclDiv = map(mouseX,0,width,100,220);
}

function getColorAtIndex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}