import { test, expect } from '@playwright/test';
import { SearchPage } from '../../pages/SearchPage';
import { sortingOptions } from '../../utils/testData';

test.describe('Search Page Sorting', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    for (const option of sortingOptions) {
        test(`User can select ${option.label}`, async ({ page }) => {
            const searchPage = new SearchPage(page);
            await page.goto('/');
            await searchPage.sortBy(option.value);
            await expect(searchPage.sortByDropdown).toHaveValue(option.value);
    });
    }

    for (const option of sortingOptions) {
        test(`Products are correctly sorted by ${option.label}`, async ({ page }) => {
            const searchPage = new SearchPage(page);
            await page.goto('/');
            await searchPage.sortBy(option.value);

            if (option.value.startsWith('name')) {
                const names = await searchPage.getDisplayedProductNames();
                const expected = [...names].sort();
                if (option.value === 'name,desc') {
                    expected.reverse();
                }
                expect(names).toEqual(expected);
            }

            if (option.value.startsWith('price')) {
                const prices = await searchPage.getDisplayedProductPrices();
                const expected = [...prices].sort((a, b) => a - b);
                if (option.value === 'price,desc') {
                    expected.reverse();
                }
                expect(prices).toEqual(expected);
            }

            if (option.value.startsWith('co2_rating')) {
                const ratings = await searchPage.getDisplayedCo2Ratings();
                const expected = [...ratings].sort();
                if (option.value === 'co2_rating,desc') {
                    expected.reverse();
                }
                expect(ratings).toEqual(expected);
            }
    });
}
});

