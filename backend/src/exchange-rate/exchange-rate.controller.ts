import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('exchange-rate')
export class ExchangeRateController {
  public constructor(
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  @Get()
  public async getExchangeRate() {
    return this.exchangeRateService.getExchangeRate();
  }
}
