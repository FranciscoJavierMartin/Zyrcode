import { test, expect } from '@playwright/test';

test('Show heading', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Zyrcode/);
  await expect(page.getByRole('heading', { name: 'Zyrcode' })).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'Create notebook' }),
  ).toBeVisible();
});
