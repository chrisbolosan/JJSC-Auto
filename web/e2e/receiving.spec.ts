import { test, expect } from '@playwright/test';

test('receiving UI page loads', async ({ page }) => {
  await page.goto('/warehouse/receiving');

  await expect(
    page.getByRole('heading', { name: 'Receiving', exact: true }),
  ).toBeVisible();
});

test('search with no matches shows message', async ({ page }) => {
  await page.goto('/warehouse/receiving');

  await page.locator('#part-search').fill('sssssssssdsdddddd');

  await expect(page.getByText('No parts match.')).toBeVisible();
});
