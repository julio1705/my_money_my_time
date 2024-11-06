import { Link } from "react-router-dom";

import './Title.css'

const Title = () => {
    return (
        <div className="title">
            <h1>Transações</h1>
            <Link to='/transactions/create'>
                <input type="button" value='Adicionar' />
            </Link>
        </div>
    )
}

export default Title