import { Product } from "@/types/product";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

const AllProducts = async () => {
  const products: Product[] = await apiFetch("/products");
  return (
    <section id="সব-পণ্য" className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">🛒 সব পণ্য</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
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
                {product.categoryNameBn}
              </p>

              <p className="text-xl font-bold">
                {product.today} টাকা
                <span className="text-sm font-normal"> / {product.unit}</span>
              </p>

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
    </section>
  );
};

export default AllProducts;
