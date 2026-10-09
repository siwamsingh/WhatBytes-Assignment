
import { Suspense } from "react";
import Filters from "@/components/Filters";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductListing from "@/components/ProductListing";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-5 lg:flex-row">
          <Suspense
            fallback={
              <div className="min-w-0 flex-1">
                Loading products...
              </div>
            }
          >
            <div className="flex w-full flex-col items-start gap-5 lg:flex-row">
              <div className="w-full shrink-0 lg:w-[165px]">
                <Filters />
              </div>
              <div className="min-w-0 flex-1">
                <ProductListing />
              </div>

              
            </div>
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
