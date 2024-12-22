import { useState } from "react";
import { Switch, Route } from "wouter";
import { useTranslation } from 'react-i18next';
import { Home } from "@/pages/Home";
import { Blog } from "@/pages/Blog";
import { AdminDashboard } from "@/pages/AdminDashboard";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "wouter";
import { ChatWidget } from "@/components/ChatWidget";

function App() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-3 bg-background/90 backdrop-blur-lg border-b border-primary/10">
        <nav className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <a className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="bg-white rounded-lg p-1">
                  <img
                    src="/logo.png"
                    alt="AIConsult Hub"
                    className="h-12 w-12 sm:h-14 sm:w-14 object-contain"
                  />
                </div>
                <span className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                  AIConsult Hub
                </span>
              </a>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {t('nav.home')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/blog">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {t('nav.blog')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link href="/#services">
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {t('nav.services')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <LanguageSwitcher />
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-background/20 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={mobileMenuOpen ? "open" : "closed"}
            variants={{
              open: { opacity: 1, height: "auto" },
              closed: { opacity: 0, height: 0 }
            }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/">
                <a className="block px-3 py-2 rounded-md text-base font-medium hover:bg-background/20">
                  {t('nav.home')}
                </a>
              </Link>
              <Link href="/blog">
                <a className="block px-3 py-2 rounded-md text-base font-medium hover:bg-background/20">
                  {t('nav.blog')}
                </a>
              </Link>
              <Link href="/#services">
                <a className="block px-3 py-2 rounded-md text-base font-medium hover:bg-background/20">
                  {t('nav.services')}
                </a>
              </Link>
            </div>
          </motion.div>
        </nav>
      </header>

      <main className="pt-16 min-h-screen flex flex-col">
        <div className="flex-grow">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/blog" component={Blog} />
            <Route path="/admin" component={AdminDashboard} />
          </Switch>
        </div>
        <ChatWidget />
        <BackToTop />
      </main>
      <Footer />
    </>
  );
}

export default App;