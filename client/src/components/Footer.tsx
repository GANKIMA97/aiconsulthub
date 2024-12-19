import { Link } from "wouter";
import { FaWeixin, FaWhatsapp, FaXTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About AIConsult Hub</h3>
            <p className="text-muted-foreground text-sm">
              A cutting-edge professional networking platform transforming cross-domain connections through innovative communication technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Blog</a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-muted-foreground hover:text-primary transition-colors">Services</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <FaWeixin className="w-5 h-5" />
                <span>WeChat ID: AIConsult_Hub</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <FaWhatsapp className="w-5 h-5" />
                <span>+8619980867510</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://x.com/GANKIMA_GOLI/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/aiconsult-hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/gankima_goli_guerfie_hanoi/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AIConsult Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
