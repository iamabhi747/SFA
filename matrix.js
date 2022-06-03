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
};

function mult(l1, val) {
	var out = [];
	for (var i = 0; i < l1.length; i++) {
		out.push(l1[i]*val);
	}
	return out;
};
function add(l1, l2) {
	var out = [];
	for (var i = 0; i < l1.length; i++) {
		out.push(l1[i]+l2[i]);
	}
	return out;
};
function sub(l1, l2) {
	var out = [];
	for (var i = 0; i < l1.length; i++) {
		out.push(l1[i]-l2[i]);
	}
	return out;
};