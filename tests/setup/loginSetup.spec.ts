
import { test as setup, expect } from '@playwright/test';
import { userData } from '../../utils/testData';

setup('authenticate', async ({ page }) => {

  await page.goto('https://automationexercise.com/');
  await page.waitForLoadState('networkidle');

  const logoutBtn = page.locator('text=Logout');
  const loginBtn = page.locator('a[href="/login"]').first();

  if (await logoutBtn.isVisible().catch(() => false)) {
    // ✅ already logged in
  } else {
    await loginBtn.waitFor({ state: 'visible', timeout: 15000 });
    await loginBtn.click();

    await page.fill('input[data-qa="login-email"]', userData.email);
    await page.fill('input[data-qa="login-password"]', userData.password);

    await page.click('button[data-qa="login-button"]');

    await expect(page.locator('text=Logged in as'))
      .toBeVisible({ timeout: 15000 });
  }

  await page.context().storageState({ path: 'storageState.json' });

});
