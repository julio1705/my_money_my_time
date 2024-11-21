import './Cards.css'

import { DashboardProps } from '../types/dashboard'

const Cards = ({ incomes, expenses, remaining }: DashboardProps) => {

    return (
        <div className="container-cards">
            <div className="cards-control">
                <div className="card-title">Entrada:</div>
                <div className="card-value" id="budgets">R$ {incomes}</div>
            </div>
            <div className="cards-control">
                <div className="card-title">Saída:</div>
                <div className="card-value" id="expenses">R$ {expenses}</div>
            </div>
            <div className="cards-control">
                <div className="card-title">Saldo:</div>
                <div className="card-value" id="incomes">R$ {remaining}</div>
            </div>
        </div>
    )
}

export default Cards