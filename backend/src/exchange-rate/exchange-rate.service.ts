import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExchangeRateService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getExchangeRate(): Promise<number> {
    const cacheKey = 'exchange_rate';
    const cachedExchangeRate = await this.cacheManager.get<number>(cacheKey);

    if (cachedExchangeRate) {
      return cachedExchangeRate;
    }

    const apiUrl = String(process.env.API_URL);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': String(process.env.API_KEY),
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching exchange rate: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data || !data['exchange_rate']) {
      throw new Error('Invalid response from exchange rate API');
    }

    const exchangeRate = data['exchange_rate'];

    await this.cacheManager.set(cacheKey, exchangeRate, 60 * 1000);

    return data['exchange_rate'];
  }
}
