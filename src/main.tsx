import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

//import App from './App.tsx'
import Dashboard from './Pages/Dashboard.tsx'
import HomePage from './Pages/HomePage.tsx'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Route>
    )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
