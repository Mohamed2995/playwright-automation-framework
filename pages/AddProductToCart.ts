import { Page } from '@playwright/test'

export class ProductPage {constructor(private page: Page) {}

  // Product locators
    productsLink = 'a[href="/products"]'
    productListHeader = 'h2:has-text("All Products")'
    firstProduct = '.product-image-wrapper'
    viewCartBtn = 'u:has-text("View Cart")'

  // Search locators
    searchInput = '#search_product'
    searchButton = '#submit_search'
    searchedProductsHeader = 'h2:has-text("Searched Products")'

  // Navigate to products
    async goToProducts() {
    await this.page.locator(this.productsLink).click()
    }

    async verifyProductsPageLoaded() {
    await this.page.locator(this.productListHeader).waitFor()
    }

  // Add to cart
    async addFirstProductToCart() {
    const firstProduct = this.page.locator('.product-image-wrapper').first()

    await firstProduct.scrollIntoViewIfNeeded()
    await firstProduct.hover()

    await this.page.getByText('Add to cart').first().click()
    await this.page.waitForSelector('u:has-text("View Cart")')
    }

    async viewCart() {
    await this.page.locator(this.viewCartBtn).click()
    }

  // Search methods
    async searchProduct(productName: string) {
    await this.page.fill(this.searchInput, productName)
    await this.page.click(this.searchButton)
    }

    async verifySearchResults() {
    await this.page.locator(this.searchedProductsHeader).waitFor()
    }
}
``
