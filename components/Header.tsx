
"use client";

import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";
import { useAppSelector } from "../store/hooks";

export default function Header() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-50 bg-primary">
      {/* Main Header */}
      <div className="mx-auto flex h-[60px] max-w-7xl items-center gap-3 px-3 sm:gap-5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-xl font-bold tracking-tight !text-white sm:text-2xl"
        >
          Logo
        </Link>

        {/* Desktop Search Bar */}
        <form
          action="/"
          method="GET"
          role="search"
          className="mx-auto hidden min-w-0 max-w-md flex-1 sm:block"
        >
          <label htmlFor="header-search" className="sr-only">
            Search for products
          </label>

          <div className="flex h-10 w-full min-w-0 items-center gap-2 rounded-sm border border-white/30 px-3 transition-colors">
            <Search
              size={17}
              className="shrink-0 text-white"
              aria-hidden="true"
            />

            <input
              id="header-search"
              type="search"
              name="search"
              placeholder="Search for products..."
              className="h-full w-full min-w-0 appearance-none border-0 bg-transparent text-sm text-white outline-none ring-0 placeholder:text-white/75 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
            />
          </div>
        </form>

        {/* Cart Button */}
        <Link
          href="/cart"
          aria-label={`Cart, ${cartCount} items`}
          className="relative ml-auto flex h-9 shrink-0 items-center justify-center gap-2 rounded-sm bg-navy-dark px-3 text-xs font-semibold !text-white transition-colors hover:bg-navy sm:ml-0 sm:px-4"
        >
          <span className="relative inline-flex">
            <ShoppingCart
              size={17}
              strokeWidth={2.5}
              className="text-white"
              aria-hidden="true"
            />

            {cartCount > 0 && (
              <span className="absolute -right-[-22px] -top-3.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-primary bg-white px-1 text-[10px] font-bold leading-none text-primary shadow-sm">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </span>

          <span>Cart</span>
        </Link>
      </div>

      {/* Mobile Search */}
      <form
        action="/"
        method="GET"
        role="search"
        className="px-3 pb-3 sm:hidden"
      >
        <label htmlFor="mobile-search" className="sr-only">
          Search for products
        </label>

        <div className="flex h-10 w-full min-w-0 items-center gap-2 rounded-sm border border-white/30 px-3">
          <Search
            size={17}
            className="shrink-0 text-white"
            aria-hidden="true"
          />

          <input
            id="mobile-search"
            type="search"
            name="search"
            placeholder="Search for products..."
            className="h-full w-full min-w-0 appearance-none border-0 bg-transparent text-sm text-white outline-none ring-0 placeholder:text-white/75 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none"
          />
        </div>
      </form>
    </header>
  );
}
