"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Truck,
  LogOut,
  TreePine,
  Users,
  Plus,
  Key,
  Trash2,
  Shield,
  Eye,
  EyeOff,
  Check,
  Megaphone,
  DollarSign,
  GripVertical,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  EyeIcon,
  EyeOffIcon,
  Inbox,
  Mail,
  MailOpen,
  LayoutGrid,
  Pencil,
  X,
  ImageIcon,
  BookOpen,
} from "lucide-react";
import { TrailerEditor } from "@/app/trailer-sales/page";
import {
  loadAnnouncement,
  saveAnnouncement,
  type AnnouncementData,
} from "@/components/announcement-banner";
import {
  loadRates,
  saveRates,
  getDefaultRates,
  type RatesData,
  type RateItem,
} from "@/lib/rates-data";
import {
  loadFaq,
  saveFaq,
  getDefaultFaq,
  type FaqItem,
} from "@/lib/faq-data";
import {
  loadSubmissions,
  saveSubmissions,
  markRead,
  markAllRead,
  deleteSubmission,
  type ContactSubmission,
} from "@/lib/contact-data";
import {
  loadAvailability,
  saveAvailability,
  getDefaultAvailability,
  STATUS_CONFIG,
  type AvailabilityData,
  type CampsiteInfo,
  type SiteStatus,
} from "@/lib/availability-data";
import {
  loadImages,
  saveImages,
  getDefaultImages,
  HERO_LABELS,
  type ImageStore,
} from "@/lib/image-data";
import {
  loadSession,
  clearSession,
  loadUsers,
  saveUsers,
  hashNewPassword,
  ensureDefaultUsers,
  type AdminUser,
  type AdminSession,
} from "@/lib/admin-auth";

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ManagePage() {
  const router = useRouter();
  const [session, setSession]     = useState<AdminSession | null>(null);
  const [activeTab, setActiveTab] = useState<"trailers" | "announce" | "rates" | "faq" | "messages" | "sites" | "images" | "users">("trailers");

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

  const handleLogout = () => {
    clearSession();
    setSession(null);
    window.location.href = "/serenity-bay/";
  };

  // Render nothing while session check / redirect is in flight
  if (!session) return null;

  const tabs = [
    { key: "trailers" as const, icon: Truck, label: "Trailer Sales" },
    { key: "announce" as const, icon: Megaphone, label: "Announce" },
    { key: "rates" as const, icon: DollarSign, label: "Rates" },
    { key: "faq" as const, icon: HelpCircle, label: "FAQ" },
    { key: "messages" as const, icon: Inbox, label: "Messages" },
    { key: "sites" as const, icon: LayoutGrid, label: "Sites" },
    { key: "images" as const, icon: ImageIcon, label: "Images" },
    ...(session.role === "superadmin"
      ? [{ key: "users" as const, icon: Users, label: "Users" }]
      : []),
  ];

  return (
    <section style={{ background: "var(--bg-primary)", paddingTop: "5rem", paddingBottom: "3rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <TreePine className="w-7 h-7" style={{ color: "var(--accent-sage)" }} />
            <div>
              <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Admin Dashboard</h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Signed in as <strong>{session.username}</strong>{" "}
                <span className="capitalize">({session.role})</span>
                {" · "}
                <button
                  onClick={() => router.push("/manage/help")}
                  style={{ color: "var(--accent-sage)", cursor: "pointer", textDecoration: "underline", background: "none", border: "none", padding: 0, font: "inherit", fontSize: "inherit" }}
                >
                  <BookOpen className="w-3 h-3" style={{ display: "inline", verticalAlign: "middle", marginRight: "0.2rem" }} />
                  Help Guide
                </button>
                {" · "}
                <button
                  onClick={handleLogout}
                  style={{ color: "var(--accent-sage)", cursor: "pointer", textDecoration: "underline", background: "none", border: "none", padding: 0, font: "inherit", fontSize: "inherit" }}
                >
                  Sign Out
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem", marginBottom: "2rem" }}>
          {tabs.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.5rem 0.75rem",
                fontSize: "0.8rem",
                fontWeight: 600,
                borderRadius: "8px",
                border: activeTab === key ? "none" : "1px solid rgba(0,0,0,0.1)",
                background: activeTab === key ? "var(--accent-cta)" : "var(--bg-card)",
                color: activeTab === key ? "white" : "var(--text-main)",
                boxShadow: activeTab === key ? "0 4px 12px rgba(0,0,0,0.15)" : "0 1px 3px rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                flex: "0 1 auto",
                minWidth: 0,
              }}
            >
              <Icon style={{ width: "14px", height: "14px", flexShrink: 0 }} /> {label}
            </button>
          ))}
        </div>

        {/* Trailers Panel */}
        {activeTab === "trailers" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
            <TrailerEditor />
          </motion.div>
        )}

        {/* Announcement Banner Panel */}
        {activeTab === "announce" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <AnnouncementPanel />
          </motion.div>
        )}

        {/* Rates Panel */}
        {activeTab === "rates" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RatesPanel />
          </motion.div>
        )}

        {/* FAQ Panel */}
        {activeTab === "faq" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FaqPanel />
          </motion.div>
        )}

        {/* Messages Panel */}
        {activeTab === "messages" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <MessagesPanel />
          </motion.div>
        )}

        {/* Sites Panel */}
        {activeTab === "sites" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <SitesPanel />
          </motion.div>
        )}

        {/* Images Panel */}
        {activeTab === "images" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ImagesPanel />
          </motion.div>
        )}

        {/* Users Panel — superadmin only */}
        {activeTab === "users" && session.role === "superadmin" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <UsersPanel currentUserId={session.userId} />
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── Users Panel ─────────────────────────────────────────────────────────────

function UsersPanel({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers]             = useState<AdminUser[]>([]);
  const [showAdd, setShowAdd]         = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole]         = useState<AdminUser["role"]>("admin");
  const [addError, setAddError]       = useState("");

  const [changingFor, setChangingFor] = useState<string | null>(null);
  const [newPass, setNewPass]         = useState("");
  const [passError, setPassError]     = useState("");
  const [showNewPass, setShowNewPass] = useState(false);

  useEffect(() => { setUsers(loadUsers()); }, []);
  const refresh = () => setUsers(loadUsers());

  const superadminCount = users.filter(u => u.role === "superadmin").length;

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    const trimmed = newUsername.trim();
    if (!trimmed) { setAddError("Username is required"); return; }
    if (users.some(u => u.username.toLowerCase() === trimmed.toLowerCase())) {
      setAddError("That username already exists"); return;
    }
    if (!newPassword) { setAddError("Password is required"); return; }
    const { hash, salt } = await hashNewPassword(newPassword);
    saveUsers([...users, { id: crypto.randomUUID(), username: trimmed, passwordHash: hash, salt, role: newRole }]);
    refresh();
    setShowAdd(false); setNewUsername(""); setNewPassword(""); setNewRole("admin");
  };

  const handleDelete = (userId: string, role: AdminUser["role"]) => {
    if (userId === currentUserId) return;
    if (role === "superadmin" && superadminCount <= 1) return;
    saveUsers(users.filter(u => u.id !== userId));
    refresh();
  };

  const handleChangePassword = async (userId: string) => {
    setPassError("");
    if (!newPass) { setPassError("Password is required"); return; }
    const { hash, salt } = await hashNewPassword(newPass);
    saveUsers(users.map(u => u.id === userId ? { ...u, passwordHash: hash, salt } : u));
    refresh(); setChangingFor(null); setNewPass("");
  };

  const openChangePassword = (userId: string) => {
    setChangingFor(prev => prev === userId ? null : userId);
    setNewPass(""); setPassError(""); setShowNewPass(false);
  };

  return (
    <div className="border border-black/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
          <Shield className="w-5 h-5" /> Admin Users
        </h3>
        <button onClick={() => setShowAdd(v => !v)} className="flex items-center gap-1 text-sm btn-cta px-3 py-2">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {showAdd && (
        <form
          onSubmit={handleAdd}
          className="mb-6 p-4 border border-dashed border-black/15 space-y-3"
          style={{ background: "var(--bg-secondary)" }}
        >
          <h4 className="font-semibold text-sm">New User</h4>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={newUsername}
              onChange={e => setNewUsername(e.target.value)}
              placeholder="Username"
              autoComplete="off"
              className="px-3 py-2 border border-black/10 text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
              style={{ background: "var(--bg-primary)" }}
              required
            />
            <select
              value={newRole}
              onChange={e => setNewRole(e.target.value as AdminUser["role"])}
              className="px-3 py-2 border border-black/10 text-sm"
              style={{ background: "var(--bg-primary)" }}
            >
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Password"
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-black/10 text-sm focus:outline-none focus:ring-1 focus:ring-black/20"
            style={{ background: "var(--bg-primary)" }}
            required minLength={8}
          />
          {addError && <p className="text-red-500 text-xs">{addError}</p>}
          <div className="flex gap-2">
            <button type="submit" className="btn-cta text-sm px-4 py-2">Create User</button>
            <button type="button" onClick={() => { setShowAdd(false); setAddError(""); }} className="text-sm px-4 py-2 hover:bg-black/5">Cancel</button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {users.map((u) => (
          <div key={u.id} className="border border-black/8 p-4" style={{ background: "var(--bg-secondary)" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: u.role === "superadmin" ? "var(--accent-cta)" : "var(--accent-sage)" }}
                >
                  {u.username[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm">{u.username}</p>
                  <p className="text-xs capitalize" style={{ color: "var(--text-muted)" }}>{u.role}</p>
                </div>
                {u.id === currentUserId && (
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: "var(--bg-primary)", color: "var(--text-dim)" }}>you</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openChangePassword(u.id)} className="p-2 rounded hover:bg-black/5" title="Change password">
                  <Key className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(u.id, u.role)}
                  disabled={u.id === currentUserId || (u.role === "superadmin" && superadminCount <= 1)}
                  className="p-2 rounded hover:bg-red-50 text-red-500 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Delete user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            {changingFor === u.id && (
              <div className="mt-3 pt-3 border-t border-black/8">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showNewPass ? "text" : "password"}
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      placeholder="New password"
                      autoComplete="new-password"
                      className="w-full px-3 py-2 border border-black/10 text-sm pr-10 focus:outline-none focus:ring-1 focus:ring-black/20"
                      style={{ background: "var(--bg-primary)" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPass(v => !v)}
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--text-muted)" }}
                      aria-label={showNewPass ? "Hide password" : "Show password"}
                    >
                      {showNewPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  <button
                    onClick={() => handleChangePassword(u.id)}
                    className="btn-cta text-sm px-3 py-2 flex items-center gap-1 shrink-0"
                  >
                    <Check className="w-4 h-4" /> Save
                  </button>
                </div>
                {passError && <p className="text-red-500 text-xs mt-1">{passError}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-xs mt-5" style={{ color: "var(--text-dim)" }}>
        <strong>Roles:</strong> Superadmin can manage users and access all settings. Admin can access all settings but cannot manage users.
      </p>
    </div>
  );
}

// ─── Announcement Panel ──────────────────────────────────────────────────────

function AnnouncementPanel() {
  const [data, setData] = useState<AnnouncementData>({ enabled: false, text: "", bg: "#2a7fa5" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(loadAnnouncement());
  }, []);

  const handleSave = () => {
    saveAnnouncement(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const presetColors = [
    { label: "Blue", value: "#2a7fa5" },
    { label: "Green", value: "#3a8a5c" },
    { label: "Red", value: "#c1403d" },
    { label: "Orange", value: "#d4802a" },
    { label: "Purple", value: "#7c4daf" },
  ];

  return (
    <div className="border border-black/10 p-6" style={{ background: "var(--bg-card)" }}>
      <h3 className="text-lg font-bold flex items-center gap-2 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
        <Megaphone className="w-5 h-5" /> Announcement Banner
      </h3>

      {/* Toggle */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div>
          <p className="text-sm font-semibold">Show banner on all pages</p>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>Visitors can dismiss it with the × button</p>
        </div>
        <button
          onClick={() => setData({ ...data, enabled: !data.enabled })}
          style={{
            width: "48px",
            height: "26px",
            borderRadius: "13px",
            border: "none",
            cursor: "pointer",
            background: data.enabled ? "var(--accent-cta)" : "rgba(0,0,0,0.15)",
            position: "relative",
            transition: "background 0.2s",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "3px",
              left: data.enabled ? "25px" : "3px",
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#fff",
              transition: "left 0.2s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            }}
          />
        </button>
      </div>

      {/* Banner text */}
      <div style={{ marginBottom: "1.25rem" }}>
        <label className="block text-xs font-medium mb-1">Banner message</label>
        <input
          type="text"
          value={data.text}
          onChange={(e) => setData({ ...data, text: e.target.value })}
          placeholder='e.g. "Booking opens May 1!"'
          className="w-full px-3 py-2 border border-black/10 text-sm"
          style={{ background: "var(--bg-secondary)" }}
        />
      </div>

      {/* Color picker */}
      <div style={{ marginBottom: "1.5rem" }}>
        <label className="block text-xs font-medium mb-2">Banner colour</label>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          {presetColors.map((c) => (
            <button
              key={c.value}
              onClick={() => setData({ ...data, bg: c.value })}
              title={c.label}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: c.value,
                border: data.bg === c.value ? "3px solid var(--text-main)" : "2px solid transparent",
                cursor: "pointer",
                transition: "border 0.15s",
              }}
            />
          ))}
          <input
            type="color"
            value={data.bg}
            onChange={(e) => setData({ ...data, bg: e.target.value })}
            style={{ width: "28px", height: "28px", border: "none", padding: 0, cursor: "pointer", borderRadius: "4px" }}
            title="Custom colour"
          />
        </div>
      </div>

      {/* Preview */}
      {data.text.trim() && (
        <div style={{ marginBottom: "1.5rem" }}>
          <label className="block text-xs font-medium mb-2">Preview</label>
          <div
            style={{
              background: data.bg,
              color: "#fff",
              textAlign: "center",
              padding: "0.5rem 1rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              borderRadius: "4px",
            }}
          >
            {data.text}
          </div>
        </div>
      )}

      {/* Save */}
      <button onClick={handleSave} className="btn-cta px-4 py-2 text-sm flex items-center gap-2">
        <Check className="w-4 h-4" />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── Rates Panel ─────────────────────────────────────────────────────────────

function RatesPanel() {
  const [data, setData] = useState<RatesData>(getDefaultRates());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setData(loadRates());
  }, []);

  const handleSave = () => {
    saveRates(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = getDefaultRates();
    setData(defaults);
    saveRates(defaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateItem = (location: "bay" | "hills", itemId: string, field: "label" | "value", val: string) => {
    setData((prev) => ({
      ...prev,
      [location]: {
        ...prev[location],
        items: prev[location].items.map((it) =>
          it.id === itemId ? { ...it, [field]: val } : it
        ),
      },
    }));
  };

  const addItem = (location: "bay" | "hills") => {
    const id = `${location}-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      [location]: {
        ...prev[location],
        items: [...prev[location].items, { id, label: "", value: "" }],
      },
    }));
  };

  const removeItem = (location: "bay" | "hills", itemId: string) => {
    setData((prev) => ({
      ...prev,
      [location]: {
        ...prev[location],
        items: prev[location].items.filter((it) => it.id !== itemId),
      },
    }));
  };

  const updateFootnote = (location: "bay" | "hills", val: string) => {
    setData((prev) => ({
      ...prev,
      [location]: { ...prev[location], footnote: val },
    }));
  };

  const LocationEditor = ({ locKey, title }: { locKey: "bay" | "hills"; title: string }) => {
    const loc = data[locKey];
    return (
      <div style={{ marginBottom: "2rem" }}>
        <h4 className="text-sm font-bold mb-3" style={{ fontFamily: "var(--font-heading)", fontSize: "1rem" }}>{title}</h4>
        <div className="space-y-2">
          {loc.items.map((item) => (
            <div key={item.id} style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <input
                value={item.label}
                onChange={(e) => updateItem(locKey, item.id, "label", e.target.value)}
                placeholder="Label (e.g. Seasonal Sites)"
                className="px-3 py-2 border border-black/10 text-sm"
                style={{ background: "var(--bg-secondary)", flex: 1 }}
              />
              <input
                value={item.value}
                onChange={(e) => updateItem(locKey, item.id, "value", e.target.value)}
                placeholder="Rate (e.g. $60 / night)"
                className="px-3 py-2 border border-black/10 text-sm"
                style={{ background: "var(--bg-secondary)", flex: 1 }}
              />
              <button
                onClick={() => removeItem(locKey, item.id)}
                className="p-2 hover:bg-red-50 text-red-500"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => addItem(locKey)}
          className="flex items-center gap-1 text-sm mt-2"
          style={{ color: "var(--accent-cta)", cursor: "pointer", background: "none", border: "none", padding: "0.25rem 0", font: "inherit" }}
        >
          <Plus className="w-3.5 h-3.5" /> Add rate
        </button>
        <div style={{ marginTop: "0.75rem" }}>
          <label className="block text-xs font-medium mb-1">Footnote</label>
          <input
            value={loc.footnote}
            onChange={(e) => updateFootnote(locKey, e.target.value)}
            className="w-full px-3 py-2 border border-black/10 text-sm"
            style={{ background: "var(--bg-secondary)" }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="border border-black/10 p-6" style={{ background: "var(--bg-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
          <DollarSign className="w-5 h-5" /> Rates Editor
        </h3>
        <button
          onClick={handleReset}
          className="text-xs"
          style={{ color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", font: "inherit", textDecoration: "underline" }}
        >
          Reset to defaults
        </button>
      </div>

      <LocationEditor locKey="bay" title="Serenity Bay" />
      <LocationEditor locKey="hills" title="Serenity Hills" />

      <button onClick={handleSave} className="btn-cta px-4 py-2 text-sm flex items-center gap-2">
        <Check className="w-4 h-4" />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── FAQ Panel ───────────────────────────────────────────────────────────────

function FaqPanel() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadFaq());
  }, []);

  const handleSave = () => {
    saveFaq(items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = getDefaultFaq();
    setItems(defaults);
    saveFaq(defaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addItem = () => {
    const newItem: FaqItem = { id: `faq-${Date.now()}`, q: "", a: "", visible: true };
    setItems([...items, newItem]);
    setEditingId(newItem.id);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((it) => it.id !== id));
  };

  const updateItem = (id: string, field: "q" | "a", val: string) => {
    setItems(items.map((it) => (it.id === id ? { ...it, [field]: val } : it)));
  };

  const toggleVisible = (id: string) => {
    setItems(items.map((it) => (it.id === id ? { ...it, visible: !it.visible } : it)));
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setItems(updated);
  };

  return (
    <div className="border border-black/10 p-6" style={{ background: "var(--bg-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
          <HelpCircle className="w-5 h-5" /> FAQ Editor
        </h3>
        <button
          onClick={handleReset}
          className="text-xs"
          style={{ color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", font: "inherit", textDecoration: "underline" }}
        >
          Reset to defaults
        </button>
      </div>

      <div className="space-y-2" style={{ marginBottom: "1.5rem" }}>
        {items.map((item, i) => (
          <div
            key={item.id}
            className="border border-black/10"
            style={{
              background: item.visible ? "var(--bg-secondary)" : "var(--bg-primary)",
              opacity: item.visible ? 1 : 0.5,
              padding: "0.75rem",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Reorder buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <button
                  onClick={() => moveItem(i, -1)}
                  disabled={i === 0}
                  style={{ background: "none", border: "none", cursor: i === 0 ? "default" : "pointer", padding: 0, opacity: i === 0 ? 0.2 : 0.6 }}
                  title="Move up"
                >
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveItem(i, 1)}
                  disabled={i === items.length - 1}
                  style={{ background: "none", border: "none", cursor: i === items.length - 1 ? "default" : "pointer", padding: 0, opacity: i === items.length - 1 ? 0.2 : 0.6 }}
                  title="Move down"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Question preview / edit toggle */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <button
                  onClick={() => setEditingId(editingId === item.id ? null : item.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit", textAlign: "left", width: "100%" }}
                >
                  <p className="text-sm font-medium" style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.q || "(empty question)"}
                  </p>
                </button>
              </div>

              {/* Visibility toggle */}
              <button
                onClick={() => toggleVisible(item.id)}
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", color: item.visible ? "var(--accent-sage)" : "var(--text-muted)" }}
                title={item.visible ? "Visible — click to hide" : "Hidden — click to show"}
              >
                {item.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              {/* Delete */}
              <button
                onClick={() => removeItem(item.id)}
                className="hover:bg-red-50 text-red-500"
                style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Expanded edit fields */}
            {editingId === item.id && (
              <div style={{ marginTop: "0.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <input
                  value={item.q}
                  onChange={(e) => updateItem(item.id, "q", e.target.value)}
                  placeholder="Question"
                  className="w-full px-3 py-2 border border-black/10 text-sm"
                  style={{ background: "var(--bg-primary)" }}
                />
                <textarea
                  value={item.a}
                  onChange={(e) => updateItem(item.id, "a", e.target.value)}
                  placeholder="Answer"
                  rows={3}
                  className="w-full px-3 py-2 border border-black/10 text-sm"
                  style={{ background: "var(--bg-primary)" }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button onClick={addItem} className="flex items-center gap-1 text-sm" style={{ color: "var(--accent-cta)", cursor: "pointer", background: "none", border: "none", padding: 0, font: "inherit" }}>
          <Plus className="w-3.5 h-3.5" /> Add question
        </button>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={handleSave} className="btn-cta px-4 py-2 text-sm flex items-center gap-2">
          <Check className="w-4 h-4" />
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

// ─── Messages Panel ──────────────────────────────────────────────────────────

const LOCATION_LABELS: Record<string, string> = {
  bay: "Serenity Bay",
  hills: "Serenity Hills",
  both: "Both Locations",
};

function MessagesPanel() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const refresh = () => setSubmissions(loadSubmissions());

  useEffect(() => {
    refresh();
    const handler = () => refresh();
    window.addEventListener("submissions-change", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("submissions-change", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const unreadCount = submissions.filter((s) => !s.read).length;

  const handleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    const sub = submissions.find((s) => s.id === id);
    if (sub && !sub.read) {
      markRead(id);
      refresh();
    }
  };

  const handleDelete = (id: string) => {
    deleteSubmission(id);
    if (expandedId === id) setExpandedId(null);
    refresh();
  };

  const handleMarkAllRead = () => {
    markAllRead();
    refresh();
  };

  const handleClearAll = () => {
    saveSubmissions([]);
    setExpandedId(null);
    refresh();
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  };

  return (
    <div className="border border-black/10 p-6" style={{ background: "var(--bg-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <h3 className="text-lg font-bold flex items-center gap-2" style={{ fontFamily: "var(--font-heading)" }}>
          <Inbox className="w-5 h-5" /> Messages
          {unreadCount > 0 && (
            <span style={{
              background: "var(--accent-cta)",
              color: "#fff",
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "2px 7px",
              borderRadius: "9999px",
              marginLeft: "0.25rem",
            }}>
              {unreadCount}
            </span>
          )}
        </h3>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-xs"
              style={{ color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", font: "inherit", textDecoration: "underline" }}
            >
              Mark all read
            </button>
          )}
          {submissions.length > 0 && (
            <button
              onClick={handleClearAll}
              className="text-xs"
              style={{ color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", font: "inherit", textDecoration: "underline" }}
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {submissions.length === 0 ? (
        <p className="text-sm" style={{ color: "var(--text-muted)", textAlign: "center", padding: "2rem 0" }}>
          No messages yet. Submissions from the contact form will appear here.
        </p>
      ) : (
        <div className="space-y-2">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="border border-black/10"
              style={{
                background: sub.read ? "var(--bg-secondary)" : "var(--bg-primary)",
                padding: "0.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}
                onClick={() => handleExpand(sub.id)}
              >
                {sub.read ? (
                  <MailOpen className="w-4 h-4" style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                ) : (
                  <Mail className="w-4 h-4" style={{ color: "var(--accent-cta)", flexShrink: 0 }} />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="text-sm" style={{ fontWeight: sub.read ? 400 : 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {sub.name}
                    <span style={{ color: "var(--text-muted)", fontWeight: 400, marginLeft: "0.5rem", fontSize: "0.75rem" }}>
                      {sub.email}
                    </span>
                  </p>
                </div>
                <span className="text-xs" style={{ color: "var(--text-dim)", flexShrink: 0 }}>
                  {formatDate(sub.date)}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(sub.id); }}
                  className="hover:bg-red-50 text-red-500"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", flexShrink: 0 }}
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {expandedId === sub.id && (
                <div style={{ marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.25rem 0.75rem", fontSize: "0.8rem", marginBottom: "0.75rem" }}>
                    <span style={{ color: "var(--text-dim)", fontWeight: 600 }}>Phone:</span>
                    <span>{sub.phone || "—"}</span>
                    <span style={{ color: "var(--text-dim)", fontWeight: 600 }}>Location:</span>
                    <span>{LOCATION_LABELS[sub.location] || sub.location || "—"}</span>
                  </div>
                  <div className="text-sm" style={{ color: "var(--text-main)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                    {sub.message}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Sites Panel ─────────────────────────────────────────────────────────────

const STATUSES: SiteStatus[] = ["available", "occupied", "reserved", "maintenance"];

function SitesPanel() {
  const [data, setData] = useState<AvailabilityData>(getDefaultAvailability());
  const [saved, setSaved] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingSite, setEditingSite] = useState<{ loc: "bay" | "hills"; id: string } | null>(null);
  const [editName, setEditName] = useState("");
  const [addingTo, setAddingTo] = useState<"bay" | "hills" | null>(null);
  const [newSiteName, setNewSiteName] = useState("");

  useEffect(() => {
    setData(loadAvailability());
  }, []);

  const handleSave = () => {
    saveAvailability(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = getDefaultAvailability();
    setData(defaults);
    saveAvailability(defaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const cycleSiteStatus = (location: "bay" | "hills", siteId: string) => {
    if (editMode) return; // don't cycle in edit mode
    setData((prev) => ({
      ...prev,
      [location]: prev[location].map((site) => {
        if (site.id !== siteId) return site;
        const currentIdx = STATUSES.indexOf(site.status);
        const nextStatus = STATUSES[(currentIdx + 1) % STATUSES.length];
        return { ...site, status: nextStatus };
      }),
    }));
  };

  const setAllStatus = (location: "bay" | "hills", status: SiteStatus) => {
    setData((prev) => ({
      ...prev,
      [location]: prev[location].map((site) => ({ ...site, status })),
    }));
  };

  const startRename = (loc: "bay" | "hills", site: CampsiteInfo) => {
    setEditingSite({ loc, id: site.id });
    setEditName(site.number);
  };

  const commitRename = () => {
    if (!editingSite || !editName.trim()) return;
    setData((prev) => ({
      ...prev,
      [editingSite.loc]: prev[editingSite.loc].map((s) =>
        s.id === editingSite.id ? { ...s, number: editName.trim() } : s
      ),
    }));
    setEditingSite(null);
    setEditName("");
  };

  const deleteSite = (loc: "bay" | "hills", id: string) => {
    setData((prev) => ({
      ...prev,
      [loc]: prev[loc].filter((s) => s.id !== id),
    }));
  };

  const addSite = (loc: "bay" | "hills") => {
    if (!newSiteName.trim()) return;
    const id = `${loc}-${Date.now()}`;
    setData((prev) => ({
      ...prev,
      [loc]: [...prev[loc], { id, number: newSiteName.trim(), status: "available" as SiteStatus }],
    }));
    setNewSiteName("");
    setAddingTo(null);
  };

  const getCounts = (sites: CampsiteInfo[]) => {
    const counts: Record<SiteStatus, number> = { available: 0, occupied: 0, reserved: 0, maintenance: 0 };
    sites.forEach((s) => counts[s.status]++);
    return counts;
  };

  const LocationGrid = ({ locKey, title }: { locKey: "bay" | "hills"; title: string }) => {
    const sites = data[locKey];
    const counts = getCounts(sites);

    return (
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 700, margin: 0 }}>{title} ({sites.length})</h4>
          {editMode && (
            <button
              onClick={() => { setAddingTo(locKey); setNewSiteName(""); }}
              style={{
                fontSize: "0.65rem", padding: "2px 8px", borderRadius: "4px",
                border: "1px solid rgba(0,0,0,0.1)", background: "var(--accent-sage)",
                color: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "3px",
              }}
            >
              <Plus style={{ width: "10px", height: "10px" }} /> Add Site
            </button>
          )}
        </div>

        {/* Add site input */}
        {editMode && addingTo === locKey && (
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem", alignItems: "center" }}>
            <input
              autoFocus
              value={newSiteName}
              onChange={(e) => setNewSiteName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addSite(locKey); if (e.key === "Escape") setAddingTo(null); }}
              placeholder="Site name (e.g. A1, Lakeside 3)"
              style={{
                flex: 1, padding: "4px 8px", fontSize: "0.8rem", borderRadius: "4px",
                border: "1px solid rgba(0,0,0,0.15)", background: "var(--bg-secondary)",
              }}
            />
            <button onClick={() => addSite(locKey)} style={{ fontSize: "0.7rem", padding: "4px 10px", borderRadius: "4px", border: "none", background: "var(--accent-cta)", color: "white", cursor: "pointer" }}>Add</button>
            <button onClick={() => setAddingTo(null)} style={{ fontSize: "0.7rem", padding: "4px 6px", borderRadius: "4px", border: "1px solid rgba(0,0,0,0.1)", background: "var(--bg-secondary)", cursor: "pointer" }}>Cancel</button>
          </div>
        )}

        {!editMode && (
          <>
            {/* Bulk status buttons */}
            <div style={{ display: "flex", gap: "0.35rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setAllStatus(locKey, s)}
                  style={{
                    fontSize: "0.65rem", padding: "3px 8px", borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.1)", background: "var(--bg-secondary)",
                    cursor: "pointer", color: "var(--text-muted)",
                  }}
                  title={`Set all to ${STATUS_CONFIG[s].label}`}
                >
                  All {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>

            {/* Summary strip */}
            <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
              {STATUSES.map((s) => (
                <span key={s} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "0.75rem" }}>
                  <span style={{ width: "10px", height: "10px", borderRadius: "2px", background: STATUS_CONFIG[s].bg, display: "inline-block" }} />
                  {STATUS_CONFIG[s].label}: <strong>{counts[s]}</strong>
                </span>
              ))}
            </div>
          </>
        )}

        {/* Grid of sites — normal mode */}
        {!editMode && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(42px, 1fr))",
            gap: "4px",
          }}>
            {sites.map((site) => (
              <button
                key={site.id}
                onClick={() => cycleSiteStatus(locKey, site.id)}
                title={`Site ${site.number} — ${STATUS_CONFIG[site.status].label} (click to change)`}
                style={{
                  width: "100%", aspectRatio: "1", borderRadius: "4px", border: "none",
                  cursor: "pointer", background: STATUS_CONFIG[site.status].bg,
                  color: STATUS_CONFIG[site.status].color, fontSize: "0.7rem", fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "transform 0.1s",
                }}
              >
                {site.number}
              </button>
            ))}
          </div>
        )}

        {/* List of sites — edit mode */}
        {editMode && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {sites.map((site) => (
              <div key={site.id} style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "4px 8px", borderRadius: "6px", background: "var(--bg-secondary)",
                fontSize: "0.8rem",
              }}>
                <span style={{
                  width: "10px", height: "10px", borderRadius: "2px", flexShrink: 0,
                  background: STATUS_CONFIG[site.status].bg,
                }} />
                {editingSite?.loc === locKey && editingSite.id === site.id ? (
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") commitRename(); if (e.key === "Escape") setEditingSite(null); }}
                    onBlur={commitRename}
                    style={{
                      flex: 1, padding: "2px 6px", fontSize: "0.8rem", borderRadius: "3px",
                      border: "1px solid var(--accent-cta)", background: "white", outline: "none",
                    }}
                  />
                ) : (
                  <span style={{ flex: 1, fontWeight: 600, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {site.number}
                  </span>
                )}
                <button
                  onClick={() => startRename(locKey, site)}
                  title="Rename"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "var(--text-muted)", flexShrink: 0 }}
                >
                  <Pencil style={{ width: "12px", height: "12px" }} />
                </button>
                <button
                  onClick={() => deleteSite(locKey, site.id)}
                  title="Delete"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: "#e53e3e", flexShrink: 0 }}
                >
                  <X style={{ width: "12px", height: "12px" }} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border border-black/10 p-4" style={{ background: "var(--bg-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
          <LayoutGrid style={{ width: "18px", height: "18px" }} /> Site Availability
        </h3>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            onClick={() => setEditMode(!editMode)}
            style={{
              fontSize: "0.75rem", padding: "4px 10px", borderRadius: "6px", cursor: "pointer",
              border: editMode ? "1px solid var(--accent-cta)" : "1px solid rgba(0,0,0,0.1)",
              background: editMode ? "var(--accent-cta)" : "var(--bg-secondary)",
              color: editMode ? "white" : "var(--text-muted)",
              display: "flex", alignItems: "center", gap: "4px", transition: "all 0.15s",
            }}
          >
            <Pencil style={{ width: "11px", height: "11px" }} />
            {editMode ? "Done Editing" : "Edit Sites"}
          </button>
          <button
            onClick={handleReset}
            style={{ fontSize: "0.7rem", color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", font: "inherit", textDecoration: "underline" }}
          >
            Reset all
          </button>
        </div>
      </div>

      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
        {editMode
          ? "Rename, add, or remove sites. Click the pencil to rename a site."
          : "Click a site to cycle through: Available → Occupied → Reserved → Maintenance."}
      </p>

      <LocationGrid locKey="bay" title="Serenity Bay" />
      <LocationGrid locKey="hills" title="Serenity Hills" />

      <button onClick={handleSave} style={{
        padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: 600, borderRadius: "8px",
        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem",
        background: "var(--accent-cta)", color: "white", transition: "all 0.15s",
      }}>
        <Check style={{ width: "16px", height: "16px" }} />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

// ─── Images Panel ────────────────────────────────────────────────────────────

function pickFile(): Promise<string | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    };
    input.click();
  });
}

function ImageThumb({ src, onClick, onRemove, size = 80 }: { src: string; onClick?: () => void; onRemove?: () => void; size?: number }) {
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0, borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(0,0,0,0.1)" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" onClick={onClick} style={{ width: "100%", height: "100%", objectFit: "cover", cursor: onClick ? "pointer" : "default" }} />
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%",
            background: "rgba(0,0,0,0.6)", color: "white", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", lineHeight: 1,
          }}
        >×</button>
      )}
    </div>
  );
}

function ImagesPanel() {
  const [data, setData] = useState<ImageStore>(getDefaultImages());
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<"heroes" | "bay" | "hills">("heroes");

  useEffect(() => {
    setData(loadImages());
  }, []);

  const handleSave = () => {
    saveImages(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    const defaults = getDefaultImages();
    setData(defaults);
    saveImages(defaults);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const setHero = async (key: keyof ImageStore["heroes"]) => {
    const file = await pickFile();
    if (file) setData((prev) => ({ ...prev, heroes: { ...prev.heroes, [key]: file } }));
  };

  const setHeroUrl = (key: keyof ImageStore["heroes"], url: string) => {
    setData((prev) => ({ ...prev, heroes: { ...prev.heroes, [key]: url } }));
  };

  const addGalleryImage = async (loc: "bay" | "hills") => {
    const file = await pickFile();
    if (file) setData((prev) => ({ ...prev, galleries: { ...prev.galleries, [loc]: [...prev.galleries[loc], file] } }));
  };

  const removeGalleryImage = (loc: "bay" | "hills", index: number) => {
    setData((prev) => ({
      ...prev,
      galleries: { ...prev.galleries, [loc]: prev.galleries[loc].filter((_, i) => i !== index) },
    }));
  };

  const replaceGalleryImage = async (loc: "bay" | "hills", index: number) => {
    const file = await pickFile();
    if (file) {
      setData((prev) => ({
        ...prev,
        galleries: {
          ...prev.galleries,
          [loc]: prev.galleries[loc].map((img, i) => (i === index ? file : img)),
        },
      }));
    }
  };

  const sections = [
    { key: "heroes" as const, label: "Hero Banners" },
    { key: "bay" as const, label: "Bay Gallery" },
    { key: "hills" as const, label: "Hills Gallery" },
  ];

  return (
    <div className="border border-black/10 p-4" style={{ background: "var(--bg-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.5rem", margin: 0 }}>
          <ImageIcon style={{ width: "18px", height: "18px" }} /> Images
        </h3>
        <button onClick={handleReset} style={{ fontSize: "0.7rem", color: "var(--text-muted)", cursor: "pointer", background: "none", border: "none", font: "inherit", textDecoration: "underline" }}>
          Reset all
        </button>
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: "0.35rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            style={{
              padding: "0.4rem 0.75rem", fontSize: "0.8rem", fontWeight: 600, borderRadius: "6px",
              border: activeSection === s.key ? "none" : "1px solid rgba(0,0,0,0.1)",
              background: activeSection === s.key ? "var(--accent-cta)" : "var(--bg-secondary)",
              color: activeSection === s.key ? "white" : "var(--text-main)",
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* ── Hero Banners ── */}
      {activeSection === "heroes" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
            Click a thumbnail to pick a new image from your device, or paste a URL.
          </p>
          {(Object.keys(HERO_LABELS) as (keyof ImageStore["heroes"])[]).map((key) => (
            <div key={key} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.5rem", borderRadius: "8px", background: "var(--bg-secondary)" }}>
              <ImageThumb src={data.heroes[key]} onClick={() => setHero(key)} size={64} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, margin: "0 0 4px 0" }}>{HERO_LABELS[key]}</p>
                <input
                  value={data.heroes[key].startsWith("data:") ? "(uploaded file)" : data.heroes[key]}
                  onChange={(e) => setHeroUrl(key, e.target.value)}
                  disabled={data.heroes[key].startsWith("data:")}
                  placeholder="Image URL"
                  style={{
                    width: "100%", fontSize: "0.65rem", padding: "3px 6px", borderRadius: "4px",
                    border: "1px solid rgba(0,0,0,0.1)", background: "var(--bg-card)",
                    color: "var(--text-muted)", fontFamily: "monospace",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Gallery: Bay ── */}
      {activeSection === "bay" && (
        <GalleryEditor
          title="Serenity Bay Photos"
          images={data.galleries.bay}
          onAdd={() => addGalleryImage("bay")}
          onRemove={(i) => removeGalleryImage("bay", i)}
          onReplace={(i) => replaceGalleryImage("bay", i)}
        />
      )}

      {/* ── Gallery: Hills ── */}
      {activeSection === "hills" && (
        <GalleryEditor
          title="Serenity Hills Photos"
          images={data.galleries.hills}
          onAdd={() => addGalleryImage("hills")}
          onRemove={(i) => removeGalleryImage("hills", i)}
          onReplace={(i) => replaceGalleryImage("hills", i)}
        />
      )}

      <button onClick={handleSave} style={{
        marginTop: "1.25rem", padding: "0.5rem 1rem", fontSize: "0.85rem", fontWeight: 600, borderRadius: "8px",
        border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem",
        background: "var(--accent-cta)", color: "white", transition: "all 0.15s",
      }}>
        <Check style={{ width: "16px", height: "16px" }} />
        {saved ? "Saved!" : "Save Changes"}
      </button>
    </div>
  );
}

function GalleryEditor({ title, images, onAdd, onRemove, onReplace }: {
  title: string; images: string[]; onAdd: () => void; onRemove: (i: number) => void; onReplace: (i: number) => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <p style={{ fontSize: "0.85rem", fontWeight: 600, margin: 0 }}>{title} ({images.length})</p>
        <button
          onClick={onAdd}
          style={{
            fontSize: "0.7rem", padding: "4px 10px", borderRadius: "6px",
            border: "none", background: "var(--accent-sage)", color: "white",
            cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
          }}
        >
          <Plus style={{ width: "12px", height: "12px" }} /> Add Photo
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {images.map((src, i) => (
          <ImageThumb key={i} src={src} onClick={() => onReplace(i)} onRemove={() => onRemove(i)} />
        ))}
        {images.length === 0 && (
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontStyle: "italic" }}>No photos yet. Click &quot;Add Photo&quot; to start.</p>
        )}
      </div>
    </div>
  );
}
