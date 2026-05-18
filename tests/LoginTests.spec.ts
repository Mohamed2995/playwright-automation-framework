
import { test, expect } from '@playwright/test';
import { userData } from '../utils/testData';

test('@login Login with valid UI user (robust)', async ({ page }) => {

    
// Step 1: Open site
await page.goto('https://automationexercise.com/');
await page.waitForLoadState('load');

// Step 2: Check if already logged in
const logoutBtn = page.locator('text=Logout');

if (await logoutBtn.isVisible().catch(() => false)) {
    console.log('User already logged in → logging out');

    await logoutBtn.click();

    // wait until logout finished
    await page.waitForLoadState('load');
}

// Step 3: Perform login normally
const loginBtn = page.locator('text=Signup / Login').first();
await loginBtn.waitFor({ state: 'visible', timeout: 15000 });
await loginBtn.click();

await page.fill('input[data-qa="login-email"]',  userData .email);
await page.fill('input[data-qa="login-password"]',  userData .password);

await page.click('button[data-qa="login-button"]');

// Step 4: Validate login success
await expect(page.locator('text=Logged in as')).toBeVisible();

    await expect(page.locator('text=Logged in as')).toBeVisible();
});

