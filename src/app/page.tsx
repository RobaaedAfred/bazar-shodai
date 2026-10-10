import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import AllProducts from "@/components/AllProducts";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-6">
      <Hero />

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold">
          <span className="text-sm text-up">▲</span> আজ দাম বেড়েছে
        </h2>
        <ProductGrid products={risers} />
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-2 text-xl font-extrabold">
          <span className="text-sm text-down">▼</span> আজ দাম কমেছে
        </h2>
        <ProductGrid products={fallers} />
      </section>

      <AllProducts products={products} />
    </div>
  );
}
