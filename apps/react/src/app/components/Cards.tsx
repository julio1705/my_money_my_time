import './Cards.css'
import { DashboardProps } from '../types/dashboard'
const Cards = ({ incomes, expenses, balance }: DashboardProps) => {
    const balanceColor = (balance: string) => {
        const splitBalance = balance.split('')
        const isNegative = splitBalance[0] === '-'
        if (isNegative) return 'red'
        return 'green'
    }
    return (
        <div className="container-cards">
            <div className="cards-control">
                <div className="card-title">Entrada:</div>
                <div className="card-value" id="green">R$ {incomes}</div>
            </div>
            <div className="cards-control">
                <div className="card-title">Saída:</div>
                <div className="card-value" id="red">R$ {expenses}</div>
            </div>
            <div className="cards-control">
                <div className="card-title">Saldo:</div>
                <div className="card-value" id={balanceColor(balance)}>R$ {balance}</div>
            </div>
        </div>
    )
}
export default Cards