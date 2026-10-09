import Link from "next/link";
import { Search, ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-primary">
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-4 px-7">
        {/* Logo */}
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 text-2xl font-bold tracking-tight !text-white"
        >
          Logo
        </Link>

        {/* Search Bar */}
        <form
          action="/"
          method="GET"
          role="search"
          className="mx-auto hidden w-full max-w-[235px] sm:block"
        >
          <label htmlFor="header-search" className="sr-only">
            Search for products
          </label>

          <div className="flex h-[33px] items-center gap-2 rounded-lg border border-white/30 px-3 transition-colors focus-within:border-white">
            <Search
              size={14}
              className="shrink-0 text-white"
              aria-hidden="true"
            />

            <input
              id="header-search"
              type="search"
              name="search"
              placeholder="Search for products..."
              className="w-full min-w-0 bg-transparent text-[11px] text-white outline-none placeholder:text-white/90"
            />
          </div>
        </form>

        {/* Cart Button */}
        <Link
          href="/cart"
          className="flex h-[33px] min-w-[84px] shrink-0 items-center justify-center gap-2 rounded-lg bg-navy-dark px-4 text-xs font-semibold !text-white transition-colors hover:bg-navy"
        >
          <ShoppingCart size={14} strokeWidth={2.5} className="text-white" />
          <span className="text-white">Cart</span>
        </Link>
      </div>

      {/* Mobile Search */}
      <form
        action="/"
        method="GET"
        role="search"
        className="px-4 pb-3 sm:hidden"
      >
        <label htmlFor="mobile-search" className="sr-only">
          Search for products
        </label>

        <div className="flex h-9 items-center gap-2 rounded-lg border border-white/30 px-3 focus-within:border-white">
          <Search size={16} className="text-white" aria-hidden="true" />

          <input
            id="mobile-search"
            type="search"
            name="search"
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/80"
          />
        </div>
      </form>
    </header>
  );
}
