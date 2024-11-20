import './Table.css'

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

const dictionary: { [key: string]: string } = {
    income: "Entrada",
    expense: "Saída"
};

const Table = ({ data }: Props) => {

    return (
        <table>
            <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Ações</th>
            </tr>
            {data.map(({ id, description, typeTransaction, value }) => (
                <tr key={id} className='transaction-control'>
                    <td>{description}</td>
                    <td className={typeTransaction}>R$ {value.toFixed(2)}</td>
                    <td className='btn'>
                        <button>Editar</button>
                        <button>Excluir</button>
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default Table