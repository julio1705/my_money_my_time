import { useState, useEffect } from 'react'

const useFetch = (url: string) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(url)
            const json = await res.json()
            setData(json)
        }
        fetchData()
    }, [url])
    return { data }
}

export default useFetch