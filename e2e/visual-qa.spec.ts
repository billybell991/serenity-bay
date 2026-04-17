import { test, expect } from "@playwright/test";

test.describe("Visual QA — Serenity Resorts", () => {
  test("1. Homepage hero and scroll", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(800);
    await expect(page.locator("h1")).toContainText("Serenity Resorts");
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "smooth" }));
    await page.waitForTimeout(800);
  });

  test("2. Location cards on homepage", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: 800, behavior: "smooth" }));
    await page.waitForTimeout(800);
    await expect(page.locator('text="Two Amazing Locations"')).toBeVisible();
    await page.waitForTimeout(800);
  });

  test("3. Feature grid section", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo({ top: 1600, behavior: "smooth" }));
    await page.waitForTimeout(800);
    await expect(page.locator('text="Everything You Need"')).toBeVisible();
  });

  test("4. Serenity Bay full page", async ({ page }) => {
    await page.goto("/locations/serenity-bay");
    await page.waitForTimeout(800);
    await expect(page.locator("h1")).toContainText("Serenity Bay");
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: "smooth" }));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo({ top: 1200, behavior: "smooth" }));
    await page.waitForTimeout(800);
  });

  test("5. Serenity Hills full page", async ({ page }) => {
    await page.goto("/locations/serenity-hills");
    await page.waitForTimeout(800);
    await expect(page.locator("h1")).toContainText("Serenity Hills");
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "smooth" }));
    await page.waitForTimeout(800);
  });

  test("6. Rates comparison cards", async ({ page }) => {
    await page.goto("/rates");
    await page.waitForTimeout(800);
    await expect(page.locator('text="Serenity Bay"').first()).toBeVisible();
    await expect(page.locator('text="Serenity Hills"').first()).toBeVisible();
    await page.waitForTimeout(800);
  });

  test("7. FAQ accordion interaction", async ({ page }) => {
    await page.goto("/faq");
    await page.waitForTimeout(800);
    const firstQ = page.locator("button").filter({ hasText: /check.in/i }).first();
    await firstQ.click();
    await page.waitForTimeout(500);
    await expect(page.locator('text=/2:00 PM/').first()).toBeVisible();
    await page.waitForTimeout(800);
  });

  test("8. Contact page form", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForTimeout(800);
    await expect(page.locator("form")).toBeVisible();
    await page.waitForTimeout(800);
  });

  test("9. Contact page maps", async ({ page }) => {
    await page.goto("/contact");
    await page.evaluate(() => window.scrollTo({ top: 400, behavior: "smooth" }));
    await page.waitForTimeout(800);
    await expect(page.locator("iframe").first()).toBeVisible();
    await page.waitForTimeout(800);
  });

  test("10. Trailer sales grid", async ({ page }) => {
    await page.goto("/trailer-sales");
    await page.waitForTimeout(800);
    await expect(page.locator("h1")).toContainText("Trailer Sales");
    await page.waitForTimeout(800);
  });

  test("11. Local attractions cards", async ({ page }) => {
    await page.goto("/attractions");
    await page.waitForTimeout(800);
    await expect(page.locator('text="Bonnechere Caves"')).toBeVisible();
    await page.evaluate(() => window.scrollTo({ top: 300, behavior: "smooth" }));
    await page.waitForTimeout(800);
  });

  test("12. Park map display", async ({ page }) => {
    await page.goto("/map");
    await page.waitForTimeout(800);
    await expect(page.locator('img[alt="Serenity Bay Park Map"]')).toBeVisible();
    await page.waitForTimeout(800);
  });

  test("13. Admin login flow", async ({ page }) => {
    await page.goto("/manage");
    await page.waitForTimeout(800);
    await page.fill('input[type="password"]', "serenity2026");
    await page.click('button:has-text("Log In")');
    await page.waitForTimeout(800);
    await expect(page.locator("h1")).toContainText("Admin Dashboard");
    await page.waitForTimeout(800);
  });

  test("14. Admin theme switcher", async ({ page }) => {
    await page.goto("/manage");
    await page.fill('input[type="password"]', "serenity2026");
    await page.click('button:has-text("Log In")');
    await page.waitForTimeout(500);
    await page.click('text="Autumn"');
    await page.waitForTimeout(800);
    await page.click('text="Spring"');
    await page.waitForTimeout(800);
    await page.click('text="Summer"');
    await page.waitForTimeout(800);
  });

  test("15. Full navigation cycle", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(600);
    await page.click('nav a:has-text("Rates")');
    await page.waitForTimeout(600);
    await page.click('nav a:has-text("FAQ")');
    await page.waitForTimeout(600);
    await page.click('nav a:has-text("Contact")');
    await page.waitForTimeout(600);
    await page.click('nav a:has-text("Home")');
    await page.waitForTimeout(600);
  });

  test("16. Mobile viewport check", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForTimeout(800);
    await expect(page.locator("h1")).toContainText("Serenity Resorts");
    await page.click('button[aria-label="Toggle navigation"]');
    await page.waitForTimeout(800);
    await page.click('a:has-text("FAQ")');
    await page.waitForTimeout(800);
  });
});
