import { useState, useEffect } from "react";
import { Heart, Camera, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Albums", href: "#albums" },
  { label: "Events", href: "#events" },
  { label: "Family", href: "#family" },
];

function scrollTo(id: string) {
  const el = document.getElementById(id.replace("#", ""));
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 shadow-sm" : "bg-transparent"
      }`}
      style={{ borderBottom: scrolled ? "1px solid var(--border)" : "none" }}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-md">
            <Camera className="w-4 h-4 text-primary-foreground" />
          </div>
          <span
            className="text-lg font-semibold text-foreground"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Family
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => {
                setMenuOpen(false);
                scrollTo(link.href);
              }}
              className="text-left text-base font-medium text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Camera className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span
              className="text-base font-semibold text-foreground"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Family Memories
            </span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Made with love */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>for family</span>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Our Family · Private & shared with love
        </div>
      </div>
    </footer>
  );
}
