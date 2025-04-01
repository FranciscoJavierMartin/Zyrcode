import { test, expect } from '@playwright/test';

test('Show header and links on home page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Zyrcode/);
  await expect(page.getByRole('heading', { name: 'Zyrcode' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Create notebook' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Create notebook' }),
  ).toHaveAttribute('href', '/Zyrcode/notebook');
});
