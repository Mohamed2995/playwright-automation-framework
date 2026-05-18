import {Page} from '@playwright/test'
export class HomePage {constructor(private page: Page) {}

    signupLoginBtn = 'a[href="/login"]';
    searchInput = '#search_product'
    searchButton = '#submit_search'

    async navigate() {await this.page.goto('https://automationexercise.com/')
    }

    async clickSignupLogin() {
    const btn = this.page.locator(this.signupLoginBtn);

    await btn.waitFor({ state: 'visible', timeout: 15000 });
    await btn.click();
    }

}
