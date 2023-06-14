import { useAppSelector } from '../Store/hooks'
import { Navigate, Outlet } from 'react-router-dom'
//import { useGetUserMutation } from '../Store/slices/userApiSlice'
//import { setUser } from '../Store/slices/userSlice'
//import { useEffect } from 'react'
export default function ProtectedRoute() {
    // const [check, {}] = useGetUserMutation()
    // const navigate = useNavigate()
    // //const disaptch = useAppDispatch()
    //
    // useEffect(() => {
    //     const submit = async () => {
    //         const response: any = await check(null)
    //         console.log(response.data)
    //     }
    //     submit()
    // }, [navigate, Navigate])
    //
    const user = useAppSelector((state) => state.user.user)
    return user ? <Outlet /> : <Navigate to="/authenticate" replace />
}
