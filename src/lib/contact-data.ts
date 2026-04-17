/**
 * Contact form submissions stored in localStorage.
 */

const STORAGE_KEY = "serenity-contact-submissions";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  message: string;
  date: string;   // ISO string
  read: boolean;
}

export function loadSubmissions(): ContactSubmission[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveSubmissions(items: ContactSubmission[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("submissions-change"));
}

export function addSubmission(data: Omit<ContactSubmission, "id" | "date" | "read">) {
  const submissions = loadSubmissions();
  const entry: ContactSubmission = {
    ...data,
    id: `sub-${Date.now()}`,
    date: new Date().toISOString(),
    read: false,
  };
  submissions.unshift(entry); // newest first
  saveSubmissions(submissions);
  return entry;
}

export function markRead(id: string) {
  const submissions = loadSubmissions();
  saveSubmissions(submissions.map((s) => (s.id === id ? { ...s, read: true } : s)));
}

export function markAllRead() {
  const submissions = loadSubmissions();
  saveSubmissions(submissions.map((s) => ({ ...s, read: true })));
}

export function deleteSubmission(id: string) {
  saveSubmissions(loadSubmissions().filter((s) => s.id !== id));
}
