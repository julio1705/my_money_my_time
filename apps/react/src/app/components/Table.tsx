import { Link } from 'react-router-dom';
import './Table.css'
import Loading from './Loading'
import { useState } from "react"

interface DataItem {
    id: number,
    value: number;
    description: string;
    typeTransaction: string,
    dateTime: string
}

interface Props {
    data: DataItem[];
}

const Table = ({ data }: Props) => {

    const [transactions, setTransactions] = useState(data)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDeleteTransaction = (id: number) => {
        deleteTransaction(id)
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions)
    }

    const deleteTransaction = async (id: number) => {
        try {
            setIsLoading(true)
            await fetch(`http://127.0.0.1:3000/api/transactions/${id}`, {
                method: 'DELETE'
            })
            setIsLoading(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    if (isLoading) return <Loading />
    return (
        <table>
            <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações</th>
            </tr>
            {transactions.map(({ id, description, typeTransaction, value }) => (
                <tr key={id} className='transaction-control'>
                    <td>{description}</td>
                    <td className={typeTransaction}>R$ {value.toFixed(2)}</td>
                    <td className='btn'>
                        <Link to={`/transactions/edit/${id}`}>
                            <button>Editar</button>
                        </Link>
                        <button onClick={() => handleDeleteTransaction(id)}>Excluir</button>
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default Table