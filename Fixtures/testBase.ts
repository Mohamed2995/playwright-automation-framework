
import { test as base } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SignupPage } from '../pages/SignupPage'
import { LoginPage } from '../pages/LoginPage'
import { ProductPage } from '../pages/AddProductToCart'
import { CartPage } from '../pages/CartReview'

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
