/**
 * Site availability board stored in localStorage.
 * Each location has a grid of numbered sites with availability status.
 */

const STORAGE_KEY = "serenity-availability";

export type SiteStatus = "available" | "occupied" | "reserved" | "maintenance";

export interface CampsiteInfo {
  id: string;
  number: string;
  status: SiteStatus;
}

export interface AvailabilityData {
  bay: CampsiteInfo[];
  hills: CampsiteInfo[];
  lastUpdated: string; // ISO date
}

function generateSites(prefix: string, count: number): CampsiteInfo[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    number: `${i + 1}`,
    status: "available" as SiteStatus,
  }));
}

const DEFAULT_DATA: AvailabilityData = {
  bay: generateSites("bay", 47),
  hills: generateSites("hills", 40),
  lastUpdated: new Date().toISOString(),
};

export function loadAvailability(): AvailabilityData {
  if (typeof window === "undefined") return DEFAULT_DATA;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_DATA;
  } catch {
    return DEFAULT_DATA;
  }
}

export function saveAvailability(data: AvailabilityData) {
  data.lastUpdated = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("availability-change"));
}

export function getDefaultAvailability(): AvailabilityData {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

export const STATUS_CONFIG: Record<SiteStatus, { label: string; color: string; bg: string }> = {
  available:   { label: "Available",   color: "#fff", bg: "#3a8a5c" },
  occupied:    { label: "Occupied",    color: "#fff", bg: "#c1403d" },
  reserved:    { label: "Reserved",    color: "#fff", bg: "#d4802a" },
  maintenance: { label: "Maintenance", color: "#fff", bg: "#6b7280" },
};
