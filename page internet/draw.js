/**
 * 
 */


var sketch;

function paint(array) {
	var defaultPlotSketch = function(p) {

		// Creates and adds the canvas element
		function addCanvas(canvasWidth, canvasHeight) {
			var referenceElement, maxCanvasWidth, canvas;

			// Calculate the canvas dimensions
			referenceElement = document.getElementById("graph");
			maxCanvasWidth = referenceElement.clientWidth - 1;

			if (canvasWidth > maxCanvasWidth) {
				canvasHeight = maxCanvasWidth * canvasHeight / canvasWidth;
				canvasWidth = maxCanvasWidth;
			}

			// Create the canvas
			canvas = p.createCanvas(0.7*maxCanvasWidth, 0.49*maxCanvasWidth);

			// Resize the canvas if necessary
			maxCanvasWidth = referenceElement.clientWidth - 1;

			if (canvasWidth > maxCanvasWidth) {
				p.resizeCanvas(maxCanvasWidth, maxCanvasWidth * canvasHeight
						/ canvasWidth, true);
			}

			return canvas;
		}

		// Initial setup
		p.setup = function() {
			var points, plot;

			// Add the canvas element
			addCanvas(150, 75);

			// Prepare the points for the plot
			points = [];

			for (var graph = 1; graph < array.length; graph++) {
				points.push([]);
				for (var gene = 1; gene < array[1].length; gene++) {
					points[graph-1].push([]);
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
			for (var i = 1; i < array[0].length; i++){
				plot.addLayer(array[0][i], points[0][i-1]);
			}
			plot.activatePointLabels();

			// Set the plot title and the axis labels
			plot.setTitleText("Gene expression");
			plot.getXAxis().setAxisLabelText(array[0][0]);

			// Draw it!
			plot.defaultDraw();

			p.noLoop();
		};
	};

	return defaultPlotSketch;
}



function repaint(array, geneList) {
	var plotSketch = function(p) {

		// Creates and adds the canvas element
		function addCanvas(canvasWidth, canvasHeight) {
			var referenceElement, maxCanvasWidth, canvas;

			// Calculate the canvas dimensions
			referenceElement = document.getElementById("graph");
			maxCanvasWidth = referenceElement.clientWidth - 1;

			if (canvasWidth > maxCanvasWidth) {
				canvasHeight = maxCanvasWidth * canvasHeight / canvasWidth;
				canvasWidth = maxCanvasWidth;
			}

			// Create the canvas
			canvas = p.createCanvas(0.7*maxCanvasWidth, 0.49*maxCanvasWidth);

			// Resize the canvas if necessary
			maxCanvasWidth = referenceElement.clientWidth - 1;

			if (canvasWidth > maxCanvasWidth) {
				p.resizeCanvas(maxCanvasWidth, maxCanvasWidth * canvasHeight
						/ canvasWidth, true);
			}

			return canvas;
		}

		// Initial setup
		p.setup = function() {
			var points, plot;

			// Add the canvas element
			addCanvas(150, 75);

			// Prepare the points for the plot
			points = [];

			for (var graph = 1; graph < array.length; graph++) {
				points.push([]);
				for (var gene = 1; gene < array[1].length; gene++) {
					points[graph-1].push([]);
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
			for (var i = 1; i < array[0].length; i++){
				if (geneList[i-1]) {
					plot.addLayer(array[0][i], points[0][i-1]);
				}
			}
			plot.activatePointLabels();

			// Set the plot title and the axis labels
			plot.setTitleText("Gene expression");
			plot.getXAxis().setAxisLabelText(array[0][0]);

			// Draw it!
			plot.defaultDraw();

			p.noLoop();
		};
	};

	sketch = new p5(plotSketch, "sketch-canvas");
}