export type TransactionProps = {
  value: number | '';
  description: string;
  typeTransaction: 'income' | 'expense';
};

export type FormTransactionProps = {
  action: 'create' | 'edit';
  idParams: string | undefined | null
  dataForm: TransactionProps;
};
