import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly addToFavouritesButton: Locator;
    readonly compareButton: Locator;
    readonly increaseQuantityButton: Locator;
    readonly decreaseQuantityButton: Locator;
    readonly addedToCartAlert: Locator;
    readonly cartItemCount: Locator;

        constructor(page: Page) {
            this.page = page;
            this.addToCartButton = page.getByTestId('add-to-cart');
            this.addToFavouritesButton = page.getByTestId('add-to-favorites');
            this.compareButton = page.getByTestId('add-to-compare');
            this.increaseQuantityButton = page.getByTestId('increase-quantity');
            this.decreaseQuantityButton = page.getByTestId('decrease-quantity');
            this.addedToCartAlert = page.getByRole('alert', {name: /Product added to shopping cart/});
            this.cartItemCount = page.getByTestId('cart-quantity');
        }

        async addTwoItemsToCart() {
            await this.addToCartButton.click();
            await this.addedToCartAlert.waitFor({state: 'visible'});
            await this.page.goto('/product/01M2D3BSKABY7W5AKJ8F6T5425');
            await this.addToCartButton.click();
            await this.addedToCartAlert.waitFor({state: 'visible'});
        }
}