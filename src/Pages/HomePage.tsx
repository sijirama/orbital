import {} from 'react'
import { useCheckHealthQuery } from '../Store/slices/userApiSlice'
import { ENV } from '../config/ENV'

export default function HomePage() {
    const { data } = useCheckHealthQuery('healthcheck')
    console.log(`${ENV.API}       ` + data)

    return (
        <main>
            <div>HomePage</div>
        </main>
    )
}
