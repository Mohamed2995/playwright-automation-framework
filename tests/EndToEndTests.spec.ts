
import { test, expect } from '../Fixtures/testBase'

test('@e2e', async ({ productPage, cartPage, page }) => {

  await test.step('Open home page', async () => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  await test.step('Navigate to products page', async () => {
    await productPage.goToProducts()
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL(/products/, { timeout: 15000 })
  })

  await test.step('Search product', async () => {
    await productPage.searchProduct('Tshirt')
    await page.waitForLoadState('networkidle')
    await expect(page.locator('h2:has-text("Searched Products")'))
      .toBeVisible({ timeout: 15000 })
  })

  await test.step('Add product to cart', async () => {
    await productPage.addFirstProductToCart()
    await page.waitForLoadState('networkidle')
  })

  await test.step('Navigate to cart page', async () => {
    await productPage.viewCart()
    await page.waitForLoadState('networkidle')
    await expect(page).toHaveURL(/view_cart/, { timeout: 15000 })
  })

  await test.step('Verify product in cart', async () => {
    await cartPage.verifyProductInCart()
  })

})
