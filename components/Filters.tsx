"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getUniqueCategories } from "../data/products";

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

export default function Filters() {
  const categories = getUniqueCategories();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category") || "all";
  const priceParam = searchParams.get("price") || "0-1000";

  const [, maxValue] = priceParam.split("-").map(Number);
  const maxPrice = Number.isFinite(maxValue) ? maxValue : 1000;

  // Local slider value updates immediately while dragging.
  const [sliderValue, setSliderValue] = useState(maxPrice);

  // Sync the slider when the URL changes through another filter.
  useEffect(() => {
    setSliderValue(maxPrice);
  }, [maxPrice]);

  // Apply the price filter only after the user releases the slider,
  // then wait 300ms before updating the URL.
  const [pendingPrice, setPendingPrice] = useState<number | null>(null);

  useEffect(() => {
    if (pendingPrice === null) return;

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("price", `0-${pendingPrice}`);

      const query = params.toString();
      router.push(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });

      setPendingPrice(null);
    }, 300);

    return () => clearTimeout(timeout);
  }, [pendingPrice, pathname, router, searchParams]);

  function updateURL(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function changeCategory(category: string) {
    updateURL("category", category === "All" ? null : slugify(category));
  }

  function changeManualPrice(value: string) {
    if (value === "") {
      setSliderValue(0);
      return;
    }

    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return;

    const price = Math.min(1000, Math.max(0, parsedValue));
    setSliderValue(price);
  }

  return (
    <aside className="w-full shrink-0 space-y-5 lg:w-[165px]">
      {/* Primary filter panel */}
      <section className="rounded-lg bg-primary px-3.5 py-3 text-white shadow-sm">
        <h2 className="mb-2 text-base font-semibold">Filters</h2>

        <fieldset>
          <legend className="mb-1 text-sm font-medium">Category</legend>

          <div className="space-y-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs">
              <input
                type="radio"
                name="main-category"
                checked={selectedCategory === "all"}
                onChange={() => changeCategory("All")}
                className="accent-white"
              />
              All
            </label>

            {categories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-2 text-xs"
              >
                <input
                  type="radio"
                  name="main-category"
                  checked={selectedCategory === slugify(category)}
                  onChange={() => changeCategory(category)}
                  className="accent-white"
                />
                {category}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="mb-2 text-sm font-medium">Price range</legend>

          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={sliderValue}
            aria-label="Maximum price"
            onChange={(event) => {
              setSliderValue(Number(event.target.value));
            }}
            onPointerUp={() => setPendingPrice(sliderValue)}
            onKeyUp={() => setPendingPrice(sliderValue)}
            onTouchEnd={() => setPendingPrice(sliderValue)}
            className="w-full cursor-pointer accent-white"
          />

          <div className="mt-1 flex justify-between text-[11px]">
            <span>₹0</span>
            <span>₹{sliderValue}</span>
          </div>
          <p className="mt-1 text-[11px] text-white/80">
            Show products up to ₹{sliderValue}
          </p>
        </fieldset>
      </section>

      {/* Secondary category panel */}
      <section className="rounded-lg bg-surface px-3.5 py-3 text-foreground shadow-sm">
        <h2 className="mb-2 text-sm font-semibold">Category</h2>

        <fieldset>
          <legend className="sr-only">Choose category</legend>

          <div className="space-y-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs">
              <input
                type="radio"
                name="secondary-category"
                checked={selectedCategory === "all"}
                onChange={() => changeCategory("All")}
                className="accent-primary"
              />
              All
            </label>

            {categories.map((category) => (
              <label
                key={category}
                className="flex cursor-pointer items-center gap-2 text-xs"
              >
                <input
                  type="radio"
                  name="secondary-category"
                  checked={selectedCategory === slugify(category)}
                  onChange={() => changeCategory(category)}
                  className="accent-primary"
                />
                {category}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-4">
          <label
            htmlFor="manual-max-price"
            className="mb-2 block text-xs font-medium text-text-secondary"
          >
            Maximum price (₹)
          </label>

          <input
            id="manual-max-price"
            type="number"
            min={0}
            max={1000}
            step={10}
            value={sliderValue}
            onChange={(event) => changeManualPrice(event.target.value)}
            onBlur={() => setPendingPrice(sliderValue)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.currentTarget.blur();
              }
            }}
            className="h-9 w-full rounded-md border border-border bg-surface px-2 text-sm text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring"
          />

          <p className="mt-1 text-[11px] text-text-secondary">
            Products from ₹0 to ₹{sliderValue}
          </p>
        </div>
      </section>
    </aside>
  );
}
