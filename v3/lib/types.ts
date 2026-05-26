/**
 * Compile-time fixed-length tuple of `T` with exactly `N` elements.
 *
 * Example: `FixedTuple<string, 7>` == `[string, string, string, string, string, string, string]`.
 *
 * Wrap with `Readonly<...>` when an immutable tuple is required.
 */
export type FixedTuple<T, N extends number, R extends T[] = []> = R['length'] extends N
  ? R
  : FixedTuple<T, N, [...R, T]>;
