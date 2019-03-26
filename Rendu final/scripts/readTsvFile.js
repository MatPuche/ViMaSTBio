/**
 * This file contain  the code the read the tsv file and
 * display the corresponding graphs.
 */

document.getElementById("tsvFile").onchange = function() {
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = function() {
		resetGraph();
		graphArray = parseTsv(reader.result);

		paintGraph(graphArray, selectedGenes, displayCurveNo);
	};
	reader.readAsText(file);
};
