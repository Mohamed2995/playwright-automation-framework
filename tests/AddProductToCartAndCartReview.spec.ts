import { test, expect } from '@playwright/test'
import { ProductPage } from '../pages/AddProductToCart'
import { CartPage } from '../pages/CartReview'

test('User can add product to cart', async ({ page }) => {
    const productPage = new ProductPage(page)
    const cartPage = new CartPage(page)

    await page.goto('https://automationexercise.com/')

    await productPage.goToProducts()
    await expect(page).toHaveURL(/products/)

    await productPage.verifyProductsPageLoaded()

    await productPage.addFirstProductToCart()
    await productPage.viewCart()

    await expect(page).toHaveURL(/view_cart/)
    await cartPage.verifyProductInCart()
})
