//General set of objects
function Set() {
	this.set = [];
	this.push = function(elm) {
		this.set.push(elm);
	};
	this.length = function() {
		return this.set.length;
	};
}



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
	this.update = function() {
		for (var i = 0; i < this.set.length; i++) {
			this.set[i].update();
		};
	};
};

// set of clusters
function ClusterSet() {
	this.set    = [];
	this.stride = 0;

	this.push = function(elm) {
		this.set.push(elm);
	};
	this.length = function() {
		return this.set.length;
	};
	this.setup = function() {
		for (var i = 1; i < this.set.length; i++) {
			this.set[i].stride = this.set[i-1].stride + 2*this.set[i-1].length();
		};
		this.stride = this.set[this.set.length-1].stride + 2*this.set[this.set.length-1].length();
	};
}