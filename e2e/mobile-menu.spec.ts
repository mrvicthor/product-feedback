import { expect, test } from "@playwright/test";

test.describe("Mobile Menu", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({
      width: 375,
      height: 812,
    });

    await page.goto("/");
  });

  test("opens the mobile menu", async ({ page }) => {
    const menuBtn = page.getByRole("button", { name: "Open Menu" });

    await menuBtn.click();

    await expect(
      page.getByRole("dialog", { name: "Filters and roadmap" }),
    ).toBeVisible();
  });

  test("displays category filters inside the drawer", async ({ page }) => {
    await page.getByRole("button", { name: "Open Menu" }).click();

    const drawer = page.getByRole("dialog", { name: "Filters and roadmap" });

    await expect(
      drawer.getByRole("button", { name: "feature", exact: true }),
    ).toBeVisible();
  });

  test("closes the menu when the overlay is clicked", async ({ page }) => {
    const menuBtn = page.getByRole("button", { name: "Open Menu" });

    await menuBtn.click();

    const drawer = page.getByRole("dialog", { name: "Filters and roadmap" });

    await expect(drawer).toBeVisible();

    await page.mouse.click(20, 300);

    await expect(drawer).toBeHidden();
  });
});
