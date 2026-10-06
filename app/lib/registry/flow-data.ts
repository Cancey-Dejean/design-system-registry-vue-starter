import type { RegistryItemType } from "./item-types";

export type RegistryFlowRemoteDependency = {
  id: string;
  name: string;
  source: string;
};

export type RegistryFlowVariant = {
  name: string;
  options: string[];
  defaultValue?: string;
};

export type RegistryFlowProp = {
  name: string;
  type: string;
  optional: boolean;
  defaultValue?: string;
};

export type RegistryFlowApi = {
  component?: string;
  variants: RegistryFlowVariant[];
  props: RegistryFlowProp[];
};

export type RegistryFlowApiSource = {
  /** Absolute path of the item's directory. */
  directory: string;
  name: string;
  title: string;
  /** Source file paths, relative to the item directory. */
  files: string[];
};

export type RegistryFlowItem = {
  name: string;
  type: RegistryItemType;
  title: string;
  dependencies: string[];
  localDependencies: string[];
  remoteDependencies: RegistryFlowRemoteDependency[];
  files: string[];
  api: RegistryFlowApi;
};

export type RegistryFlowItemSource = {
  name: string;
  type: RegistryItemType;
  title: string;
  dependencies?: readonly string[];
  localRegistryDependencies?: readonly string[];
  registryDependencies?: readonly string[];
  files?: readonly { path: string; target?: string }[];
};

export const emptyRegistryFlowApi: RegistryFlowApi = { variants: [], props: [] };

export function toRegistryFlowItem(
  item: RegistryFlowItemSource,
  api: RegistryFlowApi = emptyRegistryFlowApi,
): RegistryFlowItem {
  return {
    name: item.name,
    type: item.type,
    title: item.title,
    dependencies: [...(item.dependencies ?? [])],
    localDependencies: [...(item.localRegistryDependencies ?? [])],
    remoteDependencies: (item.registryDependencies ?? []).map(toRemoteRegistryDependency),
    files: (item.files ?? []).map((file) => file.target ?? file.path),
    api,
  };
}

export function toRemoteRegistryDependency(value: string): RegistryFlowRemoteDependency {
  if (URL.canParse(value)) {
    const url = new URL(value);
    const lastSegment = url.pathname.split("/").findLast(Boolean) ?? value;

    return {
      id: `remote:${value}`,
      name: lastSegment.replace(/\.json$/u, ""),
      source: url.hostname,
    };
  }

  const namespaced = /^(@[^/]+)\/(.+)$/u.exec(value);

  if (namespaced?.[1] && namespaced[2]) {
    return { id: `remote:${value}`, name: namespaced[2], source: namespaced[1] };
  }

  return { id: `remote:${value}`, name: value, source: "shadcn" };
}
