import type { Product } from "@/types/product";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const PriceTicker = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } },
  );

  if (!response.ok) {
    throw new Error("পণ্যের দাম লোড করা যায়নি।");
  }

  const data = await response.json();
  const products: Product[] = data;

  return (
    <MarqueeText direction="right" duration={10}>
      <div className="overflow-hidden text-black">
        <div className="flex w-max">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-100 px-3 py-1 text-sm"
            >
              {product.categoryIcon} {product.nameBn} {product.today} টাকা/
              {product.unit} {product.change.dir === "up" ? "▲" : "▼"}{" "}
              {product.change.pct}%
            </div>
          ))}
        </div>
      </div>
    </MarqueeText>
  );
};

export default PriceTicker;
