import { test, expect } from '@playwright/test';

test('receiving UI page loads', async ({ page }) => {
  await page.goto('/warehouse/receiving');

  await expect(
    page.getByRole('heading', { name: 'Receiving', exact: true }),
  ).toBeVisible();
});
