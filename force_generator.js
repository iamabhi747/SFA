
function generateForce(connectionset, lineset) {
	lineset.setup();
	for (var i = 0; i < connectionset.length(); i++) {
		var conn = connectionset.set[i];
		var k1 = lineset.set[conn[0][0]].connections.indexOf(i);
		var k2 = lineset.set[conn[1][0]].connections.indexOf(i);

		//l1
		lineset.set[conn[0][0]].force[2*conn[0][1]][2*k1]   += lineset.set[conn[0][0]].cos;  //N1
		lineset.set[conn[0][0]].force[2*conn[0][1]+1][2*k1] += lineset.set[conn[0][0]].sin;

		lineset.set[conn[0][0]].force[2*conn[0][1]][2*k1 + 1]   += lineset.set[conn[1][0]].cos; //N2
		lineset.set[conn[0][0]].force[2*conn[0][1]+1][2*k1 + 1] += lineset.set[conn[1][0]].sin;

		//l2
		lineset.set[conn[1][0]].force[2*conn[1][1]][2*k2]   -= lineset.set[conn[0][0]].cos;  //N1
		lineset.set[conn[1][0]].force[2*conn[1][1]+1][2*k2] -= lineset.set[conn[0][0]].sin;

		lineset.set[conn[1][0]].force[2*conn[1][1]][2*k2 + 1]   -= lineset.set[conn[1][0]].cos; //N2
		lineset.set[conn[1][0]].force[2*conn[1][1]+1][2*k2 + 1] -= lineset.set[conn[1][0]].sin;
	};
};