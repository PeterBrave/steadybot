import { describe, expect, it } from "vitest";
import { seededRandom } from "./random.ts";

function take(seed: number, n: number): number[] {
  const random = seededRandom(seed);
  return Array.from({ length: n }, () => random.next());
}

describe("seededRandom", () => {
  it("repeats the same sequence for the same seed", () => {
    expect(take(42, 5)).toEqual(take(42, 5));
  });

  it("gives different sequences for different seeds", () => {
    expect(take(1, 5)).not.toEqual(take(2, 5));
  });

  it("stays in [0, 1)", () => {
    for (const value of take(7, 10_000)) {
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
