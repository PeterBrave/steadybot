import { describe, expect, it } from "vitest";
import { FakeClock, systemClock } from "./clock.ts";
import { errorKindOf } from "./errors.ts";

describe("FakeClock", () => {
  it("moves only when told to", () => {
    const clock = new FakeClock("2026-10-20T08:00:00.000Z");
    expect(clock.now().toISOString()).toBe("2026-10-20T08:00:00.000Z");

    clock.advance(90_000);
    expect(clock.now().toISOString()).toBe("2026-10-20T08:01:30.000Z");

    clock.set("2026-10-21T00:00:00.000Z");
    expect(clock.now().toISOString()).toBe("2026-10-21T00:00:00.000Z");
  });

  it("hands out a fresh Date each time", () => {
    const clock = new FakeClock("2026-01-01T00:00:00.000Z");
    clock.now().setUTCFullYear(2000);
    expect(clock.now().getUTCFullYear()).toBe(2026);
  });

  it("reports misuse as a harness error", () => {
    const clock = new FakeClock();
    expect(thrownKind(() => new FakeClock("not a date"))).toBe("harness");
    expect(thrownKind(() => clock.advance(-1))).toBe("harness");
    expect(thrownKind(() => clock.advance(Number.NaN))).toBe("harness");
    expect(thrownKind(() => clock.set("still not a date"))).toBe("harness");
  });
});

function thrownKind(fn: () => unknown): string {
  try {
    fn();
  } catch (error) {
    return errorKindOf(error);
  }
  return "nothing thrown";
}

describe("systemClock", () => {
  it("reads the real time", () => {
    const before = Date.now();
    const now = systemClock.now().getTime();
    expect(now).toBeGreaterThanOrEqual(before);
    expect(now).toBeLessThanOrEqual(Date.now());
  });
});
