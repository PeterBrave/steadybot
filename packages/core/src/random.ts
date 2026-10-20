/** Randomness for product code (retry jitter, sampling), replaceable in tests and evals. */
export interface Random {
  /** A float in [0, 1). */
  next(): number;
}

export const mathRandom: Random = {
  next: () => Math.random(),
};

/** Same seed, same sequence (mulberry32). Never use it for secrets or tokens. */
export function seededRandom(seed: number): Random {
  let state = seed >>> 0;
  return {
    next() {
      state = (state + 0x6d2b79f5) >>> 0;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    },
  };
}
