import { apiFetch } from "@/lib/api";
import { Product } from "@/types/product";

import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

const PriceTicker = async () => {
  const products: Product[] = await apiFetch("/products");

  return (
    <MarqueeText direction="right" duration={10}>
      <div className="text-black overflow-hidden">
        <div className="flex w-max">
          {products.map((product) => (
            <div
              key={product.id}
              className="text-sm px-3 py-1 border-t border-b border-l border-r border-gray-100"
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
