/**
 * 
 */

var graphBox = document.getElementById("graphBox");
var reduceButtonGraph = document.getElementById("reduceGraphBox");
reduceButtonGraph.addEventListener("click", function() {
	if (this.getAttribute("src") === "minus.png") {
		this.setAttribute("src","plus.png");
		graphBox.style.visibility = "hidden";
	}
	else {
		this.setAttribute("src","minus.png");
		graphBox.style.visibility = "visible";
	}
}, false);

var automataBox = document.getElementById("automataBox");
var reduceButtonAutomata = document.getElementById("reduceAutomataBox");
reduceButtonAutomata.addEventListener("click", function() {
	if (this.getAttribute("src") === "minus.png") {
		this.setAttribute("src","plus.png");
		automataBox.style.visibility = "hidden";
	}
	else {
		this.setAttribute("src","minus.png");
		automataBox.style.visibility = "visible";
	}
}, false);