import { test, expect } from "@playwright/test";

test.describe("Visual Regression — Desktop Screenshots", () => {
  const pages = [
    { path: "/", name: "homepage" },
    { path: "/locations/serenity-bay", name: "serenity-bay" },
    { path: "/locations/serenity-hills", name: "serenity-hills" },
    { path: "/rates", name: "rates" },
    { path: "/faq", name: "faq" },
    { path: "/contact", name: "contact" },
    { path: "/attractions", name: "attractions" },
    { path: "/map", name: "park-map" },
    { path: "/trailer-sales", name: "trailer-sales" },
    { path: "/manage", name: "admin-login" },
  ];

  for (const { path, name } of pages) {
    test(`${name} — above fold`, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`${name}-above-fold.png`, {
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});

test.describe("Visual Regression — Mobile Screenshots", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  const mobilePages = [
    { path: "/", name: "homepage-mobile" },
    { path: "/faq", name: "faq-mobile" },
    { path: "/contact", name: "contact-mobile" },
  ];

  for (const { path, name } of mobilePages) {
    test(`${name}`, async ({ page }) => {
      await page.goto(path);
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot(`${name}.png`, {
        maxDiffPixelRatio: 0.01,
      });
    });
  }
});

test.describe("Visual Regression — Interactive States", () => {
  test("FAQ accordion open", async ({ page }) => {
    await page.goto("/faq");
    await page.waitForTimeout(300);
    const firstQ = page.locator("button").filter({ hasText: /check.in/i }).first();
    await firstQ.click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("faq-accordion-open.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("Admin dashboard logged in", async ({ page }) => {
    await page.goto("/manage");
    await page.fill('input[type="password"]', "serenity2026");
    await page.click('button:has-text("Log In")');
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("admin-dashboard.png", {
      maxDiffPixelRatio: 0.01,
    });
  });
});
