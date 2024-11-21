import { useState, useEffect } from 'react'

import { DashboardProps } from '../types/dashboard'

import Cards from '../components/Cards'
import Loading from '../components/Loading'

const Home = () => {

    const url = 'http://127.0.0.1:3000/dashboard'

    const [dashboard, setDashboard] = useState<DashboardProps | null>(null)

    useEffect(() => {
        const fetchDashboard = async () => {
            const res = await fetch(url)
            const data = await res.json()
            setDashboard(data)
        }
        fetchDashboard()
    }, [])

    if (!dashboard) return <Loading />

    return (
        <Cards {...dashboard} />
    )
}

export default Home