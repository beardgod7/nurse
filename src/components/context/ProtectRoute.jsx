import React from 'react'
import { useAuth } from '.'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = () => {
    const { isSecure } = useAuth();
  return isSecure ? <Outlet /> :<Navigate to='/login'/> 
  
}

export default ProtectRoute