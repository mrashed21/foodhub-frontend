"use client";

import { Facebook, Instagram, Twitter } from "lucide-react";
import Link from "next/link";
import Container from "../container/container";

const Footer = () => {
  return (
    <footer className="border-t bg-background mt-20">
      <Container>
        {/* Top */}
        <div className="px-4 py-14">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
            {/* Brand */}
            <div>
              <h2 className="text-xl font-bold text-primary">FoodHub</h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                FoodHub helps you discover and order delicious meals from the
                best restaurants near you.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/meals" className="hover:text-primary">
                    Browse Meals
                  </Link>
                </li>
                <li>
                  <Link href="/providers" className="hover:text-primary">
                    Providers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Providers */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                For Providers
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/vendor" className="hover:text-primary">
                    Vendor Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-primary">
                    Become a Provider
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact / Social */}
            <div>
              <h3 className="text-sm font-semibold mb-4 uppercase tracking-wide">
                Connect With Us
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                support@foodhub.com
              </p>

              <div className="flex gap-4">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t py-4">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} FoodHub. All rights reserved.</p>
            <div className="flex gap-4 mt-2 sm:mt-0">
              <Link href="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
