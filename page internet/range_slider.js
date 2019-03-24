function RangeSlider(n, minValue, maxValue, startValues, parentId, trackColour) {

	// ---------------------------------------------------------------------------------------------
	// General variables
	// ---------------------------------------------------------------------------------------------

	// Number of thumbs to add to the range slider
	var nbThumbs = n;
	// Id of range slider's parent container
	var containerId = parentId;
	// Minimum and maximum values supported the range slider
	var minmax = [ minValue, maxValue ];
	// Values to place the thumbs at
	var thumbValues = startValues;
	// Height of a thumb
	var thumbHeight = 0;
	// Width of a thumb = 0;
	var thumbWidth = 0;
	// Height of the labels
	var labelHeight = 0;
	// Width of the labels
	var labelWidth = 0;
	// Width of the track;
	var trackWidth = 0;

	// Mouse start position on left button push (Y is not useful because thumbs
	// move only horizontally)
	var mouseStartX = 0;
	// Thumb start position
	var thumbStartX = 0;
	// Thumb label start position
	var thumbLabelStartX = 0;
	// Index of the selected thumb which will be moved and updated
	var movingThumbIndex = -1;

	var i = 0;

	// ---------------------------------------------------------------------------------------------
	// Range slider components
	// ---------------------------------------------------------------------------------------------

	// Parent container
	var containerElt = document.getElementById(containerId);
	// Parent container's width
	var refWidth = containerElt.offsetWidth;
	// Parent container's height
	var refHeight = containerElt.offsetHeight;

	// Track element which will receive the thumbs
	var trackElt = document.createElement("div");
	trackElt.className = "rangeSliderTrack";
	trackElt.style.backgroundColor = trackColour;
	containerElt.appendChild(trackElt);

	// Array containing all the thumbs
	var thumbElts = [];
	// Array containing the labels linked to the thumbs : textContent is the
	// current thumb's position and it follows thumb movement
	var thumbLabelElts = [];
	// Create these elements and add them to the parent container
	for (i = 0; i < nbThumbs; i++) {
		(function(j) {
			thumbElts.push(document.createElement("div"));
			thumbElts[j].className = "rangeSliderThumb";
			containerElt.appendChild(thumbElts[j]);

			thumbLabelElts.push(document.createElement("span"));
			thumbLabelElts[j].className = "rangeSliderThumbLabel";
			thumbLabelElts[j].textContent = thumbValues[j];
			containerElt.appendChild(thumbLabelElts[j]);
		})(i);
	}

	// Fixed labels which will display the range slider min and max values
	var minmaxLabelElts = [];
	// Create these elements and add them to the parent container
	for (i = 0; i < 2; i++) {
		(function(j) {
			minmaxLabelElts.push(document.createElement("div"));
			minmaxLabelElts[j].className = "rangeSliderMinmaxLabel";
			minmaxLabelElts[j].textContent = minmax[j];
			containerElt.appendChild(minmaxLabelElts[j]);
		})(i);
	}

	// ---------------------------------------------------------------------------------------------
	// Set up functions
	// ---------------------------------------------------------------------------------------------

	// Give definitive size to every component
	var giveElementsSize = function() {
		// Variables containing the components' size
		thumbWidth = 0.01 * refWidth;
		thumbHeight = 0.06 * refWidth;
		labelWidth = 0.05 * refWidth;
		labelHeight = 0.0075 * refWidth;
		trackWidth = 0.8 * refWidth;
		// Track's definitive size
		trackElt.style.width = trackWidth + "px";
		trackElt.style.height = 0.03 * refWidth + "px";
		// Thumbs and label thumbs definitive size
		for (i = 0; i < nbThumbs; i++) {
			(function(j) {
				thumbElts[j].style.width = thumbWidth + "px";
				thumbElts[j].style.height = thumbHeight + "px";

				thumbLabelElts[j].style.width = labelWidth + "px";
				thumbLabelElts[j].style.height = labelHeight + "px";
			})(i);
		}
		// Min and max labels size
		for (i = 0; i < 2; i++) {
			(function(j) {
				minmaxLabelElts[j].style.height = labelHeight + "px";
				minmaxLabelElts[j].style.width = labelWidth + "px";
			})(i);
		}
	};

	// Place every component to its starting position
	var placeElements = function() {
		// Center the track in the parent container (won't move)
		trackElt.style.top = (refHeight - trackElt.offsetHeight) / 2 + "px";
		trackElt.style.left = (refWidth - trackElt.offsetWidth) / 2 + "px";

		// Place the thumbs along the track to their starting position given by
		// thumbValues
		// Place the labels above the corresponding thumbs
		for (i = 0; i < nbThumbs; i++) {
			(function(j) {
				// Center vertically the thumb in the parent container (won't
				// move vertically)
				thumbElts[j].style.top = (refHeight - thumbElts[j].offsetHeight)
						/ 2 + "px";
				// Place horizontally the thumb and its label to their starting
				// position on the track relatively to starting value
				thumbElts[j].style.left = trackElt.offsetLeft
						+ trackWidth * (thumbValues[j] - minmax[0])/(minmax[1] - minmax[0]) - thumbWidth / 2 + "px";

				// Place vertically the label above its thumb
				thumbLabelElts[j].style.top = thumbElts[j].offsetTop - 4*labelHeight + "px";
				// Place horizontally the label centered on its thumb
				thumbLabelElts[j].style.left = trackElt.offsetLeft
						+ trackWidth * (thumbValues[j] - minmax[0])/(minmax[1] - minmax[0]) - labelWidth / 2 + "px";
			})(i);
		}

		// Place the min and max values labels at the extremities of the track,
		// vertically centered
		minmaxLabelElts[0].style.top = (refHeight - labelHeight) / 2 + "px";
		minmaxLabelElts[0].style.left = 0.025 * refWidth + "px";
		minmaxLabelElts[1].style.top = (refHeight - labelHeight) / 2 + "px";
		minmaxLabelElts[1].style.left = 0.925 * refWidth + "px";
	};

	// ---------------------------------------------------------------------------------------------
	// Event handlers
	// ---------------------------------------------------------------------------------------------

	// Prepare the focused thumb movement
	var selectThumb = function(evt, iThumb) {
		movingThumbIndex = iThumb;
		mouseStartX = evt.clientX;
		thumbStartX = thumbElts[movingThumbIndex].offsetLeft;
		thumbLabelStartX = thumbLabelElts[movingThumbIndex].offsetLeft;
		startValue = thumbValues[movingThumbIndex];
		thumbElts[movingThumbIndex].style.backgroundColor = "#111";
	};

	// Update variables to actually move the thumb
	var moveThumb = function(evt) {
		// If movingThumbIndex is equal to -1, it means that no thumb is
		// selected and thus the movements of the mouse mustn't affect them
		if (movingThumbIndex !== -1) {
			// Update positions
			var xShift = evt.clientX - mouseStartX;
			// Check that thumbs stay strictly between their neighbours and inside the track and redefine xShift if necessary
			if (nbThumbs === 1) {
				if (xShift < trackElt.offsetLeft - thumbStartX + thumbWidth) {
					xShift = trackElt.offsetLeft - thumbStartX + thumbWidth;
				}
				if (xShift > trackElt.offsetRight - thumbStartX - thumbWidth) {
					xShift = trackElt.offsetRight - thumbStartX - thumbWidth;
				}
			} else if (movingThumbIndex === 0) {
				if (xShift < trackElt.offsetLeft - thumbStartX) {
					xShift = trackElt.offsetLeft - thumbStartX;
				}
				if (xShift > thumbElts[1].offsetLeft - thumbStartX - thumbWidth) {
					xShift = thumbElts[1].offsetLeft - thumbStartX - thumbWidth;
				}
			} else if (movingThumbIndex === nbThumbs - 1) {
				if (xShift < thumbElts[nbThumbs - 2].offsetLeft - thumbStartX + thumbWidth) {
					xShift = thumbElts[nbThumbs - 2].offsetLeft - thumbStartX + thumbWidth;
				}
				if (xShift > trackElt.offsetLeft + trackWidth - thumbStartX) {
					xShift = trackElt.offsetLeft + trackWidth - thumbStartX;
				}
			} else {
				if (xShift < thumbElts[movingThumbIndex - 1].offsetLeft - thumbStartX + thumbWidth) {
					xShift = thumbElts[movingThumbIndex - 1].offsetLeft - thumbStartX + thumbWidth;
				}
				if (xShift > thumbElts[movingThumbIndex + 1].offsetLeft	- thumbStartX - thumbWidth) {
					xShift = thumbElts[movingThumbIndex + 1].offsetLeft	- thumbStartX - thumbWidth;
				}
			}
			
			thumbElts[movingThumbIndex].style.left = thumbStartX + xShift + "px";
			thumbLabelElts[movingThumbIndex].style.left = thumbLabelStartX + xShift + "px";

			// Update label values and threshold values
			var newValue = Math.floor(100*(minmax[0] + (minmax[1] - minmax[0])*(thumbElts[movingThumbIndex].offsetLeft - trackElt.offsetLeft)/trackWidth))/100;
			thumbValues[movingThumbIndex] = newValue;
			thumbLabelElts[movingThumbIndex].textContent = newValue;
			var geneIndex;
			for (var j = 0; j < editedGene.length; j++) {
				if (editedGene[j]) {
					geneIndex = j;
				}
			}
			statesThresholds[geneIndex][movingThumbIndex] = newValue;
		}
	};

	// Release the focus on the thumb
	var releaseThumb = function() {
		thumbElts[movingThumbIndex].style.backgroundColor = "#bbb";
		// -1 in this variable indicates that no thumb is selected and thus none
		// of them should be moving anymore
		movingThumbIndex = -1;
	};

	// ---------------------------------------------------------------------------------------------
	// Creation of the range slider
	// ---------------------------------------------------------------------------------------------

	giveElementsSize();
	placeElements();
	// Add click handlers to the thumbs
	for (i = 0; i < nbThumbs; i++) {
		(function(j) {
			thumbElts[j].onmousedown = function(evt) {
				selectThumb(evt, j);
			};
			thumbElts[j].onmousemove = moveThumb;
			thumbElts[j].onmouseup = releaseThumb;
		})(i);
	}
	// Add click handlers to parent container too, to avoid movement from
	// looking weird when the pointer leaves the thumb
	containerElt.onmousemove = moveThumb;
	containerElt.onmouseup = releaseThumb;
}