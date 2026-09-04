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
  readonly registerError: Locator;
  readonly passwordError: Locator; 

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
        this.registerError = page.getByTestId('register-error');
        this.passwordError = page.getByTestId('password-error');
    }

    async registerNewUser(newUser: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
        countryDropdown: string;
        postCode: string;
        houseNumber: string;
        street: string;
        city: string;
        state: string;
        phoneNumber: string;
        email: string;
        password: string;       
    }) {
        await this.firstNameInput.fill(newUser.firstName);
        await this.lastNameInput.fill(newUser.lastName);
        await this.dateOfBirthInput.fill(newUser.dateOfBirth);
        await this.countryDropdown.selectOption(newUser.countryDropdown);
        await this.postcodeInput.fill(newUser.postCode);
        await this.houseNumberInput.fill(newUser.houseNumber);
        await this.streetInput.fill(newUser.street);
        await this.cityInput.fill(newUser.city);
        await this.stateInput.fill(newUser.state);
        await this.phoneNumberInput.fill(newUser.phoneNumber);
        await this.emailInput.fill(newUser.email);
        await this.passwordInput.fill(newUser.password);
        await this.registerButton.click();
    }

    async registerUnsuccessfully() {
        await this.registerButton.click();
    }    
}