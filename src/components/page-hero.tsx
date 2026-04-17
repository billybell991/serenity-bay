"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  imageAlt?: string;
}

export function PageHero({ title, subtitle, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative h-[360px] md:h-[440px] flex items-end overflow-hidden">
      <Image
        src={image}
        alt={imageAlt || title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/10" />
      <motion.div
        className="relative z-10 w-full px-6 pb-12 md:pb-16"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <div className="max-w-[1200px] mx-auto">
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-6xl font-bold text-white mb-3 drop-shadow-lg"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg text-white/75 font-light max-w-xl"
          >
            {subtitle}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
