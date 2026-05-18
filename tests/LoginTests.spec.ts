
import { test, expect } from '@playwright/test'
test.use({ storageState: undefined });

test('Login validation using storageState', async ({ page }) => {

    await page.goto('https://automationexercise.com/')
    await page.waitForLoadState('networkidle');
    await page.waitForLoadState('load');

    await expect(page.locator('text=Logged in as')).toBeVisible({ timeout: 15000 });

});
