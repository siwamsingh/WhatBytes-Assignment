
"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CartItem from "../../components/CartItem";
import { products } from "../../data/products";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { clearCart } from "../../store/cartSlice";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const items = cartItems.flatMap((cartItem) => {
    const product = products.find(
      (item) => item.id === cartItem.productId
    );

    return product
      ? [{ product, quantity: cartItem.quantity }]
      : [];
  });

  const totalQuantity = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-navy">
              Shopping Cart
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              {totalQuantity}{" "}
              {totalQuantity === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="flex items-center gap-2 rounded-md border border-error px-3 py-2 text-sm font-medium text-error transition-colors hover:bg-red-50"
            >
              <Trash2 size={15} />
              Clear cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <section className="rounded-lg border border-border bg-surface px-4 py-12 text-center">
            <ShoppingBag
              size={36}
              className="mx-auto mb-4 text-text-muted"
            />
            <h2 className="text-lg font-semibold text-foreground">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Browse our products and add something you like.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-hover"
            >
              <ArrowLeft size={16} />
              Continue shopping
            </Link>
          </section>
        ) : (
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_260px]">
            {/* Cart items */}
            <section className="min-w-0">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-semibold text-foreground">
                  Your Items
                </h2>
                <span className="text-xs text-text-muted">
                  {items.length} products
                </span>
              </div>

              <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {items.map(({ product, quantity }) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    quantity={quantity}
                  />
                ))}
              </div>

              <Link
                href="/"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft size={16} />
                Continue shopping
              </Link>
            </section>

            {/* Order summary */}
            <aside className="rounded-lg border border-border bg-surface p-4">
              <h2 className="text-base font-semibold text-foreground">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>Total products</span>
                  <span>{items.length}</span>
                </div>

                <div className="flex justify-between text-text-secondary">
                  <span>Total quantity</span>
                  <span>{totalQuantity}</span>
                </div>

                <div className="flex justify-between text-text-secondary">
                  <span>Shipping</span>
                  <span>At checkout</span>
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex justify-between font-bold text-foreground">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled
                title="Checkout is not implemented yet"
                className="mt-5 w-full cursor-not-allowed rounded-md bg-primary px-3 py-2.5 text-sm font-semibold text-white opacity-60"
              >
                Proceed to Checkout
              </button>

              <p className="mt-2 text-center text-xs text-text-muted">
                Checkout is not available yet.
              </p>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
    