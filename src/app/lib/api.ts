import { cache } from "react";

export type Market = { market: string; division: string; min: number; max: number };
export type Change = { dir: "up" | "down" | "flat"; pct: number };
export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
  markets: Market[];
};
export type Category = { id: string; slug: string; nameBn: string; icon: string };

const BASES = [
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

// Remembers responses for 5 minutes so repeated page loads don't hit the API
const memory = new Map<string, { at: number; data: unknown }>();
const TTL = 5 * 60 * 1000;

/** Tries the main API, then the backup. Returns null on 404. */
async function request<T>(path: string): Promise<T | null> {
  const hit = memory.get(path);
  if (hit && Date.now() - hit.at < TTL) return hit.data as T;

  let lastError: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      memory.set(path, { at: Date.now(), data });
      return data as T;
    } catch (err) {
      lastError = err;
    }
  }
  if (hit) return hit.data as T; // API down: show the last good data
  throw lastError ?? new Error("API unavailable");
}

function normalize(raw: Partial<Product> & Record<string, unknown>): Product {
  const today = Number(raw.today) || 0;
  const yesterday = Number(raw.yesterday) || today;
  let change = raw.change as Change | undefined;
  if (!change) {
    const diff = today - yesterday;
    change = {
      dir: diff > 0 ? "up" : diff < 0 ? "down" : "flat",
      pct: yesterday ? Math.abs((diff / yesterday) * 100) : 0,
    };
  }
  return {
    id: Number(raw.id),
    slug: String(raw.slug),
    nameBn: String(raw.nameBn),
    category: String(raw.category),
    categoryNameBn: String(raw.categoryNameBn ?? ""),
    categoryIcon: String(raw.categoryIcon ?? ""),
    unit: String(raw.unit ?? "kg"),
    image: String(raw.image ?? raw.categoryIcon ?? "🛒"),
    today,
    yesterday,
    lastWeek: Number(raw.lastWeek) || 0,
    lastMonth: Number(raw.lastMonth) || 0,
    change,
    markets: Array.isArray(raw.markets) ? (raw.markets as Market[]) : [],
  };
}

// cache() makes the ticker and the page share one request per page load
export const getProducts = cache(async (category?: string): Promise<Product[]> => {
  const path = category ? `/products?category=${encodeURIComponent(category)}` : "/products";
  const data = await request<Product[]>(path);
  return Array.isArray(data) ? data.map((p) => normalize(p)) : [];
});

export async function getProduct(slug: string): Promise<Product | null> {
  const data = await request<Product | Product[]>(`/products?slug=${encodeURIComponent(slug)}`);
  const item = Array.isArray(data) ? data[0] : data;
  if (item && item.slug === slug) return normalize(item);
  // fallback: look through the full list
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategory(slug: string): Promise<Category | null> {
  const data = await request<Category>(`/categories/${encodeURIComponent(slug)}`);
  return data && (data as Category).slug ? data : null;
}