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

  test("closes when Reply is clicked again", async ({ page }) => {
    await replyButton(page).click();
    await replyButton(page).click();

    await expect(replyForm(page)).toBeHidden();
    await expect(replyButton(page)).toHaveAttribute("aria-expanded", "false");
  });

  test("only one reply form is open at a time", async ({ page }) => {
    await replyButton(page).click();
    await replyButton(page, "Thomas Hood").click();

    await expect(replyForm(page)).toHaveCount(1);
  });

  test("shows an error when posting an empty reply", async ({ page }) => {
    await replyButton(page).click();
    await page.getByRole("button", { name: "Post Reply" }).click();

    await expect(page.getByRole("alert")).toHaveText(/can't be empty/i);
    await expect(replyForm(page)).toBeVisible();
  });

  test("posts a reply that mentions the commenter", async ({ page }) => {
    const before = parseInt(
      (await commentHeading(page).textContent()) ?? "0",
      10,
    );

    await replyButton(page).click();
    await page
      .getByRole("textbox", { name: `Reply to ${HANDLE}` })
      .fill("Great point!");
    await page.getByRole("button", { name: "Post Reply" }).click();
    const newReply = page.getByText("Great point!");

    await expect(replyForm(page)).toBeHidden();
    await expect(newReply).toBeVisible();
    await expect(newReply).toContainText(`@${HANDLE}`);
    await expect(commentHeading(page)).toHaveText(
      new RegExp(`^${before + 1} comments?`, "i"),
    );
  });
  test("top-level comments do not show an @mention", async ({ page }) => {
    await expect(page.getByText("Awesome idea!")).not.toContainText("@");
  });
});
