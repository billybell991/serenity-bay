"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  TreePine,
  ArrowLeft,
  Truck,
  Megaphone,
  DollarSign,
  HelpCircle,
  Inbox,
  LayoutGrid,
  ImageIcon,
  Users,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { loadSession, ensureDefaultUsers, type AdminSession } from "@/lib/admin-auth";

/* ─── Section data ──────────────────────────────────────────────────────────── */

interface HelpSection {
  icon: React.ElementType;
  title: string;
  intro: string;
  steps: string[];
  tips?: string[];
  superadminOnly?: boolean;
}

const sections: HelpSection[] = [
  {
    icon: Truck,
    title: "Trailer Sales",
    intro: "Manage the trailer listings that appear on the Trailer Sales page. Add new trailers, edit existing ones, or remove sold units.",
    steps: [
      "Click the **Add** button to create a new listing.",
      "Fill in the trailer details: name, year, length, price, and a short description.",
      "Click the **photo area** to upload a picture from your device. The image will be stored directly in the listing.",
      "Set the status — **Available**, **Pending**, or **Sold** — to control how it appears on the public page.",
      "Click **Save Changes** to publish your updates.",
      "Use the **pencil icon** to edit an existing trailer, or the **trash icon** to remove it.",
    ],
    tips: [
      "Photos are stored as uploaded files, so larger images may take a moment to save.",
      "Trailers marked as Sold still appear on the page with a Sold banner — delete them when you no longer want them visible.",
    ],
  },
  {
    icon: Megaphone,
    title: "Announcement Banner",
    intro: "Display a colored banner across the top of every page — perfect for seasonal openings, weather alerts, or special events.",
    steps: [
      "Toggle the switch **on** to enable the banner, or **off** to hide it site-wide.",
      "Type your announcement message in the text field.",
      "Choose a banner colour from the **preset circles** (Blue, Green, Red, Orange, Purple) or enter a **custom colour**.",
      "Preview your banner in real-time above the controls.",
      "Click **Save Changes** when you're happy with how it looks.",
    ],
    tips: [
      "Visitors can dismiss the banner with the × button, but it will come back on their next visit if it's still enabled.",
      "Keep messages short — one line looks best on mobile.",
    ],
  },
  {
    icon: DollarSign,
    title: "Rates",
    intro: "Edit the pricing information shown on the Rates page for both Serenity Bay and Serenity Hills.",
    steps: [
      "Each location has its own list of rate items with a **label** (e.g. \"Seasonal Sites\") and a **value** (e.g. \"$2,750\").",
      "Edit any label or value directly in the text fields.",
      "Click **+ Add rate** to add a new row to a location.",
      "Click the **trash icon** to remove a rate item.",
      "Each location also has a **Footnote** field for small-print notes.",
      "Click **Save Changes** to update the public page.",
    ],
    tips: [
      "Use **Reset to defaults** if you want to start over with the original rate structure.",
      "Rate changes take effect immediately after saving — no need to restart anything.",
    ],
  },
  {
    icon: HelpCircle,
    title: "FAQ",
    intro: "Manage the frequently asked questions shown on the FAQ page. Reorder, edit, hide, or add new questions.",
    steps: [
      "Click any question to **expand** it and edit the question text and answer.",
      "Use the **up/down arrows** to reorder questions.",
      "Click the **eye icon** to toggle visibility — hidden questions are dimmed in the editor and won't appear on the public page.",
      "Click the **trash icon** to permanently delete a question.",
      "Click **+ Add question** to create a new blank FAQ entry.",
      "Click **Save Changes** when done.",
    ],
    tips: [
      "Hiding a question (instead of deleting it) lets you bring it back later without rewriting it.",
      "The order you set here is the exact order visitors will see.",
    ],
  },
  {
    icon: Inbox,
    title: "Messages",
    intro: "View and manage messages submitted through the Contact page. New messages show up here automatically.",
    steps: [
      "Unread messages are marked with a **filled envelope icon** and the tab shows an unread count badge.",
      "Click a message row to **expand** it and see the full details: name, email, phone, preferred location, and message text.",
      "Expanding a message automatically marks it as **read**.",
      "Use the **trash icon** to delete individual messages.",
      "Click **Mark all read** to clear all unread badges at once.",
      "Click **Clear all** to delete every message.",
    ],
    tips: [
      "Messages are stored in your browser only — they won't appear on other devices.",
      "Check messages regularly, as they come in whenever someone submits the contact form.",
    ],
  },
  {
    icon: LayoutGrid,
    title: "Site Availability",
    intro: "Manage the campsite status grid for both Serenity Bay and Serenity Hills. This grid is also shown to visitors on the location pages.",
    steps: [
      "Each campsite is shown as a coloured button: **green** = Available, **red** = Occupied, **amber** = Reserved, **grey** = Maintenance.",
      "Click any site button to **cycle** through the four statuses.",
      "Use the **bulk buttons** (All Available, All Occupied, etc.) to set every site at once.",
      "Click **Edit Sites** to switch to structure mode, where you can **rename**, **add**, or **delete** individual sites.",
      "Click **Done Editing** to return to the status view.",
      "Click **Save Changes** to publish the updated grid.",
    ],
    tips: [
      "The colour legend at the bottom of each location section shows a count of each status.",
      "Use Reset to defaults to restore the original site list if needed.",
    ],
  },
  {
    icon: ImageIcon,
    title: "Images",
    intro: "Control every hero banner and photo gallery across the entire site. Upload your own photos or paste image URLs.",
    steps: [
      "The **Hero Banners** tab shows every page's main banner image. Click a **thumbnail** to upload a replacement from your device, or edit the **URL** field directly.",
      "The **Bay Gallery** and **Hills Gallery** tabs manage the photo grids on each location page.",
      "Click a gallery thumbnail to **replace** that photo. Click the **×** button to remove it.",
      "Click **Add Photo** to upload a new image to the gallery.",
      "Click **Save Changes** to publish your updates across the site.",
    ],
    tips: [
      "Uploaded photos are stored as base64 data in your browser. Very large images may slow things down — resize photos to around 2000px wide before uploading.",
      "Use Reset all to restore the original default images.",
      "Hero banners look best at 2500px wide. Gallery photos are displayed at 1000px wide.",
    ],
  },
  {
    icon: Users,
    title: "User Management",
    intro: "Add, edit, or remove admin accounts. Only superadmins can see this tab.",
    steps: [
      "Click **+ Add User** to create a new admin account. Choose a username, select a role (Admin or Superadmin), and set a password.",
      "Click the **key icon** next to any user to change their password.",
      "Click the **trash icon** to delete a user account.",
      "Admins can access all tabs except User Management. Superadmins can access everything.",
    ],
    tips: [
      "You cannot delete your own account or the last remaining superadmin.",
      "Passwords are securely hashed — there's no way to see an existing password, only reset it.",
      "Share the login URL with new admins: they can find it by clicking the © symbol in the site footer.",
    ],
    superadminOnly: true,
  },
];

/* ─── Getting Started section ──────────────────────────────────────────────── */

const gettingStarted = [
  "Sign in by clicking the **©** symbol in the bottom footer of any page, then enter your username and password.",
  "You'll land on the **Admin Dashboard** with tabs across the top for each feature.",
  "Make your changes in any tab, then click **Save Changes** to publish them. Changes are instant — no need to restart or redeploy.",
  "All data is saved in your browser's local storage. This means your changes are specific to the device and browser you're using.",
  "To sign out, click **Sign Out** next to your name at the top of the dashboard.",
];

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function HelpPage() {
  const router = useRouter();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [openSection, setOpenSection] = useState<number | null>(null);

  useEffect(() => {
    ensureDefaultUsers().then(() => {
      const s = loadSession();
      if (!s) {
        router.replace("/admin/login");
        return;
      }
      setSession(s);
    });
  }, [router]);

  if (!session) return null;

  const toggle = (i: number) => setOpenSection(openSection === i ? null : i);

  const visibleSections = sections.filter(
    (s) => !s.superadminOnly || session.role === "superadmin"
  );

  return (
    <section style={{ background: "var(--bg-primary)", paddingTop: "5rem", paddingBottom: "3rem", paddingLeft: "1rem", paddingRight: "1rem", minHeight: "100vh" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <button
            onClick={() => router.push("/manage")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "var(--accent-sage)",
              background: "none",
              border: "none",
              cursor: "pointer",
              font: "inherit",
              fontSize: "0.85rem",
              padding: 0,
              marginBottom: "1.5rem",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <TreePine className="w-7 h-7" style={{ color: "var(--accent-sage)" }} />
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                Admin Guide
              </h1>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Everything you need to know to manage the Serenity Resorts website
              </p>
            </div>
          </div>
        </div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: "var(--bg-secondary)",
            borderRadius: "12px",
            padding: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <h2 className="text-lg font-semibold" style={{ fontFamily: "var(--font-heading)", marginBottom: "1rem", color: "var(--text-primary)" }}>
            Getting Started
          </h2>
          <ol style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {gettingStarted.map((text, i) => (
              <li key={i} style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-secondary)" }}>
                <span dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Feature Sections — Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {visibleSections.map((sec, i) => {
            const Icon = sec.icon;
            const isOpen = openSection === i;

            return (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{
                  background: "var(--bg-secondary)",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "1rem 1.25rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                    textAlign: "left",
                    color: "var(--text-primary)",
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: "var(--accent-sage)", flexShrink: 0 }} />
                  <span className="font-semibold" style={{ flex: 1, fontSize: "1rem" }}>
                    {sec.title}
                  </span>
                  {isOpen
                    ? <ChevronDown className="w-4 h-4" style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                    : <ChevronRight className="w-4 h-4" style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                  }
                </button>

                {/* Accordion body */}
                {isOpen && (
                  <div style={{ padding: "0 1.25rem 1.25rem 1.25rem" }}>
                    <p style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--text-secondary)", marginBottom: "1rem" }}>
                      {sec.intro}
                    </p>

                    <h4 style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      How to use it
                    </h4>
                    <ol style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: sec.tips ? "1.25rem" : 0 }}>
                      {sec.steps.map((step, j) => (
                        <li key={j} style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                          <span dangerouslySetInnerHTML={{ __html: step.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                        </li>
                      ))}
                    </ol>

                    {sec.tips && (
                      <>
                        <h4 style={{ fontSize: "0.8rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                          Tips
                        </h4>
                        <ul style={{ margin: 0, paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          {sec.tips.map((tip, j) => (
                            <li key={j} style={{ fontSize: "0.85rem", lineHeight: 1.55, color: "var(--text-secondary)" }}>
                              <span dangerouslySetInnerHTML={{ __html: tip.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer note */}
        <p style={{ textAlign: "center", fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2.5rem", lineHeight: 1.5 }}>
          Questions? Reach out to your site administrator or email{" "}
          <a href="mailto:office@serenityresorts.ca" style={{ color: "var(--accent-sage)" }}>
            office@serenityresorts.ca
          </a>
        </p>
      </div>
    </section>
  );
}
