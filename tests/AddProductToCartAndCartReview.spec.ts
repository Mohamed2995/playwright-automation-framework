import { test, expect } from '../Fixtures/testBase'

test('User can add product to cart', async ({ productPage, cartPage, page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await productPage.goToProducts()
    await expect(page).toHaveURL(/products/, { timeout: 15000 })

    await productPage.verifyProductsPageLoaded()
    await productPage.addFirstProductToCart()

    await productPage.viewCart()
    await expect(page).toHaveURL(/view_cart/, { timeout: 15000 })

    await cartPage.verifyProductInCart()
})