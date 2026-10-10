import type { Metadata } from "next";
import { getCategory, getProducts } from "@/lib/api";
import { bn } from "@/lib/format";
import CategoryProducts from "@/components/CategoryProducts";
import EmptyState from "@/components/EmptyState";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug).catch(() => null);
  return { title: category ? `${category.nameBn} — বাজার দর` : "বাজার দর" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);

  if (!category || products.length === 0) {
    return (
      <EmptyState
        title="কোনো পণ্য পাওয়া যায়নি"
        message="এই ক্যাটাগরিতে কোনো পণ্য নেই অথবা ক্যাটাগরিটি সঠিক নয়।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center gap-4 rounded-2xl border border-line bg-card p-5">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#eef2ec] text-3xl">{category.icon}</span>
        <div>
          <h1 className="text-2xl font-extrabold">{category.nameBn}</h1>
          <p className="text-sm text-muted">{bn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>
      <CategoryProducts products={products} />
    </div>
  );
}
