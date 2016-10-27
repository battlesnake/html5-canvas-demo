/* Set function to call when page has loaded */
window.addEventListener('load', onLoad);

/* Varibles to hold the colour and brush to draw with */
var brush;
var color;

/* Called when the page has loaded, initialises the app */
function onLoad() {
	/* Bind event handlers onto elements */
	bindBrushButtons();
	bindColorButtons();
	bindCanvas();
}



/******************************************/
/*** Your canvas stuff begins from here ***/

/* Canvas element */
var canvas;

/* Drawing context */
var ctx;

/* Are we drawing? */
var drawing = false;

/* Last cursor position */
var last_pos = null;

function bindCanvas() {
	canvas = document.querySelector('.canvas');
	/* Bind mouse up/down/move event handlers to the canvas */
	canvas.addEventListener('mousedown', canvasMouseDown);
	canvas.addEventListener('mousemove', canvasMouseMove);
	canvas.addEventListener('mouseup', canvasMouseUp);
	/* Get access to 2D drawing on the canvas */
	ctx = canvas.getContext('2d');
	/* Initialise canvas size */
	canvasResize();
}

function canvasResize() {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
}

function canvasMouseDown(event) {
	/* Only respond to first mouse button */
	if (event.button !== 0) {
		return;
	}
	/* We are now drawing */
	drawing = true;
	last_pos = [event.offsetX, event.offsetY];
	/* Call move handler so that mouse-down causes drawing to happen */
	canvasMouseMove(event);
}

function canvasMouseMove(event) {
	if (!drawing) {
		return;
	}
	/* Set line style */
	ctx.strokeStyle = color;
	ctx.lineWidth = brush;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	/* Draw line from previous cursor position to current cursor position */
	ctx.beginPath();
	ctx.moveTo(last_pos[0], last_pos[1]);
	ctx.lineTo(event.offsetX, event.offsetY);
	ctx.stroke();
	/* Store cursor position */
	last_pos = [event.offsetX, event.offsetY];
}

function canvasMouseUp(event) {
	/* Only respond to first mouse button */
	if (event.button !== 0) {
		return;
	}
	/* We are not drawing now */
	drawing = false;
}

/*** Your canvas stuff ends from here ***/
/****************************************/

/* Now we have the brush size / color stuff */

function getElements(selector) {
	return [].slice.apply(document.querySelectorAll(selector));
}

function getBrushButtons() {
	return getElements('.brushes .button');
}

function getColorButtons() {
	return getElements('.colors .button');
}

/* Gets the size associated with a brush button, from its class */
function getBrushButtonValue(button) {
	return +button.querySelector('span').className.substr(4);
}

/* Gets the color associated with a color button, from its class */
function getColorButtonValue(button) {
	return button.querySelector('span').className;
}

/* Adds "click" event handlers to brush buttons */
function bindBrushButtons() {
	getBrushButtons().forEach(function (button) {
		button.addEventListener('click', function () { brushButtonClicked(button); });
	});
	brushButtonClicked(document.querySelector('.size3').parentNode);
}

/* Adds "click" event handlers to color buttons */
function bindColorButtons() {
	getColorButtons().forEach(function (button) {
		var value = +button.querySelector('span').className;
		button.addEventListener('click', function () { colorButtonClicked(button); });
	});
	colorButtonClicked(document.querySelector('.blue').parentNode);
}

/* Called when brush button is clicked */
function brushButtonClicked(selectedButton) {
	brush = getBrushButtonValue(selectedButton);
	getBrushButtons().forEach(function (button) {
		if (button === selectedButton) {
			button.classList.add('down');
		} else {
			button.classList.remove('down');
		}
	});
}

/* Called when color button is clicked */
function colorButtonClicked(selectedButton) {
	color = getColorButtonValue(selectedButton);
	getColorButtons().forEach(function (button) {
		if (button === selectedButton) {
			button.classList.add('down');
		} else {
			button.classList.remove('down');
		}
	});
}
