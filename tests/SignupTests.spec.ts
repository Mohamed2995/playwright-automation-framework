
import { test, expect } from '@playwright/test';
import { SignupPage } from '../Pages/SignupPage';
import { userData } from '../utils/testData';

test.use({ storageState: undefined });

test('User can signup successfully', async ({ page }) => {

  const signupPage = new SignupPage(page);
  const email = `test${Date.now()}@mail.com`;

  await page.goto('https://automationexercise.com/');
  await page.waitForLoadState('load');

  // ✅ FIX: if already logged in → logout first
  const logoutBtn = page.locator('text=Logout');

  if (await logoutBtn.isVisible().catch(() => false)) {
    await logoutBtn.click();
    await page.waitForLoadState('load');
  }

  // ✅ Now login/signup button will appear
  const loginBtn = page.locator('text=Signup / Login');

  await loginBtn.waitFor({ state: 'visible', timeout: 20000 });
  await loginBtn.click();

  await signupPage.enterNameAndEmail(userData.name, email);

  await expect(page.locator('#password'))
    .toBeVisible({ timeout: 15000 });

  await signupPage.fillAccountDetails(userData);
  await signupPage.createAccount();

  await expect(page.locator('h2:has-text("Account Created!")'))
    .toBeVisible({ timeout: 15000 });

  await signupPage.clickContinue();

  await expect(page.locator('a:has-text("Logged in as")'))
    .toBeVisible({ timeout: 15000 });

});
