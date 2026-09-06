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
});