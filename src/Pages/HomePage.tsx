import { useEffect } from 'react'
import { useCheckHealthQuery } from '../Store/slices/userApiSlice'
import { ENV } from '../config/ENV'
import { Link } from 'react-router-dom'

export default function HomePage() {
    const { data } = useCheckHealthQuery('healthcheck')
    console.log(ENV.API)
    if (data) {
        console.log(`${data}`)
    }

    useEffect(() => {
        const fetchstuff = async () => {
            const respsonse = await fetch(`${ENV.API}/healthcheck`)
            console.log(ENV.API)
            console.log(respsonse, '                 success with fetch')
        }
        fetchstuff()
    }, [])

    return (
        <main className="flex flex-col">
            <div>HomePage</div>
            <Link to="/register">Sign Up</Link>
            <Link to="/authenticate">Sign In</Link>
        </main>
    )
}
