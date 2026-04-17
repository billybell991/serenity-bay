/**
 * FAQ data stored in localStorage.
 * Each item has a question, answer, visibility flag, and stable id.
 */

const STORAGE_KEY = "serenity-faq";

export interface FaqItem {
  id: string;
  q: string;
  a: string;
  visible: boolean;
}

const DEFAULT_FAQ: FaqItem[] = [
  { id: "faq-1",  q: "What is check-in and check-out time?", a: "Check in is at 2:00 PM. Check out is at 12:00 noon.", visible: true },
  { id: "faq-2",  q: "How do I make a reservation?", a: "Call us at 613-628-2454 or email office@serenityresorts.ca.", visible: true },
  { id: "faq-3",  q: "Can I bring my own firewood?", a: "Sorry, no. Due to many invasive species, we do not allow wood from outside the park. We have wood for sale at very reasonable prices.", visible: true },
  { id: "faq-4",  q: "My children want to camp in a tent beside the RV. Is this allowed?", a: "Sorry, no children in tents without an adult.", visible: true },
  { id: "faq-5",  q: "Do you allow Cannabis or Alcohol in the campground?", a: "Only on your site and only in moderation.", visible: true },
  { id: "faq-6",  q: "Are pets allowed?", a: "Yes! Pets must be on a leash and poop-and-scoop rules apply.", visible: true },
  { id: "faq-7",  q: "Why do I have to turn my radio off at 11 PM?", a: "Quiet time is 11:00 PM to 9:00 AM — people are here to relax.", visible: true },
  { id: "faq-8",  q: "Do you have WiFi?", a: "It is iffy in the park but lots of hot spots close by in Renfrew. Many campers are using a booster and having good results.", visible: true },
  { id: "faq-9",  q: "Do you have garbage facilities on site?", a: "Yes, we recycle. The recycling station is located at the entrance.", visible: true },
  { id: "faq-10", q: "Do you have a beach?", a: "Serenity Bay in Eganville has access to a lovely beach area. Serenity Hills in Renfrew has a pool but no beach access.", visible: true },
  { id: "faq-11", q: "Can I bring my own boat?", a: "Serenity Bay has boat slips for rent. Serenity Hills does not have lake access but is approximately 1 mile from the Ottawa River.", visible: true },
  { id: "faq-12", q: "Do you have pull-through sites?", a: "Yes, up to 66 feet. All are full service.", visible: true },
  { id: "faq-13", q: "What amp electric do you have?", a: "30 amp.", visible: true },
];

export function loadFaq(): FaqItem[] {
  if (typeof window === "undefined") return DEFAULT_FAQ;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_FAQ;
  } catch {
    return DEFAULT_FAQ;
  }
}

export function saveFaq(items: FaqItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("faq-change"));
}

export function getDefaultFaq(): FaqItem[] {
  return JSON.parse(JSON.stringify(DEFAULT_FAQ));
}
