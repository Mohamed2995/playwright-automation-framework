
import { test as setup } from '@playwright/test';
import { userData } from '../../utils/testData';

setup('authenticate', async ({ page }) => {

  await page.goto('https://automationexercise.com/');
  await page.waitForLoadState('load');

  await page.click('text=Signup / Login');

  await page.fill('input[data-qa="login-email"]', userData.email);
  await page.fill('input[data-qa="login-password"]', userData.password);

  await page.click('button[data-qa="login-button"]');

  await page.waitForURL(/.*automationexercise.*/);

  // ✅ save session
  await page.context().storageState({ path: 'storageState.json' });

});
