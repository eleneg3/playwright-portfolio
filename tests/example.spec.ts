import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

test.describe('Login', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/login');
    });

    test('User is able to log in with correct credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(users.valid);
        await expect(page).toHaveURL('/account');
    });

    test('User is not able to log in with valid email address but wrong password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(users.wrongPassword);
        await expect(loginPage.wrongCredentialsError).toBeVisible();
    });

});