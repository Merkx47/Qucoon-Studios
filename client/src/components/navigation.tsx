import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Moon, Sun, Menu, X } from "lucide-react";

export function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isHome = location === "/";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/rooms", label: "Facilities" },
    { href: "/book", label: "Book Now" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      data-testid="navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background/95 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16 lg:h-20">
          <Link href="/">
            <span
              data-testid="link-home-logo"
              className="font-serif text-xl lg:text-2xl font-bold tracking-tight cursor-pointer"
            >
              <span className="text-primary">Q</span>
              <span className={scrolled || !isHome ? "" : "text-white dark:text-white"}>
                ucoon
              </span>
              <span className={`text-xs font-sans font-normal tracking-widest uppercase ml-2 ${
                scrolled || !isHome ? "text-muted-foreground" : "text-white/70"
              }`}>
                Studio
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer ${
                    location === link.href
                      ? "text-primary"
                      : scrolled || !isHome
                        ? "text-foreground/70 hover:text-foreground"
                        : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className={scrolled || !isHome ? "" : "text-white/80"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

            <div className="hidden md:block">
              <Link href="/book">
                <Button data-testid="button-nav-book" size="sm">
                  Reserve a Space
                </Button>
              </Link>
            </div>

            <Button
              size="icon"
              variant="ghost"
              className={`md:hidden ${scrolled || !isHome ? "" : "text-white/80"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-b">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                  className={`block px-4 py-3 text-sm font-medium rounded-md cursor-pointer ${
                    location === link.href
                      ? "text-primary bg-primary/5"
                      : "text-foreground/70"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/book">
                <Button data-testid="button-mobile-book" className="w-full" size="sm">
                  Reserve a Space
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
