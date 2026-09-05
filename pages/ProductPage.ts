import { Page, Locator } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly addToFavouritesButton: Locator;
    readonly compareButton: Locator;
    readonly increaseQuantityButton: Locator;
    readonly decreaseQuantityButton: Locator;

        constructor(page: Page) {
            this.page = page;
            this.addToCartButton = page.getByTestId('add-to-cart');
            this.addToFavouritesButton = page.getByTestId('add-to-favorites');
            this.compareButton = page.getByTestId('add-to-compare');
            this.increaseQuantityButton = page.getByTestId('increase-quantity');
            this.decreaseQuantityButton = page.getByTestId('decrease-quantity');
        }
}