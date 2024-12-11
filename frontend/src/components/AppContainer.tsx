import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import useAuth from '../hooks/useAuth'
import Loader from './Loader'

const AppContainer = () => {
    const { user, logout, loading, checkAuth } = useAuth()
    
    useEffect(() => {
        checkAuth();
    }, []);


    const handleLogout = () => {
        logout()
    };
    return (
        <div>{loading ? <Loader /> : <><Header username={user?.email || ""} onLogout={handleLogout} /><Outlet /></>}</div>
    )
}

export default AppContainer