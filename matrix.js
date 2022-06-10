function matrix(n, m=0, struct=[], fill=0) {
	var mat = [];
	if (m > 0) {
		for (var i = 0; i < n; i++) {
			var raw = [];
			for (var j = 0; j < m; j++) {
				raw.push(fill);
			};
			mat.push(raw);
		};
	} else {
		for (var i = 0; i < n; i++) {
			var raw = [];
			for (var j = 0; j < struct[i]; j++) {
				raw.push(fill);
			};
			mat.push(raw);
		};
	};
	return mat;
};

function mult(m1, k) {
	var out = [];
	for (var i = 0; i < m1.length; i++) {
		out.push([]);
		for (var j = 0; j < m1[i].length; j++) {
			out[i].push(m1[i][j] * k);
		};
	};
	return out;
};
function sub(m1, m2) {
	var out = [];
	for (var i = 0; i < m1.length; i++) {
		out.push([]);
		for (var j = 0; j < m1[i].length; j++) {
			out[i].push(m1[i][j] - m2[i][j]);
		};
	};
	return out;
};
function add(m1, m2) {
	var out = [];
	for (var i = 0; i < m1.length; i++) {
		out.push([]);
		for (var j = 0; j < m1[i].length; j++) {
			out[i].push(m1[i][j] + m2[i][j]);
		};
	};
	return out;
};
function sum(m1) {
	var out = 0;
	for (var i = 0; i < m1.length; i++) {
		for (var j = 0; j < m1[i].length; j++) {
			out += m1[i][j];
		};
	};
	return out;
};


function fillMat(i, v, mat) {
	for (; i < mat.length; i++) {
		for (var j = 0; j < mat[i].length; j++) {
			mat[i][j] = v;
		};
	};
};