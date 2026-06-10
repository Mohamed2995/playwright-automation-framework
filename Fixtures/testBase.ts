
import { test as base } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { SignupPage } from '../pages/signupPage'
import { LoginPage } from '../pages/loginPage'
import { ProductPage } from '../pages/addProductToCart'
import { CartPage } from '../pages/cartReview'

type MyFixtures = {
    homePage: HomePage;
    signupPage: SignupPage;
    loginPage: LoginPage;
    productPage: ProductPage;
    cartPage: CartPage;
};

export const test = base.extend<MyFixtures>({

    homePage: async ({ page }, use) => {
    await use(new HomePage(page));
    },

    signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
    },

    loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
    },

    productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
    },

    cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
    }

});

export { expect } from '@playwright/test'
