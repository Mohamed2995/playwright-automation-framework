
import { Page } from '@playwright/test'

export class CartPage {constructor(private page: Page) {}

    cartItems = 'td.cart_product'

    async verifyProductInCart() {
    await this.page.locator(this.cartItems).waitFor()
    }
}
