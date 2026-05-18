
import { test, expect } from '@playwright/test';

test('Login with valid UI user (robust)', async ({ page }) => {

    // ✅ Step 1: Open site
    await page.goto('https://automationexercise.com/');
    await page.waitForLoadState('load');

    // ✅ Step 2: Handle popup if exists
    const consentBtn = page.locator('button:has-text("Consent")');
    if (await consentBtn.isVisible().catch(() => false)) {
        await consentBtn.click();
    }

    // ✅ Step 3: Stabilize UI (important for CI)
    await page.waitForTimeout(2000);

    // ✅ Step 4: Check if already logged in
    const loggedInText = page.locator('text=Logged in as');

    if (await loggedInText.isVisible().catch(() => false)) {
        console.log('✅ Already logged in');
    } else {

        console.log('🔐 Performing login');

        // ✅ Step 5: Click login
        const loginBtn = page.locator('text=Signup / Login').first();

        await loginBtn.waitFor({ state: 'visible', timeout: 15000 });
        await loginBtn.click();

        // ✅ Step 6: Fill credentials (REAL USER)
        await page.fill('input[data-qa="login-email"]', 'your@email.com');
        await page.fill('input[data-qa="login-password"]', '123456');

        await page.click('button[data-qa="login-button"]');
    }

    // ✅ ✅ Step 7: VALIDATE LOGIN SUCCESS (MOST IMPORTANT)
    await expect(page.locator('text=Logged in as')).toBeVisible({ timeout: 10000 });

});
``
