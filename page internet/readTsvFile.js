/**
 * 
 */

var graphArray = [];
var selectedGenes = [];

document.getElementById("tsvFile").onchange = function() {
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = function() {
		graphArray = parseTsv(reader.result);
		
		displayCurveNo = 0;
		paintLegend(graphArray);
		paintGraph(graphArray, selectedGenes, displayCurveNo);
	};
	reader.readAsText(file);
};