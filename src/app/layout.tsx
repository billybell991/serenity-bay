import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WinterOverlay } from "@/components/winter-overlay";

export const metadata: Metadata = {
  title: "Serenity Resorts — Camping in the Ottawa Valley",
  description: "Two beautiful camping resort locations in Eganville and Renfrew, Ontario. Family-friendly lakefront and forest camping with full-service sites.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <WinterOverlay />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
