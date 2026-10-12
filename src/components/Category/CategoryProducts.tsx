"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types/product";

interface CategoryProductsProps {
  products: Product[];
}

type SortOption = "default" | "asc" | "desc";

export default function CategoryProducts({ products }: CategoryProductsProps) {
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "asc") {
      return a.today - b.today;
    }

    if (sortOption === "desc") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">মোট {products.length}টি পণ্য</p>

        <label className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">সাজান:</span>

          <select
            value={sortOption}
            onChange={(event) =>
              setSortOption(event.target.value as SortOption)
            }
            className="select select-bordered select-sm border-slate-200 bg-white text-slate-800 focus:border-blue-500 focus:outline-none"
            aria-label="পণ্যের দাম অনুযায়ী সাজান"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      {sortedProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-700">
          <p className="mb-4">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
          <Link href="/" className="btn btn-primary btn-sm">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="card rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
            >
              <div className="card-body">
                <h2 className="card-title text-slate-900">
                  {product.categoryIcon} {product.nameBn}
                </h2>

                <p className="text-sm text-slate-500">প্রতি {product.unit}</p>

                <p className="text-xl font-bold text-slate-900">
                  {product.today.toLocaleString("bn-BD")} টাকা
                </p>

                <p
                  className={`text-sm font-semibold ${
                    product.change.dir === "up"
                      ? "text-success"
                      : product.change.dir === "down"
                        ? "text-error"
                        : "text-slate-500"
                  }`}
                >
                  {product.change.dir === "up"
                    ? "▲"
                    : product.change.dir === "down"
                      ? "▼"
                      : "—"}{" "}
                  {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
