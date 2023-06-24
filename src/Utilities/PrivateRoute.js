import React from 'react'
import {Outlet, Navigate} from'react-router-dom'

const PrivateRoute = () => {
    const token = window.localStorage.getItem("token");
    let auth = token 
  return (
    auth ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoute