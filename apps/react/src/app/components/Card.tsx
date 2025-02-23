import './Card.css'
import { CardProps } from "../types/dashboard"

const Card = ({ title, value, color }: CardProps) => {
    return (
        <div className="cards-control">
            <div className="card-title">{title}</div>
            <div className="card-value" id={color}>R$ {value}</div>
        </div>
    )
}

export default Card