"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const ATTRACTIONS = [
  {
    name: "Bonnechere Caves",
    location: "Eganville",
    description: "Explore ancient caves formed 500 million years ago â€” a must-visit geological wonder.",
    url: "https://www.bonnecherecaves.com/",
  },
  {
    name: "Bonnechere Provincial Park",
    location: "Round Lake Centre",
    description: "Hiking trails, swimming, and canoeing on Round Lake in a beautiful provincial setting.",
    url: "https://www.ontarioparks.com/park/bonnechere",
  },
  {
    name: "Ottawa River",
    location: "Near Renfrew",
    description: "World-class kayaking, fishing, and rafting. Just 4km from Serenity Hills.",
    url: null,
  },
  {
    name: "Opeongo Line",
    location: "Eganville to Barry's Bay",
    description: "Scenic drive through the Ottawa Valley with stunning fall colours and historic stops.",
    url: null,
  },
  {
    name: "Renfrew Farmers' Market",
    location: "Renfrew",
    description: "Fresh local produce, baked goods, and crafts every Saturday morning.",
    url: null,
  },
  {
    name: "Champlain Trail Museum",
    location: "Pembroke",
    description: "Explore the history of the Ottawa Valley and the fur trade era.",
    url: null,
  },
  {
    name: "Lake Clear",
    location: "Eganville Area",
    description: "Crystal-clear lake perfect for swimming, paddle boarding, and picnicking.",
    url: null,
  },
];

export default function AttractionsPage() {
  return (
    <>
      <PageHero
        title="Local Attractions"
        subtitle="There's so much to explore in the Ottawa Valley"
        image="/ottawa-valley.jpg"
      />
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[860px] mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {ATTRACTIONS.map((a) => (
              <motion.div key={a.name} variants={fadeUp}>
                <h3
                  className="text-2xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {a.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 flex items-center gap-1" style={{ color: "var(--gold)" }}>
                  <MapPin className="w-3 h-3" /> {a.location}
                </p>
                <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-muted)" }}>
                  {a.description}
                </p>
                {a.url && (
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold uppercase tracking-widest flex items-center gap-1 hover:underline"
                    style={{ color: "var(--green)" }}
                  >
                    Visit Website <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

