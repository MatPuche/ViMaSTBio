/**
 * 
 */

function parseTsv(fileContent) {
		// Separate curves from each other, first element is the legend
		var curves = fileContent.split("\n" + String.fromCharCode(13) + "\n");

		// Extract axes names from the first element, and split curves data
		// into arrays of lines
		curves[0] = curves[0].split("\t");
		for (var i = 1; i < curves.length; i++) {
			curves[i] = curves[i].split("\n");
		}
		
		// Remove quotes from the axes names if they exist
		for (var i = 0; i < curves[0].length; i++) {
			curves[0][i] = curves[0][i].replace(/\"/g,"");
		}

		// Split each line : curves[curve nb][curve line nb][column nb]
		// The first line remain as it is
		for (var i = 1; i < curves.length; i++) {
			for (var j = 0; j < curves[1].length; j++) {
				curves[i][j] = curves[i][j].split("\t");
			}
		}

		// Transform data storage : curves[curve nb][gene nb][activation
		// value nb]
		// curves[0] contain a list of axes titles
		// curves[n][0] (n>0) contain abscissa values in the curve n
		// curves[n][m] (m>0, n>0) contain ordinate values for gene number m
		// in the curve n
		for (var i = 1; i < curves.length; i++) {
			curves[i] = transpose(curves[i]);
		}
		return curves;
}


function transpose(matrix) {
    return Object.keys(matrix[0])
        .map(colNumber => matrix.map(rowNumber => rowNumber[colNumber]));
}