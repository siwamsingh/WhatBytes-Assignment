
"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import type { Product } from "../data/products";
import { useAppDispatch } from "../store/hooks";
import {
  removeFromCart,
  updateQuantity,
} from "../store/cartSlice";

type CartItemProps = {
  product: Product;
  quantity: number;
};

export default function CartItem({
  product,
  quantity,
}: CartItemProps) {
  const dispatch = useAppDispatch();

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-surface">
      {/* Product image */}
      <Link
        href={`/product/${product.id}`}
        className="relative block h-36 w-full bg-white"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-contain p-3"
        />
      </Link>

      {/* Product details */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <Link
          href={`/product/${product.id}`}
          className="line-clamp-2 text-sm font-semibold text-foreground hover:text-primary"
        >
          {product.title}
        </Link>

        <p className="text-xs text-text-secondary">
          {product.category}
        </p>

        <p className="text-sm font-bold text-foreground">
          ${product.price.toFixed(2)}
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <label className="flex items-center gap-2 text-xs text-text-secondary">
            Qty
            <select
              value={quantity}
              onChange={(event) =>
                dispatch(
                  updateQuantity({
                    productId: product.id,
                    quantity: Number(event.target.value),
                  })
                )
              }
              className="rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-foreground outline-none focus:border-primary"
              aria-label={`Quantity of ${product.title}`}
            >
              {Array.from(
                { length: Math.max(1, product.stock) },
                (_, index) => index + 1
              ).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-auto border-t border-border pt-3">
          <div className="mb-3 flex items-center justify-between gap-2 text-xs">
            <span className="text-text-secondary">Item total</span>
            <span className="font-bold text-foreground">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>

          <button
            type="button"
            onClick={() => dispatch(removeFromCart(product.id))}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-error px-3 py-2 text-xs font-medium text-error transition-colors hover:bg-red-50"
          >
            <Trash2 size={14} />
            Remove from Cart
          </button>
        </div>
      </div>
    </article>
  );
}
