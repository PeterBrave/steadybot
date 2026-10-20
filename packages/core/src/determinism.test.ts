import { globSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Product code must take a Clock, IdGenerator or Random instead of reading ambient
// time or randomness; otherwise evals cannot replay it. Only these files may.
const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const allowed = new Set([
  "packages/core/src/clock.ts",
  "packages/core/src/ids.ts",
  "packages/core/src/random.ts",
]);
const ambient = /\bDate\.now\(|\bnew Date\(\)|\bMath\.random\(|\brandomUUID\(/;

describe("determinism", () => {
  it("keeps ambient time and randomness out of product code", () => {
    const offenders = globSync(["apps/*/src/**/*.ts", "packages/*/src/**/*.ts"], {
      cwd: repoRoot,
    }).filter((file) => {
      if (file.endsWith(".test.ts") || allowed.has(file)) return false;
      return ambient.test(readFileSync(`${repoRoot}${file}`, "utf8"));
    });

    expect(offenders).toEqual([]);
  });
});
