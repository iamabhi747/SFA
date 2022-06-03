
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

	this.constraints = [[],[]];
	this.connect = function(n, other_line, other_n, connectionset) {
		var i = connectionset.length();
		this.constraints[0].push(i);
		other_line.constraints[0].push(i);
		connectionset.push([[this.id,n],[other_line.id,other_n]]);
	};
	this.stayOnY = function(n, normalset) {
		var i = normalset.length();
		this.constraints[1].push(i);
		normalset.push([this.id,n]);
	};

	this.setup = function() {
		this.sin = Math.sin(this.a);
		this.cos = Math.cos(this.a);
		this.force = [null,null];
		this.force[0] = matrix(4, 2*this.constraints[0].length);
		this.force[1] = matrix(4, this.constraints[1].length+1);
	};
	this.clean = function() {
		this.force = null;
		this._acc  = null;
		this._tow  = null;
		this.sin   = null;
		this.cos   = null;
	};
	this.applyForce = function(n, fx, fy) {
		var last_i = this.force[1][0].length-1;
		this.force[1][2*n  ][last_i] += fx;
		this.force[1][2*n+1][last_i] += fy;
	};

	this.acc = function() {
		var ax = [[],[]];
		var ay = [[],[]];
		for (var i=0; i < this.force[0][0].length; i++) {
			ax[0].push(this.force[0][0][i]+this.force[0][2][i]);
			ay[0].push(this.force[0][1][i]+this.force[0][3][i]);
		};
		for (var i = 0; i < this.force[1][0].length; i++) {
			ax[1].push(this.force[1][0][i]+this.force[1][2][i]);
			ay[1].push(this.force[1][1][i]+this.force[1][3][i]);
		};
		this._acc = [ax,ay];
	};
	this.tow = function() {
		var t  = [[],[]];
		for (var i=0; i < this.force[0][0].length; i++) {
			t[0].push(0);
			t[0][i] -= this.force[0][0][i]*this.sin;
			t[0][i] += this.force[0][1][i]*this.cos;
			t[0][i] += this.force[0][2][i]*this.sin;
			t[0][i] -= this.force[0][3][i]*this.cos;
		};
		for (var i=0; i < this.force[1][0].length; i++) {
			t[1].push(0);
			t[1][i] -= this.force[1][0][i]*this.sin;
			t[1][i] += this.force[1][1][i]*this.cos;
			t[1][i] += this.force[1][2][i]*this.sin;
			t[1][i] -= this.force[1][3][i]*this.cos;
		};
		this._tow = t;
	};
	this.end_acc = function(n) {
		var m1 = [mult(this._tow[0],3*this.sin), mult(this._tow[1],3*this.sin)];
		var m2 = [mult(this._tow[0],3*this.cos), mult(this._tow[1],3*this.cos)];
		if (n==0) {
			var ax = [sub(this._acc[0][0], m1[0]), sub(this._acc[1][0], m1[1])];
  			var ay = [add(this._acc[0][1], m2[0]), add(this._acc[1][1], m2[1])];
  		} else if (n==1) {
			var ax = [add(this._acc[0][0], m1[0]), add(this._acc[1][0], m1[1])];
  			var ay = [sub(this._acc[0][1], m2[0]), sub(this._acc[1][1], m2[1])];
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
		for (var i = 0; i < this.force[0][0].length; i++) {
			ax += this._acc[0][0][i];
			ay += this._acc[0][1][i];
			alpha += this._tow[0][i];
		}
		for (var i = 0; i < this.force[1][0].length; i++) {
			ax += this._acc[1][0][i];
			ay += this._acc[1][1][i];
			alpha += this._tow[1][i];
		}
		alpha *= 6/this.len; 
		this.pos.x += ax*t;
		this.pos.y += ay*t;
		this.a     -= alpha*t;
	};
}