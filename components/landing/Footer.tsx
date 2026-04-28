export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-text/5 mt-20 py-12 border-t border-primary-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="font-display text-2xl font-medium text-text">
              lumaru
            </div>
            <p className="text-sm text-text/60">
              Clean science for real results.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text">Shop</h4>
            <ul className="space-y-2 text-sm text-text/60">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Awake Eye Complex
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text">Support</h4>
            <ul className="space-y-2 text-sm text-text/60">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-text">Legal</h4>
            <ul className="space-y-2 text-sm text-text/60">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Terms of Service
                </a>
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