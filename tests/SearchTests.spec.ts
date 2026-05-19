import { test, expect } from '@playwright/test'
import { ProductPage } from '../pages/AddProductToCart'

test('@search', async ({ page }) => {

    const productPage = new ProductPage(page)

    await page.goto('https://automationexercise.com/')
    await page.waitForLoadState('networkidle')

    await productPage.goToProducts()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/products/, { timeout: 15000 })

    await productPage.searchProduct('Tshirt')
    await page.waitForLoadState('networkidle')

    await expect(page.locator('h2:has-text("Searched Products")'))
        .toBeVisible({ timeout: 15000 })

})

