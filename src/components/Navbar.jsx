import React from 'react';
import { FiSun, FiMoon, FiCloudDrizzle } from 'react-icons/fi';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="flex justify-between items-center py-6 px-4 sm:px-8 w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
          <FiCloudDrizzle className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
          AI Weather Pro
        </h1>
      </div>
      
      <button 
        onClick={toggleDarkMode}
        className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors duration-300 shadow-sm border border-slate-200 dark:border-slate-700 glass-panel"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <FiSun className="text-yellow-400 text-xl" /> : <FiMoon className="text-slate-600 text-xl" />}
      </button>
    </nav>
  );
};

export default Navbar;
