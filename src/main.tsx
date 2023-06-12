import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { store } from './Store/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { ConfigProvider } from 'antd'
import { Anttheme } from './utils/AntUtils.ts'
//import useScreenSize from './Hooks/useScreenSize.tsx'

import 'antd/dist/reset.css'
import './index.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import 'react-toastify/dist/ReactToastify.css'

import Dashboard from './Pages/Dashboard.tsx'
import HomePage from './Pages/HomePage.tsx'
import Register from './Pages/Register.tsx'
import SignIn from './Pages/SignIn.tsx'
import ForgotPassword from './Pages/ForgotPassword.tsx'
import ResetPassword from './Pages/ResetPassword.tsx'
import ProtectedRoute from './utils/ProtectedRoute.tsx'
import Profile from './Pages/Profile.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/authenticate" element={<SignIn />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword/:token" element={<ResetPassword />} />

            <Route path="" element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
            </Route>
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider store={store}>
        <ConfigProvider>
            <RouterProvider router={router} />
        </ConfigProvider>
        <ToastContainer position="top-center" />
    </Provider>
)
