const fromHTML = (html) => {
	const helper = document.createElement("div");
	helper.innerHTML += html;
	return helper.lastChild;
};

function setupGreetings() {
	const message = "Greetings, I am Robert";
	const speed = 150;
	let greetings = document.getElementById("greetings");
	if (greetings == null) {
		console.warn("Couldn't find greetings element.");
		return;
	}

	let progress = 0;

	const interval = setInterval(() => {
		greetings.textContent = "> " + message.slice(0, progress);
		progress++;

		if (progress > greetings.length) {
			clearInterval(interval);
		}
	}, speed);
}

function setupBackground() {
	const maxCount = 100;
	const autoDestroyTime = 25;
	const hueStep = 0.35;
	const width = 10;

	const background = document.getElementById("background");
	if (background == null) {
		console.warn("Couldn't find background.");
		return;
	}

	let hue = 0;

	/**
	 * @param {number} x1
	 * @param {number} y1
	 * @param {number} x2
	 * @param {number} y2
	 */
	function drawLine(x1, y1, x2, y2, color) {
		x1 -= width / 2;
		y1 -= width / 2;
		x2 -= width / 2;
		y2 -= width / 2;

		const length = Math.sqrt(Math.abs((x1 - x2) * (x1 - x2)) + Math.abs((y1 - y2) * (y1 - y2)));

		const left = x1 - (x1 - x2) / 2 - length / 2;
		const top = y1 - (y1 - y2) / 2;
		const rotate = -Math.atan2(x1 - x2, y1 - y2) + Math.PI / 2;

		background.appendChild(fromHTML(`<div style="position: absolute; display: inline-block; left: ${left}px; top: ${top}px; width: ${length + 5}px; height: ${width}px; transform: rotate(${rotate}rad); border-radius: 100%; background-color: ${color}"></div>`));
	}

	setInterval(() => {
		if (background.childElementCount <= 0) {
			return;
		}

		background.removeChild(background.firstChild);
	}, autoDestroyTime);

	let lastX = null;
	let lastY = null;

	window.addEventListener("mousemove", (event) => {
		const top = event.clientY + document.documentElement.scrollTop;
		const left = event.clientX;

		// let color = `hsla(${hue}, 35%, 50%, 0.125)`;
		let color = `hsla(103, 35%, 56%, 0.125)`

		drawLine(lastX, lastY, left, top, color);

		lastX = left;
		lastY = top;

		hue += hueStep;
		hue %= 360;

		if (background.childElementCount > maxCount) {
			background.removeChild(background.firstChild);
		}
	});
}

function setupFadeIn() {
	const speed = 75;
	const start = 20;
	const step = 2;
	let top = start;
	let opacity = 0;

	let elements = document.getElementsByClassName("fade-in");

	for (let i = 0; i < elements.length; i++) {
		elements[i].style.top = `${top * (i + 1)}px`;
		elements[i].style.opacity = `${opacity}`;
	}

	let interval = setInterval(() => {
		top -= step;

		if (opacity < 100) {
			opacity += step / start;
		}
		if (top <= 0) {
			clearInterval(interval);
		}

		for (let i = 0; i < elements.length; i++) {
			elements[i].style.opacity = `${opacity}`;
			elements[i].style.top = `${top * (i + 1)}px`;
		}
	}, speed);
}

window.onload = () => {
	setupGreetings();
	setupBackground();
	setupFadeIn();
};
