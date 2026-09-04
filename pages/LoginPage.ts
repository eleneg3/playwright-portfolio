import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly wrongCredentialsError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Your email');
        this.passwordInput = page.getByPlaceholder('Your password');
        this.loginButton = page.getByTestId('login-submit');
        this.emailError = page.getByTestId('email-error');
        this.passwordError = page.getByTestId('password-error');
        this.wrongCredentialsError = page.getByTestId('login-error');
    }

    async login(user: { email: string; password: string }) {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.loginButton.click();
    }
}