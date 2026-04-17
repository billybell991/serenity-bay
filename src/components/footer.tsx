import Link from "next/link";
import { TreePine, Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-black/5 pt-24 pb-16" style={{ background: "var(--bg-secondary)" }}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <TreePine className="w-6 h-6" style={{ color: "var(--accent-sage)" }} />
              <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Serenity Resorts</span>
            </div>
            <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Two beautiful camping resorts in the Ottawa Valley. Sandy beaches, full-service sites, and unforgettable summer memories.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/serenityresorts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "var(--accent-sage)", color: "white" }}
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="tel:6136282454"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "var(--accent-cta)", color: "white" }}
                aria-label="Call us"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href="mailto:office@serenityresorts.ca"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                style={{ background: "var(--accent-primary)", color: "white" }}
                aria-label="Email us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "var(--text-main)" }}>Explore</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/locations/serenity-bay", label: "Serenity Bay" },
                { href: "/locations/serenity-hills", label: "Serenity Hills" },
                { href: "/rates", label: "Rates & Pricing" },
                { href: "/trailer-sales", label: "Trailer Sales" },
                { href: "/attractions", label: "Local Attractions" },
                { href: "/faq", label: "FAQ" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm transition-colors hover:underline" style={{ color: "var(--text-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Serenity Bay */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "var(--text-main)" }}>Serenity Bay</h4>
            <div className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> 7200 Hwy 60, Eganville ON</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> <a href="tel:6136282454" className="hover:underline">613-628-2454</a></p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> <a href="mailto:office@serenityresorts.ca" className="hover:underline">office@serenityresorts.ca</a></p>
            </div>
          </div>

          {/* Serenity Hills */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider" style={{ color: "var(--text-main)" }}>Serenity Hills</h4>
            <div className="space-y-3 text-sm" style={{ color: "var(--text-muted)" }}>
              <p className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> 435 Castleford Rd, Renfrew ON</p>
              <p className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0" /> <a href="tel:6136282454" className="hover:underline">613-628-2454</a></p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0" /> <a href="mailto:office@serenityresorts.ca" className="hover:underline">office@serenityresorts.ca</a></p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-black/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm" style={{ color: "var(--text-dim)" }}>
          <span>© {new Date().getFullYear()} Serenity Resorts. All rights reserved.</span>
          <Link href="/contact" className="hover:underline" style={{ color: "var(--text-muted)" }}>Get in touch →</Link>
        </div>
      </div>
    </footer>
  );
}
