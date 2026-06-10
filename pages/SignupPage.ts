
import { Page, expect } from '@playwright/test'

interface UserData {
  password: string
  firstName: string
  lastName: string
  address: string
  state: string
  city: string
  zipCode: string
  mobile: string
}

export class SignupPage {
  constructor(private page: Page) {}

  // Signup screen
  private readonly nameInput = 'input[data-qa="signup-name"]'
  private readonly emailInput = 'input[data-qa="signup-email"]'
  private readonly signupButton = 'button[data-qa="signup-button"]'

  // Account details
  private readonly titleMr = '#id_gender1'
  private readonly passwordInput = '#password'
  private readonly firstName = '#first_name'
  private readonly lastName = '#last_name'
  private readonly address = '#address1'
  private readonly state = '#state'
  private readonly city = '#city'
  private readonly zipcode = '#zipcode'
  private readonly mobileNumber = '#mobile_number'

  private readonly createAccountBtn = 'button[data-qa="create-account"]'
  private readonly continueBtn = 'a[data-qa="continue-button"]'
  private readonly accountCreatedHeader = 'h2:has-text("Account Created")'
  private readonly loggedInMsg = 'a:has-text("Logged in as")'

  async enterNameAndEmail(name: string, email: string) {
    const nameField = this.page.locator(this.nameInput)
    const emailField = this.page.locator(this.emailInput)
    const signupBtn = this.page.locator(this.signupButton)

    await expect(nameField).toBeVisible()
    await nameField.fill(name)

    await expect(emailField).toBeVisible()
    await emailField.fill(email)

    await expect(signupBtn).toBeVisible()
    await signupBtn.click()
    await this.page.waitForLoadState('networkidle')
  }

  async fillAccountDetails(userData: UserData) {
    await expect(this.page.locator(this.titleMr)).toBeVisible()
    await this.page.locator(this.titleMr).click()

    await expect(this.page.locator(this.passwordInput)).toBeVisible()
    await this.page.locator(this.passwordInput).fill(userData.password)

    await this.page.locator(this.firstName).fill(userData.firstName)
    await this.page.locator(this.lastName).fill(userData.lastName)
    await this.page.locator(this.address).fill(userData.address)

    await this.page.locator(this.state).fill(userData.state)
    await this.page.locator(this.city).fill(userData.city)
    await this.page.locator(this.zipcode).fill(userData.zipCode)
    await this.page.locator(this.mobileNumber).fill(userData.mobile)
  }

  async createAccount() {
    const createBtn = this.page.locator(this.createAccountBtn)
    await expect(createBtn).toBeVisible()
    await createBtn.click()
    await expect(this.page.locator(this.accountCreatedHeader)).toBeVisible()
  }

  async clickContinue() {
    const continueBtn = this.page.locator(this.continueBtn)
    await expect(continueBtn).toBeVisible()
    await continueBtn.click()
    await expect(this.page.locator(this.loggedInMsg)).toBeVisible()
  }
}
