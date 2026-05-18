
import { Page, expect } from '@playwright/test';

export class CartPage {

    constructor(private page: Page) {}

    cartItems = 'td.cart_product';

    async verifyProductInCart() {

        const cartItem = this.page.locator(this.cartItems);

        await expect(cartItem.first()).toBeVisible({ timeout: 15000 });

    }
}
