import {Page} from '@playwright/test'
export class HomePage {constructor(private page: Page) {}

    signupLoginBtn = 'a[href="/login"]'
    searchInput = '#search_product'
    searchButton = '#submit_search'

    async navigate() {await this.page.goto('https://automationexercise.com/')
    }

    async clickSignupLogin() {await this.page.locator(this.signupLoginBtn).click()
    }
}
