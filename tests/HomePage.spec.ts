
import { test, expect } from '@playwright/test'

test('Home page loads correctly', async ({ page }) => {

    await page.goto('https://automationexercise.com/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/automationexercise/, { timeout: 15000 })
    await expect(page.locator('img[alt="Website for automation practice"]'))
        .toBeVisible({ timeout: 15000 })

})
