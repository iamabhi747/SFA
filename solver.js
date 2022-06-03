
function genEquation(n, lineset, connectionset, equationset) {
	var conn = connectionset.set[n];
	var a1   = lineset.set[conn[0][0]].end_acc(conn[0][1]);
	var a2   = lineset.set[conn[1][0]].end_acc(conn[1][1]);

	equationset[2*n][equationset[2*n].length-1] += a1[0][a1[0].length-1];
	equationset[2*n][equationset[2*n].length-1] -= a2[0][a2[0].length-1];
	equationset[2*n+1][equationset[2*n+1].length-1] += a1[1][a1[1].length-1];
	equationset[2*n+1][equationset[2*n+1].length-1] -= a2[1][a2[1].length-1];
	// console.log(n);
	// console.log(equationset[2*n]);
	// console.log(equationset[2*n+1]);

	for (var i = 0; i < lineset.set[conn[0][0]].connections.length; i++) {
		equationset[2*n][2*lineset.set[conn[0][0]].connections[i]] += a1[0][2*i];	
		equationset[2*n][2*lineset.set[conn[0][0]].connections[i]+1] += a1[0][2*i+1];
		equationset[2*n+1][2*lineset.set[conn[0][0]].connections[i]] += a1[1][2*i];	
		equationset[2*n+1][2*lineset.set[conn[0][0]].connections[i]+1] += a1[1][2*i+1];	
	};
	for (var i = 0; i < lineset.set[conn[1][0]].connections.length; i++) {
		equationset[2*n][2*lineset.set[conn[1][0]].connections[i]] -= a2[0][2*i];	
		equationset[2*n][2*lineset.set[conn[1][0]].connections[i]+1] -= a2[0][2*i+1];
		equationset[2*n+1][2*lineset.set[conn[1][0]].connections[i]] -= a2[1][2*i];	
		equationset[2*n+1][2*lineset.set[conn[1][0]].connections[i]+1] -= a2[1][2*i+1];
	};
};

function solve(eqnset) {
	var x = [];
	for (var i = 0; i < eqnset.length; i++) {
		x.push((-1)*eqnset[i].pop());
	};
	var m = gauess_elimination(eqnset, x);
	return m;
};

function evalWorld(lineset, variables) {
	for (var i = 0; i < lineset.length(); i++) {
		for (var j = 0; j < lineset.set[i].connections.length; j++) {
			lineset.set[i]._acc[0][2*j] *= variables[2*lineset.set[i].connections[j]];
			lineset.set[i]._acc[0][2*j+1] *= variables[2*lineset.set[i].connections[j]+1];

			lineset.set[i]._acc[1][2*j] *= variables[2*lineset.set[i].connections[j]];
			lineset.set[i]._acc[1][2*j+1] *= variables[2*lineset.set[i].connections[j]+1];

			lineset.set[i]._tow[2*j] *= variables[2*lineset.set[i].connections[j]];
			lineset.set[i]._tow[2*j+1] *= variables[2*lineset.set[i].connections[j]+1];
		}
		lineset.set[i].update();
	}
}

function update(lineset, connectionset) {
	var equationsset = matrix(2*connectionset.length(),2*connectionset.length()+1);
	lineset.calc();
	for (var i = 0; i < connectionset.length(); i++) {
		genEquation(i, lineset, connectionset, equationsset);
	};
	var vari = solve(equationsset);
	// console.log(vari);
	evalWorld(lineset, vari);
};