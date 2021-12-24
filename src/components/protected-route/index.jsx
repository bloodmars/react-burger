import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from 'services/actions/user/get'

const ProtectedRoute = ({ onlyAuth = null, onlyNonAuth = null, children }) => { 
  const { isAuth } = useSelector(store => store.user)
  const { state, pathname } = useLocation()

  if (isAuth && state && state.from) {
    return <Navigate to={state.from} />
  }

  if (onlyAuth && !isAuth) {
    return <Navigate to={{ pathname: '/login' }} state={{ from: pathname }} />
  }

  if (onlyNonAuth && isAuth) {
    return <Navigate to="/" />
  }

  return children
}

export default ProtectedRoute