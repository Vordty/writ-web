var clickCoords;
var clickCoordsX;
var clickCoordsY;

var menuWidth;
var menuHeight;

var windowWidth;
var windowHeight;

const getPosition = e => {
	var posx = 0;
	var posy = 0;

	if (!e) var e = window.event;

	if (e.pageX || e.pageY) {
		posx = e.pageX;
		posy = e.pageY;
	} else if (e.clientX || e.clientY) {
		posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}

	return {
		x: posx,
		y: posy
	};
};

export const positionMenu = (e, menu) => {
	clickCoords = getPosition(e);
	clickCoordsX = clickCoords.x;
	clickCoordsY = clickCoords.y;

	menuWidth = menu.offsetWidth + 4;
	menuHeight = menu.offsetHeight + 4;

	windowWidth = window.innerWidth;
	windowHeight = window.innerHeight;

	if (windowWidth - clickCoordsX < menuWidth) {
		menu.style.left = windowWidth - menuWidth + "px";
	} else {
		menu.style.left = clickCoordsX + "px";
	}

	if (windowHeight - clickCoordsY < menuHeight) {
		menu.style.top = windowHeight - menuHeight + "px";
	} else {
		menu.style.top = clickCoordsY + "px";
	}
};
