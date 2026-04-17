"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Waves, Trees } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { useImages } from "@/lib/use-images";
import { loadRates, type RatesData, type RateItem } from "@/lib/rates-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function RatesPage() {
  const [rates, setRates] = useState<RatesData | null>(null);
  const images = useImages();

  useEffect(() => {
    setRates(loadRates());
    const handler = () => setRates(loadRates());
    window.addEventListener("rates-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("rates-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!rates) return null;

  return (
    <>
      <PageHero
        title="Rates & Pricing"
        subtitle="Affordable family camping with full-service sites at both locations"
        image={images.heroes.rates}
      />
      <section style={{ background: "var(--bg-primary)", padding: "2rem 1.5rem" }}>
        <div className="max-w-[1000px] mx-auto">

        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8" initial="hidden" animate="visible" variants={stagger}>
          {/* Serenity Bay */}
          <motion.div variants={fadeUp} className="glass-card overflow-hidden">
            <div className="p-4 flex items-center gap-3" style={{ background: "var(--accent-cta)", color: "white" }}>
              <Waves className="w-6 h-6" />
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Serenity Bay</h2>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>7200 Hwy 60, Eganville ON — Lakefront on Mink Lake</p>
              <div className="space-y-3">
                {rates.bay.items.map((item, i) => (
                  <div key={item.id} className={`flex justify-between items-center ${i < rates.bay.items.length - 1 ? "pb-3 border-b border-black/5" : ""}`}>
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-bold" style={{ color: "var(--accent-cta)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center" style={{ color: "var(--text-dim)" }}>
                {rates.bay.footnote}
              </p>
            </div>
          </motion.div>

          {/* Serenity Hills */}
          <motion.div variants={fadeUp} className="glass-card overflow-hidden">
            <div className="p-4 flex items-center gap-3" style={{ background: "var(--accent-sage)", color: "white" }}>
              <Trees className="w-6 h-6" />
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Serenity Hills</h2>
            </div>
            <div className="p-6 space-y-5">
              <p className="text-sm text-center" style={{ color: "var(--text-muted)" }}>435 Castleford Rd, Renfrew ON — Rolling Hills &amp; Pool</p>
              <div className="space-y-3">
                {rates.hills.items.map((item, i) => (
                  <div key={item.id} className={`flex justify-between items-center ${i < rates.hills.items.length - 1 ? "pb-3 border-b border-black/5" : ""}`}>
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-bold" style={{ color: "var(--accent-cta)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center" style={{ color: "var(--text-dim)" }}>
                {rates.hills.footnote}
              </p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
    </>
  );
}
