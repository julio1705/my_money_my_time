import { Link, useNavigate } from "react-router-dom";

import { TitleProps } from "../types/title";

import './Title.css'

const Title = ({ title, returnOption, redirectLink }: TitleProps) => {

    const navigate = useNavigate()

    return (
        <div className="title">

            <h1>{title}</h1>

            {returnOption ? <input type="button" value='Voltar' onClick={() => navigate(-1)} /> :
                (
                    <Link to={redirectLink}>
                        <input type="button" value='Adicionar' />
                    </Link>
                )}
        </div>
    )
}

export default Title