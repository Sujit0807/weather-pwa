import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);

      setWeather(data);
      setQuery("");
    }
  };

  return (
    <div
      className="bg-no-repeat h-screen flex flex-col justify-center items-center bg-cover"
      style={{ background: `#07152E` }}
    >
      <input
        type="text"
        className="outline-none py-5 px-12 rounded-2xl border-none mb-16 bg-slate-200 text-lg"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      {weather.main && (
        <div className="w-80 flex flex-col items-center justify-center py-10 rounded-xl bg-slate-200 shadow-md">
          <h2>
            <span className="text-2xl font-bold">{weather.name}</span>
            <sup className="py-1 px-2 ml-2 text-white text-md font-semibold rounded-xl bg-orange-400">
              {weather.sys.country}
            </sup>
          </h2>
          <div className="text-center text-6xl font-bold mt-8 text-slate-800">
            {Math.round(weather.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="mt-5 w-32 h-32"
            />
            <p className="mt-5 uppercase tracking-wider">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
