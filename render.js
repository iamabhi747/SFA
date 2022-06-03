function showRod(l, w) {
  var x = l.pos.x;
  var y = height - l.pos.y;
  var sin = Math.sin(-l.a);
  var cos = Math.cos(-l.a)
  var len  = l.len/2
  var w2  = w/2
  stroke(0);
  fill(255)
  ellipse(x - len*cos, y - len*sin, w);
  ellipse(x + len*cos, y + len*sin, w);
  quad(
        x - len*cos - w2*sin, y - len*sin + w2*cos,
        x - len*cos + w2*sin, y - len*sin - w2*cos,
        x + len*cos + w2*sin, y + len*sin - w2*cos,
        x + len*cos - w2*sin, y + len*sin + w2*cos
    );
  fill(0,255,0);
  ellipse(x - len*cos, y - len*sin, w2);
  ellipse(x + len*cos, y + len*sin, w2);
}


function showGrid(len) {
  stroke(100,100,100);
  strokeWeight(1);
  for (var i = 1; i <= Math.floor(width/len); i++) {
    line(i*len,0,i*len,height);
  }
  for (var i = 1; i <= Math.floor(height/len); i++) {
    line(0,height-i*len,width,height-i*len);
  }
}


var d = 100;
var L = 0.78629*d;
var PI = 3.1415;

var X = 200;
var Y = 200;

var angle1 = PI/6;
var angle2 = PI/3;

var ls = new LineSet();

var p1 = new vec(X, Y);
var p2 = new vec(X+L*Math.cos(angle1)+L*Math.cos(angle2), Y+L*Math.sin(angle1)+L*Math.sin(angle2));

var l1 = new Line(p1, 2*L, angle1, ls);
var l2 = new Line(p2, 2*L, angle2, ls);

l1.connect(l2);
l2.connect(l1);
l1.setup();
l2.setup();

function applyForce() {
  var fx = float(document.getElementById('force1').value);
  var fy = float(document.getElementById('force2').value);

  var l1c = Math.cos(l1.a); 
  var l2c = Math.cos(l2.a);

  var l1s = Math.sin(l1.a); 
  var l2s = Math.sin(l2.a);

  //Applied forces
  l1.force[0][0] += fx;
  l1.force[1][0] += fy;

  //Reaction forces
  l1.force[2][1] -= l1c;
  l1.force[2][2] -= l2c;
  l1.force[3][1] -= l1s;
  l1.force[3][2] -= l2s;

  l2.force[0][1] += l1c;
  l2.force[0][2] += l2c;
  l2.force[1][1] += l1s;
  l2.force[1][2] += l2s;

  var acc1   = l1.acc();
  var acc2   = l2.acc();
  var alpha1 = l1.alpha();
  var alpha2 = l2.alpha();

  var a1x = add(acc1[0], mult(alpha1[1],l1s));
  var a1y = sub(acc1[1], mult(alpha1[1],l1c));

  var a2x = sub(acc2[0], mult(alpha2[1],l2s));
  var a2y = add(acc2[1], mult(alpha2[1],l2c));

  var eq1 = sub(a1x,a2x);
  var eq2 = sub(a1y,a2y);

  var mat = [[eq1[1],eq1[2],(-1)*eq1[0]],[eq2[1],eq2[2],(-1)*eq2[0]]];

  mat[0] = mult(mat[0], 1/mat[0][0]);
  mat[0][0] = 1;
  mat[1] = sub(mat[1], mult(mat[0], mat[1][0]));
  mat[1] = mult(mat[1], 1/mat[1][1]);

  // console.log('solved:');
  // console.log(mat[0].join(' / '));
  // console.log(mat[1].join(' / '));

  var N2 = mat[1][2];
  var N1 = mat[0][2] - mat[0][1]*N2;

  l1.update(acc1[0][0]+acc1[0][1]*N1+acc1[0][2]*N2, acc1[1][0]+acc1[1][1]*N1+acc1[1][2]*N2, alpha1[0][0]+alpha1[0][1]*N1+alpha1[0][2]*N2);
  l2.update(acc2[0][0]+acc2[0][1]*N1+acc2[0][2]*N2, acc2[1][0]+acc2[1][1]*N1+acc2[1][2]*N2, alpha2[0][0]+alpha2[0][1]*N1+alpha2[0][2]*N2);

  l1.clean();
  l2.clean();
}

function reset() {
  ls = new LineSet();
  l1 = new Line(p1, 2*L, angle1, ls);
  l2 = new Line(p2, 2*L, angle2, ls);
  l1.connect(l2);
  l2.connect(l1);
  l1.setup();
  l2.setup();
}

function render() {
  showGrid(d);
  showRod(l1, 10);
  showRod(l2, 10);
}