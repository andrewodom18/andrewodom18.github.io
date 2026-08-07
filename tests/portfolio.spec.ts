import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = ["/", "/work/", "/resume/"];

test.describe("public portfolio", () => {
  for (const route of publicRoutes) {
    test(`${route} renders accessibly`, async ({ page }) => {
      const response = await page.goto(route);

      expect(response?.ok()).toBeTruthy();
      await expect(page.locator("main")).toBeVisible();
      await expect(page).toHaveTitle(/\S+/);

      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }

  test("homepage presents the professional profile in a clear sequence", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Andrew Odom\. Software developer\./i
      })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Building practical software/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Work history." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Current and planned study." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Technical stack." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "TBD" })).toBeVisible();
    await expect(page.getByText("Store Template")).toHaveCount(0);
    await expect(page.getByText("aodom.dev", { exact: true })).toHaveCount(0);

    const navigationText = await page
      .getByRole("navigation", { name: "Primary navigation" })
      .innerText();
    expect(navigationText).not.toMatch(/Docs|Status|Arcade/i);
  });

  test("contact link reaches a usable email action", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText: async () => undefined }
      });
    });
    await page.goto("/");

    await page
      .getByRole("banner")
      .getByRole("link", { name: "Contact", exact: true })
      .click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(
      page.getByRole("heading", { name: "Start a conversation." })
    ).toBeVisible();
    await expect(page.locator("#contact form")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "contact@aodom.dev" })).toHaveAttribute(
      "href",
      "mailto:contact@aodom.dev?subject=Software%20engineering%20opportunity"
    );
    await expect(page.getByRole("link", { name: "Email Andrew" })).toHaveAttribute(
      "href",
      "mailto:contact@aodom.dev?subject=Software%20engineering%20opportunity"
    );

    await page.getByRole("button", { name: "Copy address" }).click();
    await expect(page.getByRole("button", { name: "Email copied" })).toBeVisible();
    await expect(page.getByRole("status")).toContainText("contact@aodom.dev");
  });

  test("legacy docs routes redirect to selected work", async ({ page }) => {
    await page.goto("/docs/architecture/");
    await expect(page).toHaveURL(/\/work\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("TBD");
  });

  test("removed case studies redirect to the work placeholder", async ({ page }) => {
    await page.goto("/work/store-template/");
    await expect(page).toHaveURL(/\/work\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("TBD");
  });

  test("unknown routes use the custom 404", async ({ page }) => {
    const response = await page.goto("/not-a-real-route/");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "The requested page is unavailable." })
    ).toBeVisible();
  });

  test("resume print action invokes browser printing", async ({ page }) => {
    await page.addInitScript(() => {
      window.print = () => {
        document.documentElement.dataset.printRequested = "true";
      };
    });
    await page.goto("/resume/");
    await page.getByRole("button", { name: "Print / save as PDF" }).click();

    await expect(page.locator("html")).toHaveAttribute("data-print-requested", "true");
  });

  test("keyboard navigation exposes the skip link", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("security headers are present", async ({ page }) => {
    const response = await page.goto("/");

    expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    expect(response?.headers()["referrer-policy"]).toBe("strict-origin-when-cross-origin");
    expect(response?.headers()["content-security-policy"]).toContain("script-src 'self'");
    expect(response?.headers()["cache-control"]).toContain("no-transform");
  });

  test("layout does not overflow the viewport", async ({ page }) => {
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  });
});
