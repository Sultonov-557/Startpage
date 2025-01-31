import { useEffect, useState } from "react";
import { FaTemperatureHigh, FaWind, FaTint, FaCloud, FaCompass } from "react-icons/fa";

export default function Weather() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m,cloudcover"
    )
      .then((res) => res.json())
      .then((data) => {
        const currentWeather = data.current_weather;
        const hourlyData = data.hourly;
        const currentIndex = new Date().getHours(); // Get current hour index

        setWeather({
          temperature: currentWeather.temperature,
          weathercode: currentWeather.weathercode,
          windspeed: currentWeather.windspeed,
          winddirection: currentWeather.winddirection, // Add wind direction
          humidity: hourlyData.relativehumidity_2m[currentIndex],
          cloudcover: hourlyData.cloudcover[currentIndex],
        });
      });
  }, []);

  if (!weather) return <div>Loading weather...</div>;

  // Map weather codes to human-readable conditions
  const weatherConditions: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  // Convert wind direction degrees to cardinal direction
  const getWindDirection = (degrees: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degrees % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div className="glass p-6 rounded-lg">
      <div className="grid grid-cols-2 gap-6">
        {/* Temperature */}
        <div className="flex items-center gap-4">
          <FaTemperatureHigh className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 text-2xl font-bold">{weather.temperature}°C</p>
          </div>
        </div>

        {/* Condition */}
        <div className="flex items-center gap-4">
          <FaCloud className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 text-2xl font-bold">{weatherConditions[weather.weathercode] || "Unknown"}</p>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="flex items-center gap-4">
          <FaWind className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 text-2xl font-bold">{weather.windspeed} km/h</p>
          </div>
        </div>

        {/* Wind Direction */}
        <div className="flex items-center gap-4">
          <FaCompass className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 text-2xl font-bold">{getWindDirection(weather.winddirection)}</p>
          </div>
        </div>

        {/* Humidity */}
        <div className="flex items-center gap-4">
          <FaTint className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 text-2xl font-bold">{weather.humidity}%</p>
          </div>
        </div>

        {/* Cloud Cover */}
        <div className="flex items-center gap-4">
          <FaCloud className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 text-2xl font-bold">{weather.cloudcover}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
