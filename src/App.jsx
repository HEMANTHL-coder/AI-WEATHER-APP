import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import AISuggestions from './components/AISuggestions';
import { useWeather } from './hooks/useWeather';
import { useGemini } from './hooks/useGemini';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark') return true;
    if (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches) return true;
    return false;
  });

  const { weatherData, forecastData, loading: weatherLoading, error: weatherError, fetchWeather } = useWeather();
  const { insights, loadingAI, errorAI, generateInsights } = useGemini();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleFetchAndGen = useCallback(async (type, p1, p2) => {
    const data = await fetchWeather(type, p1, p2);
    if (data) {
      generateInsights(data);
      if (type === 'city') localStorage.setItem('lastCity', p1);
    }
  }, [fetchWeather, generateInsights]);

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      handleFetchAndGen('city', lastCity);
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleFetchAndGen('coords', position.coords.latitude, position.coords.longitude);
        },
        (err) => {
          console.log('Geolocation denied or failed. Showing default city.');
          handleFetchAndGen('city', 'London');
        }
      );
    } else {
      handleFetchAndGen('city', 'London');
    }
  }, [handleFetchAndGen]);

  const handleSearch = (query) => {
    handleFetchAndGen('city', query);
  };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-300">
      {/* Background gradients for premium feel */}
      <div className="fixed inset-0 z-0 bg-slate-50 dark:bg-slate-900 pointer-events-none transition-colors duration-300">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-4 flex flex-col items-center">
          <div className="text-center w-full mt-4 mb-4">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              Predict the <span className="text-indigo-500">Unpredictable</span>
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">
              Real-time accurate weather paired with Google Gemini insights to plan your perfect day.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          {weatherError && (
            <div className="text-red-500 dark:text-red-400 text-center bg-red-100 dark:bg-red-900/20 p-4 rounded-xl w-full max-w-2xl mb-6">
              {weatherError}
            </div>
          )}

          {weatherLoading && !weatherData ? (
             <div className="flex justify-center my-12">
               <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
             </div>
          ) : (
            <div className="w-full flex justify-center mt-4">
              <WeatherCard weather={weatherData} />
            </div>
          )}

          {weatherData && (
             <div className="w-full mt-8 mb-16 flex flex-col xl:flex-row gap-8 items-start justify-center">
               <div className="w-full xl:w-1/2">
                 <AISuggestions insights={insights} loading={loadingAI} error={errorAI} />
               </div>
               <div className="w-full xl:w-1/2">
                 <Forecast forecastData={forecastData} isDarkMode={darkMode} />
               </div>
             </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
