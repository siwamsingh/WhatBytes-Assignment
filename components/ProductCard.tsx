
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import type { Product } from "../data/products";

type ProductCardProps = {
  product: Product;
  featured?: boolean;
  onAddToCart?: (product: Product) => void;
};

export default function ProductCard({
  product,
  featured = false,
  onAddToCart,
}: ProductCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-md bg-white ${
        featured ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      {/* Product Image */}
      <Link
        href={`/product/${product.id}`}
        className={`relative block bg-white ${
          featured
            ? "h-56 w-full shrink-0 sm:h-auto sm:w-2/5"
            : "h-24 w-full"
        }`}
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes={
            featured
              ? "(max-width: 640px) 100vw, 40vw"
              : "(max-width: 768px) 50vw, 33vw"
          }
          className="object-contain p-2"
        />
      </Link>

      {/* Product Details */}
      <div
        className={`flex min-w-0 flex-1 flex-col ${
          featured ? "gap-2 p-4" : "gap-0.5 p-2"
        }`}
      >
        <Link
          href={`/product/${product.id}`}
          className={`font-semibold leading-snug text-foreground hover:text-primary ${
            featured ? "text-lg" : "text-xs"
          }`}
        >
          {product.title}
        </Link>

        <p
          className={`font-bold text-foreground ${
            featured ? "text-base" : "text-xs"
          }`}
        >
          ${product.price}
        </p>

        {/* Rating */}
        {featured && (
          <div
            className="flex items-center gap-1"
            aria-label={`Rating: ${product.rating} out of 5`}
          >
            <div className="flex text-[#315887]">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  size={15}
                  fill={
                    index < Math.floor(product.rating)
                      ? "currentColor"
                      : "none"
                  }
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-xs text-text-muted">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Description and Category for featured card */}
        {featured && (
          <div className="mt-1 space-y-3 text-xs text-text-secondary">
            <p className="leading-relaxed">
              {product.description}
            </p>

            <div>
              <p className="mb-1 text-text-muted">Category</p>
              <p className="font-medium text-foreground">
                {product.category}
              </p>
            </div>
          </div>
        )}

        {/* Add to Cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className={`mt-auto flex w-full items-center justify-center gap-1.5 rounded-md bg-primary font-medium text-white transition-colors hover:bg-primary-hover ${
            featured ? "mt-4 h-9 text-sm" : "mt-1 h-6 text-[11px]"
          }`}
        >
          <ShoppingCart
            size={featured ? 15 : 12}
            aria-hidden="true"
          />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
