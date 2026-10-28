import { test, expect } from "@playwright/test";

const TITLE = "Add tags for solutions";

test.describe("Edit Feedback page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const card = page
      .getByRole("listitem")
      .filter({ has: page.getByRole("link", { name: TITLE }) });
    await card.getByRole("link").click();
    await page.getByRole("link", { name: /edit feedback/i }).click();
  });

  test("should be on the edit page", async ({ page }) => {
    await expect(page).toHaveURL("/edit-feedback/1");
    await expect(
      page.getByRole("heading", { name: /editing 'add tags for solutions'/i }),
    ).toBeVisible();
  });
});
