/**
 * 
 */

function paintGraph(array, geneList, curveNo) {
	var plot, plotLayers, hiddenLayers;

	softResetGraph();

	var plotGraph = function(p) {
		// Creates and adds the canvas element
		function addCanvas() {
			var referenceElement, maxCanvasWidth, canvas;

			// Calculate the canvas dimensions
			referenceElement = document.getElementById("graph");
			maxCanvasWidth = referenceElement.clientWidth - 1;

			// Create the canvas
			canvas = p.createCanvas(0.95 * maxCanvasWidth,
					0.64 * maxCanvasWidth);

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
			plotLayers = [];
			for (var i = 1; i < array[0].length; i++) {
				plot.addLayer(array[0][i], points[curveNo][i - 1]);
				var c = p.color("hsb(" + Math.floor(360 * i / array[0].length)
						+ ", 100%, 80%)");
				plot.getLayer(array[0][i]).setLineColor(c);
				plot.getLayer(array[0][i]).setLineWidth(2);
				plotLayers.push(plot.getLayer(array[0][i]));
			}

			// Empty the legend div
			var legendDiv = document.getElementById("graphLegend");
			while (legendDiv.hasChildNodes()) {
				legendDiv.removeChild(legendDiv.lastChild);
			}

			// Add new legend elements and add them support for click events
			for (var i = 1; i < array[0].length; i++) {
				(function(i) {
					selectedGenes.push(true);
					editedGene.push(false);
					var geneLegend = document.createElement("div");
					var geneLegendText = document.createElement("div");
					geneLegend.appendChild(geneLegendText);

					geneLegendText.textContent = array[0][i];
					geneLegendText.className = "textLegend"

					geneLegend.setAttribute("class", "enabledLegend");
					geneLegend.id = array[0][i];
					var geneIndex = Number(geneLegendText.textContent
							.substring(1, geneLegendText.textContent.length)) - 1;

					var layer = plot.getLayer(array[0][geneIndex + 1]);
					geneLegendText.addEventListener("click", function() {
						if (!editedGene.some(function(a) {return a;})) {
							if (this.parentNode.getAttribute("class") === "enabledLegend") {
								this.parentNode.setAttribute("class", "disabledLegend");
								selectedGenes[geneIndex] = false;
								plot.removeLayer(array[0][geneIndex + 1]);
							} else {
								this.parentNode.setAttribute("class", "enabledLegend");
								selectedGenes[geneIndex] = true;
								plot.addLayer(array[0][geneIndex + 1], layer.getPoints());
								plot.getLayer(array[0][geneIndex + 1]).setLineColor(layer.getLineColor());
								plot.getLayer(array[0][geneIndex + 1]).setLineWidth(layer.getLineWidth());
							}
						}
					}, false);

					legendDiv.appendChild(geneLegend);

					var colourSample = document.createElement("div");
					geneLegend.appendChild(colourSample);
					colourSample.className = "colourSample";
					colourSample.style.backgroundColor = layer.getLineColor()
							.toString("#rrggbb");
					colourSample.style.height = 0.5
							* document.getElementsByClassName("textLegend")[geneIndex].offsetHeight
							+ "px";
					colourSample.style.width = document
							.getElementsByClassName("textLegend")[geneIndex].offsetWidth
							+ "px";

					var slider;
					colourSample.onclick = function() {
						removeRangeSlider();
						if (!editedGene[geneIndex] && plot.getLayer(array[0][geneIndex+1])) {
							for (var j = 0; j < editedGene.length; j++) {
								if (geneIndex === j) {
									editedGene[j] = true;
								} else {
									editedGene[j] = false;
								}
							}
							slider = new RangeSlider(auto[i-1]-1, 0, 1,statesThresholds[geneIndex], "thresholdEditor",
									colourSample.style.backgroundColor);
							displayOnlyLayer(array[0][geneIndex+1]);
						} else {
							editedGene[geneIndex] = false;
							displayAllLayers();
						}
					}
				})(i);
			}
			
			hiddenLayers = [];
			function displayOnlyLayer(layerId) {
				if (editedGene.some(function(a) {return a;})) {
					displayAllLayers();
					hiddenLayers = [];
				}
				var layers = [];
				for (var i = 0; i < geneList.length; i++) {
					if (layerId !== plotLayers[i].getId()) {
						hiddenLayers.push(plotLayers[i]);
						plot.removeLayer(plotLayers[i].getId());
					}
				}
			}
			
			function displayAllLayers() {
				for (var i = 0; i < hiddenLayers.length; i++) {
					var layer = hiddenLayers[i];
					plot.addLayer(layer.getId(), layer.getPoints());
					plot.getLayer(layer.getId()).setLineColor(layer.getLineColor());
					plot.getLayer(layer.getId()).setLineWidth(layer.getLineWidth());
				}
				hiddenLayers = [];
			}
			
			function removeRangeSlider() {
				var eltToEmpty = document.getElementById("thresholdEditor");
				while (eltToEmpty.hasChildNodes()) {
					eltToEmpty.removeChild(eltToEmpty.lastChild);
				}
			}

			var sliderContainer = document.createElement("div");
			sliderContainer.id = "thresholdEditor";
			legendDiv.appendChild(sliderContainer);

			// Add form element to select which curve of the tsv file will be
			// displayed.
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
				paintGraph(graphArray, selectedGenes, displayCurveNo);
			};
			document.getElementById("graphBox").insertBefore(curvesListElt,
					document.getElementById("graph"));
			curvesListElt.selectedIndex = displayCurveNo;
			
			var sliderTime = new RangeSlider(1,0,array[1][0][array[1][0].length-2],[0],"rangeSliderContainer","#cccccc"); //nombre curseur

			// Set the plot title and the axis labels
			plot.setTitleText("Gene expression");
			plot.getXAxis().setAxisLabelText(array[0][0]);
			plot.activatePanning();
			plot.activateZooming(1.1, p.CENTER, p.CENTER);

		};
		p.draw = function() {
			// Clean the canvas
			p.background(255);

			// Draw the plot
			plot.beginDraw();
			plot.drawBox();
			plot.drawXAxis();
			plot.drawYAxis();
			plot.drawGridLines(GPlot.BOTH);
			for (var i = 0; i < editedGene.length; i++) {
				if (editedGene[i]) {
					for (var j = 0; j < auto[i]; j++) {
						plot.getLayer(array[0][i + 1]).drawHorizontalLine(statesThresholds[i][j], "#000000", 3);
					}
				}
			}
			plot.drawVerticalLine(time,"#000000",3);
			plot.drawTitle();
			plot.drawLines();
			plot.drawLabels();

			plot.endDraw();
		};
	};

	graphSketch = new p5(plotGraph, "sketch-canvas");
}
