const fromHTML = (html) => {
	const helper = document.createElement("div")
	helper.innerHTML += html
	return helper.lastChild
}

function setupGreetings() {
	const message = "Greetings, I am Robert"
	const speed = 150
	let greetings = document.getElementById("greetings")
	if (greetings == null) {
		console.warn("Couldn't find greetings element.")
		return
	}

	let progress = 0

	let interval = setInterval(() => {
		greetings.textContent = "> " + message.slice(0, progress)
		progress++

		if (progress > greetings.length) {
			clearInterval(interval)
		}
	}, speed)
}

function setupBackground() {
	const maxCount = 100
	const autoDestroyTime = 10
	const hueStep = 0.35
	let background = document.getElementById("background")
	if (background == null) {
		console.warn("Couldn't find background.")
		return
	}

	let hue = 0

	setInterval(() => {
		if (background.childElementCount <= 0) {
			return
		}

		background.removeChild(background.firstChild)
	}, autoDestroyTime)

	window.addEventListener("mousemove", (event) => {
		const top = event.clientY + document.documentElement.scrollTop - 15
		const left = event.clientX - 15

		// let color = `hsla(${hue}, 35%, 50%, 0.125)`
		let color = `hsla(103, 35%, 56%, 0.125)`
		let point = fromHTML(`<div class="point" style="left: ${left}px; top: ${top}px; background-color: ${color}"></div>`)

		background.appendChild(point)

		hue += hueStep
		hue %= 360

		if (background.childElementCount > maxCount) {
			background.removeChild(background.firstChild)
		}
	})
}

function setupFadeIn() {
	const speed = 75
	const start = 20
	const step = 2
	let top = start
	let opacity = 0

	let elements = document.getElementsByClassName("fade-in")

	for (let i = 0; i < elements.length; i++) {
		elements[i].style.top = `${top * (i + 1)}px`
		elements[i].style.opacity = `${opacity}`
	}

	let interval = setInterval(() => {
		top -= step

		if (opacity < 100) {
			opacity += step / start
		}
		if (top <= 0) {
			clearInterval(interval)
		}

		for (let i = 0; i < elements.length; i++) {
			elements[i].style.opacity = `${opacity}`
			elements[i].style.top = `${top * (i + 1)}px`
		}
	}, speed)
}

window.onload = () => {
	setupGreetings()
	setupBackground()
	setupFadeIn()
}
