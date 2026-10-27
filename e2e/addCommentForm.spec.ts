import { test, expect, type Page } from "@playwright/test";
const TITLE = "Add tags for solutions";

const COMMENTER = "Zena Kelley";
const HANDLE = "velvetround";

const commentForm = (page: Page) =>
  page.getByRole("form", { name: /add comment form/i });

const commentHeading = (page: Page) =>
  page.getByRole("heading", { name: /^\d+ comments?/i });

test.describe("Add Comment Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const card = page
      .getByRole("listitem")
      .filter({ has: page.getByRole("link", { name: TITLE }) });
    await card.getByRole("link").click();
  });

  test("add comment form should be visible", async ({ page }) => {
    await expect(commentForm(page)).toBeVisible();
  });

  test("shows an error when posting an empty reply", async ({ page }) => {
    await page.getByRole("button", { name: /post comment/i }).click();
    await expect(page.getByRole("alert")).toHaveText(/can't be empty/i);
  });

  test("post a comment that mentions the commenter", async ({ page }) => {
    const before = parseInt(
      (await commentHeading(page).textContent()) ?? "0",
      10,
    );
    const form = commentForm(page);
    await form.getByRole("textbox").fill("This is great idea");
    await page.getByRole("button", { name: /post comment/i }).click();

    const newComment = page
      .getByRole("listitem")
      .filter({ hasText: "This is great idea" })
      .last();

    await expect(newComment).toBeVisible();
    await expect(
      newComment.getByRole("heading", { name: COMMENTER }),
    ).toBeVisible();
    await expect(newComment).toContainText(`@${HANDLE}`);
    await expect(commentHeading(page)).toHaveText(
      new RegExp(`^${before + 1} comments?`, "i"),
    );
  });
});
