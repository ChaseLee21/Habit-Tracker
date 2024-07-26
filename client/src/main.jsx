import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import React from 'react'
import './index.css'
import './axiosConfig.js'
import Register from './components/screens/Register/Register.jsx'
import Login from './components/screens/Login/Login.jsx'
import Logout from './components/screens/Logout/Logout.jsx'
import { ProtectedHome, ProtectedNewHabit, ProtectedProfile, ProtectedProgress } from './auth/auth.js'
import ResetPassword from './components/screens/Reset Password/ResetPassword.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <h1 className='display-2'>Wrong page!</h1>,
        children: [
            {
                index: true,
                element: <ProtectedHome />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/logout',
                element: <Logout />
            },
            {
                path: '/new-habit',
                element: <ProtectedNewHabit />
            },
            {
                path: '/profile',
                element: <ProtectedProfile />
            },
            {
                path: '/progress',
                element: <ProtectedProgress />
            },
            {
                path: '/reset-password',
                element: <ResetPassword />
            },
            {
                path: '/reset-password/:token',
                element: <ResetPassword />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
