import type { Product } from "./api";

export type SortKey = "default" | "asc" | "desc";

export function sortProducts(products: Product[], sort: SortKey) {
  const list = [...products];
  if (sort === "asc") return list.sort((a, b) => a.today - b.today);
  if (sort === "desc") return list.sort((a, b) => b.today - a.today);
  return list;
}
