import { test, expect } from '@playwright/test';
import { HomePage } from '../Pages/HomePage';
import { SignupPage } from '../Pages/SignupPage';
import { userData } from '../utils/testData';

test.use({ storageState: undefined });

test('User can signup successfully', async ({ page }) => {

  const homePage = new HomePage(page);
  const signupPage = new SignupPage(page);

  const email = `test${Date.now()}@mail.com`;

  await homePage.navigate();
  await page.waitForLoadState('networkidle');

  await homePage.clickSignupLogin();

  await signupPage.enterNameAndEmail(userData.name, email);
  await page.waitForLoadState('networkidle');

  await expect(page.locator('#password')).toBeVisible({ timeout: 15000 });

  await signupPage.fillAccountDetails(userData);
  await signupPage.createAccount();

  await expect(page.locator('h2:has-text("Account Created!")'))
    .toBeVisible({ timeout: 15000 });

  await signupPage.clickContinue();

  await expect(page.locator('a:has-text("Logged in as")'))
    .toBeVisible({ timeout: 15000 });

});
