"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Map, X, MapPin, TreePine } from "lucide-react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

// ─── Types ─────────────────────────────────────
type SelectedItem =
  | { kind: "lot"; label: string; siteType: string; center: { left: number; top: number } }
  | { kind: "poi"; name: string; flavor: string; center: { left: number; top: number } };

// ─── Lot Polygons — 4 corners as [left%, top%] ────────
const LOT_POLYGONS: Record<string, { corners: [number, number][]; siteType: string }> = {
  B1: { corners: [[29.73, 53.12], [31.39, 51.42], [33.92, 55.24], [32.34, 57.36]], siteType: "S" },
};

// ─── POI Hotspots ──────────────────────────────
const POI_HOTSPOTS: { name: string; flavor: string; corners: [number, number][] }[] = [];

// ─── Helpers ──────────────────────────────────
function polyCenter(corners: [number, number][]): { left: number; top: number } {
  const left = corners.reduce((s, c) => s + c[0], 0) / corners.length;
  const top = corners.reduce((s, c) => s + c[1], 0) / corners.length;
  return { left, top };
}

function cornersToSvgPoints(corners: [number, number][]): string {
  return corners.map(([l, t]) => `${l},${t}`).join(" ");
}

const LOT_FILLS: Record<string, { fill: string; stroke: string; label: string }> = {
  P: { fill: "rgba(34,197,94,0.35)", stroke: "rgb(22,163,74)", label: "Permanent" },
  S: { fill: "rgba(245,158,11,0.35)", stroke: "rgb(217,119,6)", label: "Seasonal" },
  L: { fill: "rgba(59,130,246,0.35)", stroke: "rgb(37,99,235)", label: "Lot" },
  T: { fill: "rgba(168,85,247,0.35)", stroke: "rgb(147,51,234)", label: "Transient" },
};

const LOT_HEADER_BG: Record<string, string> = {
  P: "bg-green-500",
  S: "bg-amber-500",
  L: "bg-blue-500",
  T: "bg-purple-500",
};

export default function ParkMapPage() {
  const [selected, setSelected] = useState<SelectedItem | null>(null);

  const handleMapClick = () => {
    if (selected) setSelected(null);
  };

  const handleLotClick = (label: string, corners: [number, number][], siteType: string) => {
    setSelected({ kind: "lot", label, siteType, center: polyCenter(corners) });
  };

  const handlePoiClick = (name: string, flavor: string, corners: [number, number][]) => {
    setSelected({ kind: "poi", name, flavor, center: polyCenter(corners) });
  };

  return (
    <section className="py-20 px-6" style={{ background: "var(--bg-primary)" }}>
      <div className="max-w-[1200px] mx-auto">
        <motion.div className="text-center mb-10" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Map className="w-8 h-8" style={{ color: "var(--accent-cta)" }} />
          </div>
          <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>Serenity Bay Map</h1>
          <p style={{ color: "var(--text-muted)" }}>
            Explore the Serenity Bay campground — tap lots and landmarks for details
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative glass-card overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onClick={handleMapClick}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/serenity-bay/park_map.png"
            alt="Serenity Bay Park Map"
            className="w-full h-auto"
          />

          {/* SVG overlay for polygon hotspots */}
          <svg
            className="absolute inset-0 w-full h-full z-10"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ pointerEvents: "none" }}
          >
            {Object.entries(LOT_POLYGONS).map(([label, { corners, siteType }]) => (
              <g key={label} style={{ pointerEvents: "auto", cursor: "pointer" }}>
                <polygon
                  points={cornersToSvgPoints(corners)}
                  fill="transparent"
                  stroke="none"
                  onClick={(e) => { e.stopPropagation(); handleLotClick(label, corners, siteType); }}
                />
              </g>
            ))}
            {POI_HOTSPOTS.map((poi) => {
              const center = polyCenter(poi.corners);
              return (
                <g key={poi.name} style={{ pointerEvents: "auto", cursor: "pointer" }}>
                  <polygon
                    points={cornersToSvgPoints(poi.corners)}
                    fill="rgba(14,165,233,0.25)"
                    stroke="rgb(2,132,199)"
                    strokeWidth="0.3"
                    strokeDasharray="0.8,0.4"
                    onClick={(e) => { e.stopPropagation(); handlePoiClick(poi.name, poi.flavor, poi.corners); }}
                  />
                  <text
                    x={center.left}
                    y={center.top}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontWeight="bold"
                    fontSize="1.1"
                    stroke="rgb(2,132,199)"
                    strokeWidth="0.15"
                    paintOrder="stroke"
                    style={{ pointerEvents: "none" }}
                  >
                    {poi.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Popup */}
          {selected && (
            <div
              className="absolute z-50 -translate-x-1/2 pointer-events-auto"
              style={{ top: `calc(${selected.center.top}% - 60px)`, left: `${selected.center.left}%` }}
            >
              <div className="bg-white shadow-xl border border-black/10 overflow-hidden min-w-[180px]">
                <div className={`${selected.kind === "lot" ? (LOT_HEADER_BG[selected.siteType] ?? "bg-amber-500") : "bg-sky-500"} px-3 py-2 flex items-center justify-between`}>
                  <div className="flex items-center gap-1.5 text-white">
                    {selected.kind === "lot" ? <MapPin className="w-4 h-4" /> : <TreePine className="w-4 h-4" />}
                    <span className="font-bold text-sm">
                      {selected.kind === "lot" ? `Lot ${selected.label}` : selected.name}
                    </span>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setSelected(null); }} className="text-white/80 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="px-3 py-2.5">
                  {selected.kind === "lot" ? (
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {LOT_FILLS[selected.siteType]?.label ?? "Site"} Site
                    </p>
                  ) : (
                    <p className="text-sm" style={{ color: "var(--text-main)" }}>{selected.flavor}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <div className="w-3 h-3 bg-white border-r border-b border-black/10 rotate-45 -mt-1.5" />
              </div>
            </div>
          )}
        </motion.div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          {Object.entries(LOT_FILLS).map(([key, { stroke, label }]) => (
            <div key={key} className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 rounded" style={{ background: stroke }} />
              <span style={{ color: "var(--text-muted)" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
