import Title from '../components/Title'
import FormTransactions from '../components/FormTransactions'
import { FormTransactionProps } from '../types/transaction'

const TransactionsCreate = () => {

  const formTransaction: FormTransactionProps = {
    action: 'create',
    idParams: null,
    dataForm: {
      description: '',
      value: '',
      typeTransaction: 'income',
    }
  }

  return (
    <div>
      <Title title='Adicionar' returnOption={true} redirectLink='/' />
      <FormTransactions {...formTransaction} />
    </div>
  )
}

export default TransactionsCreate