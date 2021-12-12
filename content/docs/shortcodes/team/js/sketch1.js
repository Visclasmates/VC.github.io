let sebas;
var angle = 0;
function preload(){
  sebas = loadImage('../images/sun.jpg');
  
}
function setup() {
  createCanvas(600, 600);
  sebas.resize(600,600)
  background(sebas);
}
function draw() {
  
  
  var x=map(cos(angle),-1,1,0,width);
  var y=map(sin(angle),-1,1,0,width);
  stroke(0,255,0);
  line(300,300,x,y)
  if(angle < 12.55){
    angle +=0.01  
  }
  
}