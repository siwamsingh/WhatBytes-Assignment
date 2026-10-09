"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "../../../data/products";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const product = products.find((item) => item.id === params.id);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Product not found
        </h1>
        <p className="mt-2 text-text-secondary">
          The product you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-5 inline-block rounded-md bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-hover"
        >
          Back to products
        </Link>
      </div>
    );
  }

  function handleAddToCart() {
    if (!product) return;

    console.log("Add to cart:", product.title, "Quantity:", quantity);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-text-secondary">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 gap-8 rounded-xl bg-surface p-5 shadow-sm sm:p-8 md:grid-cols-2 md:gap-12">
        {/* Product Image */}
        <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden rounded-lg bg-white sm:min-h-[420px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col py-2">
          <p className="mb-2 text-sm font-medium text-primary">
            {product.category}
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            {product.title}
          </h1>

          {/* Rating */}
          <div
            className="mt-3 flex items-center gap-2"
            aria-label={`Rating ${product.rating} out of 5`}
          >
            <span className="text-lg tracking-wide text-[#315887]">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </span>
            <span className="text-sm text-text-secondary">
              {product.rating.toFixed(1)} / 5
            </span>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-bold text-foreground">
            ${product.price.toFixed(2)}
          </p>

          {/* Description */}
          <div className="mt-6">
            <h2 className="mb-2 text-base font-semibold text-foreground">
              Product Description
            </h2>
            <p className="text-sm leading-7 text-text-secondary">
              {product.description}
            </p>
          </div>

          {/* Product Attributes */}
          <div className="mt-6 space-y-3 border-y border-border py-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-text-secondary">Category</span>
              <span className="font-medium text-foreground">
                {product.category}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-text-secondary">Brand</span>
              <span className="font-medium text-foreground">
                {product.brand}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-text-secondary">Availability</span>
              <span
                className={
                  product.stock > 0
                    ? "font-medium text-success"
                    : "font-medium text-error"
                }
              >
                {product.stock > 0
                  ? `In stock (${product.stock})`
                  : "Out of stock"}
              </span>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <label
              htmlFor="quantity"
              className="mb-2 block text-sm font-semibold text-foreground"
            >
              Quantity
            </label>

            <div className="flex h-10 w-fit items-center overflow-hidden rounded-md border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                className="h-full w-10 text-lg text-foreground hover:bg-surface-secondary disabled:opacity-40"
              >
                −
              </button>

              <input
                id="quantity"
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(event) => {
                  const value = Number(event.target.value);

                  if (value >= 1 && value <= product.stock) {
                    setQuantity(value);
                  }
                }}
                className="h-full w-12 border-x border-border text-center text-sm text-foreground outline-none"
              />

              <button
                type="button"
                aria-label="Increase quantity"
                disabled={quantity >= product.stock}
                onClick={() =>
                  setQuantity((current) => Math.min(product.stock, current + 1))
                }
                className="h-full w-10 text-lg text-foreground hover:bg-surface-secondary disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="mt-6 flex h-11 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-3 text-sm font-medium text-text-secondary hover:text-primary sm:self-start"
          >
            ← Continue shopping
          </button>
        </div>
      </div>
    </section>
  );
}
