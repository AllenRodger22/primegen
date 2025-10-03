
import React from 'react';
import { PlayIcon, PauseIcon, ArrowPathIcon, ArrowDownTrayIcon } from './Icons';

interface ControlPanelProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onDownload: () => void;
  hasPrimes: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
  onDownload,
  hasPrimes,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105"
        >
          <PlayIcon />
          Start
        </button>
      ) : (
        <button
          onClick={onPause}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 text-slate-900 font-semibold rounded-lg shadow-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-all duration-200 transform hover:scale-105"
        >
          <PauseIcon />
          Pause
        </button>
      )}

      <button
        onClick={onReset}
        disabled={!hasPrimes && !isRunning}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-lg hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-75 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform enabled:hover:scale-105"
      >
        <ArrowPathIcon />
        Reset
      </button>

      <button
        onClick={onDownload}
        disabled={!hasPrimes}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-500 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform enabled:hover:scale-105"
      >
        <ArrowDownTrayIcon />
        Download CSV
      </button>
    </div>
  );
};

export default ControlPanel;
