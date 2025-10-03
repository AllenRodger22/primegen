
// Using BigInt for arbitrary-precision integers
const SMALL_PRIMES: bigint[] = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n];
const MR_BASES: bigint[] = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]; // Bases for Miller-Rabin

/**
 * Calculates (base^exp) % mod efficiently.
 * @param base The base
 * @param exp The exponent
 * @param mod The modulus
 * @returns The result of (base^exp) % mod
 */
function power(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  base %= mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    exp >>= 1n; // exp = exp / 2
    base = (base * base) % mod;
  }
  return res;
}

/**
 * Checks if a number is probably prime using the Miller-Rabin test.
 * @param n The number to test. Must be a BigInt.
 * @returns True if n is probably prime, false otherwise.
 */
export function isProbablePrime(n: bigint): boolean {
  if (n < 2n) return false;
  
  for (const p of SMALL_PRIMES) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }

  // Find d and s such that n-1 = d * 2^s
  let d = n - 1n;
  let s = 0n;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    s += 1n;
  }

  for (const a of MR_BASES) {
    if (a >= n) break;
    let x = power(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    let i = 0n;
    for (i = 0n; i < s - 1n; i++) {
      x = (x * x) % n;
      if (x === n - 1n) break;
    }
    // If we didn't break, then the number is composite
    if (i === s - 1n) return false;
  }
  
  return true;
}

/**
 * A generator function that yields an infinite sequence of prime numbers.
 * @param startFrom The number to start searching from.
 */
export function* primeGenerator(startFrom: bigint): Generator<bigint, void, unknown> {
  let n = startFrom;
  if (n <= 2n) {
    yield 2n;
    n = 3n;
  } else if (n % 2n === 0n) {
    n += 1n;
  }

  while (true) {
    if (isProbablePrime(n)) {
      yield n;
    }
    n += 2n;
  }
}
