import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  readonly category = (name: string) =>
    this.page.getByLabel(name, { exact: true });

  async selectCategory(name: string) {
    await this.category(name).check();
  }
}