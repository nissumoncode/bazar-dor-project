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
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="card rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm">
        <div className="card-body">
          <p className="text-sm text-slate-500">
            {product.categoryIcon} {product.categoryNameBn}
          </p>

          <h1 className="text-3xl font-bold md:text-4xl">{product.nameBn}</h1>

          <p className="text-slate-600">প্রতি {product.unit}</p>

          <p className="mt-2 text-3xl font-bold">{product.today} টাকা</p>

          <p
            className={`font-semibold ${
              product.change.dir === "up"
                ? "text-error"
                : product.change.dir === "down"
                  ? "text-success"
                  : "text-slate-500"
            }`}
          >
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—"}{" "}
            {Math.abs(product.change.pct)}%
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-blue-50/70 p-4">
              <p className="text-sm text-slate-500">সর্বনিম্ন দাম</p>
              <p className="text-xl font-bold">{minPrice} টাকা</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-blue-50/70 p-4">
              <p className="text-sm text-slate-500">সর্বোচ্চ দাম</p>
              <p className="text-xl font-bold">{maxPrice} টাকা</p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-blue-50/70 p-4">
              <p className="text-sm text-slate-500">গড় দাম</p>
              <p className="text-xl font-bold">
                {averagePrice.toFixed(2)} টাকা
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mb-5 mt-10 text-2xl font-bold text-slate-900">
        বাজারভিত্তিক দাম
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="table">
          <thead className="bg-blue-50 text-slate-700">
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
