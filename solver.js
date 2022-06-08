
function _connect_getEqn(n, stride, lineset, connectionset, equationset) {
	var conn = connectionset.set[n];
	var a1   = lineset.set[conn[0][0]].end_acc(conn[0][1]);
	var a2   = lineset.set[conn[1][0]].end_acc(conn[1][1]);

	equationset[2*n][equationset[2*n].length-1] += a1[0][1][a1[0][1].length-1];
	equationset[2*n][equationset[2*n].length-1] -= a2[0][1][a2[0][1].length-1];
	equationset[2*n+1][equationset[2*n+1].length-1] += a1[1][1][a1[1][1].length-1];
	equationset[2*n+1][equationset[2*n+1].length-1] -= a2[1][1][a2[1][1].length-1];

	for (var i = 0; i < lineset.set[conn[0][0]].constraints[0].length; i++) {
		equationset[2*n][2*lineset.set[conn[0][0]].constraints[0][i]] += a1[0][0][2*i];
		equationset[2*n][2*lineset.set[conn[0][0]].constraints[0][i]+1] += a1[0][0][2*i+1];
		equationset[2*n+1][2*lineset.set[conn[0][0]].constraints[0][i]] += a1[1][0][2*i];
		equationset[2*n+1][2*lineset.set[conn[0][0]].constraints[0][i]+1] += a1[1][0][2*i+1];
	};
	for (var i = 0; i < lineset.set[conn[0][0]].constraints[1].length; i++) {
		equationset[2*n][stride+lineset.set[conn[0][0]].constraints[1][i]] += a1[0][1][i];
		equationset[2*n+1][stride+lineset.set[conn[0][0]].constraints[1][i]] += a1[1][1][i];
	};

	for (var i = 0; i < lineset.set[conn[1][0]].constraints[0].length; i++) {
		equationset[2*n][2*lineset.set[conn[1][0]].constraints[0][i]] -= a2[0][0][2*i];
		equationset[2*n][2*lineset.set[conn[1][0]].constraints[0][i]+1] -= a2[0][0][2*i+1];
		equationset[2*n+1][2*lineset.set[conn[1][0]].constraints[0][i]] -= a2[1][0][2*i];
		equationset[2*n+1][2*lineset.set[conn[1][0]].constraints[0][i]+1] -= a2[1][0][2*i+1];
	};
	for (var i = 0; i < lineset.set[conn[1][0]].constraints[1].length; i++) {
		equationset[2*n][stride+lineset.set[conn[1][0]].constraints[1][i]] -= a2[0][1][i];
		equationset[2*n+1][stride+lineset.set[conn[1][0]].constraints[1][i]] -= a2[1][1][i];
	};
};

function _stayOnY_getEqn(n, stride, lineset, normalset, equationset) {
	var norm = normalset.set[n];
	var ax   = lineset.set[norm[0]].end_acc(norm[1])[0];

	equationset[stride+n][equationset[stride+n].length-1] += ax[1][ax[1].length-1];

	for (var i = 0; i < lineset.set[norm[0]].constraints[0].length; i++) {
		equationset[stride+n][2*lineset.set[norm[0]].constraints[0][i]] += ax[0][2*i];
		equationset[stride+n][2*lineset.set[norm[0]].constraints[0][i]+1] += ax[0][2*i+1];
	};
	for (var i = 0; i < lineset.set[norm[0]].constraints[1].length; i++) {
		equationset[stride+n][stride+lineset.set[norm[0]].constraints[1][i]] += ax[1][i];
	};
};

function solve(equationset) {
	var solver = document.getElementById('solver').value;
	if (solver == 'Gauess1') {
		return gauess_elimination(equationset);
	}
	else if (solver == 'Gauess2') {
		return gauess_elimination_old(equationset);
	}
	else if (solver == 'Matrix') {
		return invert_matrix_methode(equationset);
	}
	else {
		// Default
		return gauess_elimination(equationset);
	};
};

function evalWorld(stride, lineset, variables) {
	for (var i = 0; i < lineset.length(); i++) {
		for (var j = 0; j < lineset.set[i].constraints[0].length; j++) {
			lineset.set[i]._acc[0][0][2*j]   *= variables[2*lineset.set[i].constraints[0][j]];
			lineset.set[i]._acc[0][0][2*j+1] *= variables[2*lineset.set[i].constraints[0][j]+1];

			lineset.set[i]._acc[1][0][2*j]   *= variables[2*lineset.set[i].constraints[0][j]];
			lineset.set[i]._acc[1][0][2*j+1] *= variables[2*lineset.set[i].constraints[0][j]+1];

			lineset.set[i]._tow[0][2*j]      *= variables[2*lineset.set[i].constraints[0][j]];
			lineset.set[i]._tow[0][2*j+1]    *= variables[2*lineset.set[i].constraints[0][j]+1];
		};
		for (var j = 0; j < lineset.set[i].constraints[1].length; j++) {
			lineset.set[i]._acc[0][1][j] *= variables[stride+lineset.set[i].constraints[1][j]];
			lineset.set[i]._acc[1][1][j] *= variables[stride+lineset.set[i].constraints[1][j]];
			lineset.set[i]._tow[1][j]    *= variables[stride+lineset.set[i].constraints[1][j]];
		};

		lineset.set[i].update();
	};
};


function update(lineset, connectionset, normalset) {
	console.clear();
	var stride = 2*connectionset.length();

	var n_eqn = stride + normalset.length();
	var equationsset = matrix(n_eqn,n_eqn+1);

	lineset.calc();

	for (var i = 0; i < connectionset.length(); i++) {
		_connect_getEqn(i, stride, lineset, connectionset, equationsset);
	};
	for (var i = 0; i < normalset.length(); i++) {
		_stayOnY_getEqn(i, stride, lineset, normalset, equationsset);
	};

	// const clone1 = structuredClone(equationsset);
 	// console.log(clone1);

	var sol = solve(equationsset);

	console.log('----------Solution');
	const clone2 = structuredClone(sol);
    console.log(clone2);

	evalWorld(stride, lineset, sol);
}