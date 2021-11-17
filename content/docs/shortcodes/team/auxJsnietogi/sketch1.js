let sebas;
var angle = 0;
function preload(){
  sebas = loadImage('sun.jpg');
}
function setup() {
  //createCanvas(400, 400);
  background(sebas);
}
function draw() {
  
  //background(sebas);
  
  var x=map(cos(angle),-1,1,0,width);
  var y=map(sin(angle),-1,1,0,width);
  stroke(0,255,0);
  line(200,200,x,y)
  if(angle < 12.55){
    angle +=0.01  
  }
  
}