import './Cards.css'

const Cards = () => {

    return (
        <div className="container-cards">
            <div className="cards-control">
                <div className="card-title">Entrada:</div>
                <div className="card-value" id="budgets">R$ 1.400,00</div>
            </div>
            <div className="cards-control">
                <div className="card-title">Saída:</div>
                <div className="card-value" id="expenses">R$ 1.000,00</div>
            </div>
            <div className="cards-control">
                <div className="card-title">Saldo:</div>
                <div className="card-value" id="incomes">R$ 400,00</div>
            </div>
        </div>
    )
}

export default Cards