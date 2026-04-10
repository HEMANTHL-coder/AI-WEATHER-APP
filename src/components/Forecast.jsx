import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const Forecast = ({ forecastData, isDarkMode }) => {
  if (!forecastData || !forecastData.list) return null;

  // Filter 1 reading per day (approx every 8th item for roughly 24h intervals)
  const dailyData = forecastData.list.filter((reading, index) => index % 8 === 0).slice(0, 5);

  const labels = dailyData.map(d => {
    const date = new Date(d.dt * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  });

  const temperatures = dailyData.map(d => Math.round(d.main.temp));

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        fill: true,
        backgroundColor: 'rgba(99, 102, 241, 0.2)', // Indigo 500 w/ opacity
        borderColor: 'rgba(99, 102, 241, 1)',
        tension: 0.4,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { color: isDarkMode ? '#94a3b8' : '#64748b' },
        grid: { color: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
      },
      x: {
        ticks: { color: isDarkMode ? '#94a3b8' : '#64748b' },
        grid: { display: false },
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
        titleColor: isDarkMode ? '#f8fafc' : '#0f172a',
        bodyColor: isDarkMode ? '#cbd5e1' : '#475569',
        borderColor: isDarkMode ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        padding: 10,
        boxPadding: 4,
        usePointStyle: true,
      }
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 w-full max-w-2xl mx-auto mt-8">
      <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">5-Day Forecast</h3>
      <div className="h-64 w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Forecast;
