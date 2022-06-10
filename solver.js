
function evalWorld(lineset, clusterset, normalset, variables) {
	for (var i = 0; i < lineset.length(); i++) {
		for (var j = 0; j < lineset.set[i].constrain[0].length; j++) {
			var k = clusterset.set[lineset.set[i].constrain[0][j][0]].stride + 2*lineset.set[i].constrain[0][j][1];

			lineset.set[i]._acc[0][0][2*j]   *= variables[k];
			lineset.set[i]._acc[0][0][2*j+1] *= variables[k+1];

			lineset.set[i]._acc[1][0][2*j]   *= variables[k];
			lineset.set[i]._acc[1][0][2*j+1] *= variables[k+1];

			lineset.set[i]._tow   [0][2*j]   *= variables[k];
			lineset.set[i]._tow   [0][2*j+1] *= variables[k+1];
		};
		for (var j = 0; j < lineset.set[i].constrain[1].length; j++) {
			var k = clusterset.stride + lineset.set[i].constrain[1][j];

			lineset.set[i]._acc[0][1][1+j] *= variables[k];
			lineset.set[i]._acc[1][1][1+j] *= variables[k];
			lineset.set[i]._tow   [1][1+j] *= variables[k];
		};
		lineset.set[i].update();
	};
};


function solve(equationset) {
	return gauess_elimination(equationset);
};


function update(lineset, clusterset, normalset) {
	var n = clusterset.stride + normalset.length();
	var eqnSet = matrix(n, n+1);

	lineset.calc();

	for (var i = 0; i < clusterset.length(); i++) {
		_cluster_getEqn(i, lineset, clusterset, normalset, eqnSet);
	};
	for (var i = 0; i < normalset.length(); i++) {
		_normal_getEqn(i, lineset, clusterset, normalset, eqnSet);
	};

	// const clone1 = structuredClone(eqnSet);
 //    console.log(clone1);

	var sol = solve(eqnSet);

	// const clone2 = structuredClone(eqnSet);
 //    console.log(clone2);

	// console.log(sol);

	evalWorld(lineset, clusterset, normalset, sol);
}