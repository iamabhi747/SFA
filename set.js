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