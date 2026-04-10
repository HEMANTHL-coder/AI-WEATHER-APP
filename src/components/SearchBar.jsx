import React, { useState, useEffect } from 'react';
import { FiSearch, FiMic } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      onSearch(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto my-8 px-4">
      <div className="relative group flex items-center">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <FiSearch className="text-slate-400 text-xl group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type="text"
          className="block w-full p-4 pl-12 pr-16 text-lg text-slate-900 border border-slate-300 rounded-3xl bg-white/70 dark:bg-slate-800/70 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-lg backdrop-blur-md"
          placeholder="Search any city or zip code..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          onClick={handleVoiceSearch}
          className={`absolute inset-y-0 right-2 my-2 px-3 flex items-center justify-center rounded-2xl transition-colors ${
            isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-300'
          }`}
          aria-label="Voice Search"
        >
          <FiMic className="text-xl" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
