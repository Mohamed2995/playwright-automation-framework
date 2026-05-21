import { test, expect } from '@playwright/test'
import { SignupPage } from '../pages/SignupPage'
import { userData } from '../utils/testData'

test('User can signup successfully', async ({ browser }) => {

  // CRITICAL FIX → create fresh context manually
  const context = await browser.newContext()
  const page = await context.newPage()

  const signupPage = new SignupPage(page)
  const email = `test${Date.now()}@mail.com`

  await page.goto('https://automationexercise.com/')
  await page.waitForLoadState('load')

  const loginBtn = page.locator('text=Signup / Login')

  await loginBtn.waitFor({ state: 'visible', timeout: 20000 })
  await loginBtn.click()

  await signupPage.enterNameAndEmail(userData.name, email)

  await expect(page.locator('#password')).toBeVisible({ timeout: 15000 })

  await signupPage.fillAccountDetails(userData)
  await signupPage.createAccount()

  await expect(page.locator('h2:has-text("Account Created!")'))
    .toBeVisible({ timeout: 15000 })

  await signupPage.clickContinue()

  await expect(page.locator('a:has-text("Logged in as")'))
    .toBeVisible({ timeout: 15000 })

  await context.close()
})