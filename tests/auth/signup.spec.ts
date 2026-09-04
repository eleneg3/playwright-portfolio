import { test, expect } from '@playwright/test';
import { SignupPage } from '../../pages/SignupPage';
import { newUser } from '../../utils/testData';

test.describe('Signup', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/auth/register');
    });

    test('User is able to create an account with correct credentials', async ({ page }) => {
        const signupPage = new SignupPage(page);
        await signupPage.registerNewUser(newUser.valid());
        await expect(page).toHaveURL('auth/login');
    });

    test('User can’t create an account using an existing email address', async ({ page }) => {
        const signupPage = new SignupPage(page);
        await signupPage.registerNewUser(newUser.existingEmail);
        await expect(signupPage.registerError).toBeVisible();
    });

    test('User can’t create an account when password doesn’t meet the criteria', async ({ page }) => {
        const signupPage = new SignupPage(page);
        await signupPage.registerNewUser(newUser.invalidPassword());
        await expect(signupPage.passwordError).toBeVisible();
    });

});