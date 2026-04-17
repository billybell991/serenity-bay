"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "serenity-announcement";

export interface AnnouncementData {
  enabled: boolean;
  text: string;
  bg: string; // hex colour for background
}

const DEFAULT: AnnouncementData = { enabled: false, text: "", bg: "#2a7fa5" };

export function loadAnnouncement(): AnnouncementData {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULT, ...JSON.parse(raw) } : DEFAULT;
  } catch {
    return DEFAULT;
  }
}

export function saveAnnouncement(data: AnnouncementData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("announcement-change"));
}

// ─── Public banner (renders in layout) ───────────────────────────────────────

export function AnnouncementBanner() {
  const [data, setData] = useState<AnnouncementData>(DEFAULT);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setData(loadAnnouncement());
    const handler = () => setData(loadAnnouncement());
    window.addEventListener("announcement-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("announcement-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  if (!data.enabled || !data.text.trim() || dismissed) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "60px",
        left: 0,
        right: 0,
        zIndex: 45,
        background: data.bg,
        color: "#fff",
        textAlign: "center",
        padding: "0.5rem 2.5rem 0.5rem 1rem",
        fontSize: "0.875rem",
        fontWeight: 600,
        letterSpacing: "0.01em",
      }}
    >
      {data.text}
      <button
        onClick={() => setDismissed(true)}
        style={{
          position: "absolute",
          right: "0.75rem",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          color: "#fff",
          cursor: "pointer",
          opacity: 0.7,
        }}
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
}
