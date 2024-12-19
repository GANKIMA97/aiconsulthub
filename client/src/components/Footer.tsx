import { Link } from "wouter";
import { FaWeixin, FaWhatsapp, FaXTwitter, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-background border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Section */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Contact Us</h3>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="weixin://dl/chat?AIConsult_Hub"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#07C160]/10 text-[#07C160] hover:bg-[#07C160]/20 transition-colors"
                title="Chat on WeChat"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWeixin className="w-5 h-5" />
                <span className="text-sm font-medium">WeChat</span>
              </motion.a>
              <motion.a
                href="https://wa.me/8619980867510"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
                title="Chat on WhatsApp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="text-sm font-medium">WhatsApp</span>
              </motion.a>
              <motion.a
                href="mailto:strongacademy@88.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                title="Send Email"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEnvelope className="w-5 h-5" />
                <span className="text-sm font-medium">Email</span>
              </motion.a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://x.com/GANKIMA_GOLI/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/10 text-black hover:bg-black/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaXTwitter className="w-5 h-5" />
                <span className="text-sm font-medium">Twitter</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/aiconsult-hub/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin className="w-5 h-5" />
                <span className="text-sm font-medium">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/gankima_goli_guerfie_hanoi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E4405F]/10 text-[#E4405F] hover:bg-[#E4405F]/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className="w-5 h-5" />
                <span className="text-sm font-medium">Instagram</span>
              </motion.a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Quick Links and About */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About AIConsult Hub</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AIConsult Hub is a premier technology enablement platform that unlocks the power of artificial intelligence and digital solutions for individuals and businesses. We specialize in providing seamless access to cutting-edge AI platforms while offering expert guidance on leveraging these tools for enhanced productivity, learning, and business growth.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2">
              Our expertise extends beyond AI access - we empower our clients with customized AI solutions tailored to specific business needs, comprehensive training in AI tool utilization, and professional services ranging from business consultation to language instruction.
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
                <Link href="/#services">
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
