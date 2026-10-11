import type { Product } from "./api";

export type SortKey = "default" | "asc" | "desc";

export function sortProducts(list: Product[], key: SortKey): Product[] {
  if (key === "default") return list;
  const copy = [...list];
  copy.sort((a, b) => (key === "asc" ? a.today - b.today : b.today - a.today));
  return copy;
}
