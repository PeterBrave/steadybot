/**
 * Every failure belongs to exactly one layer, so the eval runner can classify it
 * without reading logs:
 *
 * - `product`: a bug or unexpected state in steadybot itself
 * - `provider`: the model service failed (timeout, rate limit, 5xx)
 * - `harness`: the eval framework or its fixtures are wrong
 * - `limit`: a step, time or spend budget ran out
 *
 * A bot doing the wrong thing is not an error; graders report that as an `agent` outcome.
 */
export const errorKinds = ["product", "provider", "harness", "limit"] as const;

export type ErrorKind = (typeof errorKinds)[number];

export interface SteadyErrorOptions extends ErrorOptions {
  /** Whether retrying the same operation may succeed. Defaults to false. */
  retryable?: boolean;
}

export class SteadyError extends Error {
  override readonly name = "SteadyError";
  readonly kind: ErrorKind;
  /** Stable dotted identifier such as `provider.rate_limited`; safe to match on. */
  readonly code: string;
  readonly retryable: boolean;

  constructor(kind: ErrorKind, code: string, message: string, options: SteadyErrorOptions = {}) {
    super(message, options.cause === undefined ? undefined : { cause: options.cause });
    this.kind = kind;
    this.code = code;
    this.retryable = options.retryable ?? false;
  }
}

/** An untyped throw is a product bug: whoever threw it skipped the classification. */
export function errorKindOf(error: unknown): ErrorKind {
  return error instanceof SteadyError ? error.kind : "product";
}
