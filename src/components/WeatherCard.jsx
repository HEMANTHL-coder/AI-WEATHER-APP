import React from 'react';
import { FiWind, FiDroplet, FiSun, FiCloud, FiCloudRain, FiCloudSnow, FiCloudLightning } from 'react-icons/fi';

const getWeatherIcon = (description) => {
  const desc = description.toLowerCase();
  if (desc.includes('clear')) return <FiSun className="text-yellow-400 text-6xl drop-shadow-md" />;
  if (desc.includes('rain')) return <FiCloudRain className="text-blue-400 text-6xl drop-shadow-md" />;
  if (desc.includes('snow')) return <FiCloudSnow className="text-white text-6xl drop-shadow-md" />;
  if (desc.includes('thunderstorm')) return <FiCloudLightning className="text-purple-400 text-6xl drop-shadow-md" />;
  return <FiCloud className="text-slate-400 text-6xl drop-shadow-md" />;
};

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, sys, main, weather: weatherDetails, wind } = weather;
  const condition = weatherDetails[0];

  return (
    <div className="glass-panel rounded-3xl p-8 max-w-md w-full mx-auto relative overflow-hidden transition-all hover:shadow-2xl">
      {/* Decorative Blob */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="flex justify-between items-center mb-6 relative">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{name}, {sys.country}</h2>
          <p className="text-slate-500 dark:text-slate-400 capitalize text-lg">{condition.description}</p>
        </div>
        <div>
          {getWeatherIcon(condition.description)}
        </div>
      </div>

      <div className="mb-8 relative">
        <div className="flex items-start">
          <span className="text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            {Math.round(main.temp)}
          </span>
          <span className="text-3xl font-bold mt-2 ml-1 text-slate-500">°C</span>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Feels like {Math.round(main.feels_like)}°C
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 relative">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-500">
            <FiDroplet className="text-xl" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Humidity</p>
            <p className="text-lg font-bold">{main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/40 dark:bg-slate-800/40">
          <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-xl text-teal-500">
            <FiWind className="text-xl" />
          </div>
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Wind</p>
            <p className="text-lg font-bold">{(wind.speed * 3.6).toFixed(1)} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
