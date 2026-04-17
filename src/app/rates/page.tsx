"use client";

import { motion } from "framer-motion";
import { Waves, Trees } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function RatesPage() {
  return (
    <>
      <PageHero
        title="Rates & Pricing"
        subtitle="Affordable family camping with full-service sites at both locations"
        image="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615837754534-QJ9O7WQUVCC37WXE0UU7/DJI_0024.JPG?format=2500w"
      />
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
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
                <div className="flex justify-between items-center pb-3 border-b border-black/5">
                  <span className="text-sm font-medium">Seasonal Sites</span>
                  <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$2,950 – $4,550</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-black/5">
                  <span className="text-sm font-medium">Nightly Full Service</span>
                  <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$60 / night</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Weekly Special</span>
                  <span className="font-bold text-sm" style={{ color: "var(--accent-sage)" }}>Book 7, Pay for 6</span>
                </div>
              </div>
              <p className="text-xs text-center" style={{ color: "var(--text-dim)" }}>
                + HST. All sites include water, sewer, 30-amp power.
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
                <div className="flex justify-between items-center pb-3 border-b border-black/5">
                  <span className="text-sm font-medium">Seasonal Sites</span>
                  <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$2,750</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-black/5">
                  <span className="text-sm font-medium">Nightly Full Service</span>
                  <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$60 / night incl. HST</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Weekly Special</span>
                  <span className="font-bold text-sm" style={{ color: "var(--accent-sage)" }}>Stay 7 for Price of 6</span>
                </div>
              </div>
              <p className="text-xs text-center" style={{ color: "var(--text-dim)" }}>
                + HST. All sites include water, sewer, 30-amp power.
              </p>
            </div>
          </motion.div>
        </motion.div>


      </div>
    </section>
    </>
  );
}
