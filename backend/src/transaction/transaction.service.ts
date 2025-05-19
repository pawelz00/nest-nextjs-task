import { Injectable } from '@nestjs/common';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { Transaction } from 'src/types/transaction';

@Injectable()
export class TransactionService {
  private transactions: Transaction[] = [];

  constructor(private exchangeRateService: ExchangeRateService) {}

  async simulateTransaction(amountEur: number): Promise<Transaction> {
    const exchangeRate = await this.exchangeRateService.getExchangeRate();

    const amountPln = amountEur * exchangeRate;

    const transaction: Transaction = {
      id: crypto.randomUUID(),
      amountEur,
      amountPln,
      exchangeRate,
      timestamp: new Date(),
    };

    this.transactions.push(transaction);

    return transaction;
  }

  getAllTransactions(): Transaction[] {
    return this.transactions;
  }
}
