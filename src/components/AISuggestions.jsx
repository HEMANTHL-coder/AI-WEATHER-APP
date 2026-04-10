import React from 'react';
import { FiCpu, FiAlertCircle } from 'react-icons/fi';

const AISuggestions = ({ insights, loading, error }) => {
  if (!loading && !insights && !error) return null;

  return (
    <div className="glass-panel rounded-3xl p-6 w-full max-w-2xl mx-auto mt-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300 border border-t-[3px] border-t-purple-500">
      <div className="absolute top-0 right-0 p-4 opacity-10 drop-shadow-md">
        <FiCpu className="text-6xl text-purple-600 dark:text-purple-400" />
      </div>
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
          <FiCpu className="text-purple-600 dark:text-purple-400 text-xl" />
        </div>
        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
          Gemini AI Insights
        </h3>
      </div>

      <div className="relative z-10">
        {loading && (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/10 rounded-xl">
            <FiAlertCircle className="text-xl mt-0.5" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {!loading && insights && (
          <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap text-sm sm:text-base">
            {insights}
          </div>
        )}
      </div>
    </div>
  );
};

export default AISuggestions;
