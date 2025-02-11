import { TransactionType, TransactionTypeDB } from '../types/transactionType';

export interface TransactionRepository {
  calculateSumByTransactionType(typeTransaction: 'income' | 'expense'): Promise<number> | number;
  getAllTransactions(): Promise<TransactionType[]> | TransactionTypeDB[];
  getTransaction(transaction_id: number): Promise<TransactionType> | TransactionTypeDB | void;
  createTransaction(input: TransactionType): Promise<TransactionType> | TransactionTypeDB;
  updateTransaction(transaction_id: number, input: TransactionType): Promise<TransactionType> | TransactionTypeDB;
  deleteTransaction(transaction_id: number): Promise<TransactionType> | void;
}