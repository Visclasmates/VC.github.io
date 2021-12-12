let sh;

let vs=
"precision mediump float;" +
"attribute vec3 aPosition;" +
"void main(){" +
"  gl_Position = vec4(aPosition, 1.0);" +
"}";

let fs=
"precision mediump float;" +
"uniform vec2 uPoint[3];" +
"float TAU = 6.28318;" +
"float get1(vec2 q, vec2 p1, vec2 p2){" +
"  return (p2.y-p1.y)*(q.x-p2.x)-(p2.x-p1.x)*(q.y-p2.y);" +
"}" +
// 線の上にあるかどうか
"bool check1(vec2 q1, vec2 q2, vec2 q3, vec2 q4, vec2 p1, vec2 p2){" +
"  float d1 = get1(q1, p1, p2);" +
"  float d2 = get1(q2, p1, p2);" +
"  float d3 = get1(q3, p1, p2);" +
"  float d4 = get1(q4, p1, p2);" +
"  if(min(min(d1, d2), min(d3, d4)) >= 0.0){ return false; }" +
"  if(max(max(d1, d2), max(d3, d4)) <= 0.0){ return false; }" +
"  return true;" +
"}" +
// ピクセルの上下左右でチェック
"bool check2(vec2 q1, vec2 q2, vec2 q3, vec2 q4, vec2 p1, vec2 p2){" +
"  if(min(min(q1.x, q2.x), min(q3.x, q4.x)) > max(p1.x, p2.x)){ return false; }" +
"  if(max(max(q1.x, q2.x), max(q3.x, q4.x)) < min(p1.x, p2.x)){ return false; }" +
"  if(min(min(q1.y, q2.y), min(q3.y, q4.y)) > max(p1.y, p2.y)){ return false; }" +
"  if(max(max(q1.y, q2.y), max(q3.y, q4.y)) < min(p1.y, p2.y)){ return false; }" +
"  return true;" +
"}" +
// 三角形チェック用の関数
"bool check3(vec2 v1, vec2 v2, vec2 v3, vec2 v4, vec2 u){" +
"  float d1 = u.x * v1.y - u.y * v1.x;" +
"  float d2 = u.x * v2.y - u.y * v2.x;" +
"  float d3 = u.x * v3.y - u.y * v3.x;" +
"  float d4 = u.x * v4.y - u.y * v4.x;" +
"  if(min(min(d1, d2), min(d3, d4)) > 0.0){ return true; }" +
"  return false;" +
"}" +
// strokeColor.
"vec3 getStrokeColor(vec2 q1, vec2 q2, vec2 q3, vec2 q4, vec2 p1, vec2 p2){" +
"  if(check1(q1, q2, q3, q4, p1, p2) && check2(q1, q2, q3, q4, p1, p2)){ return vec3(1.0, 0.8, 0.4); }" +
"  return vec3(1.0);" +
"}" +
// fillColor. p1, p2, p3はこの順で時計回りとする・・
// とりあえずカリングは無視で。
// p2-p1のベクトルとq1-p1のベクトルで外積取って正みたいな。
"vec3 getFillColor(vec2 q1, vec2 q2, vec2 q3, vec2 q4, vec2 p1, vec2 p2, vec2 p3){" +
"  vec2 u1 = p2 - p1;" +
"  vec2 u2 = p3 - p2;" +
"  vec2 u3 = p1 - p3;" +
"  if(check3(q1-p1, q2-p1, q3-p1, q4-p1, u1) && check3(q1-p2, q2-p2, q3-p2, q4-p2, u2) && check3(q1-p3, q2-p3, q3-p3, q4-p3, u3)){ return vec3(1.0, 0.4, 0.2); }" +
"  return vec3(1.0);" +
"}" +
"void main(){" +
"  vec2 p = gl_FragCoord.xy / 640.0;" +
"  vec2 qf = fract(p * 32.0);" +
"  vec3 col = vec3(1.0);" +
"  p.y = 1.0 - p.y;" +
"  vec2 q = p * 32.0;" +
"  q = floor(q) * 20.0;" +
"  vec2 q1 = q;" +
"  vec2 q2 = q + vec2(20.0, 0.0);" +
"  vec2 q3 = q + vec2(20.0, 20.0);" +
"  vec2 q4 = q + vec2(0.0, 20.0);" +
"  col = getStrokeColor(q1, q2, q3, q4, uPoint[0], uPoint[1]);" +
"  col = min(col, getStrokeColor(q1, q2, q3, q4, uPoint[0], uPoint[2]));" +
"  col = min(col, getStrokeColor(q1, q2, q3, q4, uPoint[1], uPoint[2]));" +
"  col = min(col, getFillColor(q1, q2, q3, q4, uPoint[0], uPoint[1], uPoint[2]));" +
"  if(qf.x < 0.03 || qf.x > 0.97 || qf.y < 0.03 || qf.y > 0.97){ col = vec3(0.0); }" +
"  gl_FragColor = vec4(col, 1.0);" +
"}";

let gr;

let a, b, c, d;

let _gl, gl;

function setup() {
  _gl = createCanvas(640, 640, WEBGL);
  gl = _gl.GL;
  pixelDensity(1);
  sh = createShader(vs, fs);
  noStroke();
  
  gr = createGraphics(640, 640);
  gr.strokeWeight(2);
  
  gl.enable(gl.DEPTH_TEST);
}
function draw() {

  const t = TAU*frameCount/480;
  a=320+80*cos(t*0.8+PI/4);
  b=160+80*sin(t*0.8+PI/4);
  c=480+80*cos(t);
  d=480+80*sin(t);
  e=160+80*cos(t*0.6);
  f=480+80*sin(t*0.6);
  // (a, b), (c, d), (e, f)の順で時計回り。
  
  background(0);
  shader(sh);
  sh.setUniform("uPoint", [a, b, c, d, e, f]);
  quad(-1, 1, 1, 1, 1, -1, -1, -1);
  
  gr.clear();
  gr.noStroke();
  gr.fill(255, 128, 0);
  gr.circle(a, b, 4);
  gr.circle(c, d, 4);
  gr.noFill();
  gr.stroke(255, 0, 0);
  gr.line(a, b, c, d);
  gr.line(a, b, e, f);
  gr.line(c, d, e, f);
  
  gl.disable(gl.DEPTH_TEST);
  image(gr, -320, -320);
  gl.enable(gl.DEPTH_TEST);
}