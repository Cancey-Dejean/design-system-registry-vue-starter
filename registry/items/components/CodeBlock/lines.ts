/** Remove a final line terminator without discarding intentional blank lines. */
export function splitCodeLines(value: string): string[] {
  return (value.endsWith("\n") ? value.slice(0, -1) : value).split("\n");
}
