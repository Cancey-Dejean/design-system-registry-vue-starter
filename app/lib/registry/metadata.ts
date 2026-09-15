import type { RegistryItem as ShadcnRegistryItem } from "shadcn/schema";
import { registryConfig } from "./config";
import type { PrivateRegistryItemType, RegistryItemType } from "./item-types";

export const registryIndexMetadata = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: registryConfig.registryName,
  homepage: registryConfig.homepage,
} as const;

export const registryItemSchemaUrl = "https://ui.shadcn.com/schema/registry-item.json";

type ShadcnRegistryFile = NonNullable<ShadcnRegistryItem["files"]>[number];
type PublicRegistryFileDefinition<T extends ShadcnRegistryFile> = T extends unknown
  ? Omit<T, "content" | "type"> & { type: Exclude<T["type"], PrivateRegistryItemType> }
  : never;

export type RegistryFileDefinition = PublicRegistryFileDefinition<ShadcnRegistryFile>;

export type RegistryItemDefinition = Omit<
  ShadcnRegistryItem,
  "$schema" | "files" | "type" | "title" | "description"
> & {
  type: RegistryItemType;
  title?: string;
  description?: string;
  files?: RegistryFileDefinition[];
};
