"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { TreePine, Eye, EyeOff } from "lucide-react";
import { login, loadSession, ensureDefaultUsers } from "@/lib/admin-auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername]         = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [ready, setReady]               = useState(false);

  useEffect(() => {
    ensureDefaultUsers().then(() => {
      const session = loadSession();
      if (session) {
        router.replace("/manage");
      } else {
        setReady(true);
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(username, password);

    if (result.session) {
      router.replace("/manage");
    } else {
      const msg = result.minutesLocked
        ? `Too many failed attempts. Try again in ${result.minutesLocked} minute${result.minutesLocked > 1 ? "s" : ""}.`
        : (result.error ?? "Invalid username or password");
      setError(msg);
      setLoading(false);
    }
  };

  // Suppress the page until we've checked for an existing session
  if (!ready) return null;

  return (
    <section
      className="py-20 px-6 min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <motion.div
        className="border border-black/10 p-8 w-full max-w-sm"
        style={{ background: "var(--bg-secondary)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <TreePine className="w-10 h-10 mx-auto mb-3" style={{ color: "var(--accent-sage)" }} />
          <h1 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>
            Serenity Resorts
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Staff access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            autoFocus
            className="w-full px-4 py-3 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20"
            style={{ background: "var(--bg-primary)" }}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full px-4 py-3 border border-black/10 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 pr-12"
              style={{ background: "var(--bg-primary)" }}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              style={{ color: "var(--text-muted)" }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-black text-white font-semibold uppercase tracking-wider w-full disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </motion.div>
    </section>
  );
}
