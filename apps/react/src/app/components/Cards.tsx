import './Cards.css'
import { CardsProps } from '../types/dashboard'
import Card from './Card'

const Cards = ({ incomes, expenses, balance }: CardsProps) => {
    
    const balanceColor = (balance: number) => {
        const balanceToString = balance.toString()
        const splitBalance = balanceToString.split('')
        const isNegative = splitBalance[0] === '-'
        if (isNegative) return 'red'
        return 'green'
    }

    return (
        <div className="container-cards">
            <Card title='Entrada:' value={incomes} color='green' />
            <Card title='Saída:' value={expenses} color='red' />
            <Card title='Saldo:' value={balance} color={balanceColor(balance)} />
        </div>
    )
}
export default Cards