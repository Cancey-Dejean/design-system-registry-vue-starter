import type { H3Event } from "h3";
import { registryConfig } from "~/lib/registry/config";
import {
  registryIndexMetadata,
  registryItemSchemaUrl,
  type RegistryFileDefinition,
  type RegistryItemDefinition,
} from "~/lib/registry/metadata";
import { getRegistryItem, getRegistryItems, type RegistryCatalogItem } from "./registry-catalog";

const registryJsonResponseHeaders = {
  "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
} as const;

type RegistryIndexJson = typeof registryIndexMetadata & {
  items: RegistryItemDefinition[];
};

type RegistryItemFileJson = RegistryFileDefinition & { content: string };

type RegistryItemJson = Omit<RegistryItemDefinition, "files"> & {
  $schema: typeof registryItemSchemaUrl;
  files?: RegistryItemFileJson[];
};

export async function getRegistryIndexJson(event: H3Event): Promise<RegistryIndexJson> {
  const items = await getRegistryItems(event);

  return {
    ...registryIndexMetadata,
    items: items.map(toRegistryItemDefinition),
  };
}

export async function getRegistryItemJson(
  event: H3Event,
  name: string,
): Promise<RegistryItemJson | null> {
  const item = await getRegistryItem(event, name);

  return item ? toRegistryItemJson(item) : null;
}

export async function getRegistryIndexJsonResponse(event: H3Event): Promise<Response> {
  return Response.json(await getRegistryIndexJson(event), {
    headers: registryJsonResponseHeaders,
  });
}

export async function getRegistryItemJsonResponse(event: H3Event, name: string): Promise<Response> {
  const item = await getRegistryItemJson(event, name);

  if (!item) {
    return Response.json(
      { error: "Registry item not found." },
      { headers: registryJsonResponseHeaders, status: 404 },
    );
  }

  return Response.json(item, { headers: registryJsonResponseHeaders });
}

function toRegistryItemDefinition(item: RegistryCatalogItem): RegistryItemDefinition {
  const files = item.files.map(toFileDefinition);

  return {
    name: item.name,
    type: item.type,
    title: item.title,
    description: item.description,
    ...(files.length > 0 ? { files } : {}),
    ...getRegistryItemOptionalFields(item),
  };
}

function toRegistryItemJson(item: RegistryCatalogItem): RegistryItemJson {
  const files: RegistryItemFileJson[] = item.files.map((file) => ({
    ...toFileDefinition(file),
    content: file.content,
  }));

  return {
    $schema: registryItemSchemaUrl,
    name: item.name,
    title: item.title,
    description: item.description,
    ...(files.length > 0 ? { files } : {}),
    type: item.type,
    ...getRegistryItemOptionalFields(item),
  };
}

function toFileDefinition(file: RegistryCatalogItem["files"][number]): RegistryFileDefinition {
  return {
    path: file.path,
    type: file.type,
    ...(file.target ? { target: file.target } : {}),
  } as RegistryFileDefinition;
}

function getRegistryItemOptionalFields(
  item: RegistryCatalogItem,
): Partial<Pick<RegistryItemDefinition, "dependencies" | "registryDependencies">> {
  const fields: Partial<Pick<RegistryItemDefinition, "dependencies" | "registryDependencies">> = {};

  if (item.dependencies && item.dependencies.length > 0) {
    fields.dependencies = item.dependencies;
  }

  if (item.localRegistryDependencies && item.localRegistryDependencies.length > 0) {
    // Namespaced so the shadcn CLI resolves these against *our* registry, not its own default
    // one — a bare name like "dialog" would otherwise silently fall back to shadcn-vue's own
    // built-in dialog instead of the one published here.
    fields.registryDependencies = item.localRegistryDependencies.map(
      (name) => `${registryConfig.namespace}/${name}`,
    );
  }

  return fields;
}
