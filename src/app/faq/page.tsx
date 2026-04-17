"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const FAQ_ITEMS = [
  { q: "What is check-in and check-out time?", a: "Check in is at 2:00 PM. Check out is at 12:00 noon." },
  { q: "How do I make a reservation?", a: "Call us at 613-628-2454 or email office@serenityresorts.ca." },
  { q: "Can I bring my own firewood?", a: "Sorry, no. Due to many invasive species, we do not allow wood from outside the park. We have wood for sale at very reasonable prices." },
  { q: "My children want to camp in a tent beside the RV. Is this allowed?", a: "Sorry, no children in tents without an adult." },
  { q: "Do you allow Cannabis or Alcohol in the campground?", a: "Only on your site and only in moderation." },
  { q: "Are pets allowed?", a: "Yes! Pets must be on a leash and poop-and-scoop rules apply." },
  { q: "Why do I have to turn my radio off at 11 PM?", a: "Quiet time is 11:00 PM to 9:00 AM — people are here to relax." },
  { q: "Do you have WiFi?", a: "It is iffy in the park but lots of hot spots close by in Renfrew. Many campers are using a booster and having good results." },
  { q: "Do you have garbage facilities on site?", a: "Yes, we recycle. The recycling station is located at the entrance." },
  { q: "Do you have a beach?", a: "Serenity Bay in Eganville has access to a lovely beach area. Serenity Hills in Renfrew has a pool but no beach access." },
  { q: "Can I bring my own boat?", a: "Serenity Bay has boat slips for rent. Serenity Hills does not have lake access but is approximately 1 mile from the Ottawa River." },
  { q: "Do you have pull-through sites?", a: "Yes, up to 66 feet. All are full service." },
  { q: "What amp electric do you have?", a: "30 amp." },
];

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

  const toggleItem = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about staying at Serenity Resorts"
        image="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104159153-PZ1Z95QLFZ7FETTHQZYO/Foggy+Lake+.jpeg?format=2500w"
      />
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[720px] mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            {FAQ_ITEMS.map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
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
