import { test, expect, type Page } from "@playwright/test";

const TITLE = "Add tags for solutions";

const getUpvote = (page: Page) => {
  const card = page
    .getByRole("listitem")
    .filter({ has: page.getByRole("link", { name: TITLE }) });

  const button = card.getByRole("button", { name: `Upvote ${TITLE}` });

  return { button, count: button.getByTestId("upvote-count") };
};

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

  test("should show feedback request if source data is available", async ({
    page,
  }) => {
    await expect(
      page.getByText("More comprehensive reports", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Add tags for solutions", { exact: true }),
    ).toBeVisible();
  });

  test("should increase upvote by 1 on first click", async ({ page }) => {
    const { button, count } = getUpvote(page);
    const before = Number(await count.textContent());
    await button.click();
    await expect(count).toHaveText(String(before + 1));
    await expect(button).toHaveAttribute("aria-pressed", "true");
  });

  test("should undo the upvote on second click", async ({ page }) => {
    const { button, count } = getUpvote(page);
    const before = Number(await count.textContent());

    await button.click();
    await button.click();

    await expect(count).toHaveText(String(before));
    await expect(button).toHaveAttribute("aria-pressed", "false");
  });

  test("should navigate to details page when the title is clicked", async ({
    page,
  }) => {
    const card = page
      .getByRole("listitem")
      .filter({ has: page.getByRole("link", { name: TITLE }) });

    await card.getByRole("link").click();
    await expect(page).toHaveURL(`/detail/1`);
  });

  test("navigates to the add feedback page", async ({ page }) => {
    await page.getByRole("link", { name: /add feedback/i }).click();
    await expect(page).toHaveURL(/\/add-feedback$/);
    await expect(
      page.getByRole("heading", { name: /create new feedback/i }),
    ).toBeVisible();
  });
});
