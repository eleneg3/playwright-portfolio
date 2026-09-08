import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';
import { categories, subcategories } from '../../utils/testData';

test.describe('Search Page Filters', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    for (const category of categories) {
        test(`user can filter by ${category}`, async ({ page }) => {
            const searchPage = new SearchPage(page);
            await page.goto('/');
            await searchPage.selectCategory(category);
            await expect(searchPage.category(category)).toBeChecked;
    });
    }

    for (const subcategory of subcategories) {
        test(`user can filter by ${subcategory}`, async ({ page }) => {
            const searchPage = new SearchPage(page);
            await page.goto('/');
            await searchPage.selectCategory(subcategory);
            await expect(searchPage.category(subcategory)).toBeChecked;
    });
    }

    test('user can filter products by subcategory', async ({ page }) => {
        const searchPage = new SearchPage(page);
        await page.goto('/');
        const responsePromise = page.waitForResponse(response =>
            response.url() === 'https://api.practicesoftwaretesting.com/products' &&
            response.request().method() === 'QUERY' &&
            response.ok()
        );
        await searchPage.selectCategory('Chisels');
        const response = await responsePromise;
        const apiResponse = await response.json();
        await expect(searchPage.category('Chisels')).toBeChecked();
        const uiProductIds = await searchPage.getDisplayedProductIds();
        const apiProductIds = apiResponse.data.map(
            (product: { id: string }) => product.id
        );
        expect(uiProductIds).toEqual(apiProductIds);
    });

    test('user can filter products by category', async ({ page }) => {
        const searchPage = new SearchPage(page);
        await page.goto('/');
        const responsePromise = page.waitForResponse(response =>
            response.url() === 'https://api.practicesoftwaretesting.com/products' &&
            response.request().method() === 'QUERY' &&
            response.ok()
        );
        await searchPage.selectCategory('Hand Tools');
        const response = await responsePromise;
        const apiResponse = await response.json();
        await expect(searchPage.category('Hand Tools')).toBeChecked();
        const uiProductIds = await searchPage.getDisplayedProductIds();
        const apiProductIds = apiResponse.data.map(
            (product: { id: string }) => product.id
        );
        expect(uiProductIds).toEqual(apiProductIds);
    });    
});

