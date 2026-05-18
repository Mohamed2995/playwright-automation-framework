import { test, expect } from '@playwright/test'
import { ProductPage } from '../pages/AddProductToCart'


test('@search', async ({ page }) => {

    const productPage = new ProductPage(page)
    await page.goto('/')
    await page.waitForLoadState('networkidle');
    await productPage.goToProducts();
    await expect(page).toHaveURL(/products/);
    await productPage.searchProduct('Tshirt');
    await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible()

});



