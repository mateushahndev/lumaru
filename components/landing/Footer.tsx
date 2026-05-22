"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text/5 mt-20 py-12 border-t border-primary-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="font-display text-2xl font-medium text-text">
              lumaru
            </div>
            <p className="text-sm text-text/60">
              Clean science for real results.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text">Shop</h4>
            <ul className="space-y-2 text-sm text-text/60">
              <li>
                <Link 
                  href="/#final-cta" 
                  className="hover:text-primary transition-colors duration-300"
                >
                  Awake Eye Complex
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text">About</h4>
            <ul className="space-y-2 text-sm text-text/60">
              <li>
                <Link href="/our-standards" className="hover:text-primary transition-colors duration-300">
                  Our Standards
                </Link>
              </li>
              <li>
                <Link href="/science" className="hover:text-primary transition-colors duration-300">
                  The Science
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text">Support</h4>
            <ul className="space-y-2 text-sm text-text/60">
              <li>
                <Link 
                  href="/contact" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/shipping" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/refund" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Return & Refund
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text">Legal</h4>
            <ul className="space-y-2 text-sm text-text/60">
              <li>
                <Link 
                  href="/privacy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-light/20 mt-8 pt-8 text-center text-sm text-text/50">
          <p>© {currentYear} Lumaru. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}