
import { test, expect } from '@playwright/test';
import { userData } from '../utils/testData';

test('Login with valid UI user', async ({ page }) => {

    await page.goto('https://automationexercise.com/');
    await page.waitForLoadState('load');

    const loginBtn = page.locator('text=Signup / Login');

    if (await loginBtn.isVisible().catch(() => false)) {
        await loginBtn.click();

        await page.fill('input[data-qa="login-email"]', userData.email);
        await page.fill('input[data-qa="login-password"]', userData.password);

        await page.click('button[data-qa="login-button"]');
    }

    await expect(page.locator('text=Logged in as')).toBeVisible();
});

