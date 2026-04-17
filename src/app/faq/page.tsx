"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { useImages } from "@/lib/use-images";
import { loadFaq, type FaqItem } from "@/lib/faq-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: "var(--nav-border)" }}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left transition-colors"
      >
        <span className="font-medium pr-8 text-base" style={{ color: "var(--text-main)", fontFamily: "var(--font-heading)" }}>{q}</span>
        <ChevronDown
          className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          style={{ color: "var(--gold)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: isOpen ? "200px" : "0px" }}
      >
        <div className="pb-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {a}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  useEffect(() => {
    setFaqItems(loadFaq());
    const handler = () => setFaqItems(loadFaq());
    window.addEventListener("faq-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("faq-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const visibleItems = faqItems.filter((it) => it.visible);

  const toggleItem = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const images = useImages();

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about staying at Serenity Resorts"
        image={images.heroes.faq}
      />
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[720px] mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {visibleItems.map((item, i) => (
              <motion.div key={item.id} variants={fadeUp}>
                <AccordionItem
                  q={item.q}
                  a={item.a}
                  isOpen={openItems.has(i)}
                  onToggle={() => toggleItem(i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
