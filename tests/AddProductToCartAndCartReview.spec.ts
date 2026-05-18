import { test, expect } from '../Fixtures/testBase';
import { ProductPage } from '../pages/AddProductToCart';
import { CartPage } from '../pages/CartReview';

test('User can add product to cart', async ({ page }) => {

    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    await productPage.goToProducts();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/products/, { timeout: 15000 });

    await productPage.verifyProductsPageLoaded();

    await productPage.addFirstProductToCart();
    await page.waitForLoadState('networkidle');

    await productPage.viewCart();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/view_cart/, { timeout: 15000 });

    await cartPage.verifyProductInCart();

});
