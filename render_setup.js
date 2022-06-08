var d = 100;
var L = 0.78629*d;
var PI = 3.1415;
var std_a = 0.8812625;
var std_s = Math.sin(std_a);
var std_c = Math.cos(std_a);

var X = 200;
var Y = 200;

var ls = new LineSet();
var cs = new Set();
var ns = new Set();

var p1 = new vec(X+L*std_c, Y+L*std_s);
var p2 = new vec(X+2*d-L*std_c, Y+L*std_s);
var p3 = new vec(X+d, Y+2*d-L/2);

var l1 = new Line(p1, 2*L, std_a,    ls);
var l2 = new Line(p2, 2*L, PI-std_a, ls);
var l3 = new Line(p3, L,   PI/2,     ls);

l3.connect(0, l1, 1, cs);
l3.connect(0, l2, 1, cs);
l1.connect(1, l2, 1, cs);

// l1.stayOnY(0, ns);
// l2.stayOnY(0, ns);
// l3.stayOnY(1, ns);

// var path = [];
// path.push(new vec(l1.pos.x - l1.len*Math.cos(l1.a), l1.pos.y - l1.len*Math.sin(l1.a)));

function applyForce() {
	var f1x = float(document.getElementById('f1x').value);
	var f2x = float(document.getElementById('f2x').value);
	var f3x = float(document.getElementById('f3x').value);

	var f1y = float(document.getElementById('f1y').value);
	var f2y = float(document.getElementById('f2y').value);
	var f3y = float(document.getElementById('f3y').value);

	genForce(ls, cs, ns);
	l1.applyForce(0, f1x, f1y);
	l2.applyForce(0, f2x, f2y);
	l3.applyForce(1, f3x, f3y);

	update(ls, cs, ns);
	ls.clean();

	// path.push(l1.pos.x - l1.len*Math.cos(l1.a));
};

function reset() {
	ls = new LineSet();
	cs = new Set();
	ns = new Set();

	l1 = new Line(p1, 2*L, std_a,    ls);
	l2 = new Line(p2, 2*L, PI-std_a, ls);
	l3 = new Line(p3, L,   PI/2,     ls);

	l3.connect(0, l1, 1, cs);
	l3.connect(0, l2, 1, cs);
	l1.connect(1, l2, 1, cs);

	// l1.stayOnY(0, ns);
	// l2.stayOnY(0, ns);
	// l3.stayOnY(1, ns);
};

function render() {
	showGrid(d);
  	for (var i = 0; i < ls.length(); i++) {
  		showRod(ls.set[i], 10);
  	};
  	// for(var i = 1; i < path.length; i++) {
  	// 	strokeWeight(1);
  	// 	stroke(255,0,0);
  	// 	line(path[i-1], height-(100+10*i), path[i], height-(100+10*i));
  	// 	line(path[i], height-(100+10*i), path[i], height-(110+10*i));
  	// };
}