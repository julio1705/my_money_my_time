import { TransactionType, TransactionTypeDB } from "../types/transactionType";
import { TransactionRepository } from "./transactionRepositoryService";

export class TransactionRepositoryFakerDB
  implements TransactionRepository {
  database: TransactionTypeDB[] = [
    {
      id: 1,
      typeTransaction: "income",
      value: 100,
      dateTime: "2025-01-26T21:51:50.720Z",
      description: "Teste FakerDB 01"
    },
    {
      id: 2,
      typeTransaction: "expense",
      value: 15,
      dateTime: "2025-01-26T21:51:50.720Z",
      description: "Teste FakerDB 02"
    }
  ]

  calculateSumByTransactionType = (typeTransaction: 'income' | 'expense') => {
    let sum = 0
    this.database.forEach(data => {
      if (data.typeTransaction === typeTransaction) {
        sum = sum + data.value
      }
    })
    return sum
  };

  getAllTransactions = () => {
    return this.database
  }

  getTransaction = (transaction_id: number) => {
    const transaction = this.database.filter(data => data.id === transaction_id)
    return transaction[0]
  }

  createTransaction = (input: TransactionType) => {
    this.database.push({ ...input, dateTime: this.getDateTime(), id: Math.floor(Math.random() * 100) })
    return this.database[this.database.length - 1]
  }

  updateTransaction = (transaction_id: number, input: TransactionType) => {
    let transactionIndex: number;
    this.database.forEach((data, index) => {
      if (data.id === transaction_id) {
        transactionIndex = index
      }
    })
    this.database[transactionIndex].description = input.description
    this.database[transactionIndex].value = input.value
    this.database[transactionIndex].typeTransaction = input.typeTransaction
    return this.database[transactionIndex]
  }

  deleteTransaction = (transaction_id: number) => {
    const newDB = this.database.filter(data => data.id !== transaction_id)
    this.database = newDB
  }

  getDateTime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const miliSeconds = date.getMilliseconds()
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${miliSeconds}Z`
  }

}