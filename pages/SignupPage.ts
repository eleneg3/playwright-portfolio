import { Page, Locator } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly countryDropdown: Locator;
  readonly postcodeInput: Locator;
  readonly houseNumberInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.getByPlaceholder('First name *')
        this.lastNameInput = page.getByPlaceholder('Your last name *')
        this.dateOfBirthInput = page.getByPlaceholder('YYYY-MM-DD')
        this.countryDropdown = page.getByTestId('country')
        this.postcodeInput = page.getByPlaceholder('Your Postcode *')
        this.houseNumberInput = page.getByPlaceholder('e.g. 42 *')
        this.streetInput = page.getByPlaceholder('Your Street *')
        this.cityInput = page.getByPlaceholder('Your City *')
        this.stateInput = page.getByPlaceholder('Your State *')
        this.phoneNumberInput = page.getByPlaceholder('Your phone *')
        this.emailInput = page.getByPlaceholder('Your email *');
        this.passwordInput = page.getByPlaceholder('Your password');
        this.registerButton = page.getByTestId('register-submit');
    }

    async registerUnsuccessfully() {
        await this.registerButton.click();
    }    
}