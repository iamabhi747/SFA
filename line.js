
function Line(pos, len, a, lineset) {
	this.pos = new vec(pos.x, pos.y);
	this.len = len;
	this.a   = a;

	this.force = null;
	this._acc  = null;
	this._tow  = null;
	this.sin   = null;
	this.cos   = null;

	this.id  = lineset.length();
	lineset.push(this);

	this.constrain = [[],[]];
	this.constrainN = [[],[]];
	this.connect = function(n, clust) {
		this.constrain[0].push([clust.id, clust.length()]);
		this.constrainN[0].push(n);
		clust.push([this.id, n]);
	};
	this.stayOnY = function(n, normalset) {
		this.constrain[1].push(normalset.length());
		this.constrainN[1].push(n);
		normalset.push([this.id, n]);
	};

	this.setup = function() {
		this.sin = Math.sin(this.a);
		this.cos = Math.cos(this.a);
		this.force = matrix(3, -1, [4,2*this.constrain[0].length,this.constrain[1].length]);
		fillMat(1, 1, this.force);
	};
	this.clean = function() {
		this.force = null;
		this._acc  = null;
		this._tow  = null;
		this.sin   = null;
		this.cos   = null;
	};

	this.applyForce = function(n, fx, fy) {
		this.force[0][2*n  ] += fx;
		this.force[0][2*n+1] += fy;
	};
	this.acc = function() {
		var ax = matrix(2, -1, [2*this.constrain[0].length,1+this.constrain[1].length]);
		var ay = matrix(2, -1, [2*this.constrain[0].length,1+this.constrain[1].length]);

		for (var i = 0; i < 2; i++) {
			ax[1][0]   += this.force[0][2*i];
			ay[1][0]   += this.force[0][2*i+1];
		};
		for (var i = 0; i < this.constrain[0].length; i++) {
			ax[0][2*i]   += this.force[1][2*i];
			ay[0][2*i+1] += this.force[1][2*i+1];
		};
		for (var i = 0; i < this.constrain[1].length; i++) {
			ax[1][1+i] += this.force[2][i];
		};

		this._acc = [ax,ay];
	};
	this.tow = function() {
		var t = matrix(2, -1, [2*this.constrain[0].length,1+this.constrain[1].length]);

		for (var i = 0; i < 2; i++) {
			t[1][0] += ((-1)**(1-i))*this.sin*this.force[0][2*i];
			t[1][0] += ((-1)**(  i))*this.cos*this.force[0][2*i+1];
		};
		for (var i = 0; i < this.constrain[0].length; i++) {
			t[0][2*i]   += ((-1)**(1-this.constrainN[0][i]))*this.sin*this.force[1][2*i];
			t[0][2*i+1] += ((-1)**(  this.constrainN[0][i]))*this.cos*this.force[1][2*i+1];
		};
		for (var i = 0; i < this.constrain[1].length; i++) {
			t[1][1+i] += ((-1)**(1-this.constrainN[1][i]))*this.sin*this.force[2][i];
		};

		this._tow = t;
	};
	this.endAcc = function(n) {
		var m1 = mult(this._tow, 3*this.sin);
		var m2 = mult(this._tow, 3*this.cos);
		if (n==0) {
			var ax = sub(this._acc[0], m1);
			var ay = add(this._acc[1], m2);
		} else if (n==1) {
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
		var ax = sum(this._acc[0]);
		var ay = sum(this._acc[1]);
		var alpha = 6*sum(this._tow)/this.len;
		this.pos.x += ax*t;
		this.pos.y += ay*t;
		this.a     -= alpha*t;
	};
};