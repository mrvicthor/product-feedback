import { test, expect } from "@playwright/test";

test.describe("Sidebar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the Feedback Board heading", async ({ page }) => {
    const pageTitle = page.getByRole("heading", { name: "Frontend Mentor" });
    await expect(pageTitle).toBeVisible();
    await expect(page.getByText("Feedback Board")).toBeVisible();
  });

  test("displays the category filters on desktop", async ({ page }) => {
    await page.setViewportSize({
      width: 1280,
      height: 800,
    });

    await expect(
      page.getByRole("button", { name: "All", exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "UI", exact: true }),
    ).toBeVisible();
  });

  test("allows a user to select a category", async ({ page }) => {
    await page.setViewportSize({
      width: 1280,
      height: 800,
    });

    const uiButton = page.getByRole("button", { name: "UI", exact: true });
    await uiButton.click();

    await expect(uiButton).toHaveAttribute("aria-pressed", "true");
  });
});
