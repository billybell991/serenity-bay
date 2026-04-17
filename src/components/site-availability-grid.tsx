"use client";

import { useState, useEffect } from "react";
import { loadAvailability, STATUS_CONFIG, type AvailabilityData, type SiteStatus } from "@/lib/availability-data";

export function SiteAvailabilityGrid({ location }: { location: "bay" | "hills" }) {
  const [data, setData] = useState<AvailabilityData | null>(null);

  useEffect(() => {
    setData(loadAvailability());
    const handler = () => setData(loadAvailability());
    window.addEventListener("availability-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("availability-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!data) return null;

  const sites = data[location];
  const counts: Record<SiteStatus, number> = { available: 0, occupied: 0, reserved: 0, maintenance: 0 };
  sites.forEach((s) => counts[s.status]++);

  const STATUSES: SiteStatus[] = ["available", "occupied", "reserved", "maintenance"];

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
        Site Availability
      </h3>

      {/* Legend + counts */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        {STATUSES.map((s) => (
          <span key={s} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem" }}>
            <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: STATUS_CONFIG[s].bg, display: "inline-block" }} />
            {STATUS_CONFIG[s].label}: <strong>{counts[s]}</strong>
          </span>
        ))}
      </div>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(36px, 1fr))",
        gap: "4px",
      }}>
        {sites.map((site) => (
          <div
            key={site.id}
            title={`Site ${site.number} — ${STATUS_CONFIG[site.status].label}`}
            style={{
              width: "100%",
              aspectRatio: "1",
              borderRadius: "4px",
              background: STATUS_CONFIG[site.status].bg,
              color: STATUS_CONFIG[site.status].color,
              fontSize: "0.65rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {site.number}
          </div>
        ))}
      </div>

      <p className="text-xs mt-3" style={{ color: "var(--text-dim)" }}>
        Last updated: {new Date(data.lastUpdated).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
      </p>
    </div>
  );
}
