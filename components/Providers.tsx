
"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { hydrateCart, type CartItem } from "../store/cartSlice";

const STORAGE_KEY = "shopping-cart";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Restore the saved cart once on the client.
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsed: unknown = JSON.parse(savedCart);

        if (
          Array.isArray(parsed) &&
          parsed.every(
            (item): item is CartItem =>
              typeof item?.productId === "string" &&
              Number.isInteger(item?.quantity) &&
              item.quantity > 0
          )
        ) {
          store.dispatch(hydrateCart(parsed));
        }
      }
    } catch {
      // Ignore invalid or inaccessible localStorage data.
    }

    // Save future cart changes. Subscribe after hydration so the
    // initial empty Redux state cannot overwrite the saved cart.
    const unsubscribe = store.subscribe(() => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(store.getState().cart.items)
        );
      } catch {
        // The cart still works in Redux if storage is unavailable.
      }
    });

    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
