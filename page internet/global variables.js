/**
 * Contain all the useful global variables used to exchange file data through
 * the different windows.
 */

// array which contains the tsv file data
var graphArray = [];

// index of the curve (in the tsv file) which will be displayed
var displayCurveNo;

// array of boolean which describes which genes will be displayed
var selectedGenes = [];

// index of the edited genes (thresholds will appear on the graph)
var editedGene = -1;

// contain genes states thresholds
var statesThresholds = [];

// booleans which are set to true in onload function when corresponding file are
// read
var tsvFileLoaded, anFileLoaded;

// p5 object which paints the graph in the tsv file
var graphSketch;

// the dictionary that stores the different possible transitions for each
// automaton
var transitions = {};

// array which contains the number of states that each automaton can take
var auto = [];

// arry which contains the current activated state for each of the automaton
var etatsEnCours = [];

var dragged = false;
var resized = false;
var traine = false;
var xx, yy;

var resetAutomata = function() {
	auto = [];
	transitions = {};
	coordonnees = [];
	var ocanva = document.getElementById('defaultCanvas1');
	if (ocanva) {
		ocanva.parentNode.removeChild(ocanva);
	}
}

var resetGraph = function() {
	graphArray = [];
	selectedGenes = [];
	graphSketch = null;
	statesThresholds = [];
	displayCurveNo = 0;
	softResetGraph();
}

var softResetGraph = function() {
	editedGene = [];
	var graphCanvas = document.getElementById("defaultCanvas0");
	if (graphCanvas) {
		graphCanvas.parentNode.removeChild(graphCanvas);
	}
	var curveSelectElt = document.getElementById("curvesList");
	if (curveSelectElt) {
		curveSelectElt.parentNode.removeChild(curveSelectElt);
	}
}
