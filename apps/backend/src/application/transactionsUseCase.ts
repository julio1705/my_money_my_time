import { TransactionRepository } from '../database/transactionRepository';
import { TransactionType } from '../types/transactionType';

export class TransactionsUseCase {
  transactionRepository: TransactionRepository;
  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }

  isValidValue = (value: number) => value > 0;
  isValidTypeTransaction = (typeTransaction: string) => {
    return typeTransaction === 'expense' || typeTransaction === 'income';
  };
  isValidDescription = (description: string) => {
    return description.length >= 3 && description.length <= 50
  }
  isValidTransactionId = (transaction_id: number) => {
    return transaction_id > 0 && Number.isInteger(transaction_id)
  }

  validateTransaction(input: TransactionType) {
    if (!this.isValidValue(input.value)) throw new Error('Valor deve ser um número maior que zero!');
    if (!this.isValidTypeTransaction(input.typeTransaction))
      throw new Error('Tipo de transação inválida!');
    if (!this.isValidDescription(input.description)) throw new Error('Descrição deve possuir entre 3 e 50 caracteres!');
  }

  async getTransactions() {
    return await this.transactionRepository.getAllTransactions();
  }

  async createTransaction(input: TransactionType) {
    this.validateTransaction(input)
    const transaction = await this.transactionRepository.createTransaction(input);
    return {
      data: transaction,
      message: 'Transação criada!',
    };
  };

  async getTransaction(transaction_id: number) {
    if (!this.isValidTransactionId(transaction_id)) throw new Error('Id inválido!')
    const transaction = await this.transactionRepository.getTransaction(transaction_id)
    if (!transaction) throw new Error('Transação não encontrada!')
    return transaction
  }

  async updateTransaction(transaction_id: number, input: TransactionType) {
    await this.getTransaction(transaction_id)
    this.validateTransaction(input)
    const transaction = await this.transactionRepository.updateTransaction(transaction_id, input)
    return {
      data: transaction,
      message: 'Transação atualizada!',
    };
  };

  async deleteTransaction(transaction_id: number) {
    await this.getTransaction(transaction_id)
    await this.transactionRepository.deleteTransaction(transaction_id)
    return {
      message: 'Transação excluída!',
    };
  }
};