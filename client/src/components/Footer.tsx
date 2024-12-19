import { Link } from "wouter";
import { FaWeixin, FaWhatsapp, FaXTwitter, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="weixin://dl/chat?AIConsult_Hub"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#07C160]/10 text-[#07C160] hover:bg-[#07C160]/20 transition-colors"
                title="Chat on WeChat"
              >
                <FaWeixin className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/8619980867510"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                title="Chat on WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </a>
              <a
                href="mailto:strongacademy@88.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                title="Send Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://x.com/GANKIMA_GOLI/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/10 text-black hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
              >
                <FaXTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/aiconsult-hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/gankima_goli_guerfie_hanoi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20 transition-colors"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Quick Links and About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About AIConsult Hub</h3>
            <p className="text-muted-foreground text-sm">
              A cutting-edge professional networking platform transforming cross-domain connections through innovative communication technologies.
            </p>
          </div>

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
        </div>

        <Separator className="my-8" />

        <div className="text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AIConsult Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
