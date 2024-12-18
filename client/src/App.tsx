import { Switch, Route } from "wouter";
import { useTranslation } from 'react-i18next';
import { Home } from "@/pages/Home";
import { Blog } from "@/pages/Blog";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function App() {
  const { t } = useTranslation();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 py-2 bg-background/80 backdrop-blur-lg border-b border-primary/10">
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="AIConsult Hub"
                className="h-8 w-8 object-contain brightness-200"
              />
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">
                AIConsult Hub
              </span>
            </a>
          </Link>

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
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {t('nav.services')}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline">
              {t('nav.login')}
            </Button>
          </div>
        </nav>
      </header>

      <main className="pt-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/blog" component={Blog} />
        </Switch>
      </main>
    </>
  );
}

export default App;
