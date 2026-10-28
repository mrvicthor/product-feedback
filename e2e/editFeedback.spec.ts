import { test, expect, type Page } from "@playwright/test";
import type { Category, Status } from "../src/domain/schema.ts";

const TITLE = "Add tags for solutions";

const fillForm = async (
  page: Page,
  {
    title,
    category,
    status,
    detail,
  }: { title: string; category: Category; status: Status; detail: string },
) => {
  await page.getByLabel(/feedback title/i).fill(title);

  await page.getByRole("combobox", { name: /category/i }).click();
  await page
    .getByRole("option", { name: new RegExp(`^${category}$`, "i") })
    .click();

  await page.getByRole("combobox", { name: /update status/i }).click();
  await page
    .getByRole("option", { name: new RegExp(`^${status}$`, "i") })
    .click();
  await page.getByLabel(/feedback detail/i).fill(detail);
};

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

  test("should have details of the selected feedback", async ({ page }) => {
    await expect(page.getByLabel(/feedback title/i)).toHaveValue(TITLE);
    await expect(page.getByRole("combobox", { name: /category/i })).toHaveText(
      /enhancement/i,
    );
    await expect(
      page.getByRole("combobox", { name: /update status/i }),
    ).toHaveText(/suggestion/i);
    await expect(page.getByLabel(/feedback detail/i)).toHaveValue(
      "Easier to search for solutions based on a specific stack.",
    );
  });

  test("should show error if any field is empty", async ({ page }) => {
    await fillForm(page, {
      title: "",
      category: "UX",
      status: "live",
      detail: "",
    });
    await page.getByRole("button", { name: /save changes/i }).click();
    await expect(page.getByText(/can't be empty/i)).toHaveCount(2);
    await expect(page.getByLabel(/feedback title/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("should navigate user back to details page after successfully editing feedback", async ({
    page,
  }) => {
    await fillForm(page, {
      title: "Add tags for Southampton",
      category: "UX",
      status: "live",
      detail: "Don't forget to add tags for Southampton",
    });
    await page.getByRole("button", { name: /save changes/i }).click();
    await expect(page).toHaveURL(`/detail/1`);
    await expect(
      page.getByRole("heading", { name: /add tags for southampton/i }),
    ).toBeVisible();
  });

  test("should go back to details page when cancel button is clicked", async ({
    page,
  }) => {
    await page.getByRole("link", { name: /cancel/i }).click();
    await expect(page).toHaveURL(`/detail/1`);
    await expect(
      page.getByRole("heading", { name: /editing 'add tags for solutions'/i }),
    ).toBeVisible();
  });
});
