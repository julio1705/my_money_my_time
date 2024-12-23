import './Cards.css'
import { DashboardProps } from '../types/dashboard'
const Cards = ({ incomes, expenses, remaining }: DashboardProps) => {
    const remainingColor = (remaining: string) => {
        const splitRemaining = remaining.split('')
        const isNegative = splitRemaining[0] === '-'
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
                <div className="card-value" id={remainingColor(remaining)}>R$ {remaining}</div>
            </div>
        </div>
    )
}
export default Cards