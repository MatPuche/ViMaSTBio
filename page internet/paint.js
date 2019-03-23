/**
 * 
 */

function paintGraph(array, geneList, curveNo) {
	
	var plotGraph = function(p) {
		// Creates and adds the canvas element
		function addCanvas() {
			var referenceElement, maxCanvasWidth, canvas;

			// Calculate the canvas dimensions
			referenceElement = document.getElementById("graph");
			maxCanvasWidth = referenceElement.clientWidth - 1;

			// Create the canvas
			canvas = p.createCanvas(0.95 * maxCanvasWidth, 0.64 * maxCanvasWidth);

			return canvas;
		}

		// Initial setup
		p.setup = function() {
			var points;

			// Add the canvas element
			addCanvas();

			// Prepare the points for the plot
			points = [];

			for (var graph = 1; graph < array.length; graph++) {
				points.push([]);
				for (var gene = 1; gene < array[1].length; gene++) {
					points[graph - 1].push([]);
					for (var pointNb = 0; pointNb < array[1][1].length; pointNb++) {
						points[graph - 1][gene - 1].push(new GPoint(
								Number(array[graph][0][pointNb]),
								Number(array[graph][gene][pointNb])));
					}
				}
			}

			// Create a new plot and set its position on the screen
			plot = new GPlot(p);
			plot.setPos(0, 0);
			plot.setOuterDim(p.width, p.height);

			// Add the points
			for (var i = 1; i < array[0].length; i++) {
				if (geneList[i - 1]) {
					plot.addLayer(array[0][i], points[curveNo][i - 1]);
					var c = p.color("hsb("+ Math.floor(360*i/array[0].length) + ", 100%, 100%)");
					plot.getLayer(array[0][i]).setLineColor(c);
					plot.getLayer(array[0][i]).setLineWidth(2);
				}
			}
			plot.activatePointLabels();

			// Set the plot title and the axis labels
			plot.setTitleText("Gene expression");
			plot.getXAxis().setAxisLabelText(array[0][0]);
			plot.activatePanning();
			plot.activateZooming(1.1, p.CENTER, p.CENTER);

			// Draw it!
			};
			// Execute the sketch
	p.draw = function() {
		// Clean the canvas
		p.background(255);

		// Draw the plot
		plot.beginDraw();
		plot.drawBox();
		plot.drawXAxis();
		plot.drawYAxis();
		plot.drawTitle();
		plot.drawLines();
		plot.drawLabels();
		plot.endDraw();
	};
	};

	graphSketch = new p5(plotGraph, "sketch-canvas");
}

function repaintGraph(array, geneList, curveNo) {
	graphSketch.remove();
	paintGraph(array, geneList, curveNo);
}

function paintLegend(array) {
	// Empty the legend div
	var legendDiv = document.getElementById("graphLegend");
	while (legendDiv.hasChildNodes()) {
		legendDiv.removeChild(legendDiv.lastChild);
	}

	// Add new legend elements and add them support for click events
	for (var i = 1; i < array[0].length; i++) {
		(function(i) {
			selectedGenes.push(true);
			var geneLegend = document.createElement("div");
			geneLegend.textContent = array[0][i];
			geneLegend.setAttribute("class", "enabledLegend");
			geneLegend.id = array[0][i];
			var geneIndex = Number(geneLegend.textContent.substring(1,
					geneLegend.textContent.length)) - 1;

			geneLegend.addEventListener("click", function() {
				if (this.getAttribute("class") === "enabledLegend") {
					this.setAttribute("class", "disabledLegend");
					selectedGenes[geneIndex] = false;
				} else {
					this.setAttribute("class", "enabledLegend");
					selectedGenes[geneIndex] = true;
				}
				repaintGraph(array, selectedGenes, displayCurveNo);
			}, false);

			legendDiv.appendChild(geneLegend);
		})(i);
	}

	// Add form element to select which curve of the tsv file will be displayed.
	var curvesListElt = document.createElement("select");
	curvesListElt.setAttribute("id", "curvesList");
	for (var i = 0; i < array.length - 1; i++) {
		var curveOptionElt = document.createElement("option");
		curveOptionElt.text = "Curve " + (i + 1);
		curveOptionElt.value = i;
		curvesListElt.appendChild(curveOptionElt);
	}
	curvesListElt.onchange = function() {
		displayCurveNo = curvesListElt.selectedIndex;
		repaintGraph(graphArray, selectedGenes, displayCurveNo);
	};
	document.getElementById("graphBox").insertBefore(curvesListElt, document.getElementById("graph"));
}