"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, DollarSign, Truck, Phone, Mail, Tent, Fish, PawPrint, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function HomePage() {
  const [hoveredPanel, setHoveredPanel] = useState<"bay" | "hills" | null>(null);

  return (
    <>
      {/* â”€â”€â”€ Hero â”€â”€â”€ */}
      <section className="hero-section">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104504491-ZQH6QM917WV13HP9VKB1/Lake+Front.jpeg?format=2500w"
          alt="Serenity Bay lakefront at golden hour"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, rgba(10,8,4,0.2) 0%, rgba(10,8,4,0.55) 100%)" }}
        />
        <motion.div
          className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="text-[0.65rem] uppercase tracking-[0.4em] mb-5" style={{ opacity: 0.65 }}>
            Eganville &amp; Renfrew, Ontario
          </motion.p>
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Serenity Resorts
          </motion.h1>
          <motion.hr variants={fadeUp} className="section-divider" />
          <motion.p variants={fadeUp} className="text-base md:text-lg mt-7 mb-12 font-light leading-loose" style={{ opacity: 0.8 }}>
            Where families find their perfect campsite
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-5 justify-center">
            <Link href="/locations/serenity-bay" className="btn-ghost">Explore Locations</Link>
            <Link href="/contact" className="btn-ghost">Contact Us</Link>
          </motion.div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-6 h-6 text-white/35" />
        </motion.div>
      </section>

      {/* â”€â”€â”€ Two Locations â€” full-height split, hover to expand â”€â”€â”€ */}
      <section className="flex flex-col md:flex-row" style={{ minHeight: "100vh" }}>
        {/* Serenity Bay */}
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{
            flex: hoveredPanel === "bay" ? "3 0 0" : hoveredPanel === "hills" ? "2 0 0" : "1",
            minHeight: "60vh",
            transition: "flex 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onMouseEnter={() => setHoveredPanel("bay")}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          <Image
            src="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104547963-ID1TR2SHL8XTFF7K95K6/Swimming+Area.jpeg?format=2500w"
            alt="Serenity Bay"
            fill
            className="object-cover"
            style={{ transform: hoveredPanel === "bay" ? "scale(1.04)" : "scale(1)", transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          />
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ background: hoveredPanel === "bay" ? "rgba(10,8,4,0.3)" : "rgba(10,8,4,0.5)" }}
          />
          <Link href="/locations/serenity-bay" className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
            <p className="text-[0.62rem] uppercase tracking-[0.4em] mb-5 text-white/55">Eganville, Ontario</p>
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Serenity Bay
            </h3>
            <hr className="section-divider" />
            <p
              className="text-sm text-white/75 mt-7 max-w-[260px] leading-loose"
              style={{
                opacity: hoveredPanel === "bay" ? 1 : 0,
                transform: hoveredPanel === "bay" ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.45s ease, transform 0.45s ease",
              }}
            >
              Sandy beach on Mink Lake. Oversized lots, dock space, great fishing.
            </p>
            <span
              className="btn-ghost mt-7"
              style={{
                opacity: hoveredPanel === "bay" ? 1 : 0,
                transform: hoveredPanel === "bay" ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.45s ease 0.05s, transform 0.45s ease 0.05s",
              }}
            >
              Discover More
            </span>
          </Link>
        </div>

        {/* Serenity Hills */}
        <div
          className="relative overflow-hidden cursor-pointer"
          style={{
            flex: hoveredPanel === "hills" ? "3 0 0" : hoveredPanel === "bay" ? "2 0 0" : "1",
            minHeight: "60vh",
            transition: "flex 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
          onMouseEnter={() => setHoveredPanel("hills")}
          onMouseLeave={() => setHoveredPanel(null)}
        >
          <Image
            src="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850403-DOAGE43MJ8BEGANYEYN2/SH+overhead1.jpg?format=2500w"
            alt="Serenity Hills"
            fill
            className="object-cover"
            style={{ transform: hoveredPanel === "hills" ? "scale(1.04)" : "scale(1)", transition: "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          />
          <div
            className="absolute inset-0 transition-all duration-700"
            style={{ background: hoveredPanel === "hills" ? "rgba(10,8,4,0.3)" : "rgba(10,8,4,0.5)" }}
          />
          <Link href="/locations/serenity-hills" className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
            <p className="text-[0.62rem] uppercase tracking-[0.4em] mb-5 text-white/55">Renfrew, Ontario</p>
            <h3 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Serenity Hills
            </h3>
            <hr className="section-divider" />
            <p
              className="text-sm text-white/75 mt-7 max-w-[260px] leading-loose"
              style={{
                opacity: hoveredPanel === "hills" ? 1 : 0,
                transform: hoveredPanel === "hills" ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.45s ease, transform 0.45s ease",
              }}
            >
              Saltwater pool, rolling hills, and big rig pull-thrus to 66ft.
            </p>
            <span
              className="btn-ghost mt-7"
              style={{
                opacity: hoveredPanel === "hills" ? 1 : 0,
                transform: hoveredPanel === "hills" ? "translateY(0)" : "translateY(10px)",
                transition: "opacity 0.45s ease 0.05s, transform 0.45s ease 0.05s",
              }}
            >
              Discover More
            </span>
          </Link>
        </div>
      </section>

      {/* â”€â”€â”€ Features â€” thin gold top line, no card backgrounds â”€â”€â”€ */}
      <section className="py-32" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <motion.div className="text-center mb-24" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[0.65rem] uppercase tracking-[0.4em] mb-4" style={{ color: "var(--gold)" }}>
              What We Offer
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
              Everything You Need
            </motion.h2>
            <motion.hr variants={fadeUp} className="section-divider" />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { icon: DollarSign, title: "Affordable Rates",   desc: "Nightly stays from $60. Seasonal sites from $2,750. Stay 7, pay for 6." },
              { icon: Tent,       title: "Full Service Sites", desc: "Water, sewer, and 30-amp power on every lot. Oversized sites available." },
              { icon: Truck,      title: "Trailer Sales",      desc: "Browse trailers for sale on-site. Your home away from home awaits." },
              { icon: Fish,       title: "Great Fishing",      desc: "Mink Lake bass and pike. Dock space and boat slips at Serenity Bay." },
              { icon: PawPrint,   title: "Pet Friendly",       desc: "Your furry friends are always welcome with leash and poop-and-scoop rules." },
              { icon: Star,       title: "Family Fun",         desc: "Planned activities all summer long. Playgrounds, beach, pool, and more." },
            ].map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="pt-7"
                style={{ borderTop: "1px solid var(--gold)" }}
              >
                <div className="flex justify-center mb-5">
                  <Icon className="w-5 h-5" style={{ color: "var(--gold)" }} strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-light tracking-wide mb-3 text-center" style={{ fontFamily: "var(--font-heading)" }}>{title}</h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-40 overflow-hidden" style={{ display: "flex", justifyContent: "center", marginTop: "1.5rem", marginBottom: "1.5rem" }}>
        <Image
          src="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104159153-PZ1Z95QLFZ7FETTHQZYO/Foggy+Lake+.jpeg?format=2500w"
          alt="Foggy morning on the lake"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 w-full max-w-2xl px-6 text-center text-white">
          <motion.div className="flex flex-col items-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Plan Your Stay?
            </motion.h2>
            <motion.hr variants={fadeUp} className="section-divider" />
            <motion.p variants={fadeUp} className="text-base mt-8 mb-12 font-light leading-loose" style={{ opacity: 0.8 }}>
              Call us or send an email &mdash; we&apos;d love to welcome your family.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-row gap-12 items-center justify-center">
              <a href="tel:6136282454" className="flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors">
                <Phone className="w-5 h-5" style={{ color: "var(--gold)" }} />
                <span className="text-sm uppercase tracking-widest font-light">613-628-2454</span>
              </a>
              <div className="w-px h-8 bg-white/20" />
              <a href="mailto:office@serenityresorts.ca" className="flex flex-col items-center gap-2 text-white/90 hover:text-white transition-colors">
                <Mail className="w-5 h-5" style={{ color: "var(--gold)" }} />
                <span className="text-sm uppercase tracking-widest font-light">office@serenityresorts.ca</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
