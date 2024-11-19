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
    inflow: "Entrada",
    outflow: "Saída"
};

const Table = ({ data }: Props) => {

    return (
        <table>
            <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Tipo</th>
                <th>Ações</th>
            </tr>
            {data.map(({ id, description, typeTransaction, value }) => (
                <tr key={id}>
                    <td className={typeTransaction}>{description}</td>
                    <td className={typeTransaction}>R$ {value.toFixed(2)}</td>
                    <td className={typeTransaction}>{dictionary[typeTransaction]}</td>
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