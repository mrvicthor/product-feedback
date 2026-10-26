import { test, expect, type Page } from "@playwright/test";
const TITLE = "Add tags for solutions";

const getDetailsUpvote = (page: Page) => {
  const button = page.getByRole("button", { name: `Upvote ${TITLE}` });
  return { button, count: button.getByTestId("upvote-count") };
};
test.describe("feedback details page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const card = page
      .getByRole("listitem")
      .filter({ has: page.getByRole("link", { name: TITLE }) });
    await card.getByRole("link").click();
  });

  test("should navigate to details page when the title is clicked", async ({
    page,
  }) => {
    await expect(page).toHaveURL(`/detail/1`);
  });

  test("should return back to the home page when 'go back' link is clicked", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /go back/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("should increase upvote by 1 on first click", async ({ page }) => {
    const { button, count } = getDetailsUpvote(page);
    const before = Number(await count.textContent());
    await button.click();
    await expect(count).toHaveText(String(before + 1));
    await expect(button).toHaveAttribute("aria-pressed", "true");
  });
});
