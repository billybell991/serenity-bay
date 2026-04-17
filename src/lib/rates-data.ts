/**
 * Rates data stored in localStorage.
 * Each location has a set of rate line items + a footnote.
 */

const STORAGE_KEY = "serenity-rates";

export interface RateItem {
  id: string;
  label: string;
  value: string;
}

export interface LocationRates {
  items: RateItem[];
  footnote: string;
}

export interface RatesData {
  bay: LocationRates;
  hills: LocationRates;
}

const DEFAULT_RATES: RatesData = {
  bay: {
    items: [
      { id: "bay-1", label: "Seasonal Sites", value: "$2,950 – $4,550" },
      { id: "bay-2", label: "Nightly Full Service", value: "$60 / night" },
      { id: "bay-3", label: "Weekly Special", value: "Book 7, Pay for 6" },
    ],
    footnote: "+ HST. All sites include water, sewer, 30-amp power.",
  },
  hills: {
    items: [
      { id: "hills-1", label: "Seasonal Sites", value: "$2,750" },
      { id: "hills-2", label: "Nightly Full Service", value: "$60 / night incl. HST" },
      { id: "hills-3", label: "Weekly Special", value: "Stay 7 for Price of 6" },
    ],
    footnote: "+ HST. All sites include water, sewer, 30-amp power.",
  },
};

export function loadRates(): RatesData {
  if (typeof window === "undefined") return DEFAULT_RATES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_RATES;
    const parsed = JSON.parse(raw);
    return {
      bay: { ...DEFAULT_RATES.bay, ...parsed.bay },
      hills: { ...DEFAULT_RATES.hills, ...parsed.hills },
    };
  } catch {
    return DEFAULT_RATES;
  }
}

export function saveRates(data: RatesData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("rates-change"));
}

export function getDefaultRates(): RatesData {
  return JSON.parse(JSON.stringify(DEFAULT_RATES));
}
