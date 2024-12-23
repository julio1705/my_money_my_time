import './FormTransactions.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormTransactionProps, TransactionProps } from '../types/transaction'
import Loading from './Loading'
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
            const response = await fetch(`http://127.0.0.1:3000/api/transactions/${idParams}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description, value, typeTransaction })
            })
            setIsLoading(false)
            const res = await response.json()
            console.log(res)
            navigate('/transactions')
        }
        catch (err) {
            console.log(err)
        }
    }
    if (isLoading) return <Loading />
    return (
        <div className='form-transaction'>
            <form>
                <label>Descrição</label>
                <input
                    type="text"
                    id='description'
                    placeholder='Digite a descrição'
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <label>Valor</label>
                <input
                    type="number"
                    id='value'
                    placeholder='Digite o valor'
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <label>Tipo de transação</label>
                <select
                    name="typeTransaction"
                    id="typeTransaction"
                    required
                    value={typeTransaction}
                    onChange={(e) => setTypeTransaction(e.target.value)}
                >
                    <option value="income">Entrada</option>
                    <option value="expense">Saída</option>
                </select>
                <button onClick={handleTransaction}>Salvar</button>

            </form>
        </div>
    )
}
export default FormTransactions