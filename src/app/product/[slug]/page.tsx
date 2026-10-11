import { Product } from "@/types/product";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/require-auth";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  await requireAuth(`/product/${slug}`);

  let products: Product[];

  try {
    const response = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/products",
      { next: { revalidate: 60 } },
    );

    const data = await response.json();
    products = data;
  } catch {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const prices = product.markets.map((market) => ({
    market: market.market,
    division: market.division,
    min: market.min,
    max: market.max,
    average: (market.min + market.max) / 2,
  }));

  const minPrice = Math.min(...prices.map((market) => market.min));
  const maxPrice = Math.max(...prices.map((market) => market.max));
  const averagePrice =
    prices.reduce((total, market) => total + market.average, 0) / prices.length;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="card bg-base-100 border border-base-300 rounded-2xl shadow-sm">
        <div className="card-body">
          <p className="text-sm text-base-content/60">
            {product.categoryIcon} {product.categoryNameBn}
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">{product.nameBn}</h1>

          <p className="text-base-content/70">প্রতি {product.unit}</p>

          <p className="text-3xl font-bold mt-2">{product.today} টাকা</p>

          <p
            className={`font-semibold ${
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-base-200 p-4">
              <p className="text-sm text-base-content/60">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold">{minPrice} টাকা</p>
            </div>

            <div className="rounded-xl bg-base-200 p-4">
              <p className="text-sm text-base-content/60">সর্বোচ্চ দাম</p>
              <p className="text-xl font-bold">{maxPrice} টাকা</p>
            </div>

            <div className="rounded-xl bg-base-200 p-4">
              <p className="text-sm text-base-content/60">গড় দাম</p>
              <p className="text-xl font-bold">
                {averagePrice.toFixed(2)} টাকা
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-5">বাজারভিত্তিক দাম</h2>

      <div className="overflow-x-auto rounded-xl border border-base-300">
        <table className="table">
          <thead>
            <tr>
              <th>বাজার</th>
              <th>বিভাগ</th>
              <th>সর্বনিম্ন</th>
              <th>সর্বোচ্চ</th>
              <th>গড় দাম</th>
            </tr>
          </thead>

          <tbody>
            {prices.map((market, index) => (
              <tr key={`${market.market}-${index}`}>
                <td>{market.market}</td>
                <td>{market.division}</td>
                <td>{market.min} টাকা</td>
                <td>{market.max} টাকা</td>
                <td>{market.average.toFixed(2)} টাকা</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
