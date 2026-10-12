import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/require-auth";
import CategoryProducts from "@/components/Category/CategoryProducts";

interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  await requireAuth(`/category/${slug}`);

  const [categoriesResponse, productsResponse] = await Promise.all([
    fetch("https://openapi.programming-hero.com/api/bazardor/categories", {
      next: { revalidate: 60 },
    }),
    fetch(
      `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(slug)}`,
      { next: { revalidate: 60 } },
    ),
  ]);

  const categoriesData = await categoriesResponse.json();
  const productsData = await productsResponse.json();

  const categories: Category[] = categoriesData;
  const products: Product[] = productsData;

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-900">
        {category.icon} {category.nameBn}
      </h1>

      <CategoryProducts products={products} />
    </section>
  );
}
