let cs = 20;
var angle = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  var x=map(cos(angle),-1,1,0,width);
  var y=map(sin(angle),-1,1,0,width);
  stroke(random(255),random(255),random(255));
  line(200,200,x,y)
  angle +=0.01  
 
}