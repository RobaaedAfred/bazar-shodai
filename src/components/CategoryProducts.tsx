"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import { bn } from "@/lib/format";
import { sortProducts, type SortKey } from "@/lib/sort";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const list = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <>
      <div className="mt-4 flex justify-end rounded-2xl border border-line bg-card px-4 py-3.5">
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <p className="my-4 text-sm text-muted">মোট {bn(list.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={list} />
    </>
  );
}
