import { describe, expect, it } from "vitest";
import { errorKindOf } from "./errors.ts";
import { randomIds, SequentialIds } from "./ids.ts";

describe("SequentialIds", () => {
  it("counts per prefix", () => {
    const ids = new SequentialIds();
    expect([ids.next("run"), ids.next("run"), ids.next("msg"), ids.next("run")]).toEqual([
      "run_1",
      "run_2",
      "msg_1",
      "run_3",
    ]);
  });

  it("starts over for each generator, so trials do not share state", () => {
    new SequentialIds().next("run");
    expect(new SequentialIds().next("run")).toBe("run_1");
  });
});

describe("randomIds", () => {
  it("prefixes a UUID", () => {
    expect(randomIds.next("run")).toMatch(/^run_[0-9a-f-]{36}$/);
    expect(randomIds.next("run")).not.toBe(randomIds.next("run"));
  });
});

describe("id prefixes", () => {
  it.each(["", "Run", "run_id", "1run", "run-id"])("rejects %j as a product error", (prefix) => {
    expect(thrownKind(() => randomIds.next(prefix))).toBe("product");
    expect(thrownKind(() => new SequentialIds().next(prefix))).toBe("product");
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
