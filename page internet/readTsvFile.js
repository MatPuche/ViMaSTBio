/**
 * 
 */

var array = [];
var readingFinished = false;
var geneList = [];

document.getElementById("tsvFile").onchange = function() {
	var file = this.files[0];
	var reader = new FileReader();
	reader.onload = function() {
		array = parseTsv(reader.result);
		var defaultPlotSketch = paint(array);
		sketch = new p5(defaultPlotSketch, "sketch-canvas");

		// Empty the legend div
		var formulaire = document.getElementById("graphLegend");
		while (formulaire.hasChildNodes()) {
			formulaire.removeChild(formulaire.lastChild);
		}

		// Add new legend elements and add them support for click events
		for (var i = 1; i < array[0].length; i++) {
			(function(i) {
				geneList.push(true);
				var geneLegend = document.createElement("div");
				geneLegend.textContent = array[0][i];
				geneLegend.setAttribute("class", "enabledLegend");
				geneLegend.id = array[0][i];
				var geneIndex = Number(geneLegend.textContent.substring(1,
						geneLegend.textContent.length))-1;

				geneLegend.addEventListener("click", function() {
					if (this.getAttribute("class") === "enabledLegend") {
						this.setAttribute("class", "disabledLegend");
						geneList[geneIndex] = false;
					} else {
						this.setAttribute("class", "enabledLegend");
						geneList[geneIndex] = true;
					}
					sketch.remove();
					repaint(array, geneList);
				}, false);

				formulaire.appendChild(geneLegend);
			})(i);
		}
	};
	reader.readAsText(file);
};