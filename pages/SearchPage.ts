import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly sortByDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortByDropdown = page.getByTestId('sort')
  }

  readonly category = (name: string) =>
    this.page.getByLabel(name, { exact: true });

  readonly brand = (name: string) => 
    this.page.getByLabel(name, {exact: true});

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

  async selectBrand(name: string) {
    const brandCheckbox = this.brand(name);
    await brandCheckbox.waitFor({ state: 'visible' });
    await brandCheckbox.check();
  }    

  async sortBy(option: string) {
    await this.sortByDropdown.selectOption({ label: option });
}
}