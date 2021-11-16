# Juan Sebastian Nieto Giraldo

universitario y trabajador

{{< details title="p5-instance-div markdown" open=false >}}
```js
{{</* p5-instance-div id="opticla ilusion" >}}
  
var angle = 0;

function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  var x=map(cos(angle),-1,1,0,width);
  var y=map(sin(angle),-1,1,0,width);
  ellipse(x,y,20,20)
  stroke(random(255),random(255),random(255));
  line(200,200,x,y)
 
  angle +=0.01
  
}
{{< /p5-instance-div */>}}
```
{{< p5-instance-div id="sketchid" ver="1.4.0" >}}
const s = ( sketch ) => {

  var angle = 0;
  sketch.setup = () => {
    sketch.createCanvas(200, 200);
    sketch.background(220);
  };

  sketch.draw = () => {
    var x=map(cos(angle),-1,1,0,width);
    var y=map(sin(angle),-1,1,0,width); 
    sketch.ellipse(x,y,20,20);
    sketch.stroke(random(255),random(255),random(255));
    sketch.line(200,200,x,y);
    angle +=0.01;

  };
};

let myp5 = new p5(s);

{{< /p5-instance-div >}}
