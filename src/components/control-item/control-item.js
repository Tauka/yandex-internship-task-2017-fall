const inactiveColor = {
	r:84,
	g:223,
	b:22
}

const activeColor = {
	r:74,
	g:74,
	b:74
}
// e

//@ from stackoverflow
// https://stackoverflow.com/questions/11292649/javascript-color-animation
lerp = function(a, b, u) {
    return (1 - u) * a + u * b;
};

fade = function(element, property, start, end, duration) {
    var interval = 10;
    var steps = duration / interval;
    var step_u = 1.0 / steps;
    var u = 0.0;
    var theInterval = setInterval(function() {
        if (u >= 1.0) {
            clearInterval(theInterval);
        }
        var r = Math.round(lerp(start.r, end.r, u));
        var g = Math.round(lerp(start.g, end.g, u));
        var b = Math.round(lerp(start.b, end.b, u));
        var colorname = 'rgb(' + r + ',' + g + ',' + b + ')';
        element.style.setProperty(property, colorname);
        u += step_u;
    }, interval);
};

const checkboxElements = document.getElementsByClassName("control-item__checkbox-input");
for (let i = 0; i < checkboxElements.length; i++) {
	checkboxElements[i].addEventListener("change", function(e) {
		e.target.checked ? fade(this.parentElement, 'background-color', activeColor, inactiveColor, 300) : fade(this.parentElement, 'background-color', inactiveColor, activeColor, 300);
	});
}