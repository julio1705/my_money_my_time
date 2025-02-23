import useFetch from '../hooks/useFetch'
import Cards from '../components/Cards'
import Loading from '../components/Loading'

const Home = () => {
    const url = 'http://127.0.0.1:3000/api/dashboard'
    const { data: dashboard }: any = useFetch(url)
    if (!dashboard) return <Loading />
    return <Cards {...dashboard} />
}

export default Home