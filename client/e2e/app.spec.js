const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

test.describe('app', () => {
  test('should load the page and display the initial page title', async ({ page }) => {
    await expect(page).toHaveTitle('Welcome | Aurelia');
  });

  test('should display greeting', async ({ page }) => {
    await expect(page.locator('h2')).toHaveText('Welcome to the Aurelia Navigation App!');
  });
});
