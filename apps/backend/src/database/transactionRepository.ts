import { PrismaClient } from '@prisma/client';
import { TransactionType } from '../types/transactionType';

export interface TransactionRepository {
  calculateSumByTransactionType(typeTransaction: 'income' | 'expense'): Promise<number>;
  getAllTransactions(): Promise<TransactionType[]>;
  createTransaction(input: TransactionType): Promise<TransactionType>;
  getTransaction(transaction_id: number): Promise<TransactionType>;
  updateTransaction(transaction_id: number, input: TransactionType): Promise<TransactionType>;
  deleteTransaction(transaction_id: number): Promise<TransactionType>;
}

export class TransactionRepositoryPrisma
  implements TransactionRepository {
  prisma: PrismaClient = new PrismaClient();

  calculateSumByTransactionType = async (
    typeTransaction: 'income' | 'expense'
  ) => {
    const result = await this.prisma.transactions.aggregate({
      _sum: {
        value: true,
      },
      where: {
        typeTransaction,
      },
    });
    return result._sum.value || 0;
  };

  getAllTransactions = async () => {
    return await this.prisma.transactions.findMany();
  };

  createTransaction = async (input: TransactionType) => {
    return await this.prisma.transactions.create({
      data: {
        typeTransaction: input.typeTransaction,
        value: Number(input.value),
        description: input.description,
      },
    });
  };

  getTransaction = async (transaction_id: number) => {
    return await this.prisma.transactions.findUnique({
      where: { id: transaction_id },
    });
  }

  updateTransaction = async (transaction_id: number, input: TransactionType) => {
    return await this.prisma.transactions.update({
      where: { id: transaction_id },
      data: {
        typeTransaction: input.typeTransaction,
        value: input.value,
        description: input.description,
      },
    })
  }

  deleteTransaction = async (transaction_id: number) => {
    return await this.prisma.transactions.delete({
      where: { id: transaction_id },
    });
  }
}