
import { test as setup, expect } from '@playwright/test';
import { userData } from '../../utils/testData';

setup('authenticate', async ({ page }) => {

  await page.goto('https://automationexercise.com/');
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('load');

  // wait for UI to stabilize
  await page.waitForTimeout(3000);

  const logoutBtn = page.locator('text=Logout');
  const loginBtn = page.locator('text=Signup / Login').first();

  // if already logged in → skip login

  if (await logoutBtn.isVisible().catch(() => false)) {
    console.log('Already logged in');
  } 
  else if (await loginBtn.isVisible().catch(() => false)) {

    console.log('🔐 Logging in...');

    
    await loginBtn.waitFor({ state: 'visible', timeout: 15000 });
    await loginBtn.click();


    await page.fill('input[data-qa="login-email"]', userData.email);
    await page.fill('input[data-qa="login-password"]', userData.password);

    await page.click('button[data-qa="login-button"]');

    await expect(page.locator('text=Logged in as')).toBeVisible();

  } else {
    throw new Error('Login button not found');
  }

  // ✅ save session ALWAYS
  await page.context().storageState({ path: 'storageState.json' });

});
