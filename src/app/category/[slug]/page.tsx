import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";

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

  let categories: Category[];
  let products: Product[];

  try {
    [categories, products] = await Promise.all([
      apiFetch("/categories"),
      apiFetch(`/products?category=${encodeURIComponent(slug)}`),
    ]);
  } catch {
    throw new Error("ডেটা লোড করা যায়নি");
  }

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
            <div
              key={product.id}
              className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm"
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
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
