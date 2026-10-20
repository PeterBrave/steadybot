import { SteadyError } from "./errors.ts";

/** Creates ids for records, runs and trace events. The prefix keeps ids readable in traces. */
export interface IdGenerator {
  next(prefix: string): string;
}

export const randomIds: IdGenerator = {
  next: (prefix) => `${checkPrefix(prefix)}_${crypto.randomUUID()}`,
};

/** Deterministic ids for tests and evals: `run_1`, `run_2`, `msg_1`, ... */
export class SequentialIds implements IdGenerator {
  readonly #counts = new Map<string, number>();

  next(prefix: string): string {
    const n = (this.#counts.get(checkPrefix(prefix)) ?? 0) + 1;
    this.#counts.set(prefix, n);
    return `${prefix}_${n}`;
  }
}

function checkPrefix(prefix: string): string {
  if (!/^[a-z][a-z0-9]*$/.test(prefix)) {
    throw new SteadyError(
      "product",
      "ids.invalid_prefix",
      `Id prefixes are lowercase letters and digits, got "${prefix}"`,
    );
  }
  return prefix;
}
