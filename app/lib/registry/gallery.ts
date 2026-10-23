export interface GalleryItem {
  name: string;
  title: string;
  description: string;
}

export function getBlockCategory(name: string): { id: string; title: string } {
  const id = name.replace(/-\d+$/u, "");
  return {
    id,
    title: id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  };
}

export function getGalleryCategories(items: readonly GalleryItem[]) {
  const categories = new Map<string, { id: string; title: string; count: number }>();
  for (const item of items) {
    const category = getBlockCategory(item.name);
    const existing = categories.get(category.id);
    if (existing) existing.count++;
    else categories.set(category.id, { ...category, count: 1 });
  }
  return [...categories.values()];
}

export function filterGalleryItems<T extends GalleryItem>(
  items: readonly T[],
  category: string,
  query: string,
): T[] {
  const search = query.trim().toLocaleLowerCase();
  return items.filter((item) => {
    const group = getBlockCategory(item.name);
    return (
      (category === "all" || group.id === category) &&
      `${item.name} ${item.title} ${item.description} ${group.title}`
        .toLocaleLowerCase()
        .includes(search)
    );
  });
}
