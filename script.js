const time = document.querySelector("#time");

setInterval(() => {
	let timeString = new Date().toLocaleTimeString(undefined, { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
	let dateString = new Date().toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "2-digit", weekday: "short" });

	time.innerHTML = 
`${timeString}
${dateString}`;
}, 100);
