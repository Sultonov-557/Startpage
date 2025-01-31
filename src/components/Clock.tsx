import { useEffect, useState } from "react";
import { FaClock, FaCalendarDay, FaSun, FaMoon } from "react-icons/fa";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [sunTimes, setSunTimes] = useState<{ sunrise: string; sunset: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Fetch sunrise and sunset times
    fetch("https://api.sunrise-sunset.org/json?lat=51.5074&lng=-0.1278&formatted=0")
      .then((res) => res.json())
      .then((data) => {
        const sunrise = new Date(data.results.sunrise).toLocaleTimeString("en-US", { hour12: false });
        const sunset = new Date(data.results.sunset).toLocaleTimeString("en-US", { hour12: false });
        setSunTimes({ sunrise, sunset });
      });
  }, []);

  // Get the day of the week
  const dayOfWeek = time.toLocaleDateString("en-US", { weekday: "long" });

  // Get a greeting based on the time of day
  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="glass p-6 rounded-lg">
      <div className="gap-6 grid grid-cols-2">
        {/* Greeting */}
        <div className="flex items-center space-x-4">
          <FaClock className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 font-bold text-2xl">{getGreeting()}</p>
          </div>
        </div>

        {/* Current Time */}
        <div className="flex items-center space-x-4">
          <FaClock className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-subtext0 font-bold text-2xl">
              {time.toLocaleTimeString("en-US", { hour12: false })}
            </p>
          </div>
        </div>

        {/* Day of the Week */}
        <div className="flex items-center space-x-4">
          <FaCalendarDay className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-text text-2xl font-bold">{dayOfWeek}</p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center space-x-4">
          <FaCalendarDay className="text-5xl text-ctp-mauve" />
          <div>
            <p className="text-ctp-text text-2xl font-bold">{time.toLocaleDateString()}</p>
          </div>
        </div>

        {/* Sunrise */}
        {sunTimes && (
          <div className="flex items-center space-x-4">
            <FaSun className="text-5xl text-ctp-mauve" />
            <div>
              <p className="text-ctp-text text-2xl font-bold">{sunTimes.sunrise}</p>
            </div>
          </div>
        )}

        {/* Sunset */}
        {sunTimes && (
          <div className="flex items-center space-x-4">
            <FaMoon className="text-5xl text-ctp-mauve" />
            <div>
              <p className="text-ctp-text text-2xl font-bold">{sunTimes.sunset}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
