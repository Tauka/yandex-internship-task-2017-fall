const loaderBar = document.getElementById("loader-bar");
const arc1 = document.getElementById("loader-arc1");
const arc2 = document.getElementById("loader-arc2");
const valueInput = document.getElementById("js-control-item_value");
const animateCheckbox = document.getElementById("js-control-item_animate");
const hideCheckbox = document.getElementById("js-control-item_hide");

valueInput.addEventListener("change", onValueChange);
animateCheckbox.addEventListener("change", onAnimateCheck);
hideCheckbox.addEventListener("change", onHideCheck);


let percentageToCoordinates = function(radius, percentage) {
	percentage1 = isNaN(percentage) ? 0 : percentage;
	const percentage2 = (percentage - 50) > 0 ? (percentage - 50) : 0;

	// we double angle to get full arc at 50%
	let angle1 = ((percentage1 / 100) * Math.PI) * 2;
	let angle2 = ((percentage2 / 100) * Math.PI) * 2;

	angle1 = Math.max(0, Math.min(angle1, Math.PI));
	angle2 = Math.max(0, Math.min(angle2, Math.PI));

	let x1 = radius * (1 + Math.sin(angle1))
	let y1 = radius * (1 - Math.cos(angle1))
	let x2 = radius * (1 - Math.sin(angle2))
	let y2 = radius * (1 + Math.cos(angle2))

	// translate origin to the starting point of arc (arc1 - (r; 0), arc2 - (r; 2r))
	x1 = x1 - radius;
	x2 = x2 - radius;
	y2 = y2 - 2 * radius;

	return {
		x1: x1,
		y1: y1,
		x2: x2,
		y2: y2
	}
}

function onValueChange(e) {
	const coordinates = percentageToCoordinates(parseInt(e.target.value));
	arc1.setAttribute('d', updatePathArc1(coordinates.x1, coordinates.y1));
	arc2.setAttribute('d', updatePathArc2(coordinates.x2, coordinates.y2));
}

function onAnimateCheck(e) {
	e.target.checked ? loaderBar.classList.add("loader__bar_animate") : loaderBar.classList.remove("loader__bar_animate");
}

function onHideCheck(e) {
	e.target.checked ? loaderBar.classList.add("loader__bar_hide") : loaderBar.classList.remove("loader__bar_hide");
}

let updatePathArc1 = function(centerX, centerY, radiusX, radiusY, x, y) {
	return `M ${centerX},${centerY} m 0, -${radiusX} a ${radiusX},${radiusY} 0 0,1 ${x},${y}`;
}

let updatePathArc2 = function(centerX, centerY, radiusX, radiusY, x, y) {
	return `M ${centerX},${centerY} m 0, ${radiusX} a ${radiusX},${radiusY} 0 0,1 ${x},${y}`;
}

function parsePathD(dString) {
	const centerXY = dString.match(/M (\d+,\d+)/)[1].split(',');
	const radiusXY = dString.match(/a (\d+,\d+)/)[1].split(',');

	percentageToCoordinates = percentageToCoordinates.bind(null, radiusXY[0]);
	updatePathArc1 = updatePathArc1.bind(null, centerXY[0], centerXY[1], radiusXY[0], radiusXY[1]);
	updatePathArc2 = updatePathArc2.bind(null, centerXY[0], centerXY[1], radiusXY[0], radiusXY[1]);
}

parsePathD(arc1.getAttribute('d'));





