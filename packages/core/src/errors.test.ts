import { describe, expect, it } from "vitest";
import { errorKindOf, SteadyError } from "./errors.ts";

describe("SteadyError", () => {
  it("carries a kind, a stable code and the cause", () => {
    const cause = new Error("socket hang up");
    const error = new SteadyError("provider", "provider.timeout", "Model call timed out", {
      cause,
      retryable: true,
    });

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("SteadyError");
    expect(error.kind).toBe("provider");
    expect(error.code).toBe("provider.timeout");
    expect(error.retryable).toBe(true);
    expect(error.cause).toBe(cause);
  });

  it("is not retryable unless it says so", () => {
    expect(new SteadyError("product", "x.y", "boom").retryable).toBe(false);
  });
});

describe("errorKindOf", () => {
  it("reads the kind of a typed error", () => {
    expect(errorKindOf(new SteadyError("harness", "fixture.missing", "no fixture"))).toBe(
      "harness",
    );
  });

  it("treats untyped throws as product bugs", () => {
    expect(errorKindOf(new TypeError("undefined is not a function"))).toBe("product");
    expect(errorKindOf("a string")).toBe("product");
  });
});
