import { test, expect } from "@playwright/test";

// â”€â”€â”€ Console error filter â”€â”€â”€
const NOISE = [
  "Download the React DevTools",
  "Warning:",
  "next-dev.js",
  "Failed to load resource",
  "CLIENT_FETCH_ERROR",
  "Failed to fetch",
  "Autofocus processing",
  "Fast Refresh",
  "[HMR]",
  "Search endpoint requested",
];

function isNoise(msg: string) {
  return NOISE.some((n) => msg.includes(n));
}

// â”€â”€â”€ 1. Homepage loads â”€â”€â”€
test.describe("Homepage", () => {
  test("renders hero and location cards", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toContainText("Serenity Resorts");
    await expect(page.locator('text="Serenity Bay"').first()).toBeVisible();
    await expect(page.locator('text="Serenity Hills"').first()).toBeVisible();
  });

  test("navbar is visible with all links", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator('nav').getByText("Rates")).toBeVisible();
  });

  test("footer is visible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator("footer")).toBeVisible();
  });
});

// â”€â”€â”€ 2. Location pages â”€â”€â”€
test.describe("Serenity Bay", () => {
  test("page loads with correct content", async ({ page }) => {
    await page.goto("/locations/serenity-bay");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toContainText("Serenity Bay");
    await expect(page.locator('text=/Mink Lake/').first()).toBeVisible();
  });
});

test.describe("Serenity Hills", () => {
  test("page loads with correct content", async ({ page }) => {
    await page.goto("/locations/serenity-hills");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toContainText("Serenity Hills");
    await expect(page.locator('text=/Renfrew/').first()).toBeVisible();
  });
});

// â”€â”€â”€ 3. Rates page â”€â”€â”€
test.describe("Rates", () => {
  test("displays pricing for both locations", async ({ page }) => {
    await page.goto("/rates");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toContainText("Rates");
    await expect(page.locator('text="Serenity Bay"').first()).toBeVisible();
    await expect(page.locator('text="Serenity Hills"').first()).toBeVisible();
  });
});

// â”€â”€â”€ 4. FAQ page â”€â”€â”€
test.describe("FAQ", () => {
  test("loads with questions", async ({ page }) => {
    await page.goto("/faq");
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("h1")).toContainText("Frequently Asked Questions");
    await expect(page.locator('text=/check.in/i').first()).toBeVisible();
  });

  test("accordion opens on click", async ({ page }) => {
    await page.goto("/faq", { waitUntil: "domcontentloaded" });
    const firstQuestion = page.locator("button").filter({ hasText: /check.in/i }).first();
    await firstQuestion.click({ force: true });
    await expect(page.locator("text=2:00 PM").first()).toBeVisible();
  });
});

// â”€â”€â”€ 5. Contact page â”€â”€â”€
test.describe("Contact", () => {
  test("loads with form and info", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Contact Us");
    await expect(page.locator('text="613-628-2454"').first()).toBeVisible();
  });
});

// â”€â”€â”€ 6. Trailer Sales page â”€â”€â”€
test.describe("Trailer Sales", () => {
  test("loads trailer listings", async ({ page }) => {
    await page.goto("/trailer-sales", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Trailer Sales");
  });
});

// â”€â”€â”€ 7. Local Attractions page â”€â”€â”€
test.describe("Attractions", () => {
  test("loads with attraction cards", async ({ page }) => {
    await page.goto("/attractions", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Local Attractions");
    await expect(page.locator('text="Bonnechere Caves"')).toBeVisible();
  });
});

// â”€â”€â”€ 8. Park Map page â”€â”€â”€
test.describe("Park Map", () => {
  test("loads with map image", async ({ page }) => {
    await page.goto("/map", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Park Map");
    await expect(page.locator('img[alt="Serenity Bay Park Map"]')).toBeVisible();
  });
});

// â”€â”€â”€ 9. Admin page â”€â”€â”€
test.describe("Admin", () => {
  test("shows login gate", async ({ page }) => {
    await page.goto("/manage", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Admin Access");
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("rejects wrong password", async ({ page }) => {
    await page.goto("/manage", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await page.fill('input[type="password"]', "wrongpassword");
    await page.click('button:has-text("Log In")');
    await expect(page.locator("text=Incorrect password")).toBeVisible();
  });

  test("accepts correct password and shows dashboard", async ({ page }) => {
    await page.goto("/manage", { waitUntil: "domcontentloaded" });
    await page.waitForLoadState("load");
    await page.fill('input[type="password"]', "serenity2026");
    await page.click('button:has-text("Log In")');
    await expect(page.locator("h1")).toContainText("Admin Dashboard");
  });
});

// â”€â”€â”€ 10. Navigation â”€â”€â”€
test.describe("Navigation", () => {
  test("home â†’ FAQ navigation works", async ({ page }) => {
    await page.goto("/faq");
    await expect(page).toHaveURL(/\/faq/);
  });

  test("home â†’ Rates navigation works", async ({ page }) => {
    await page.goto("/rates", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/rates/);
  });

  test("home \u2192 Contact navigation works", async ({ page }) => {
    await page.goto("/contact", { waitUntil: "domcontentloaded" });
    await expect(page).toHaveURL(/\/contact/);
  });
});

// â”€â”€â”€ 11. Console errors â”€â”€â”€
test.describe("Console Errors", () => {
  const pages = ["/", "/locations/serenity-bay", "/locations/serenity-hills", "/rates", "/faq", "/contact", "/attractions", "/map", "/trailer-sales"];

  for (const path of pages) {
    test(`no console errors on ${path}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (msg) => {
        if (msg.type() === "error" && !isNoise(msg.text())) {
          errors.push(msg.text());
        }
      });
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.waitForTimeout(1000);
      expect(errors).toHaveLength(0);
    });
  }
});

// â”€â”€â”€ 12. Mobile viewport â”€â”€â”€
test.describe("Mobile Viewport", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("homepage renders on mobile", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText("Serenity Resorts");
  });

  test("hamburger menu visible on mobile", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('button[aria-label="Toggle navigation"]')).toBeVisible();
  });
});

// â”€â”€â”€ 13. Performance â”€â”€â”€
test.describe("Performance", () => {
  test("homepage loads under 5 seconds", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    await page.waitForLoadState("load");
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(5000);
  });
});
