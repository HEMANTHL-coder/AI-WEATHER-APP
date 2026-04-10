import { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (queryType, param1, param2 = null) => {
    if (!API_KEY) {
      setError('API Key is missing! Please configure VITE_WEATHER_API_KEY in .env');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let weatherUrl = '';
      let forecastUrl = '';

      if (queryType === 'city') {
        weatherUrl = `${BASE_URL}/weather?q=${param1}&units=metric&appid=${API_KEY}`;
        forecastUrl = `${BASE_URL}/forecast?q=${param1}&units=metric&appid=${API_KEY}`;
      } else if (queryType === 'coords') {
        weatherUrl = `${BASE_URL}/weather?lat=${param1}&lon=${param2}&units=metric&appid=${API_KEY}`;
        forecastUrl = `${BASE_URL}/forecast?lat=${param1}&lon=${param2}&units=metric&appid=${API_KEY}`;
      }

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(weatherUrl),
        axios.get(forecastUrl)
      ]);

      setWeatherData(weatherRes.data);
      // We'll process forecast data later in the component or here. It returns data in 3-hour intervals.
      // Usually forecastRes.data.list contains 40 items.
      setForecastData(forecastRes.data);
      
      return weatherRes.data;
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch weather data.');
      setWeatherData(null);
      setForecastData(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { weatherData, forecastData, loading, error, fetchWeather };
};
