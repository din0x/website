const fromHTML = (html) => {
	const helper = document.createElement("div")
	helper.innerHTML += html
	return helper.lastChild
}

function setupGreetings() {
	const message = "Greetings, I am Robert"
	const speed = 150
	let greetings = document.getElementById("greetings")
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
	let count = 0
	let hue = 0

	setInterval(() => {
		if (count <= 0) {
			return
		}

		background.removeChild(background.firstChild)
		count--
	}, autoDestroyTime)

	window.addEventListener("mousemove", (event) => {
		const top = event.clientY + document.documentElement.scrollTop - 15
		const left = event.clientX - 15

		let point = fromHTML(`<div class="point" style="left: ${left}px; top: ${top}px; background-color: hsla(${hue}, 35%, 50%, 0.125"></div>`)

		background.appendChild(point)
		count++

		hue += hueStep
		hue %= 360

		if (count > maxCount) {
			background.removeChild(background.firstChild)
			count--
		}
	})
}

window.onload = () => {
	setupGreetings()
	setupBackground()
}
