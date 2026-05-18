
import { test, expect } from '@playwright/test';

test('Login validation using storageState', async ({ page }) => {

    await page.goto('https://automationexercise.com/');
    await page.waitForLoadState('load');

    // ✅ No login steps anymore
    // ✅ User already logged in

    await expect(page.locator('text=Logged in as')).toBeVisible();

});
