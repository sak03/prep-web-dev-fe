import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'


const ProtectedRoutes = () => {
    const token = localStorage.getItem('token')

    return token ? (
        <Outlet />
      ) : (
        <Navigate
          to={{
            pathname: '/',
          }}
        />
      )
}

export default ProtectedRoutes

