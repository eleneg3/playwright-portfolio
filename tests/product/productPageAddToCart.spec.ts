import { test, expect } from '@playwright/test';
import { ProductPage } from '../../pages/ProductPage';

test.describe('Product Page: Add To Cart', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/product/01M2D3BSJX5DK4C14GHTX8JVFE');
    });

    test('User can add any available item to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addToCart();
        await expect(productPage.addedToCartAlert).toBeVisible();
    });

    test('User can add same item twice to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addToCart();
        await productPage.addToCart();
        await expect(productPage.addedToCartAlert).toHaveCount(2);
    });         

    test('User can add different items to the cart', async ({ page }) => {
        const productPage = new ProductPage(page);
        await productPage.addTwoItemsToCart();
        await expect(productPage.cartItemCount).toHaveText('2');
    });        

});

