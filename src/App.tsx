import Bookmarks from "./components/Bookmarks";
import Clock from "./components/Clock";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="min-h-screen bg-ctp-base p-8 bg-center bg-cover bg-[url(https://raw.githubusercontent.com/yurihikari/garuda-hyprdots/refs/heads/master/backgrounds/mountain_sunset.jpg)]">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mx-auto">
        {/* Clock Widget */}
        <div className="col-span-1">
          <Clock />
        </div>

        {/* Weather Widget */}
        <div className="col-span-1">
          <Weather />
        </div>

        {/* Bookmarks Widget */}
        <div className="col-span-1 md:col-span-2 ">
          <Bookmarks />
        </div>
      </div>
    </div>
  );
}

export default App;
