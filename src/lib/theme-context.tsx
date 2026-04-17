"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Season = "spring" | "summer" | "autumn" | "winter";

type ThemeContextType = {
  season: Season;
  setSeason: (s: Season) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  season: "summer",
  setSeason: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [season, setSeason] = useState<Season>("summer");

  useEffect(() => {
    const stored = localStorage.getItem("serenity-season") as Season | null;
    if (stored && ["spring", "summer", "autumn", "winter"].includes(stored)) {
      setSeason(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", season);
    localStorage.setItem("serenity-season", season);
  }, [season]);

  return (
    <ThemeContext.Provider value={{ season, setSeason }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
