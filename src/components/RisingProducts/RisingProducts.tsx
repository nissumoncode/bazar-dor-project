import { Product } from "@/types/product";
import Link from "next/link";

const RisingProducts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    throw new Error("দাম বেড়েছে এমন পণ্য লোড করা যায়নি।");
  }

  const products: Product[] = await response.json();

  const risingProducts = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
        ▲ আজ দাম বেড়েছে
      </h2>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {risingProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="card rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
          >
            <div className="card-body">
              <h3 className="card-title text-slate-900">
                {product.categoryIcon} {product.nameBn}
              </h3>

              <p className="text-sm text-slate-500">প্রতি {product.unit}</p>

              <p className="text-xl font-bold text-slate-900">
                {product.today} টাকা
              </p>

              <p className="text-sm font-semibold text-error">
                ▲ {product.change.pct}%
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RisingProducts;
