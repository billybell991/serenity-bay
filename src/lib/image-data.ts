/**
 * Centralised image store — hero banners + photo galleries.
 * Stored in localStorage so admins can swap images from the manage page.
 */

const STORAGE_KEY = "serenity-images";

export interface ImageStore {
  heroes: {
    home: string;
    homeBay: string;      // home page Serenity Bay split panel
    homeHills: string;    // home page Serenity Hills split panel
    bayLocation: string;  // /locations/serenity-bay hero
    hillsLocation: string; // /locations/serenity-hills hero
    rates: string;
    attractions: string;
    trailerSales: string;
    contact: string;
    faq: string;
  };
  galleries: {
    bay: string[];   // Serenity Bay photo gallery
    hills: string[]; // Serenity Hills photo gallery
  };
}

const DEFAULT_IMAGES: ImageStore = {
  heroes: {
    home: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104504491-ZQH6QM917WV13HP9VKB1/Lake+Front.jpeg?format=2500w",
    homeBay: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104547963-ID1TR2SHL8XTFF7K95K6/Swimming+Area.jpeg?format=2500w",
    homeHills: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850403-DOAGE43MJ8BEGANYEYN2/SH+overhead1.jpg?format=2500w",
    bayLocation: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104504491-ZQH6QM917WV13HP9VKB1/Lake+Front.jpeg?format=2500w",
    hillsLocation: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850403-DOAGE43MJ8BEGANYEYN2/SH+overhead1.jpg?format=2500w",
    rates: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615837754534-QJ9O7WQUVCC37WXE0UU7/DJI_0024.JPG?format=2500w",
    attractions: "/ottawa-valley.jpg",
    trailerSales: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362849424807-Z6M67RIT0YSZMWQDX318/Canadian+Timberland+campground+002.JPG?format=2500w",
    contact: "/serenity-bay-sign.jpg",
    faq: "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104159153-PZ1Z95QLFZ7FETTHQZYO/Foggy+Lake+.jpeg?format=2500w",
  },
  galleries: {
    bay: [
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104504491-ZQH6QM917WV13HP9VKB1/Lake+Front.jpeg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104547963-ID1TR2SHL8XTFF7K95K6/Swimming+Area.jpeg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104169034-7UNQ816UCACRDBO1H59Y/Social+Club.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104158347-0YIU18W83MKRZ11RNR11/Dock+in+the+Fog.jpeg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615837754534-QJ9O7WQUVCC37WXE0UU7/DJI_0024.JPG?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104159318-FTEJDO59VGBXYFBGVR7K/IMG_1415.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104159153-PZ1Z95QLFZ7FETTHQZYO/Foggy+Lake+.jpeg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104167743-QO8WC8V0TNZQ1EEMZLNY/Oh+Canada%21.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104173599-C9DN1MZZQ6RD5WOIWN94/Swimming+Area.jpeg?format=1000w",
    ],
    hills: [
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850403-DOAGE43MJ8BEGANYEYN2/SH+overhead1.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1615039850972-Q1N6QQEAQY5QZ3EABB74/SH+Overhead+2.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362847903603-W8YLMJ0ORFVZBTSIRT1E/TimberP2-12.JPG?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362847923407-L2F7JMQNA8UDI2U3U9XK/TimberP14-12.JPG?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362848613311-YJCWRW2RIQQ3XBC7BGIT/TimberP55-12.JPG?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104791466-9782KXB5ZDPGHXBSTXCV/Social+Club+SH.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1729104810337-GR0X5GXJQE0A11E7HLE0/Laundry+Room+SH.jpg?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362848639716-LCEQUEJEE45OE8052FEC/Canadian+Timberland+campground+115.JPG?format=1000w",
      "https://images.squarespace-cdn.com/content/v1/511665cae4b085e20f7d1e59/1362848645899-MZBXLH380EEMQQ3OXW6Y/TimberK20-12.JPG?format=1000w",
    ],
  },
};

export function getDefaultImages(): ImageStore {
  return JSON.parse(JSON.stringify(DEFAULT_IMAGES));
}

export function loadImages(): ImageStore {
  if (typeof window === "undefined") return getDefaultImages();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultImages();
    const stored = JSON.parse(raw) as ImageStore;
    // Merge with defaults so new keys are always present
    return {
      heroes: { ...getDefaultImages().heroes, ...stored.heroes },
      galleries: {
        bay: stored.galleries?.bay ?? getDefaultImages().galleries.bay,
        hills: stored.galleries?.hills ?? getDefaultImages().galleries.hills,
      },
    };
  } catch {
    return getDefaultImages();
  }
}

export function saveImages(data: ImageStore): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("images-change"));
}

/** Hero image label map for the admin UI */
export const HERO_LABELS: Record<keyof ImageStore["heroes"], string> = {
  home: "Home Page — Main Hero",
  homeBay: "Home Page — Serenity Bay Panel",
  homeHills: "Home Page — Serenity Hills Panel",
  bayLocation: "Serenity Bay — Page Hero",
  hillsLocation: "Serenity Hills — Page Hero",
  rates: "Rates — Page Hero",
  attractions: "Attractions — Page Hero",
  trailerSales: "Trailer Sales — Page Hero",
  contact: "Contact — Page Hero",
  faq: "FAQ — Page Hero",
};
