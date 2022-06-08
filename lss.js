
function amplify(a, A) {
    for (var i = 0; i < A.length; i++) {
        for (var j = 0; j < A[i].length; j++) {
            A[i][j] *= a;
        };
    };
};


//////////////////////////////////////////////////////// Matrix

function invert_matrix_methode(A) {
    // amplify(10000, A);
    var B = [];
    for (var i = 0; i < A.length; i++) {
        B.push([(-1)*A[i].pop()]);
    }

    A = math.inv(A);

    var x = math.multiply(A, B);
    return x;
};

//////////////////////////////////////////////////////// Gauess 1

function swapRow(n1, n2, A) {
    for (var i = 0; i < A.length+1; i++) {
        var tmp  = A[n1][i];
        A[n1][i] = A[n2][i];
        A[n2][i] = tmp;
    };
};

function swapCol(n1, n2, A, scol) {
    for (var i = 0; i < A.length; i++) {
        var tmp  = A[i][n1];
        A[i][n1] = A[i][n2];
        A[i][n2] = tmp;
    };
    var tmp = scol[n1];
    scol[n1] = scol[n2];
    scol[n2] = tmp;
};

function gauess_elimination(A) {
    // amplify(10000, A);
    var n = A.length;
    var structCol = [];
    for (var i = 0; i < n; i++) {
        structCol.push(i);
    };
    for (var i = 0; i < n; i++) {
        
        var maxEl  = Math.abs(A[i][i]);
        var maxRow = i;
        var maxCol = i;

        for (var j = i+1; j < n; j++) {
            for (var k = i+1; k < n; k++) {
                if (Math.abs(A[j][k]) > maxEl) {
                    maxEl  = Math.abs(A[j][k]);
                    maxRow = j;
                    maxCol = k;
                };
            }
        };

        if (maxRow != i) { swapRow(i, maxRow, A); };
        if (maxCol != i) { swapCol(i, maxCol, A, structCol); };

        if (maxEl == 0) { 
            // console.log('singular matrix');
        };
        // console.log('-------------',i);
        // const clone1 = structuredClone(A);
        // console.log(clone1);

        var c = A[i][i];
        if (c != 0) {
            for (var j = i; j < n+1; j++) {
                A[i][j] /= c;
            };
            for (var j = i+1; j < n; j++) {
                c = A[j][i];
                if (c==0) {continue;}
                for (var k = i; k < n+1; k++) {
                    A[j][k] -= c*A[i][k];
                };
            };
        }
        else {
            if (i == n-1) {
                A[n-1][n-1]   = 1;
                A[n-1][n]     = 0;
            }
            // else { console.log('c is 0'); };
        };

        // const clone2 = structuredClone(A);
        // console.log(clone2);

    };

    // const clone = structuredClone(A);
    // console.log(clone);

    var x   = [];
    var out = [];
    for (var i = 0; i < n; i++) {
        x.push(0);
        out.push(0);
    };
    for (var i = n - 1; i > -1; i--) {
        x[i] = (-1)*A[i][n];

        for (var k = i - 1; k > -1; k--) {
            A[k][n] += A[k][i]*x[i];
        };
    };
    for (var i = 0; i < n; i++) {
        out[i] = x[structCol[i]];
    };

    return out;
};


////////////////////////////////////////////////////// Gauess 2


function gauess_elimination_old(A) {
    amplify(10000, A);
	var i,j,k;
	var n = A.length;

	for (i = 0; i < n; i++) {

		var maxEl  = Math.abs(A[i][i]);
		var maxRow = i;

		for (k = i+1; k < n; k++) {
			if (Math.abs(A[k][i]) > maxEl) {
                maxEl = Math.abs(A[k][i]);
                maxRow = k;
            };
		};

		for (k=i; k < n+1; k++) { 
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        };

		for (k=i+1; k < n; k++) { 
            // if (A[i][i] < 0.0000000001 && A[i][i] > -0.0000000001 && A[k][i] < 0.0000000001 && A[k][i] > -0.0000000001) {}
            if (A[i][i] < 0.0000000001 && A[i][i] > -0.0000000001) {continue;};
            var c = -A[k][i]/A[i][i];
            for (j=i; j < n+1; j++) { 
                if (i===j) {
                    A[k][j] = 0;
                } else {
                    A[k][j] += c * A[i][j];
                };
            };
        };
	};

	var x = [];
	for (i = 0; i < n; i++) {
		x.push(0);
	};
	for (i=n-1; i > -1; i--) {
        // if (A[i][i] < 0.0000000001 && A[i][i] > -0.0000000001 && A[i][n] < 0.0000000001 && A[i][n] > -0.0000000001) {}
        if (A[i][i] < 0.0000000001 && A[i][i] > -0.0000000001) {continue;};
        x[i] = (-1)*A[i][n]/A[i][i];
        for (k=i-1; k > -1; k--) { 
            A[k][n] += A[k][i] * x[i];
        };
    };

    return x;
}