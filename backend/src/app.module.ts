import { Module } from '@nestjs/common';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      max: 1,
    }),
    ExchangeRateModule,
    TransactionModule,
  ],
})
export class AppModule {}
