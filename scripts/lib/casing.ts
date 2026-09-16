const kebabCasePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;

export function isKebabCase(value: string): boolean {
  return kebabCasePattern.test(value);
}

export function toPascalCase(name: string): string {
  return name
    .split("-")
    .map((segment) => `${segment.slice(0, 1).toUpperCase()}${segment.slice(1)}`)
    .join("");
}

export function toCamelCase(name: string): string {
  const pascal = toPascalCase(name);

  return `${pascal.slice(0, 1).toLowerCase()}${pascal.slice(1)}`;
}

export function toTitleCase(name: string): string {
  return name
    .split("-")
    .map((segment) => `${segment.slice(0, 1).toUpperCase()}${segment.slice(1)}`)
    .join(" ");
}

/** Nuxt composables are conventionally named `useThing` — normalize a `use-thing` item name too. */
export function toComposableName(name: string): string {
  const base = name.startsWith("use-") ? name.slice(4) : name;

  return `use${toPascalCase(base)}`;
}
