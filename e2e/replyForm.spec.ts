import { test, expect, type Page } from "@playwright/test";

const TITLE = "Add tags for solutions";

const COMMENTER = "Suzanne Chang";
const HANDLE = "upbeat1811";

const replyButton = (page: Page, name = COMMENTER) =>
  page.getByRole("button", { name: `Reply to ${name}` });

const replyForm = (page: Page) =>
  page.getByRole("form", { name: /^reply to/i });

const commentHeading = (page: Page) =>
  page.getByRole("heading", { name: /\d+ comments?/i });

test.describe("Reply form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const card = page
      .getByRole("listitem")
      .filter({ has: page.getByRole("link", { name: TITLE }) });
    await card.getByRole("link").click();
  });

  test("opens with the textarea focused", async ({ page }) => {
    await replyButton(page).click();

    await expect(replyForm(page)).toBeVisible();
    await expect(replyButton(page)).toHaveAttribute("aria-expanded", "true");
    await expect(
      page.getByRole("textbox", { name: `Reply to ${HANDLE}` }),
    ).toBeFocused();
  });
});
