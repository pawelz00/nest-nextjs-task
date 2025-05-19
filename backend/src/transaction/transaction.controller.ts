import { Body, Controller, Get, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto, Transaction } from 'src/types/transaction';

@Controller('transaction')
export class TransactionController {
  public constructor(private readonly transactionService: TransactionService) {}

  @Post()
  public async simulateTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.simulateTransaction(
      createTransactionDto.amountEur,
    );
  }

  @Get()
  public getAllTransactions(): Transaction[] {
    return this.transactionService.getAllTransactions();
  }
}
