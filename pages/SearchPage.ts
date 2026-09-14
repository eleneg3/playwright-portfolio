import { Page, Locator } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly sortByDropdown: Locator;
  readonly searchfield: Locator;
  readonly searchSubmitButton: Locator;
  readonly searchResultsMessage: Locator;
  readonly searchCompleted: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortByDropdown = page.getByTestId('sort');
    this.searchfield = page.getByTestId('search-query');
    this.searchSubmitButton = page.getByTestId('search-submit');
    this.searchResultsMessage = page.getByTestId('search-result-count');
    this.searchCompleted = page.getByTestId('search_completed');
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
    const names = await this.page.getByTestId('product-name').allTextContents();
    return names.map(name => name.trim());
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

  async search(keyword: string) {
    await this.searchfield.fill(keyword);
    await this.searchSubmitButton.click();
    await this.searchCompleted.waitFor({state: 'visible'});
  }
}