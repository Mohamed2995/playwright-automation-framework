
import { Page, expect } from '@playwright/test';

export class CartPage {
    constructor(private page: Page) {}

    private readonly cartRow = 'tr[data-product-id], tr.cart_item, td.cart_product'

    async verifyProductInCart() {
        const item = this.page.locator(this.cartRow).first()
        await expect(item).toBeVisible({ timeout: 15000 })
    }

    async getCartCount(): Promise<number> {
        return await this.page.locator(this.cartRow).count()
    }
}
