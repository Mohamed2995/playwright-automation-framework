
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test('Login and save session', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await page.goto('https://automationexercise.com/')

    await page.click('a[href="/login"]')

  // Use existing valid account
    await loginPage.login('xihilev322@codoteam.com', '123456')

  // Save session
    await page.context().storageState({ path: 'storageState.json' })
});
