
import { test, expect } from '@playwright/test';

test('Login validation using storageState', async ({ page }) => {

    await page.goto('https://automationexercise.com/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('text=Logged in as'))
        .toBeVisible({ timeout: 15000 });

});
