"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Settings, Palette, Truck, LogOut, TreePine } from "lucide-react";
import { type Season } from "@/lib/theme-context";
import { TrailerEditor } from "@/app/trailer-sales/page";

const ADMIN_PASSWORD = "serenity2026";

const SEASONS: { value: Season; label: string; desc: string; color: string }[] = [
  { value: "spring", label: "Spring", desc: "Sage greens & cream", color: "#87A96B" },
  { value: "summer", label: "Summer", desc: "Sky blue & sand", color: "#87CEEB" },
  { value: "autumn", label: "Autumn", desc: "Burnt sienna & forest", color: "#C1653A" },
  { value: "winter", label: "Winter", desc: "Icy blue & silver (Closed)", color: "#6BA3C7" },
];

export default function ManagePage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [season, setSeason] = useState<Season>("summer");
  const [activeTab, setActiveTab] = useState<"theme" | "trailers">("theme");

  useEffect(() => {
    const stored = localStorage.getItem("serenity-admin-auth");
    if (stored === "true") setAuthed(true);
    const storedSeason = localStorage.getItem("serenity-season") as Season | null;
    if (storedSeason) setSeason(storedSeason);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      localStorage.setItem("serenity-admin-auth", "true");
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    localStorage.removeItem("serenity-admin-auth");
  };

  const handleSeasonChange = (newSeason: Season) => {
    setSeason(newSeason);
    localStorage.setItem("serenity-season", newSeason);
    document.documentElement.setAttribute("data-theme", newSeason);
  };

  if (!authed) {
    return (
      <section className="py-20 px-6 min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <motion.div
          className="border border-black/10 p-8 w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-6">
            <Lock className="w-12 h-12 mx-auto mb-3" style={{ color: "var(--accent-cta)" }} />
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Admin Access</h1>
            <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
                            className="w-full px-4 py-3 border border-black/10 text-sm focus:outline-none focus:ring-2"
              style={{ background: "var(--bg-secondary)" }}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="px-6 py-3 bg-black text-white font-semibold uppercase tracking-wider w-full">Log In</button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[900px] mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <TreePine className="w-7 h-7" style={{ color: "var(--accent-sage)" }} />
            <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm hover:underline" style={{ color: "var(--text-muted)" }}>
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { key: "theme" as const, icon: Palette, label: "Season Theme" },
            { key: "trailers" as const, icon: Truck, label: "Trailer Sales" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${
                activeTab === key ? "shadow-md" : "hover:bg-black/5"
              }`}
              style={{
                background: activeTab === key ? "var(--accent-cta)" : "transparent",
                color: activeTab === key ? "white" : "var(--text-main)",
              }}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>

        {/* Theme Panel */}
        {activeTab === "theme" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-black/10 p-6">
            <h3 className="text-lg font-bold mb-2 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
              <Settings className="w-5 h-5" /> Season Theme
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
              Select the current season. This changes the entire site&apos;s color palette.
              Setting to Winter will display a &quot;Closed for Season&quot; overlay.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {SEASONS.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleSeasonChange(s.value)}
                  className={`p-4 border-2 transition-all text-center ${
                    season === s.value ? "ring-2 ring-offset-2" : "border-transparent hover:border-black/10"
                  }`}
                  style={{
                    borderColor: season === s.value ? s.color : undefined,
                    background: "var(--bg-secondary)",
                  }}
                >
                                    <div className="w-8 h-8 mx-auto mb-2" style={{ background: s.color }} />
                  <p className="font-bold text-sm">{s.label}</p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>{s.desc}</p>
                </button>
              ))}
            </div>
            <div className="mt-6 p-4" style={{ background: "var(--bg-secondary)" }}>
              <p className="text-sm">
                <strong>Current:</strong>{" "}
                <span className="capitalize font-bold" style={{ color: "var(--accent-cta)" }}>{season}</span>
              </p>
            </div>
          </motion.div>
        )}

        {/* Trailers Panel */}
        {activeTab === "trailers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
            <TrailerEditor />
          </motion.div>
        )}
      </div>
    </section>
  );
}
