export type TransactionType = {
    value: number;
    description: string;
    typeTransaction: 'income' | 'expense';
  };

  export type TransactionTypeDB = {
    id: number
    value: number;
    description: string;
    typeTransaction: 'income' | 'expense';
    dateTime: string
  };