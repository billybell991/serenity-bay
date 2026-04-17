"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

/** Eganville, ON approximate season boundaries */
function getCurrentSeason(): Season {
  const now = new Date();
  const m = now.getMonth();     // 0-indexed
  const d = now.getDate();

  // Winter: Dec 1 – Mar 14
  if (m === 11 || m <= 1 || (m === 2 && d <= 14)) return "winter";
  // Spring: Mar 15 – May 31
  if ((m === 2 && d >= 15) || m === 3 || m === 4) return "spring";
  // Summer: Jun 1 – Sep 7 (Labour Day weekend)
  if (m === 5 || m === 6 || m === 7 || (m === 8 && d <= 7)) return "summer";
  // Autumn: Sep 8 – Nov 30
  return "autumn";
}

type ThemeContextType = {
  season: Season;
};

const ThemeContext = createContext<ThemeContextType>({
  season: "summer",
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [season] = useState<Season>(getCurrentSeason);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", season);
  }, [season]);

  return (
    <ThemeContext.Provider value={{ season }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
