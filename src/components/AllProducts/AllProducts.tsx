import { Product } from "@/types/product";
import Link from "next/link";

const AllProducts = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } },
  );

  const data = await response.json();
  const products: Product[] = data;

  return (
    <section
      id="সব-পণ্য"
      className="mx-auto w-full max-w-7xl px-3 py-8 sm:px-4 sm:py-10"
    >
      <h2 className="mb-5 text-2xl font-bold sm:mb-6 sm:text-3xl">
        🛒 সব পণ্য
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="card min-w-0 rounded-2xl border border-base-300 bg-base-100 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="card-body min-w-0 gap-2 p-4 sm:p-5">
              <h3 className="card-title break-words text-base sm:text-lg">
                {product.categoryIcon} {product.nameBn}
              </h3>

              <p className="break-words text-sm text-base-content/60">
                {product.categoryNameBn}
              </p>

              <p className="break-words text-lg font-bold sm:text-xl">
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
