import { test, expect } from '@playwright/test'
import { HomePage } from '../Pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { userData } from '../utils/testData'

test.use({ storageState: undefined });

test('@login', async ({ page }) => {

    await page.context().clearCookies()
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)

    await homePage.navigate()
    await homePage.clickSignupLogin()

    await loginPage.login(userData.email, userData.password)

    await expect(page.locator('a:has-text("Logged in as")')).toBeVisible()
})
