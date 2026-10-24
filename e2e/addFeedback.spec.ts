import { test, expect, type Page } from "@playwright/test";
import { type Category } from "../src/domain/schema.ts";

const fillForm = async (
  page: Page,
  {
    title,
    category,
    detail,
  }: { title: string; category: Category; detail: string },
) => {
  await page.getByLabel(/feedback title/i).fill(title);
  if (category) {
    await page.getByRole("combobox", { name: /category/i }).click();
    await page
      .getByRole("option", { name: new RegExp(`^${category}$`, "i") })
      .click();
  }
  await page.getByLabel(/feedback detail/i).fill(detail);
};

test.describe("Add Feedback page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /add feedback/i }).click();
    await expect(
      page.getByRole("heading", { name: /create new feedback/i }),
    ).toBeVisible();
  });
  test("add feedback form happy path", async ({ page }) => {
    await fillForm(page, {
      title: "Add a dark theme",
      category: "UI",
      detail:
        "I would like a dark theme so users can switch between light and dark.",
    });

    await page.getByRole("button", { name: /add feedback/i }).click();

    await page.getByRole("link", { name: /go back/i }).click();
    await page.goto("/");
    await expect(
      page.getByRole("link", { name: "Add a dark theme" }),
    ).toBeVisible();
  });

  test("defaults the category to Feature", async ({ page }) => {
    await expect(page.getByRole("combobox", { name: /category/i })).toHaveText(
      /feature/i,
    );
  });

  test("lets you choose a category with the keyboard", async ({ page }) => {
    const category = page.getByRole("combobox", { name: /category/i });

    await category.focus();
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    await expect(page.getByRole("listbox")).toBeHidden();
    await expect(
      page.getByRole("combobox", { name: /category/i }),
    ).not.toHaveText(/feature/i);
  });

  test("shows errors when submitted empty", async ({ page }) => {
    await fillForm(page, {
      title: "",
      category: "feature",
      detail: "",
    });
    await page.getByRole("button", { name: /add feedback/i }).click();
    await expect(page.getByText(/can't be empty/i)).toHaveCount(2);
    await expect(page.getByLabel(/feedback title/i)).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  test("rejects a title that is too short", async ({ page }) => {
    await fillForm(page, {
      title: "Hi",
      category: "bug",
      detail:
        "I would like a dark theme so users can switch between light and dark",
    });
    await page.getByRole("button", { name: /add feedback/i }).click();
    await expect(page.getByText(/at least 5 characters/i)).toBeVisible();
  });

  test("cancel returns back to the home page", async ({ page }) => {
    await page.getByRole("link", { name: /cancel/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
