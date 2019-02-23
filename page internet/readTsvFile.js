/**
 * 
 */

document.getElementById("tsvFile").onchange = function() {
	var file = this.files[0];
	var reader = new FileReader();
	var array = [];
	reader.onload = function() {
		array = parseTsv(reader.result);
		var defaultPlotSketch = draw(array);
		var sketch = new p5(defaultPlotSketch, "sketch-canvas");
		
		// Empty the legend div
		var formulaire = document.getElementById("graphLegend");
        while (formulaire.hasChildNodes()) {
            formulaire.removeChild(formulaire.lastChild);
        }
        
        // Add new legend elements and add them support for click events
		for (var i = 1; i < array[0].length; i++) {
			var geneLegend = document.createElement("div");
			geneLegend.textContent = array[0][i];
			geneLegend.setAttribute("class", "enabledLegend");
			geneLegend.id = array[0][i];
			
			geneLegend.addEventListener("click", function() {
				if (this.getAttribute("class") === "enabledLegend") {
					this.setAttribute("class", "disabledLegend");
				}
				else {
					this.setAttribute("class", "enabledLegend");
				}
			}, false);
			
			formulaire.appendChild(geneLegend);
		}
	};
	reader.readAsText(file);
};