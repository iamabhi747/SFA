var d = 100;
var L = 0.78629*d;
var PI = 3.1415;
var std_a = 0.8812625;
var std_s = Math.sin(std_a);
var std_c = Math.cos(std_a);

var X = 200;
var Y = 200;

var ls = new LineSet();
var cs = new ClusterSet();
var ns = new Set();

var p1 = new vec(X+L*std_c, Y+L*std_s);
var p2 = new vec(X+2*d-L*std_c, Y+L*std_s);
var p3 = new vec(X+d, Y+2*d-L/2);

var l1 = new Line(p1, 2*L, std_a,    ls);
var l2 = new Line(p2, 2*L, PI-std_a, ls);
var l3 = new Line(p3, L,   PI/2,     ls);

var c1 = new Cluster(cs);

l1.connect(1 , c1);
l2.connect(1 , c1);
l3.connect(0 , c1);

l1.stayOnY(0, ns);
l2.stayOnY(0, ns);
l3.stayOnY(1, ns);

cs.setup();

function applyForce() {
	var f1x = float(document.getElementById('f1x').value);
	var f2x = float(document.getElementById('f2x').value);
	var f3x = float(document.getElementById('f3x').value);

	var f1y = float(document.getElementById('f1y').value);
	var f2y = float(document.getElementById('f2y').value);
	var f3y = float(document.getElementById('f3y').value);

	ls.setup();

	l1.applyForce(0, f1x, f1y);
	l2.applyForce(0, f2x, f2y);
	l3.applyForce(1, f3x, f3y);

	update(ls, cs, ns);
	ls.clean();
};

function reset() {
	ls = new LineSet();
	cs = new ClusterSet();
	ns = new Set();

	l1 = new Line(p1, 2*L, std_a,    ls);
	l2 = new Line(p2, 2*L, PI-std_a, ls);
	l3 = new Line(p3, L,   PI/2,     ls);

	c1 = new Cluster(cs);

	l1.connect(1 , c1);
	l2.connect(1 , c1);
	l3.connect(0 , c1);

	l1.stayOnY(0, ns);
	l2.stayOnY(0, ns);
	l3.stayOnY(1, ns);

	cs.setup();
};

function render() {
	showGrid(d);
  	for (var i = 0; i < ls.length(); i++) {
  		showRod(ls.set[i], 10);
  	};
};




//
function calc(a0, a1, F, N00, N01, N10, N11) {
    var sina0 =  Math.sin(a0);
    var cosa0 =  Math.cos(a0);
    var sina1 =  Math.sin(a1);
    var cosa1 =  Math.cos(a1);
    var ac0 = N00 + 3*(F-N01)*sina0*cosa0 + 3*N00*sina0*sina0;
    var ac1 = N10 - 3*N11*sina1*cosa1 + 3*N10*sina1*sina1;
    console.log([ac0==ac1, Math.abs(ac0-ac1), ac0,ac1]);
};