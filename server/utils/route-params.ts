import type { H3Event } from "h3";

/**
 * Nitro's file-based router merges a bracket param with a literal filename suffix into a single
 * param *key* — e.g. a route file named `[name].json.get.ts` produces `event.context.params` as
 * `{ "name.json": "button.json" }`, not `{ name: "button" }`. This reads that merged param and
 * strips the known suffix back off.
 */
export function getSuffixedRouteParam(
  event: H3Event,
  paramName: string,
  suffix: string,
): string | undefined {
  const params = event.context.params as Record<string, string> | undefined;
  const raw = params?.[`${paramName}${suffix}`];

  if (typeof raw !== "string" || !raw.endsWith(suffix)) {
    return undefined;
  }

  return raw.slice(0, -suffix.length);
}
