import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import Link from "next/link";
import { requireAuth } from "@/lib/require-auth";

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
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">
        {category.icon} {category.nameBn}
      </h1>

      {products.length === 0 ? (
        <p className="text-base-content/70">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="card-body">
                <h2 className="card-title">
                  {product.categoryIcon} {product.nameBn}
                </h2>

                <p className="text-sm text-base-content/60">
                  প্রতি {product.unit}
                </p>

                <p className="text-xl font-bold">{product.today} টাকা</p>

                <p
                  className={`text-sm font-semibold ${
                    product.change.dir === "up"
                      ? "text-error"
                      : product.change.dir === "down"
                        ? "text-success"
                        : "text-base-content/60"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {Math.abs(product.change.pct)}%
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
