import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading'
import { FormTransactionProps, TransactionProps } from '../types/transaction'
const FormTransactions = ({ action, idParams, dataForm }: FormTransactionProps) => {
    const navigate = useNavigate()
    const [description, setDescription] = useState(dataForm.description)
    const [value, setValue] = useState<string | number>(dataForm.value)
    const [typeTransaction, setTypeTransaction] = useState<any>(dataForm.typeTransaction)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleTransaction = () => {
        if (!description || !value || !typeTransaction)
            return alert('Preencha todos os campos!')
        const transaction: TransactionProps = {
            description,
            value: +value,
            typeTransaction
        }
        switch (action) {
            case 'create':
                saveTransaction(transaction)                
                break
            case 'edit':
                editTransaction(transaction)
                break
        }
    }
    const saveTransaction = async ({ description, value, typeTransaction }: TransactionProps) => {
        try {
            setIsLoading(true)
            await fetch('http://127.0.0.1:3000/api/transactions', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, value, typeTransaction })
            })
            setIsLoading(false)
            navigate('/transactions')
        }
        catch (err) {
            console.log(err)
        }
    }
    const editTransaction = async ({ description, value, typeTransaction }: TransactionProps) => {
        try {
            setIsLoading(true)
            await fetch(`http://127.0.0.1:3000/api/transactions/${idParams}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, value, typeTransaction })
            })
            setIsLoading(false)
            navigate('/transactions')
        }
        catch (err) {
            console.log(err)
        }
    }
    if (isLoading) return <Loading />
    return (
        <form>
            <label>
                <span>Descrição</span>
                <input
                    type="text"
                    id='description'
                    placeholder='Digite a descrição'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <label>
                <span>Valor</span>
                <input
                    type="number"
                    id='value'
                    placeholder='Digite o valor'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </label>
            <label>
                <span>Tipo de transação</span>
                <select
                    name="typeTransaction"
                    id="typeTransaction"
                    value={typeTransaction}
                    onChange={(e) => setTypeTransaction(e.target.value)}
                >
                    <option value="income">Entrada</option>
                    <option value="expense">Saída</option>
                </select>
            </label>
            <input type="button" value='Salvar' onClick={handleTransaction} />
        </form>
    )
}
export default FormTransactions