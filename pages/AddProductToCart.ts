import { Page, expect } from '@playwright/test'

export class ProductPage {
  constructor(private page: Page) {}

  // Product locators
  private readonly productsLink = 'a[href="/products"]'
  private readonly productListHeader = 'h2:has-text("All Products")'
  private readonly productCard = '.product-image-wrapper'
  private readonly viewCartBtn = 'u:has-text("View Cart")'

  // Search locators
  private readonly searchInput = '#search_product'
  private readonly searchButton = '#submit_search'
  private readonly searchedProductsHeader = 'h2:has-text("Searched Products")'

  async goToProducts() {
    await Promise.all([
      this.page.waitForURL(/products/, { timeout: 15000 }),
      this.page.locator(this.productsLink).first().click(),
    ])
    await expect(this.page.locator(this.productListHeader)).toBeVisible()
  }

  async verifyProductsPageLoaded() {
    await expect(this.page.locator(this.productListHeader)).toBeVisible()
  }

  async addFirstProductToCart() {
    const firstProduct = this.page.locator(this.productCard).first()
    await firstProduct.scrollIntoViewIfNeeded()
    await expect(firstProduct).toBeVisible()

    // Hover to reveal action buttons (some layouts show Add to cart on hover)
    await firstProduct.hover()

    // Try to click the Add to cart button that's visible on the page (may not be direct child)
    const addBtn = this.page.locator('text=Add to cart').first()
    await addBtn.waitFor({ state: 'visible', timeout: 15000 })
    await addBtn.click()

    // Wait for confirmation (View Cart) to appear
    await expect(this.page.locator(this.viewCartBtn)).toBeVisible({ timeout: 15000 })
  }

  async viewCart() {
    const view = this.page.locator(this.viewCartBtn).first()
    await expect(view).toBeVisible()
    await view.click()
    await this.page.waitForLoadState('networkidle')
  }

  async searchProduct(productName: string) {
    await expect(this.page.locator(this.searchInput)).toBeVisible()
    await this.page.locator(this.searchInput).fill(productName)
    await this.page.locator(this.searchButton).click()
    await expect(this.page.locator(this.searchedProductsHeader)).toBeVisible()
  }

  async verifySearchResults() {
    await expect(this.page.locator(this.searchedProductsHeader)).toBeVisible()
  }
}
``
