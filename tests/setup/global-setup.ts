import { chromium, expect, FullConfig } from '@playwright/test'
import { userData } from '../../utils/testData'

async function globalSetup(config: FullConfig) {
  const baseURL = (config.projects?.[0]?.use as any)?.baseURL ?? process.env.BASE_URL ?? 'https://automationexercise.com'
  const browser = await chromium.launch()
  const page = await browser.newPage()

  await page.goto(baseURL)
  await page.waitForLoadState('networkidle')

  const loginLink = page.locator('a[href="/login"]').first()
  if (await loginLink.isVisible().catch(() => false)) {
    await loginLink.click()
  } else {
    const signupLoginLink = page.getByText(/Signup\s*\/\s*Login/i)
    if (await signupLoginLink.isVisible().catch(() => false)) {
      await signupLoginLink.click()
    } else {
      throw new Error('Login or Signup / Login link not found during global setup')
    }
  }

  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible({ timeout: 20000 })
  await page.fill('input[data-qa="login-email"]', userData.email)
  await page.fill('input[data-qa="login-password"]', userData.password)
  await page.click('button[data-qa="login-button"]')
  await expect(page.locator('text=Logged in as')).toBeVisible({ timeout: 20000 })

  await page.context().storageState({ path: 'storageState.json' })
  await browser.close()
}

export default globalSetup
