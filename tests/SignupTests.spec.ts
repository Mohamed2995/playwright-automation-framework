import { test, expect } from '@playwright/test'
import { SignupPage } from '../pages/signupPage'
import { userData } from '../utils/testData'

test('User can signup successfully', async ({ browser }) => {
  // Use a fresh unauthenticated context to reach the signup page.
  const context = await browser.newContext({ storageState: undefined })
  const page = await context.newPage()

  const signupPage = new SignupPage(page)
  const email = `test${Date.now()}@mail.com`

  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // Prefer link by href, fallback to visible text or role-based lookup
  let loginBtn = page.locator('a[href="/login"]').first()
  if (!(await loginBtn.isVisible().catch(() => false))) {
    const byText = page.getByText('Signup / Login')
    if (await byText.isVisible().catch(() => false)) loginBtn = byText
    else loginBtn = page.getByRole('link', { name: /signup|login/i }).first()
  }

  await expect(loginBtn).toBeVisible({ timeout: 20000 })
  await loginBtn.click()

  await signupPage.enterNameAndEmail(userData.name, email)

  await expect(page.locator('#password')).toBeVisible({ timeout: 15000 })

  await signupPage.fillAccountDetails(userData)
  await signupPage.createAccount()

  await expect(page.locator('h2:has-text("Account Created")')).toBeVisible({ timeout: 15000 })

  await signupPage.clickContinue()
  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible({ timeout: 15000 })

  await context.close()
})