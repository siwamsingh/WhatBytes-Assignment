
"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { useAppDispatch } from "../store/hooks";
import { addToCart } from "../store/cartSlice";

export default function ProductListing() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const search = (searchParams.get("search") || "").trim().toLowerCase();

  const category = (
    searchParams.get("category") || "all"
  ).toLowerCase();

  const priceParam = searchParams.get("price") || "0-1000";
  const [minPrice, maxPrice] = priceParam.split("-").map(Number);

  const minimum = Number.isFinite(minPrice) ? minPrice : 0;
  const maximum = Number.isFinite(maxPrice) ? maxPrice : 1000;

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.title.toLowerCase().includes(search) ||
      product.brand.toLowerCase().includes(search) ||
      product.category.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search);

    const matchesCategory =
      category === "all" ||
      product.category.toLowerCase().replace(/\s+/g, "-") === category;

    const matchesPrice =
      product.price >= minimum && product.price <= maximum;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <section className="min-w-0 flex-1">
      <h1 className="mb-3 text-xl font-bold tracking-tight text-navy">
        Product Listing
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((product) => {
            const featured = product.id === "8";

            return (
              <div
                key={product.id}
                className={
                  featured
                    ? "min-w-0 sm:col-span-2 sm:row-span-2"
                    : "min-w-0"
                }
              >
                <ProductCard
                  product={product}
                  featured={featured}
                  onAddToCart={(item) => {
                    dispatch(addToCart(item.id));
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-surface px-4 py-12 text-center">
          <h2 className="text-lg font-semibold text-foreground">
            No products found
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Try changing your search, category, or price range.
          </p>
        </div>
      )}
    </section>
  );
}
