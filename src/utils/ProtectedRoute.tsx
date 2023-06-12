import { useAppSelector } from '../Store/hooks'
import { Navigate, Outlet } from 'react-router-dom'
export default function ProtectedRoute() {
    const user = useAppSelector((state) => state.user.user)
    return user ? <Outlet /> : <Navigate to="/authenticate" replace />
}
