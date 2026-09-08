import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  readonly category = (name: string) =>
    this.page.getByLabel(name, { exact: true });

  async selectCategory(name: string) {
    const categoryCheckbox = this.category(name);
    await categoryCheckbox.waitFor({ state: 'visible' });
    await categoryCheckbox.check();
  }

  async getDisplayedProductIds(): Promise<string[]> {
    return this.page
        .locator('a[data-test^="product-"]')
        .evaluateAll(products =>
            products.map(product =>
                product.getAttribute('data-test')!.replace('product-', '')
            )
        );
}
}