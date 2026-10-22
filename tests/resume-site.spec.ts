import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const publicRoutes = ["/", "/work/", "/resume/"];

test.describe("public resume site", () => {
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

  test("homepage presents a resume-focused professional profile", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Andrew Odom"
      })
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: /Practical software, built with care/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Professional experience." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Education and continued learning." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Core technical skills." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Creator" })).toBeVisible();
    await expect(page.getByText("TBD")).toHaveCount(0);

    const navigation = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(navigation.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/andrewodom18"
    );
    await expect(navigation.getByRole("link")).toHaveText([
      "GitHub", "LinkedIn", "Resume", "Buy Me a Coffee"
    ]);
    await expect(page.locator(".brand")).toHaveText("Andrew Odom");
    await expect(page.getByRole("contentinfo").getByRole("navigation").getByRole("link")).toHaveText([
      "Buy Me a Coffee"
    ]);
    await expect(page.getByRole("contentinfo").getByRole("link", { name: "Buy Me a Coffee" })).toHaveAttribute(
      "href", "https://buymeacoffee.com/andrewodom18"
    );
    await expect(navigation.getByRole("link", { name: "Work" })).toHaveCount(0);
  });

  test("contact link reaches verified contact details", async ({ page }) => {
    await page.goto("/#contact");
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.getByRole("heading", { name: "Start a conversation." })).toBeVisible();
    await expect(page.getByRole("link", { name: "contact@aodom.dev" })).toHaveAttribute(
      "href",
      "mailto:contact@aodom.dev?subject=Software%20engineering%20opportunity"
    );
    const contact = page.locator("#contact");
    await expect(contact.getByRole("link", { name: "Use the contact form" })).toHaveAttribute(
      "href", "https://odomtech.com/contact/"
    );
    await expect(contact.getByText(/For ODOM Tech and ODOM Tech project-related conversations/)).toBeVisible();
    await expect(contact.getByRole("link")).toHaveCount(2);
  });

  test("portfolio handoff points to ODOM Tech", async ({ page }) => {
    await page.goto("/work/");

    await expect(
      page.getByRole("heading", { level: 1, name: "My work lives at ODOM Tech." })
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /Visit ODOM Tech/i })).toHaveAttribute(
      "href",
      "https://github.com/odom-technology"
    );
  });

  test("unknown routes use the custom 404", async ({ page }) => {
    const response = await page.goto("/not-a-real-route/");

    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "The requested page is unavailable." })
    ).toBeVisible();
  });

  test("resume PDF can be opened or downloaded", async ({ page, request }) => {
    await page.goto("/");
    const homepageResume = page.getByRole("link", { name: "Open resume (PDF)" });
    await expect(homepageResume).toHaveAttribute("href", "/resume.pdf");
    await expect(homepageResume).toHaveAttribute("target", "_blank");
    await expect(homepageResume).toHaveAttribute("rel", "noopener noreferrer");

    await page.goto("/resume/");
    const openPdf = page.getByRole("link", { name: "Open PDF" });
    const downloadPdf = page.getByRole("link", { name: /Download PDF/i });
    await expect(page.locator(".resume-document .resume-actions")).toHaveCount(0);
    await expect(page.locator(".resume-page > .resume-actions")).toBeVisible();
    await expect(page.locator(".resume-header a[href='https://github.com/andrewodom18']")).toHaveCount(0);
    await expect(openPdf).toHaveAttribute("href", "/resume.pdf");
    await expect(openPdf).toHaveAttribute("target", "_blank");
    await expect(downloadPdf).toHaveAttribute("href", "/resume.pdf");
    await expect(downloadPdf).toHaveAttribute("download", "Andrew-Odom-Resume.pdf");

    const response = await request.get("/resume.pdf");
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect((await response.body()).subarray(0, 5).toString("ascii")).toBe("%PDF-");

    // GitHub Pages serves a static PDF, so download behavior belongs to the link.
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      downloadPdf.click()
    ]);
    expect(download.suggestedFilename()).toBe("Andrew-Odom-Resume.pdf");
    expect(await download.failure()).toBeNull();
    expect(await readFile((await download.path())!)).toEqual(await response.body());
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

    // Cloudflare's static asset configuration adds PDF-specific headers.
    const pdfResponse = await page.request.get("/resume.pdf");
    expect(pdfResponse.headers()["content-disposition"]).toBe(
      'inline; filename="Andrew-Odom-Resume.pdf"'
    );
  });

  test("layout does not overflow the viewport", async ({ page }) => {
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  });

  test("layered background follows scrolling and reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const background = page.locator("[data-layered-background]");
    await expect(background).toBeVisible();
    await expect(background).toHaveAttribute("aria-hidden", "true");
    await expect(background).toHaveAttribute("data-motion", "paused");
    await expect(page.locator(".fold-layer-back")).toHaveCSS("animation-name", "none");

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await expect(background).toHaveAttribute("data-motion", "running");
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await expect.poll(async () => background.evaluate((element) =>
      Number((element as HTMLElement).style.getPropertyValue("--scroll-depth"))
    )).toBeGreaterThan(0);
    await expect(background).toHaveCSS("position", "fixed");
    await expect(background).toHaveCSS("pointer-events", "none");
    expect((await background.boundingBox())?.y).toBe(0);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(background).toHaveAttribute("data-motion", "paused");
    await expect(background).not.toHaveAttribute("style", /--scroll-depth/);
  });

  test("background remains static without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      await page.goto("/");
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("[data-layered-background]")).toBeVisible();
      await expect(page.locator(".fold-layer-back")).toHaveCSS("animation-play-state", "paused");
    } finally {
      await context.close();
    }
  });

  test("printed resume omits the decorative background", async ({ page }) => {
    await page.goto("/resume/");
    await page.emulateMedia({ media: "print" });
    await expect(page.locator("[data-layered-background]")).toBeHidden();
    await expect(page.locator(".resume-document")).toBeVisible();
    await expect(page.locator(".resume-document")).toHaveCSS("background-color", "rgb(255, 255, 255)");
  });
});
