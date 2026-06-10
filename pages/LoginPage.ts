
import { Page, expect } from '@playwright/test'

export class LoginPage {
    constructor(private page: Page) {}

    private readonly loginEmail = 'input[data-qa="login-email"]'
    private readonly loginPassword = 'input[data-qa="login-password"]'
    private readonly loginButton = 'button[data-qa="login-button"]'
    private readonly loginHeader = 'h2:has-text("Login to your account")'
    private readonly loggedInMsg = 'text=Logged in as'

    async login(email: string, password: string) {
        await expect(this.page.locator(this.loginHeader)).toBeVisible()

        const emailInput = this.page.locator(this.loginEmail)
        const passwordInput = this.page.locator(this.loginPassword)
        const loginBtn = this.page.locator(this.loginButton)

        await expect(emailInput).toBeVisible()
        await emailInput.fill(email)

        await expect(passwordInput).toBeVisible()
        await passwordInput.fill(password)

        await expect(loginBtn).toBeVisible()
        await loginBtn.click()

        await expect(this.page.locator(this.loggedInMsg)).toBeVisible()
    }
}
