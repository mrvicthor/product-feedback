import { test, expect } from "@playwright/test";

test.describe("feedback request page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should show empty card if there is no feedback", async ({ page }) => {
    const uiButton = page.getByRole("button", { name: "UI", exact: true });
    await uiButton.click();
    await expect(
      page.getByText("There is no feedback yet.", { exact: true }),
    ).toBeVisible();
  });
});
