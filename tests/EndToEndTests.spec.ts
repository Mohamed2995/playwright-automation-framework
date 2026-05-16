import {test, expect} from '../Fixtures/testBase'

  test.use({ storageState: undefined })


  test('@e2e', async ({
    productPage,
    cartPage,
    page
}) => {


  await test.step('Open home page', async () => {
    await page.goto('/');
  })

  await test.step('Navigate to products page', async () => {
    await productPage.goToProducts();
    await expect(page).toHaveURL(/products/);
  })

  await test.step('Search product', async () => {
    await productPage.searchProduct('Tshirt');

    await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();
  })

  await test.step('Add product to cart', async () => {
    await productPage.addFirstProductToCart();
  })

  await test.step('Navigate to cart page', async () => {
    await productPage.viewCart();
  })

  await test.step('Verify product in cart', async () => {
    await cartPage.verifyProductInCart();
  })
  
})

