
import React, { useRef, useEffect } from 'react';
import type { PrimeInfo } from '../types';

interface PrimeDisplayProps {
  primes: PrimeInfo[];
  primeCount: number;
  lastPrime: PrimeInfo | null;
  elapsedTime: number;
  isRunning: boolean;
}

const StatCard: React.FC<{ title: string; value: string | number; className?: string }> = ({ title, value, className }) => (
  <div className={`bg-slate-900/70 p-4 rounded-lg text-center border border-slate-700 ${className}`}>
    <dt className="text-sm font-medium text-slate-400 truncate">{title}</dt>
    <dd className="mt-1 text-2xl font-semibold tracking-tight text-cyan-300 break-all">{value}</dd>
  </div>
);


const PrimeDisplay: React.FC<PrimeDisplayProps> = ({ primes, primeCount, lastPrime, elapsedTime, isRunning }) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom of the table
  useEffect(() => {
    if (tableContainerRef.current) {
      const { scrollHeight } = tableContainerRef.current;
      tableContainerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    }
  }, [primes]);
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const displayedPrimes = primes.slice(-100);

  return (
    <div className="mt-4">
      <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard title="Primes Found" value={primeCount.toLocaleString()} />
        <StatCard title="Elapsed Time" value={formatTime(elapsedTime)} />
        <StatCard title="Last Prime Found" value={lastPrime ? lastPrime.n : 'N/A'} className="sm:col-span-1" />
      </dl>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div ref={tableContainerRef} className="h-96 overflow-y-auto rounded-lg shadow ring-1 ring-slate-700">
              <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-slate-800 sticky top-0">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-100 sm:pl-6">Index</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100">Prime Number (n)</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100">Bits</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-slate-100">Digits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-slate-900/50">
                  {displayedPrimes.length > 0 ? (
                    displayedPrimes.map((prime) => (
                      <tr key={prime.idx} className="hover:bg-slate-700/50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-300 sm:pl-6">{prime.idx.toLocaleString()}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-cyan-400 font-mono">{prime.n}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{prime.bits}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-300">{prime.digits}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-10 text-slate-500">
                        {isRunning ? 'Searching for primes...' : 'Press Start to begin generating primes.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
             {primes.length > 100 && (
              <p className="text-center text-sm text-slate-500 mt-2">
                Showing the last 100 primes. Download CSV for the full list.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrimeDisplay;
