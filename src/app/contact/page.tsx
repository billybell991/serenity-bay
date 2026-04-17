"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, this would POST to an API
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Call, email, or send us a message."
        image="/serenity-bay-sign.jpg"
      />
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-10">
              <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>Get In Touch</h3>
              <div className="space-y-4">
                <a href="tel:6136282454" className="flex items-center gap-3 hover:underline" style={{ color: "var(--text-main)" }}>
                  <Phone className="w-5 h-5" style={{ color: "var(--accent-cta)" }} />
                  <span>613-628-2454</span>
                </a>
                <a href="mailto:office@serenityresorts.ca" className="flex items-center gap-3 hover:underline" style={{ color: "var(--text-main)" }}>
                  <Mail className="w-5 h-5" style={{ color: "var(--accent-cta)" }} />
                  <span>office@serenityresorts.ca</span>
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10 pt-8" style={{ borderTop: "1px solid var(--nav-border)" }}>
              <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                <MapPin className="w-4 h-4" style={{ color: "var(--gold)" }} />
                Serenity Bay — Eganville
              </h4>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>7200 Hwy 60, Eganville ON</p>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11200!2d-77.0653359!3d45.5431124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDMyJzM1LjIiTiA3N8KwMDMnNTUuMiJX!5e0!3m2!1sen!2sca!4v1"
                  width="100%" height="200" style={{ border: 0 }} loading="lazy" title="Serenity Bay"
                />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="pt-8" style={{ borderTop: "1px solid var(--nav-border)" }}>
              <h4 className="font-semibold mb-3 flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
                <MapPin className="w-4 h-4" style={{ color: "var(--gold)" }} />
                Serenity Hills — Renfrew
              </h4>
              <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>435 Castleford Rd, Renfrew ON</p>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11200!2d-76.6573214!3d45.4939378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDI5JzM4LjIiTiA3NsKwMzknMjYuNCJX!5e0!3m2!1sen!2sca!4v1"
                  width="100%" height="200" style={{ border: 0 }} loading="lazy" title="Serenity Hills"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div>
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--accent-sage)" }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Message Sent!</h3>
                  <p style={{ color: "var(--text-muted)" }}>We&apos;ll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Send a Message</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        required
                    className="w-full px-4 py-3 border text-sm focus:outline-none"
                        style={{ background: "var(--bg-secondary)", borderColor: "var(--nav-border)" }}
                    />
                  </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-3 border text-sm focus:outline-none"
                        style={{ background: "var(--bg-secondary)", borderColor: "var(--nav-border)" }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border text-sm focus:outline-none"
                      style={{ background: "var(--bg-secondary)", borderColor: "var(--nav-border)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Location Interest</label>
                    <select
                      className="w-full px-4 py-3 border text-sm focus:outline-none"
                      style={{ background: "var(--bg-secondary)", borderColor: "var(--nav-border)" }}
                    >
                      <option value="">Select a location...</option>
                      <option value="bay">Serenity Bay — Eganville</option>
                      <option value="hills">Serenity Hills — Renfrew</option>
                      <option value="both">Both Locations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 border text-sm focus:outline-none resize-none"
                      style={{ background: "var(--bg-secondary)", borderColor: "var(--nav-border)" }}
                    />
                  </div>
                  <button type="submit" className="btn-cta flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
