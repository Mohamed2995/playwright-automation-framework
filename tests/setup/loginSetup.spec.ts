import { test as setup, expect } from '@playwright/test'
import { userData } from '../../utils/testData'

setup('authenticate', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  const logoutBtn = page.locator('text=Logout')
  let loginBtn = page.locator('a[href="/login"]').first()
  if (!(await loginBtn.isVisible().catch(() => false))) {
    const alt = page.getByText('Signup / Login')
    if (await alt.isVisible().catch(() => false)) loginBtn = alt
  }

  if (await logoutBtn.isVisible().catch(() => false)) {
    // already logged in
    await page.context().storageState({ path: 'storageState.json' })
    return
  }

  await expect(loginBtn).toBeVisible({ timeout: 15000 })
  await loginBtn.click()

  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible()

  await page.fill('input[data-qa="login-email"]', userData.email)
  await page.fill('input[data-qa="login-password"]', userData.password)
  await page.click('button[data-qa="login-button"]')

  await expect(page.locator('text=Logged in as')).toBeVisible({ timeout: 15000 })

  await page.context().storageState({ path: 'storageState.json' })
})