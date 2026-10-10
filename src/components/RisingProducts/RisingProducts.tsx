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
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">▲ আজ দাম বেড়েছে</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {risingProducts.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="card-body">
              <h3 className="card-title">
                {product.categoryIcon} {product.nameBn}
              </h3>

              <p className="text-sm text-base-content/60">
                প্রতি {product.unit}
              </p>

              <p className="text-xl font-bold">{product.today} টাকা</p>

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
