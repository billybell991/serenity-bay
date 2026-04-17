"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Truck, Plus, X, Edit2, Trash2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export type TrailerListing = {
  id: string;
  name: string;
  year: string;
  length: string;
  price: string;
  description: string;
  image: string;
  status: "available" | "sold" | "pending";
};

const DEFAULT_LISTINGS: TrailerListing[] = [
  {
    id: "1",
    name: "Forest River Cherokee",
    year: "2019",
    length: "32 ft",
    price: "$28,500",
    description: "Spacious family trailer with slide-out, full kitchen, and bunk beds. Well maintained.",
    image: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362849424807-Z6M67RIT0YSZMWQDX318/Canadian+Timberland+campground+002.JPG?format=1000w",
    status: "available",
  },
  {
    id: "2",
    name: "Keystone Cougar",
    year: "2020",
    length: "28 ft",
    price: "$32,000",
    description: "Couple's trailer with queen bed, outdoor kitchen, and electric awning.",
    image: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362849544865-M7H62KRE5QNXHQ8EUE38/015.JPG?format=1000w",
    status: "available",
  },
  {
    id: "3",
    name: "Jayco Jay Flight",
    year: "2018",
    length: "26 ft",
    price: "$22,000",
    description: "Perfect starter trailer. Light enough for most SUVs. Great condition.",
    image: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1360469101222-I9P7E0T9V4WFN7YRDK0E/014.JPG?format=1000w",
    status: "pending",
  },
];

export function getTrailerListings(): TrailerListing[] {
  if (typeof window === "undefined") return DEFAULT_LISTINGS;
  const stored = localStorage.getItem("serenity-trailers");
  return stored ? JSON.parse(stored) : DEFAULT_LISTINGS;
}

export function saveTrailerListings(listings: TrailerListing[]) {
  localStorage.setItem("serenity-trailers", JSON.stringify(listings));
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  available: { bg: "bg-green-100", text: "text-green-700", label: "Available" },
  sold: { bg: "bg-red-100", text: "text-red-700", label: "Sold" },
  pending: { bg: "bg-amber-100", text: "text-amber-700", label: "Pending" },
};

export default function TrailerSalesPage() {
  const [listings, setListings] = useState<TrailerListing[]>([]);

  useEffect(() => {
    setListings(getTrailerListings());
  }, []);

  const available = listings.filter((l) => l.status !== "sold");

  return (
    <>
      <PageHero
        title="Trailer Sales"
        subtitle="Find your home away from home. Browse trailers for sale at Serenity Resorts."
        image="https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362849424807-Z6M67RIT0YSZMWQDX318/Canadian+Timberland+campground+002.JPG?format=2500w"
      />
      <section className="py-24 px-6" style={{ background: "var(--bg-primary)" }}>
        <div className="max-w-[1200px] mx-auto">

        {available.length === 0 ? (
          <div className="text-center py-20 glass-card">
            <Truck className="w-16 h-16 mx-auto mb-4" style={{ color: "var(--text-dim)" }} />
            <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>Updates Coming Soon</h3>
            <p style={{ color: "var(--text-muted)" }}>Check back for new trailer listings!</p>
          </div>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" initial="hidden" animate="visible" variants={stagger}>
            {available.map((listing) => (
              <motion.div key={listing.id} variants={fadeUp} className="glass-card overflow-hidden">
                <div className="relative h-48">
                  <Image src={listing.image} alt={listing.name} fill className="object-cover" />
                  <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[listing.status].bg} ${STATUS_STYLES[listing.status].text}`}>
                    {STATUS_STYLES[listing.status].label}
                  </span>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold mb-1" style={{ fontFamily: "var(--font-heading)" }}>{listing.name}</h3>
                  <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>{listing.year} · {listing.length}</p>
                  <p className="text-xl font-bold mb-3" style={{ color: "var(--accent-cta)" }}>{listing.price}</p>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>{listing.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="text-center mt-12 py-6" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Interested? Call <a href="tel:6136282454" className="font-bold hover:underline" style={{ color: "var(--accent-cta)" }}>613-628-2454</a> or email <a href="mailto:office@serenityresorts.ca" className="font-bold hover:underline" style={{ color: "var(--accent-cta)" }}>office@serenityresorts.ca</a>
          </p>
        </div>
      </div>
    </section>
    </>
  );
}

// ─── Admin Trailer Editor (used in /manage) ───

export function TrailerEditor() {
  const [listings, setListings] = useState<TrailerListing[]>([]);
  const [editing, setEditing] = useState<TrailerListing | null>(null);

  useEffect(() => {
    setListings(getTrailerListings());
  }, []);

  const save = (updated: TrailerListing[]) => {
    setListings(updated);
    saveTrailerListings(updated);
  };

  const handleDelete = (id: string) => {
    save(listings.filter((l) => l.id !== id));
  };

  const handleAdd = () => {
    const newListing: TrailerListing = {
      id: Date.now().toString(),
      name: "New Trailer",
      year: "2024",
      length: "24 ft",
      price: "$0",
      description: "Description...",
      image: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1360469101222-I9P7E0T9V4WFN7YRDK0E/014.JPG?format=1000w",
      status: "available",
    };
    save([...listings, newListing]);
    setEditing(newListing);
  };

  const handleSave = (updated: TrailerListing) => {
    save(listings.map((l) => (l.id === updated.id ? updated : l)));
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>Trailer Listings</h3>
        <button onClick={handleAdd} className="btn-cta text-sm py-2 px-4 flex items-center gap-1">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-3">
        {listings.map((listing) => (
          <div key={listing.id} className="glass-card p-4 flex items-center justify-between">
            <div>
              <p className="font-medium">{listing.name}</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>{listing.year} · {listing.length} · {listing.price}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-bold ${STATUS_STYLES[listing.status].bg} ${STATUS_STYLES[listing.status].text}`}>
                {STATUS_STYLES[listing.status].label}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditing(listing)} className="p-2 rounded-lg hover:bg-black/5">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(listing.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="glass-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold">Edit Trailer</h4>
              <button onClick={() => setEditing(null)}><X className="w-5 h-5" /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave(editing);
              }}
              className="space-y-3"
            >
              {(["name", "year", "length", "price", "description", "image"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-xs font-medium mb-1 capitalize">{field}</label>
                  {field === "description" ? (
                    <textarea
                      value={editing[field]}
                      onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-black/10 text-sm"
                      style={{ background: "var(--bg-secondary)" }}
                      rows={3}
                    />
                  ) : (
                    <input
                      value={editing[field]}
                      onChange={(e) => setEditing({ ...editing, [field]: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-black/10 text-sm"
                      style={{ background: "var(--bg-secondary)" }}
                    />
                  )}
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium mb-1">Status</label>
                <select
                  value={editing.status}
                  onChange={(e) => setEditing({ ...editing, status: e.target.value as TrailerListing["status"] })}
                  className="w-full px-3 py-2 rounded-lg border border-black/10 text-sm"
                  style={{ background: "var(--bg-secondary)" }}
                >
                  <option value="available">Available</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>
              <button type="submit" className="btn-cta w-full text-sm py-2">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
