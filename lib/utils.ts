export function isDefined(input: unknown): boolean {
  return input !== undefined && input !== null
}

export function or<T>(a: T, b: T): T {
  return isDefined(a) ? a : b
}

/**
 * Converts a number to a pixel string or returns the input string as-is.
 *
 * @param value - The input value, either a number or a string
 * @returns A string, either with "px" appended (if input was a number) or the original string
 *
 * @example
 * // Input: 5
 * // Output: "5px"
 *
 * @example
 * // Input: "5em"
 * // Output: "5em"
 */
export function toPx(value: number | string): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  return value;
}
