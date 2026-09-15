import { getCanonicalRegistryItemUrl } from "./site-config";

export const packageManagers = [
  { value: "npm", label: "npm" },
  { value: "pnpm", label: "pnpm" },
  { value: "yarn", label: "yarn" },
  { value: "bun", label: "bun" },
  { value: "vite-plus", label: "vp" },
  { value: "deno", label: "deno" },
] as const;

export type PackageManager = (typeof packageManagers)[number]["value"];

export function isPackageManager(value: string | null | undefined): value is PackageManager {
  return packageManagers.some((option) => option.value === value);
}

export function getInstallCommand(itemName: string, packageManager: PackageManager): string {
  const registryItemUrl = getCanonicalRegistryItemUrl(itemName);

  switch (packageManager) {
    case "bun":
      return `bunx --bun shadcn-vue@latest add ${registryItemUrl}`;
    case "pnpm":
      return `pnpm dlx shadcn-vue@latest add ${registryItemUrl}`;
    case "yarn":
      return `yarn dlx shadcn-vue@latest add ${registryItemUrl}`;
    case "npm":
      return `npx shadcn-vue@latest add ${registryItemUrl}`;
    case "deno":
      return `deno run -A npm:shadcn-vue@latest add ${registryItemUrl}`;
    case "vite-plus":
      return `vpx shadcn-vue@latest add ${registryItemUrl}`;
  }
}

function joinCommand(parts: readonly string[]): string {
  return parts.filter(Boolean).join(" ");
}

export function getPackageInstallCommand(
  packages: readonly string[],
  packageManager: PackageManager,
  options: { dev?: boolean } = {},
): string {
  const packageNames = packages.map((name) => name.trim()).filter(Boolean);

  if (packageNames.length === 0) {
    return "";
  }

  switch (packageManager) {
    case "bun":
      return joinCommand(["bun", "add", options.dev ? "-d" : "", ...packageNames]);
    case "pnpm":
      return joinCommand(["pnpm", "add", options.dev ? "-D" : "", ...packageNames]);
    case "yarn":
      return joinCommand(["yarn", "add", options.dev ? "-D" : "", ...packageNames]);
    case "npm":
      return joinCommand(["npm", "install", options.dev ? "-D" : "", ...packageNames]);
    case "deno":
      return joinCommand([
        "deno",
        "add",
        options.dev ? "-D" : "",
        ...packageNames.map((name) => `npm:${name}`),
      ]);
    case "vite-plus":
      return joinCommand(["vp", "install", options.dev ? "-D" : "", ...packageNames]);
  }
}

export function getPackageInstallCommands(
  item: { dependencies?: readonly string[]; devDependencies?: readonly string[] },
  packageManager: PackageManager,
): string[] {
  return [
    getPackageInstallCommand(item.dependencies ?? [], packageManager),
    getPackageInstallCommand(item.devDependencies ?? [], packageManager, { dev: true }),
  ].filter((command) => command.length > 0);
}
