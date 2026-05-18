import { test, expect } from '@playwright/test'


test('Login with valid UI user', async ({ page }) => {

  // Step 1: Open site

await page.goto('https://automationexercise.com/')
await page.waitForLoadState('load')

// give UI time (important in CI)
await page.waitForTimeout(3000);

// try both states
const loginBtn = page.locator('text=Signup / Login')

if (await loginBtn.isVisible().catch(() => false)) {
    await loginBtn.click();

    await page.fill('input[data-qa="login-email"]', 'xihilev322@codoteam.com')
    await page.fill('input[data-qa="login-password"]', '123456')

    await page.click('button[data-qa="login-button"]')
}

// just validate page loads
await expect(page.locator('text=Logged in as')).toBeVisible()
})
