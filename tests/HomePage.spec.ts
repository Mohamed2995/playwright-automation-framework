
import { test, expect } from '@playwright/test'

test('Home page loads correctly', async ({ page }) => {

    await page.goto('https://automationexercise.com/')

    await expect(page).toHaveURL('https://automationexercise.com/')
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible()
});
