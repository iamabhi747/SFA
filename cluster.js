
function Cluster(clustset) {
	this.set    = [];
	this.stride = 0;

	this.id = clustset.length();
	clustset.push(this);

	this.push = function(elm) {
		this.set.push(elm);
	};
	this.length = function() {
		return this.set.length;
	};
}