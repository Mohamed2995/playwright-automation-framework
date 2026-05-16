
import { Page } from '@playwright/test'
export class SignupPage {constructor(private page: Page) {}

  // (Signup screen)
  nameInput = 'input[data-qa="signup-name"]'
  emailInput = 'input[data-qa="signup-email"]'
  signupButton = 'button[data-qa="signup-button"]'

  // (Account details)
  titleMr = '#id_gender1'
  passwordInput = '#password'
  firstName = '#first_name'
  lastName = '#last_name'
  address = '#address1'
  state = '#state'
  city = '#city'
  zipcode = '#zipcode'
  mobileNumber = '#mobile_number'

  createAccountBtn = 'button[data-qa="create-account"]'
  continueBtn = 'a[data-qa="continue-button"]'

  
    async enterNameAndEmail(name: string, email: string) {
      await this.page.locator(this.nameInput).fill(name)
      await this.page.locator(this.emailInput).fill(email)
      await this.page.locator(this.signupButton).click()
  }

  
  
    async fillAccountDetails(userData: any) {
      await this.page.locator(this.titleMr).click()
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
      await this.page.locator(this.createAccountBtn).click()
  }

    async clickContinue() {
      await this.page.locator(this.continueBtn).click()
  }
}
