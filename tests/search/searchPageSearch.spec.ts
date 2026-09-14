import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';

test.describe('Search Page Search', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test(`User can find the item by keyword (using full item name)`, async ({ page }) => {
        const searchPage = new SearchPage(page);
        await searchPage.search('Swiss Woodcarving Chisels');
        const displayedProduct = await searchPage.getDisplayedProductNames();
        expect(displayedProduct).toContain('Swiss Woodcarving Chisels');
    });
    

});

