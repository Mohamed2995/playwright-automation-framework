
import { Page } from '@playwright/test'

export class LoginPage {constructor(private page: Page) {}


    loginEmail = 'input[data-qa="login-email"]'
    loginPassword = 'input[data-qa="login-password"]'
    loginButton = 'button[data-qa="login-button"]'


    loginHeader = 'h2:has-text("Login to your account")'

    async login(email: string, password: string) {
    await this.page.locator(this.loginEmail).fill(email)
    await this.page.locator(this.loginPassword).fill(password)
    await this.page.locator(this.loginButton).click()
    }
}
