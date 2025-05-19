import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { ExchangeRateService } from 'src/exchange-rate/exchange-rate.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService, ExchangeRateService],
})
export class TransactionModule {}
