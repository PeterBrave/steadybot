import { SteadyError } from "./errors.ts";

/** The only way product code reads the current time, so tests and evals can control it. */
export interface Clock {
  now(): Date;
}

export const systemClock: Clock = {
  now: () => new Date(),
};

/** A clock that moves only when a test moves it. */
export class FakeClock implements Clock {
  #ms: number;

  constructor(start: Date | string | number = "2026-01-01T00:00:00.000Z") {
    this.#ms = toMs(start);
  }

  now(): Date {
    return new Date(this.#ms);
  }

  advance(ms: number): void {
    if (!Number.isFinite(ms) || ms < 0) {
      throw new SteadyError(
        "harness",
        "fake_clock.invalid_advance",
        `A fake clock can only move forward by a finite amount, got ${ms}`,
      );
    }
    this.#ms += ms;
  }

  set(time: Date | string | number): void {
    this.#ms = toMs(time);
  }
}

function toMs(time: Date | string | number): number {
  const ms = new Date(time).getTime();
  if (Number.isNaN(ms)) {
    throw new SteadyError("harness", "fake_clock.invalid_time", `Invalid time: ${String(time)}`);
  }
  return ms;
}
