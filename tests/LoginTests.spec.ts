import { test, expect } from '@playwright/test'



test('Login with valid UI user', async ({ page }) => {

  // Step 1: Open site
    await page.goto('https://automationexercise.com/')
    await page.waitForLoadState('load')

    // Step 2: Handle popup if exists
    const consentBtn = page.locator('button:has-text("Consent")')

    if (await consentBtn.isVisible().catch(() => false)) {
        await consentBtn.click()
    }

    // Step 3: Check if already logged in
    const loggedIn = page.locator('text=Logged in as')

    if (await loggedIn.isVisible().catch(() => false)) {
        console.log(' Already logged in');
        return; 
    }

    // Step 4: Click login button
    const loginBtn = page.locator('text=Signup / Login').first()

    await loginBtn.waitFor({ state: 'visible', timeout: 15000 })
    await loginBtn.click()

    // Step 5: Enter credentials (REAL USER)
    await page.fill('input[data-qa="login-email"]', 'xihilev322@codoteam.com')
    await page.fill('input[data-qa="login-password"]', '123456')

    await page.click('button[data-qa="login-button"]')

    // Step 6: Validate login success
    await expect(page.locator('body')).toContainText('Logged in as')
});
