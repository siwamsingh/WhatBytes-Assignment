
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-navy text-text-inverse">
      <div className="mx-auto max-w-7xl px-7 py-5">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Filters */}
          <div className="w-fit mx-auto">
            <h2 className="mb-3 text-sm font-semibold">
              Filters
            </h2>

            <div className="flex flex-wrap gap-3 text-[10px] text-text-inverse/80">
              <Link href="/" className="hover:text-white">
                All
              </Link>

              <Link
                href="/?category=electronics"
                className="hover:text-white"
              >
                Electronics
              </Link>
            </div>

            <p className="mt-5 text-xs text-text-inverse/80">
              © 2024 American
            </p>
          </div>

          {/* About Us */}
          <div className="w-fit mx-auto">
            <h2 className="mb-3 text-sm font-semibold">
              About Us
            </h2>

            <ul className="space-y-2 text-xs text-text-inverse/80">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="w-fit mx-auto">
            <h2 className="mb-3 text-sm font-semibold">
              Follow Us
            </h2>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
              >
                <FaFacebookF size={13} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
              >
                <FaTwitter size={13} />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-hover"
              >
                <FaInstagram size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
