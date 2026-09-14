import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test.describe('Search Page Search', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test(`User can find the item by keyword (using full item name)`, async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.search('Swiss Woodcarving Chisels');
        const displayedProducts = await searchPage.getDisplayedProductNames();
        expect(displayedProducts).toContain('Swiss Woodcarving Chisels');
    });
    
    test(`User can find the item by keyword (using partial item name)`, async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.search('Hammer');
        const displayedProducts = await searchPage.getDisplayedProductNames();
        expect(displayedProducts.every(product => product.includes('Hammer'))).toBeTruthy();
    });

    test(`Invalid keyword shows 'There are no products found.' message`, async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.search('hjdkjhdf');
        expect(searchPage.noResultsMessage).toBeVisible();
    });
});

