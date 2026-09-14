import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly sortByDropdown: Locator;
  readonly searchfield: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortByDropdown = page.getByTestId('sort');
    this.searchfield = page.getByTestId('search-query');
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
    await this.sortByDropdown.selectOption({ value: option });
}

  async getDisplayedProductNames(): Promise<string[]> {
    return this.page.getByTestId('product-name').allTextContents();
  }

  async getDisplayedProductPrices(): Promise<number[]> {
    const prices = await this.page.getByTestId('product-price').allTextContents();

    return prices.map(price =>
        Number(price.replace('$', '').trim())
    );
  }

  async getDisplayedCo2Ratings(): Promise<string[]> {
    return this.page
        .getByTestId('co2-rating-badge')
        .locator('.co2-letter.active')
        .allTextContents();
  }
}