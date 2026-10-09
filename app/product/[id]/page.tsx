
"use client";

import { Suspense, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Star,
  Package,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart } from "@/store/cartSlice";

function ProductDetails() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => item.id === params.id);
  const cartItems = useAppSelector((state) => state.cart.items);

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-border bg-white px-6 py-12 text-center">
          <h1 className="text-2xl font-bold text-navy">
            Product not found
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            The product you are looking for may no longer be available.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-sm bg-primary px-5 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  const isInCart = cartItems.some(
    (item) => item.productId === product.id
  );

  const handleAddToCart = () => {
    if (isInCart || product.stock < 1) return;

    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product.id));
    }
  };

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

      {/* Product */}
      <article className="overflow-hidden rounded-sm border border-border bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-surface-secondary p-5 sm:p-8 lg:p-10">
            <div className="relative aspect-square w-full max-w-lg overflow-hidden bg-white">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-5 sm:p-8"
                priority
              />
            </div>
          </div>

          {/* Product Information */}
          <div className="flex min-w-0 flex-col p-5 sm:p-8 lg:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-surface-secondary px-3 py-1 text-xs font-medium text-text-secondary">
                {product.category}
              </span>

              {product.stock > 0 && (
                <span className="flex items-center gap-1.5 text-xs font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  In stock
                </span>
              )}
            </div>

            <h1 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-navy sm:text-3xl lg:text-4xl">
              {product.title}
            </h1>

            <p className="mt-3 text-sm text-text-secondary">
              Brand:{" "}
              <span className="font-semibold text-foreground">
                {product.brand}
              </span>
            </p>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
              <div
                className="flex items-center gap-0.5 text-[#315887]"
                aria-label={`Rating: ${product.rating} out of 5`}
              >
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    size={17}
                    fill={
                      index < Math.floor(product.rating)
                        ? "currentColor"
                        : "none"
                    }
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              <span className="text-sm font-semibold text-foreground">
                {product.rating.toFixed(1)}
              </span>
              <span className="text-sm text-text-muted">
                out of 5
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 border-y border-border py-5">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Price
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Description */}
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-foreground">
                Product description
              </h2>
              <p className="mt-2 text-sm leading-7 text-text-secondary">
                {product.description}
              </p>
            </div>


            {/* Quantity */}
            <div className="mt-7">
              <label
                htmlFor="quantity"
                className="mb-2 block text-sm font-semibold text-foreground"
              >
                Quantity
              </label>

              <select
                id="quantity"
                value={quantity}
                onChange={(event) =>
                  setQuantity(Number(event.target.value))
                }
                disabled={isInCart || product.stock < 1}
                className="h-11 w-28 rounded-sm border border-border bg-white px-3 text-sm text-foreground outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:bg-surface-secondary"
              >
                {Array.from(
                  { length: Math.max(0, Math.min(product.stock, 10)) },
                  (_, index) => index + 1
                ).map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                disabled={isInCart || product.stock < 1}
                onClick={handleAddToCart}
                className={`flex h-12 w-full items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold transition-colors ${
                  isInCart || product.stock < 1
                    ? "cursor-not-allowed bg-gray-200 text-gray-500"
                    : "bg-primary text-white hover:bg-primary-hover"
                }`}
              >
                {isInCart ? (
                  <>
                    <Check size={18} aria-hidden="true" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart size={18} aria-hidden="true" />
                    Add to Cart
                  </>
                )}
              </button>

              {isInCart && (
                <Link
                  href="/cart"
                  className="flex h-11 w-full items-center justify-center rounded-sm border border-border text-sm font-semibold text-navy transition-colors hover:bg-surface"
                >
                  View Cart
                </Link>
              )}

              {!isInCart && (
                <Link
                  href="/cart"
                  className="flex h-11 w-full items-center justify-center rounded-sm border border-border text-sm font-semibold text-navy transition-colors hover:bg-surface"
                >
                  Go to Cart
                </Link>
              )}
            </div>


            <Link
              href="/"
              className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Continue shopping
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}

export default function ProductPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <Suspense
        fallback={
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-40 rounded bg-surface-secondary" />
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="aspect-square rounded-sm bg-surface-secondary" />
                <div className="h-96 rounded-sm bg-surface-secondary" />
              </div>
            </div>
          </main>
        }
      >
        <ProductDetails />
      </Suspense>

      <Footer />
    </div>
  );
}
