function Line(pos, len, a, lineset) {
	this.pos = new vec(pos.x, pos.y);
	this.len = len;
	this.a   = a;

	this.force = null;
	this._acc  = null;
	this._tow  = null;
	this.sin   = null;
	this.cos   = null;

	this.id = lineset.length();
	lineset.push(this);

	this.connections = [];
	this.connect = function(n, other_line, other_n, connectionset) {
		var i = connectionset.length();
		this.connections.push(i);
		other_line.connections.push(i);
		connectionset.push([[this.id,n],[other_line.id,other_n]]);
	};

	this.setup = function() {
		this.sin = Math.sin(this.a);
		this.cos = Math.cos(this.a);
		this.force = matrix(4, 2*this.connections.length+1);
	};
	this.clean = function() {
		this.force = null;
		this._acc  = null;
		this._tow  = null;
		this.sin   = null;
		this.cos   = null;
	};
	this.applyForce = function(n, fx, fy) {
		var last_i = this.force[0].length-1;
		this.force[2*n][last_i] += fx;
		this.force[2*n+1][last_i] += fy;
	};

	this.acc = function() {
		var ax = [];
		var ay = [];
		for (var i=0; i < this.force[0].length; i++) {
			ax.push(this.force[0][i]+this.force[2][i]);
			ay.push(this.force[1][i]+this.force[3][i]);
		};
		this._acc = [ax,ay];
	};
	this.tow = function() {
		var t  = [];
		for (var i=0; i < this.force[0].length; i++) {
			t.push(0);
			t[i] -= this.force[0][i]*this.sin;
			t[i] += this.force[1][i]*this.cos;
			t[i] += this.force[2][i]*this.sin;
			t[i] -= this.force[3][i]*this.cos;
		};
		this._tow = t;
	};
	this.end_acc = function(n) {
		var m1 = mult(this._tow,3*this.sin);
		var m2 = mult(this._tow,3*this.cos);
		if (n==0) {
			var ax = sub(this._acc[0], m1);
  			var ay = add(this._acc[1], m2);		}
		else if (n==1) {
			var ax = add(this._acc[0], m1);
  			var ay = sub(this._acc[1], m2);
		};
		return [ax,ay];
	};
	this.calc = function() {
		this.acc();
		this.tow();
	};
	this.update = function(t=0.01) {
		var ax = 0;
		var ay = 0;
		var alpha = 0;
		for (var i = 0; i < 2*this.connections.length+1; i++) {
			ax += this._acc[0][i];
			ay += this._acc[1][i];
			alpha += this._tow[i];
		}
		alpha *= 6/this.len; 
		this.pos.x += ax*t;
		this.pos.y += ay*t;
		this.a     -= alpha*t;
	};
};


// set of lines
function LineSet() {
	this.set = [];
	this.push = function(elm) {
		this.set.push(elm);
	};
	this.length = function() {
		return this.set.length;
	};
	this.clean = function() {
		for (var i = 0; i < this.set.length; i++) {
			this.set[i].clean();
		};
	};
	this.setup = function() {
		for (var i = 0; i < this.set.length; i++) {
			this.set[i].setup();
		};
	};
	this.calc = function() {
		for (var i = 0; i < this.set.length; i++) {
			this.set[i].calc();
		};
	};
};

// set of connections
function ConnectionSet() {
	this.set = [];
	this.push = function(elm) {
		this.set.push(elm);
	};
	this.length = function() {
		return this.set.length;
	};
};