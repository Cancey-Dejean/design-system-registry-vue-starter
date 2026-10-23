import { create, insertMultiple, search } from "@orama/orama";
import type { SiteNavigationSectionId } from "../navigation";

const schema = {
  id: "string",
  name: "string",
  title: "string",
  description: "string",
  section: "enum",
  sectionTitle: "string",
  routePath: "string",
  type: "string",
  categories: "string[]",
  dependencies: "string[]",
  fileNames: "string[]",
  keywords: "string",
} as const;

export interface SearchRecord {
  id: string;
  name: string;
  title: string;
  description: string;
  section: SiteNavigationSectionId;
  sectionTitle: string;
  routePath: string;
  type: string;
  categories: string[];
  dependencies: string[];
  fileNames: string[];
  keywords: string;
}

export async function createSearchIndex(records: readonly SearchRecord[]) {
  const database = create({ schema });
  if (records.length) await insertMultiple(database, [...records]);
  return { database, records: [...records] };
}

export async function searchIndex(
  index: Awaited<ReturnType<typeof createSearchIndex>>,
  query: string,
  limit = 20,
) {
  const term = query.trim();
  const boundedLimit = Number.isFinite(limit) ? Math.min(500, Math.max(1, Math.trunc(limit))) : 20;
  if (!term) return { count: index.records.length, results: index.records.slice(0, boundedLimit) };
  const result = await search(index.database, {
    term,
    properties: [
      "title",
      "name",
      "description",
      "sectionTitle",
      "routePath",
      "type",
      "categories",
      "dependencies",
      "fileNames",
      "keywords",
    ],
    boost: {
      title: 8,
      name: 6,
      description: 3,
      sectionTitle: 2,
      categories: 2,
      dependencies: 1.5,
      fileNames: 1.5,
    },
    tolerance: term.length >= 6 ? 2 : 1,
    threshold: 0,
    limit: boundedLimit,
  });
  const records = new Map(index.records.map((record) => [record.id, record]));
  return {
    count: result.count,
    results: result.hits.flatMap((hit) => {
      const record = records.get(hit.document.id);
      return record ? [record] : [];
    }),
  };
}
