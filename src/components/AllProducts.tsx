"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/api";
import { bn } from "@/lib/format";
import { sortProducts, type SortKey } from "@/lib/sort";
import ProductGrid from "./ProductGrid";
import SortSelect from "./SortSelect";

export default function AllProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const list = useMemo(() => sortProducts(products, sort), [products, sort]);

  return (
    <section id="সব-পণ্য" className="scroll-mt-4">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-extrabold">সব পণ্য</h2>
          <p className="text-sm text-muted">মোট {bn(list.length)}টি পণ্য দেখানো হচ্ছে</p>
        </div>
        <SortSelect value={sort} onChange={setSort} />
      </div>
      <ProductGrid products={list} />
    </section>
  );
}
