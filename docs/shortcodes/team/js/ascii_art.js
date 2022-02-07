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

function setup() {
  createCanvas(500, 500);
  div = createP('');
  div.style('font-family', 'monospace');

  img.loadPixels();
  let d = pixelDensity();
  let fullImage = (img.width * d) * (img.height * d);
  for (let i = 0; i < fullImage; i++) {
    let r = img.pixels[i*4];
    let g = img.pixels[i*4+1];
    let b = img.pixels[i*4+2];
    
    let gray = r *0.2126 + g *0.7152 + b *0.0722;
    
    img.pixels[i*4] = gray;
    img.pixels[i*4+1] = gray;
    img.pixels[i*4+2] = gray;
  }
  img.updatePixels();
  var res = '<pre>';
  for (var i=0; i<img.height; i++) {
    var line = '';
    for (var j=0; j<img.width; j++) {
      let index = (j + i*img.width)*4;

      var x = img.pixels[index];

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
  div.style('font-size', '1px');
  div.style('letter-spacing', '0.4em');
  div.style('line-height', '1em')
  div.position(0, 0);

}
