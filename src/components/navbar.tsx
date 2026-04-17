"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, TreePine } from "lucide-react";

const NAV_LINKS = [
  {
    label: "Locations",
    children: [
      { href: "/locations/serenity-bay", label: "Serenity Bay - Eganville" },
      { href: "/locations/serenity-hills", label: "Serenity Hills - Renfrew" },
      { href: "/map", label: "Park Map" },
    ],
  },
  { href: "/rates", label: "Rates" },
  { href: "/trailer-sales", label: "Trailers" },
  {
    label: "Visit",
    children: [
      { href: "/attractions", label: "Local Attractions" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    if (clickCount.current >= 3) {
      clickCount.current = 0;
      window.location.href = "/manage";
      return;
    }
    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 600);
  };

  const textColor = scrolled ? "var(--text-main)" : "rgba(255,255,255,0.9)";
  const activeColor = scrolled ? "var(--gold)" : "white";

  return (
    <>
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(250,249,246,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid var(--nav-border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[60px]" style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer select-none">
          <TreePine
            className="w-5 h-5 transition-colors duration-500"
            style={{ color: scrolled ? "var(--gold)" : "rgba(255,255,255,0.85)" }}
          />
          <span
            className="text-[0.7rem] tracking-widest uppercase font-normal transition-colors duration-500"
            style={{ fontFamily: "var(--font-heading)", color: textColor }}
          >
            Serenity Resorts
          </span>
        </Link>

        <ul className="hidden items-center gap-x-2">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-[0.65rem] uppercase tracking-widest font-normal transition-colors duration-500"
                  style={{ color: textColor }}
                >
                  {link.label} <ChevronDown className="w-3 h-3 opacity-50" />
                </button>
                {openDropdown === link.label && (
                  <ul
                    className="absolute top-full left-0 mt-0 w-56 overflow-hidden shadow-2xl"
                    style={{ background: "var(--bg-card)", borderTop: "2px solid var(--gold)" }}
                  >
                    {link.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block px-5 py-3.5 text-[0.65rem] uppercase tracking-widest transition-colors hover:bg-black/5"
                          style={{ color: pathname === child.href ? "var(--gold)" : "var(--text-main)" }}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href!}
                  className="px-4 py-2 text-[0.65rem] uppercase tracking-widest font-normal transition-colors duration-500"
                  style={{ color: pathname === link.href ? activeColor : textColor }}
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        <button
          className="p-2 transition-colors duration-500"
          style={{ color: scrolled ? "var(--text-main)" : "white" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? null : <Menu className="w-5 h-5" />}
        </button>
      </div>

    </nav>

      {/* ── Full-screen luxury overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center"
          style={{
            background: "rgba(10, 8, 4, 0.75)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Nav items — flattened, centered */}
          <nav className="flex flex-col items-center gap-1 w-full px-8">
            {NAV_LINKS.flatMap((link, groupIndex) => {
              if (link.children) {
                return [
                  <p
                    key={`label-${link.label}`}
                    className="mt-7 mb-2 text-[0.55rem] uppercase tracking-[0.25em] font-light"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      animation: "fadeSlideUp 0.5s ease both",
                      animationDelay: `${groupIndex * 0.07}s`,
                    }}
                  >
                    {link.label}
                  </p>,
                  ...link.children.map((child, childIndex) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      onMouseEnter={() => setHoveredItem(child.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                      className="py-2 text-xl uppercase tracking-[0.15em] font-light transition-all duration-300"
                      style={{
                        color: pathname === child.href ? "var(--gold)" : "white",
                        opacity: hoveredItem !== null && hoveredItem !== child.href ? 0.25 : 1,
                        animation: "fadeSlideUp 0.5s ease both",
                        animationDelay: `${(groupIndex + childIndex + 1) * 0.07}s`,
                      }}
                    >
                      {child.label}
                    </Link>
                  )),
                ];
              }
              return [
                <Link
                  key={link.href}
                  href={link.href!}
                  onClick={() => setMobileOpen(false)}
                  onMouseEnter={() => setHoveredItem(link.href!)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="mt-6 py-2 text-2xl uppercase tracking-[0.18em] font-light transition-all duration-300"
                  style={{
                    color: pathname === link.href ? "var(--gold)" : "white",
                    opacity: hoveredItem !== null && hoveredItem !== link.href ? 0.25 : 1,
                    animation: "fadeSlideUp 0.5s ease both",
                    animationDelay: `${groupIndex * 0.07}s`,
                  }}
                >
                  {link.label}
                </Link>,
              ];
            })}
          </nav>

          {/* Subtle branding at the bottom */}
          <p
            className="absolute bottom-8 text-[0.55rem] uppercase tracking-[0.3em] font-light"
            style={{ color: "rgba(255,255,255,0.2)", animation: "fadeSlideUp 0.6s ease 0.5s both" }}
          >
            Serenity Resorts · Ottawa Valley
          </p>
        </div>
      )}
    </>
  );
}
