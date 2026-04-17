"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Waves, MapPin, Anchor, Fish, Tent, TreePine, Baby, Shirt, Flame } from "lucide-react";
import { SiteAvailabilityGrid } from "@/components/site-availability-grid";
import { useImages } from "@/lib/use-images";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const AMENITIES = [
  { icon: Waves, label: "Sandy Beach" },
  { icon: Baby, label: "Kids Playground" },
  { icon: Fish, label: "Great Fishing" },
  { icon: Anchor, label: "Dock Space" },
  { icon: Tent, label: "Oversized Lots" },
  { icon: TreePine, label: "Full Service" },
  { icon: Shirt, label: "Laundry Facility" },
  { icon: Flame, label: "Firewood & Ice" },
];

export default function SerenityBayPage() {
  const images = useImages();

  return (
    <>
      {/* Hero */}
      <section className="hero-section min-h-[60vh]">
        <Image
          src={images.heroes.bayLocation}
          alt="Serenity Bay lakefront"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <motion.div className="relative z-10 text-center text-white px-6" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <Waves className="w-6 h-6" />
            <span className="text-sm uppercase tracking-[3px]">Lakefront Resort</span>
          </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
            Serenity Bay
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg opacity-90 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> 7200 Hwy 60, Eganville ON
          </motion.p>
        </motion.div>
      </section>

      {/* Description */}
      <section className="py-32 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto">

          {/* Full-width centered headline */}
          <motion.h2
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-3xl font-bold mb-24 text-center"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Short &amp; Long Term Camping at Its Finest
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
              <motion.p variants={fadeUp} className="mb-4" style={{ color: "var(--text-muted)" }}>
                Located on Mink Lake in Eganville, Ontario, Serenity Bay is a 47-acre family and pet-friendly resort. 
                With a large sandy beach, oversized lots, great fishing, and planned summer activities, it&apos;s the 
                perfect place for your family vacation.
              </motion.p>
              <motion.p variants={fadeUp} className="mb-0" style={{ color: "var(--text-muted)" }}>
                All lots are full service with water, sewer, and 30-amp power. Modern shower and washroom facilities 
                are available at no extra charge.
              </motion.p>
            </motion.div>

            <motion.div
              className="glass-card p-8 text-center mt-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Rates</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-black/5">
                  <span className="font-medium">Seasonal Sites</span>
                  <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$2,950 – $4,550 + HST</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-black/5">
                  <span className="font-medium">Nightly (Full Service)</span>
                  <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$60 / night</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Weekly Special</span>
                  <span className="font-bold" style={{ color: "var(--accent-cta)" }}>Book 7, Pay for 6!</span>
                </div>
              </div>
              <p className="text-xs mt-4" style={{ color: "var(--text-dim)" }}>
                All lots include water, sewer, and 30-amp power.
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Amenities */}
      <section className="px-6" style={{ background: "var(--bg-secondary)", paddingTop: "2rem", paddingBottom: "1.5rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-heading)" }}>
            Amenities
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="glass-card p-4 flex flex-col items-center justify-center text-center">
                <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--accent-cta)" }} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Site Availability */}
      <section className="py-16 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <SiteAvailabilityGrid location="bay" />
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-heading)" }}>
            Photo Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.galleries.bay.map((src, i) => (
              <div key={i} className="relative h-52 rounded-2xl overflow-hidden glass-card">
                <Image src={src} alt={`Serenity Bay photo ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)", paddingTop: "2rem" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-heading)" }}>Getting Here</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11200!2d-77.0653359!3d45.5431124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMyJzM1LjIiTiA3N8KwMDMnNTUuMiJX!5e0!3m2!1sen!2sca!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Serenity Bay location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
