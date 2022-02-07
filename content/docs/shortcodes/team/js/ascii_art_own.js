let img;
let div;
var options = [' ','`','.','-',":",';','"','*','!',
'=','>','L','i','/','?','J','r','x','7','z',
'3','C','n','F','P','w','S','E',
'N','9','T','$','Q','M','%','@','b',
'D','&','R','B'];
function preload() {
  img = loadImage('/vc/content/sketches/lenna.png');
}


let capture;
let button;

function setup() {
  createCanvas(640, 480);
  button = createButton('Start!');
  div = createP('');
  div.style('font-family', 'monospace');
  div.style('font-size', '1px');
  div.style('letter-spacing', '0.4em');
  div.style('line-height', '1em')
  div.position(0, 0);
}

function draw() {
  if (capture) {
    capture.loadPixels();
    let d = pixelDensity();
    let fullImage = (capture.width * d) * (capture.height * d);
    for (let i = 0; i < fullImage; i++) {
      let r = capture.pixels[i*4];
      let g = capture.pixels[i*4+1];
      let b = capture.pixels[i*4+2];
      
      let gray = r *0.2126 + g *0.7152 + b *0.0722;
      
      capture.pixels[i*4] = gray;
      capture.pixels[i*4+1] = gray;
      capture.pixels[i*4+2] = gray;
    }
    var res = '<pre>';
    for (var i=0; i<capture.height; i++) {
      var line = '';
      for (var j=0; j<capture.width; j++) {
        let index = (j + i*capture.width)*4;

        var x = capture.pixels[index];

        var v = round((1-x/255.0)*40);
        
        var chr = options[v];
        if (chr==' ') chr='&nbsp;';
        if (chr=='<') chr='&lt;';
        if (chr=='>') chr='&gt;';
        if (chr=='"') chr='&quot;';
        line += chr;
      }
      res += line+'<br>';
    }
    res += '</pre>'
    div.html(res);


    button.hide();
  } else {
    button.position(300, 440);
    button.mousePressed(startCapture); 
  }
}

function startCapture() {
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();
}


