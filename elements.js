function matrix(n, m) {
	var mat = [];
	for (var i = 0; i < n; i++) {
		var raw = [];
		for (var j = 0; j < m; j++) {
			raw.push(0);
		}
		mat.push(raw);
	}
	return mat;
}

function mult(l1, val) {
	var out = [];
	for (var i = 0; i < l1.length; i++) {
		out.push(l1[i]*val);
	}
	return out;
}

function add(l1, l2) {
	var out = [];
	for (var i = 0; i < l1.length; i++) {
		out.push(l1[i]+l2[i]);
	}
	return out;
}

function sub(l1, l2) {
	var out = [];
	for (var i = 0; i < l1.length; i++) {
		out.push(l1[i]-l2[i]);
	}
	return out;
}

function vec(x, y) {
	this.x = x;
	this.y = y;
}

function LineSet() {
	this.set = [];
	this.push = function(elm) {
		this.set.push(elm);
	};
	this.length = function() {
		return this.set.length;
	};
}

function Line(pos, len, a, lineset) {
	this.pos = new vec(pos.x, pos.y);
	this.len = len;
	this.a   = a;

	this.force = [];

	this.i   = lineset.length();
	lineset.push(this);

	this.connections = [];
	this.connect = function(line) {
		this.connections.push(line.i);
	};

	this.setup = function() {
		this.force = matrix(4, this.connections.length+2);
	};
	this.acc = function() {
		var ax = [];
		var ay = [];
		for (var i=0; i < this.force[0].length; i++) {
			ax.push(this.force[0][i]+this.force[2][i]);
			ay.push(this.force[1][i]+this.force[3][i]);
		}
		return [ax,ay];
	};
	this.alpha = function() {
		var sin = Math.sin(this.a);
		var cos = Math.cos(this.a);

		var a  = [];
		var la = [];
		for (var i=0; i < this.force[0].length; i++) {
			var t = 0;
			t -= this.force[0][i]*sin;
			t += this.force[1][i]*cos;
			t += this.force[2][i]*sin;
			t -= this.force[3][i]*cos;

			a.push(6*t/this.len);
			la.push(3*t);
		}
		return [a,la];
	};
	this.clean = function() {
		this.setup();
	};
	this.update = function(ax, ay, alpha) {
		this.pos.x += ax*0.01;
		this.pos.y += ay*0.01;
		this.a     -= alpha*0.01;
	};
}