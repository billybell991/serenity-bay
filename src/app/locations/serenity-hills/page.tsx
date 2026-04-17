"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trees, MapPin, Phone, Mail, Droplets, Tent, Truck, TreePine, Baby, Shirt, Flame, ChevronLeft } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const PHOTOS = [
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850403-DOAGE43MJ8BEGANYEYN2/SH+overhead1.jpg?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850972-Q1N6QQEAQY5QZ3EABB74/SH+Overhead+2.jpg?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362847903603-W8YLMJ0ORFVZBTSIRT1E/TimberP2-12.JPG?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362847923407-L2F7JMQNA8UDI2U3U9XK/TimberP14-12.JPG?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362848613311-YJCWRW2RIQQ3XBC7BGIT/TimberP55-12.JPG?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104791466-9782KXB5ZDPGHXBSTXCV/Social+Club+SH.jpg?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104810337-GR0X5GXJQE0A11E7HLE0/Laundry+Room+SH.jpg?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362848639716-LCEQUEJEE45OE8052FEC/Canadian+Timberland+campground+115.JPG?format=1000w",
  "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362848645899-MZBXLH380EEMQQ3OXW6Y/TimberK20-12.JPG?format=1000w",
];

const AMENITIES = [
  { icon: Tent, label: "Full Service Sites" },
  { icon: Truck, label: "Big Rig Pull-Thrus (66ft)" },
  { icon: Droplets, label: "Saltwater Pool" },
  { icon: Baby, label: "Playground" },
  { icon: TreePine, label: "30-Amp Power" },
  { icon: Trees, label: "Planned Activities" },
  { icon: Shirt, label: "Laundry Facility" },
  { icon: Flame, label: "Firewood & Ice" },
];

export default function SerenityHillsPage() {
  return (
    <>
      {/* Hero */}
      <section className="hero-section min-h-[60vh]">
        <Image
          src="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850403-DOAGE43MJ8BEGANYEYN2/SH+overhead1.jpg?format=2500w"
          alt="Serenity Hills aerial view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        <motion.div className="relative z-10 text-center text-white px-6" initial="hidden" animate="visible" variants={stagger}>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <Trees className="w-6 h-6" />
            <span className="text-sm uppercase tracking-[3px]">Forest &amp; Pool Resort</span>
          </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg" style={{ fontFamily: "var(--font-heading)", letterSpacing: "-0.02em" }}>
            Serenity Hills
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg opacity-90 flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4" /> 435 Castleford Rd, Renfrew ON
          </motion.p>
        </motion.div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 pt-6">
        <Link href="/" className="inline-flex items-center gap-1 text-sm hover:underline" style={{ color: "var(--accent-cta)" }}>
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      {/* Description */}
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Ideal for a Short or Seasonal Stay
            </motion.h2>
            <motion.p variants={fadeUp} className="mb-4" style={{ color: "var(--text-muted)" }}>
              Located in the lush rolling hills outside of Renfrew, Ontario with easy access to major highways. 
              Serenity Hills is perfect for your seasonal or short stay with a variety of campsite locations.
            </motion.p>
            <motion.p variants={fadeUp} className="mb-4" style={{ color: "var(--text-muted)" }}>
              Enjoy our on-site saltwater pool, big rig pull-thrus up to 66 feet, pet-friendly environment, and 
              boat ramp on the Ottawa River just 4km away with great fishing and kayaking.
            </motion.p>
            <motion.p variants={fadeUp} className="mb-6 font-semibold" style={{ color: "var(--text-main)" }}>
              We look forward to meeting you!
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a href="tel:6136282454" className="btn-cta flex items-center gap-2 justify-center">
                <Phone className="w-4 h-4" /> Call to Book
              </a>
              <a href="mailto:office@serenityresorts.ca" className="px-6 py-3 border border-black text-black font-semibold uppercase tracking-wider flex items-center gap-2 justify-center">
                <Mail className="w-4 h-4" /> Email Us
              </a>
            </motion.div>
          </motion.div>

          <motion.div className="border border-black/10 p-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h3 className="text-xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Rates</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-black/5">
                <span className="font-medium">Seasonal Sites</span>
                <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$2,750 + HST</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-black/5">
                <span className="font-medium">Nightly (Full Service)</span>
                <span className="font-bold" style={{ color: "var(--accent-cta)" }}>$60 / night incl. HST</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Weekly Special</span>
                <span className="font-bold" style={{ color: "var(--accent-cta)" }}>Stay 7 for Price of 6!</span>
              </div>
            </div>
            <p className="text-xs mt-4" style={{ color: "var(--text-dim)" }}>
              All lots include water, sewer, and 30-amp power.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-heading)" }}>Amenities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {AMENITIES.map(({ icon: Icon, label }) => (
              <div key={label} className="border border-black/10 p-4 text-center">
                <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: "var(--accent-cta)" }} />
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-heading)" }}>Photo Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHOTOS.map((src, i) => (
                            <div key={i} className="relative h-52 overflow-hidden border border-black/10">
                <Image src={src} alt={`Serenity Hills photo ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="py-24 px-6" style={{ background: "var(--bg-secondary)" }}>
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ fontFamily: "var(--font-heading)" }}>Find Us</h2>
          <div className="overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11200!2d-76.6573214!3d45.4939378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI5JzM4LjIiTiA3NsKwMzknMjYuNCJX!5e0!3m2!1sen!2sca!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Serenity Hills location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
