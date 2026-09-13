import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.describe('Product Page: Add To Cart', () => {

    test.beforeEach(async ({ page }) => {
        const productPage = new ProductPage(page);
        await page.goto('/product/01M2DDNDQAC25ND2AW5ZTT7G6N');
    });

    test('User can add any available item to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addToCartButton.click();
        await expect(productPage.addedToCartAlert).toBeVisible();
    });

    test('User can add same item twice to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addToCartButton.click();
        await productPage.addToCartButton.click();
        await expect(productPage.addedToCartAlert).toHaveCount(2);
    });         

    test('User can add different items to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addTwoItemsToCart();
        await expect(productPage.cartItemCount).toHaveText('2');
    });        

});

