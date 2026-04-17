import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on",
  },
  projects: [
    {
      name: "headless",
      testMatch: "critical-path.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "visual",
      testMatch: "visual-qa.spec.ts",
      use: {
        ...devices["Desktop Chrome"],
        headless: false,
        launchOptions: { slowMo: 100 },
        video: "on",
      },
    },
    {
      name: "regression",
      testMatch: "visual-regression.spec.ts",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
