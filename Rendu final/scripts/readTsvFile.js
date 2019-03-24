/**
 * 
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