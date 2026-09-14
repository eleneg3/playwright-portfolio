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
});

