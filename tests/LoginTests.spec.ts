
import { test, expect } from '@playwright/test'

test('Login validation using storageState', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  await expect(page.locator('a:has-text("Logged in as")'))
    .toBeVisible({ timeout: 15000 })
})
