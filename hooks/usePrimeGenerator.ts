
import { useState, useRef, useCallback, useEffect } from 'react';
import { primeGenerator } from '../services/primeService';
import type { PrimeInfo } from '../types';

export const usePrimeGenerator = () => {
  const [primes, setPrimes] = useState<PrimeInfo[]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const generator = useRef<Generator<bigint, void, unknown> | null>(null);
  const processTimerRef = useRef<number | null>(null);
  const clockTimerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const stopProcessing = () => {
    if (processTimerRef.current) {
      clearTimeout(processTimerRef.current);
      processTimerRef.current = null;
    }
     if (clockTimerRef.current) {
      clearInterval(clockTimerRef.current);
      clockTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (isRunning) {
      if (!generator.current) {
        const startFrom = primes.length > 0 ? BigInt(primes[primes.length - 1].n) + 1n : 2n;
        generator.current = primeGenerator(startFrom);
      }
      
      startTimeRef.current = performance.now() - elapsedTime;

      clockTimerRef.current = window.setInterval(() => {
        setElapsedTime(performance.now() - startTimeRef.current);
      }, 1000);

      const processBatch = () => {
        const batch: Omit<PrimeInfo, 'idx'>[] = [];
        const batchStartTime = performance.now();
        
        // Process for a max of 50ms to keep the UI responsive
        while (performance.now() - batchStartTime < 50) {
          if (!generator.current) break;
          const next = generator.current.next();
          if (next.done) break;

          const p = next.value;
          batch.push({
            n: p.toString(),
            bits: p.toString(2).length,
            digits: p.toString(10).length,
          });
        }

        if (batch.length > 0) {
          setPrimes(prevPrimes => {
            const newPrimesWithIndex = batch.map((p, i) => ({
              ...p,
              idx: prevPrimes.length + i + 1,
            }));
            return [...prevPrimes, ...newPrimesWithIndex];
          });
        }
        
        // Schedule the next batch
        processTimerRef.current = window.setTimeout(processBatch, 10);
      };
      
      processBatch();
    }

    return stopProcessing;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    generator.current = null;
    setPrimes([]);
    setElapsedTime(0);
  }, []);

  return { primes, isRunning, elapsedTime, start, pause, reset };
};
