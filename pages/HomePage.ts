import { Page, expect } from '@playwright/test'

export class HomePage {constructor(private page: Page) {}

    private readonly signupLoginBtn = 'a[href="/login"]'
    private readonly searchInput = '#search_product'
    private readonly searchButton = '#submit_search'
    private readonly logo = 'img[alt="Website for automation practice"]'

    async navigate() {
        await this.page.goto('/')
        await this.page.waitForLoadState('networkidle')
        await expect(this.page.locator(this.logo)).toBeVisible()
    }

    async clickSignupLogin() {
        const btn = this.page.locator(this.signupLoginBtn).first()
        await expect(btn).toBeVisible()
        await btn.click()
    }

    async search(query: string) {
        await expect(this.page.locator(this.searchInput)).toBeVisible()
        await this.page.locator(this.searchInput).fill(query)
        await this.page.locator(this.searchButton).click()
        await this.page.waitForLoadState('networkidle')
    }
}
