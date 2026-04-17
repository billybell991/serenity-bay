/**
 * Admin authentication utilities.
 * Client-side only — uses Web Crypto API (SubtleCrypto) and localStorage.
 *
 * Security properties:
 *  - Passwords hashed with PBKDF2-HMAC-SHA256, 100 000 iterations, unique 128-bit salt per user
 *  - Constant-time comparison mitigates timing-based attacks
 *  - Rate limiting: 5 failed attempts per 15-minute window (per browser/origin)
 *  - Sessions expire after 7 days; stored only in localStorage (never sent to a server)
 */

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string; // hex-encoded PBKDF2 output
  salt: string;         // hex-encoded random 16-byte salt
  role: "superadmin" | "admin";
}

export interface AdminSession {
  userId: string;
  username: string;
  role: "superadmin" | "admin";
  token: string;   // random 32-byte hex token
  expires: number; // Unix ms
}

const USERS_KEY   = "serenity-admin-users";
const SESSION_KEY = "serenity-admin-session";
const RATE_KEY    = "serenity-admin-rate";

const SESSION_TTL  = 7 * 24 * 60 * 60 * 1_000; // 7 days
const MAX_ATTEMPTS = 5;
const RATE_WINDOW  = 15 * 60 * 1_000;            // 15 min

// ── Crypto helpers ────────────────────────────────────────────────────────────

function hexToBuffer(hex: string): ArrayBuffer {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes.buffer;
}

function bufferToHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, "0")).join("");
}

function randomHex(byteLength: number): string {
  const buf = new Uint8Array(byteLength);
  crypto.getRandomValues(buf);
  return bufferToHex(buf.buffer);
}

async function pbkdf2(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: hexToBuffer(salt), iterations: 100_000, hash: "SHA-256" },
    key,
    256,
  );
  return bufferToHex(bits);
}

/** Constant-time string comparison — mitigates timing-based hash enumeration. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ── Public password API ───────────────────────────────────────────────────────

export async function hashNewPassword(password: string): Promise<{ hash: string; salt: string }> {
  const salt = randomHex(16);
  const hash = await pbkdf2(password, salt);
  return { hash, salt };
}

export async function verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
  const computed = await pbkdf2(password, salt);
  return safeEqual(computed, hash);
}

// ── User store (localStorage) ─────────────────────────────────────────────────

export function loadUsers(): AdminUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as AdminUser[]) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: AdminUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const SEED_VERSION = "2"; // bump this to force a re-seed
const SEED_KEY = "serenity-admin-seed-v";

/**
 * Seed default users. Re-seeds when SEED_VERSION changes (clears old users).
 * Defaults:
 *   bill  / lotb1    (superadmin)
 *   jason / yaycamp  (admin)
 */
export async function ensureDefaultUsers(): Promise<void> {
  const seeded = localStorage.getItem(SEED_KEY);
  if (seeded === SEED_VERSION) return;

  const [billCreds, jasonCreds] = await Promise.all([
    hashNewPassword("lotb1"),
    hashNewPassword("yaycamp"),
  ]);

  saveUsers([
    { id: randomHex(8), username: "bill",  passwordHash: billCreds.hash,  salt: billCreds.salt,  role: "superadmin" },
    { id: randomHex(8), username: "jason", passwordHash: jasonCreds.hash, salt: jasonCreds.salt, role: "admin" },
  ]);
  localStorage.setItem(SEED_KEY, SEED_VERSION);
}

// ── Rate limiting (per-browser, per origin) ───────────────────────────────────

interface RateData { count: number; resetAt: number; }

function getRateData(): RateData {
  const now = Date.now();
  try {
    const raw = localStorage.getItem(RATE_KEY);
    if (raw) {
      const data = JSON.parse(raw) as RateData;
      if (now < data.resetAt) return data;
    }
  } catch { /* fall through */ }
  return { count: 0, resetAt: now + RATE_WINDOW };
}

function recordFailedAttempt(): void {
  const data = getRateData();
  data.count += 1;
  localStorage.setItem(RATE_KEY, JSON.stringify(data));
}

function rateLimitMinutesLeft(): number {
  const { count, resetAt } = getRateData();
  if (count < MAX_ATTEMPTS) return 0;
  return Math.ceil((resetAt - Date.now()) / 60_000);
}

// ── Session ───────────────────────────────────────────────────────────────────

export function loadSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AdminSession;
    if (Date.now() > session.expires) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function createSession(user: AdminUser): AdminSession {
  const session: AdminSession = {
    userId:   user.id,
    username: user.username,
    role:     user.role,
    token:    randomHex(32),
    expires:  Date.now() + SESSION_TTL,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearSession(): void {
  if (typeof window !== "undefined") localStorage.removeItem(SESSION_KEY);
}

// ── Login ─────────────────────────────────────────────────────────────────────

export interface LoginResult {
  session: AdminSession | null;
  error?: string;
  minutesLocked?: number;
}

export async function login(username: string, password: string): Promise<LoginResult> {
  const mins = rateLimitMinutesLeft();
  if (mins > 0) {
    return { session: null, error: "Too many attempts", minutesLocked: mins };
  }

  const users = loadUsers();
  const user  = users.find(u => u.username.toLowerCase() === username.toLowerCase().trim());

  if (!user) {
    // Always hash to prevent timing-based username enumeration
    await pbkdf2(password, randomHex(16));
    recordFailedAttempt();
    return { session: null, error: "Invalid username or password" };
  }

  const valid = await verifyPassword(password, user.passwordHash, user.salt);
  if (!valid) {
    recordFailedAttempt();
    return { session: null, error: "Invalid username or password" };
  }

  return { session: createSession(user) };
}
