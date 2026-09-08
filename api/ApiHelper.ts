import { APIRequestContext, expect } from '@playwright/test';

export class ProductApi {
  constructor(private request: APIRequestContext) {}

  async getProduct(productId: string) {
    const response = await this.request.get(`https://api.practicesoftwaretesting.com/products/${productId}`);
    expect(response.ok()).toBeTruthy();
    return response.json();
  }

  async getProducts(productIds: string[]) {
    return Promise.all(
        productIds.map(productId => this.getProduct(productId))
    );
}
}