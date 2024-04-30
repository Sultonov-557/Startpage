const cookie = JSON.parse(document.cookie);

const time = document.querySelector("#time");
const weather = document.querySelector("#weather");
const joke = document.querySelector("#joke");

setWeather();
setJoke();

async function setJoke() {
  const req = await fetch(`https://api.api-ninjas.com/v1/jokes`, { headers: { "X-API-Key": cookie.ninja } });
  const data = await req.json();

  joke.innerHTML = data[0].joke;
}

async function setWeather() {
  const req = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Xonqa&appid=${cookie.weather}&units=metric`
  );
  const data = await req.json();
  const text = `temp: ${data.main.temp}\nweather: ${data.weather[0].description}`;

  weather.innerHTML = text;
}

setInterval(() => {
  let timeString = new Date().toLocaleTimeString(undefined, {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  let dateString = new Date().toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    weekday: "short",
  });

  time.innerHTML = `${timeString}
${dateString}`;
}, 500);
