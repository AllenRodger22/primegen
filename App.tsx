
import React, { useCallback } from 'react';
import { usePrimeGenerator } from './hooks/usePrimeGenerator';
import ControlPanel from './components/ControlPanel';
import PrimeDisplay from './components/PrimeDisplay';

const App: React.FC = () => {
  const {
    primes,
    isRunning,
    elapsedTime,
    start,
    pause,
    reset,
  } = usePrimeGenerator();

  const downloadCSV = useCallback(() => {
    if (primes.length === 0) {
      alert("No primes generated yet to download.");
      return;
    }

    const header = ['idx', 'n', 'bits', 'digits'];
    const rows = primes.map(p => [p.idx, p.n, p.bits, p.digits]);
    const csvContent = [
      header.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    link.href = URL.createObjectURL(blob);
    link.download = `primes_${new Date().toISOString()}.csv`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }, [primes]);

  const primeCount = primes.length;
  const lastPrime = primeCount > 0 ? primes[primeCount - 1] : null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl mx-auto bg-slate-800/50 rounded-2xl shadow-2xl shadow-cyan-500/10 backdrop-blur-sm border border-slate-700">
        <header className="p-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-center text-cyan-400 tracking-wider">
            Infinite Prime Number Generator
          </h1>
          <p className="text-center text-slate-400 mt-2">
            Continuously discovering primes with Miller-Rabin primality test.
          </p>
        </header>

        <main className="p-6">
          <ControlPanel
            isRunning={isRunning}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onDownload={downloadCSV}
            hasPrimes={primeCount > 0}
          />
          <PrimeDisplay
            primes={primes}
            primeCount={primeCount}
            lastPrime={lastPrime}
            elapsedTime={elapsedTime}
            isRunning={isRunning}
          />
        </main>
      </div>
       <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Built by a world-class senior frontend React engineer.</p>
      </footer>
    </div>
  );
};

export default App;
