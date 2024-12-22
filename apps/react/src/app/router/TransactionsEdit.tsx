import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FormTransactionProps, TransactionProps } from "../types/transaction"
import Title from "../components/Title"
import FormTransactions from '../components/FormTransactions'
import Loading from "../components/Loading"

const TransactionsEdit = () => {
  const { id } = useParams()
  const [transaction, setTransaction] = useState<TransactionProps | null>(null)
  useEffect(() => {
    const fetchTransaction = async () => {
      const url = `http://127.0.0.1:3000/api/transactions/${id}`
      const res = await fetch(url)
      const data = await res.json()
      setTransaction(data)
    }
    fetchTransaction()
  }, [])

  const formTransaction: FormTransactionProps = {
    action: 'edit',
    idParams: id,
    dataForm: {
      description: transaction ? transaction.description : '',
      value: transaction ? transaction.value : '',
      typeTransaction: transaction ? transaction.typeTransaction : 'income'
    }
  }
  return (
    <div>
      <Title title='Editar' returnOption={true} redirectLink='/' />
      {!transaction ? <Loading /> : <FormTransactions {...formTransaction} />}
    </div>
  )
}
export default TransactionsEdit