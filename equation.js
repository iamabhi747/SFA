function _cluster_getEqn(n, lineset, clusterset, normalset, equationset) {
	var clust = clusterset.set[n];

	var prv_end_acc = lineset.set[clust.set[0][0]].endAcc(clust.set[0][1]);
	for (var i = 1; i < clust.length(); i++) {
		var cur_end_acc = lineset.set[clust.set[i][0]].endAcc(clust.set[i][1]);

		equationset[clust.stride+2*(i-1)][equationset[clust.stride+2*(i-1)].length-1]     += prv_end_acc[0][1][0];
		equationset[clust.stride+2*(i-1)+1][equationset[clust.stride+2*(i-1)+1].length-1] += prv_end_acc[1][1][0];
		for (var j = 0; j < lineset.set[clust.set[i-1][0]].constrain[0].length; j++) {
			var k = clusterset.set[lineset.set[clust.set[i-1][0]].constrain[0][j][0]].stride + 2*lineset.set[clust.set[i-1][0]].constrain[0][j][1];

			equationset[clust.stride+2*(i-1)][k  ] += prv_end_acc[0][0][2*j];
			equationset[clust.stride+2*(i-1)][k+1] += prv_end_acc[0][0][2*j+1];

			equationset[clust.stride+2*(i-1)+1][k  ] += prv_end_acc[1][0][2*j];
			equationset[clust.stride+2*(i-1)+1][k+1] += prv_end_acc[1][0][2*j+1];
		};
		for (var j = 0; j < lineset.set[clust.set[i-1][0]].constrain[1].length; j++) {
			var k = clusterset.stride + lineset.set[clust.set[i-1][0]].constrain[1][j];

			equationset[clust.stride+2*(i-1)  ][k] += prv_end_acc[0][1][1+j];
			equationset[clust.stride+2*(i-1)+1][k] += prv_end_acc[1][1][1+j];
		};

		equationset[clust.stride+2*(i-1)][equationset[clust.stride+2*(i-1)].length-1]     -= cur_end_acc[0][1][0];
		equationset[clust.stride+2*(i-1)+1][equationset[clust.stride+2*(i-1)+1].length-1] -= cur_end_acc[1][1][0];
		for (var j = 0; j < lineset.set[clust.set[i][0]].constrain[0].length; j++) {
			var k = clusterset.set[lineset.set[clust.set[i][0]].constrain[0][j][0]].stride + 2*lineset.set[clust.set[i][0]].constrain[0][j][1];

			equationset[clust.stride+2*(i-1)][k  ]   -= cur_end_acc[0][0][2*j];
			equationset[clust.stride+2*(i-1)][k+1]   -= cur_end_acc[0][0][2*j+1];

			equationset[clust.stride+2*(i-1)+1][k  ]   -= cur_end_acc[1][0][2*j];
			equationset[clust.stride+2*(i-1)+1][k+1]   -= cur_end_acc[1][0][2*j+1];
		};
		for (var j = 0; j < lineset.set[clust.set[i][0]].constrain[1].length; j++) {
			var k = clusterset.stride + lineset.set[clust.set[i][0]].constrain[1][j];

			equationset[clust.stride+2*(i-1)  ][k]   -= cur_end_acc[0][1][1+j];
			equationset[clust.stride+2*(i-1)+1][k]   -= cur_end_acc[1][1][1+j];
		};

		prv_end_acc = cur_end_acc;
	};

	for (var i = 0; i < clust.length(); i++) {
		equationset[clust.stride+2*clust.length()-2][clust.stride+2*i  ] += 1;
		equationset[clust.stride+2*clust.length()-1][clust.stride+2*i+1] += 1;
	};
};

function _normal_getEqn(n, lineset, clusterset, normalset, equationset) {
	var norm = normalset.set[n];

	var end_acc = lineset.set[norm[0]].endAcc(norm[1]);

	equationset[clusterset.stride+n][equationset[clusterset.stride+n].length-1] += end_acc[0][1][0];
	for (var j = 0; j < lineset.set[norm[0]].constrain[0].length; j++) {
		var k = clusterset.set[lineset.set[norm[0]].constrain[0][j][0]].stride + 2*lineset.set[norm[0]].constrain[0][j][1];

		equationset[clusterset.stride+n][k]   += end_acc[0][0][2*j];
		equationset[clusterset.stride+n][k+1] += end_acc[0][0][2*j+1];
	};
	for (var j = 0; j < lineset.set[norm[0]].constrain[1].length; j++) {
		var k = clusterset.stride + lineset.set[norm[0]].constrain[1][j];

		equationset[clusterset.stride+n][k]  += end_acc[0][1][1+j];
	};
};