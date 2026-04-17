"use client";

import { useTheme } from "@/lib/theme-context";
import { Snowflake } from "lucide-react";

export function WinterOverlay() {
  const { season } = useTheme();
  if (season !== "winter") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-md">
      <div className="text-center max-w-md px-6">
        <Snowflake className="w-16 h-16 mx-auto mb-6" style={{ color: "var(--accent-primary)" }} />
        <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--text-main)" }}>
          Closed for the Season
        </h2>
        <p className="text-lg mb-2" style={{ color: "var(--text-muted)" }}>
          Serenity Resorts is resting under a blanket of snow.
        </p>
        <p className="text-lg mb-8" style={{ color: "var(--text-muted)" }}>
          We&apos;ll see you in May!
        </p>
        <div className="space-y-2 text-sm" style={{ color: "var(--text-dim)" }}>
          <p>For inquiries: <strong>613-628-2454</strong></p>
          <p>office@serenityresorts.ca</p>
        </div>
      </div>
    </div>
  );
}
