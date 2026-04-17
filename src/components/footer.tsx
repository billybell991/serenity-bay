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
    <footer className="border-t border-black/5" style={{ background: "var(--bg-secondary)", paddingTop: "1.25rem", paddingBottom: "2.5rem" }}>
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Brand + Social — centered */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <TreePine className="w-6 h-6" style={{ color: "var(--accent-sage)" }} />
            <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Serenity Resorts</span>
          </div>
          <p style={{ color: "var(--text-muted)", textAlign: "center", maxWidth: "24rem", margin: "0 auto 1.25rem", lineHeight: "1.7", fontSize: "0.875rem" }}>
            Sandy shores. Starlit skies. The sound of loons at dusk.
            Two Ottawa Valley campgrounds where families slow down,
            reconnect, and make memories that last generations.
          </p>
          <div className="flex items-center justify-center gap-3">
            <a
              href="https://www.facebook.com/profile.php?id=100054397246656"
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

        {/* Locations — two columns, centered */}
        <div style={{ display: "flex", justifyContent: "center", gap: "4rem", flexWrap: "wrap" }}>
          {/* Serenity Bay */}
          <div style={{ textAlign: "center" }}>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: "var(--text-main)" }}>Serenity Bay</h4>
            <div className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <p className="flex items-start gap-2 justify-center"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> <a href="https://www.google.com/maps/search/?api=1&query=7200+Hwy+60+Eganville+ON" target="_blank" rel="noopener noreferrer" className="hover:underline">7200 Hwy 60, Eganville ON</a></p>
              <p className="flex items-center gap-2 justify-center"><Phone className="w-4 h-4 shrink-0" /> <a href="tel:6136282454" className="hover:underline">613-628-2454</a></p>
              <p className="flex items-center gap-2 justify-center"><Mail className="w-4 h-4 shrink-0" /> <a href="mailto:office@serenityresorts.ca" className="hover:underline">office@serenityresorts.ca</a></p>
            </div>
          </div>

          {/* Serenity Hills */}
          <div style={{ textAlign: "center" }}>
            <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider" style={{ color: "var(--text-main)" }}>Serenity Hills</h4>
            <div className="space-y-2 text-sm" style={{ color: "var(--text-muted)" }}>
              <p className="flex items-start gap-2 justify-center"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> <a href="https://www.google.com/maps/search/?api=1&query=435+Castleford+Rd+Renfrew+ON" target="_blank" rel="noopener noreferrer" className="hover:underline">435 Castleford Rd, Renfrew ON</a></p>
              <p className="flex items-center gap-2 justify-center"><Phone className="w-4 h-4 shrink-0" /> <a href="tel:6136282454" className="hover:underline">613-628-2454</a></p>
              <p className="flex items-center gap-2 justify-center"><Mail className="w-4 h-4 shrink-0" /> <a href="mailto:office@serenityresorts.ca" className="hover:underline">office@serenityresorts.ca</a></p>
            </div>
          </div>
        </div>

        {/* Copyright — centered */}
        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)", textAlign: "center", fontSize: "0.875rem", color: "var(--text-dim)" }}>
          <span>
            <Link
              href="/admin/login"
              tabIndex={-1}
              aria-hidden="true"
              style={{ color: "inherit", textDecoration: "none" }}
            >©</Link>
            {" "}{new Date().getFullYear()} Serenity Resorts. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
