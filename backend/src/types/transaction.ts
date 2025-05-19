export interface Transaction {
  id: string;
  amountEur: number;
  amountPln: number;
  exchangeRate: number;
  timestamp: Date;
}

export class CreateTransactionDto {
  amountEur: number;
}
