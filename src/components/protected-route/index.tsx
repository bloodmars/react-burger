import React, { ReactElement, FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

interface IProps {
  onlyAuth?: boolean;
  onlyNonAuth?: boolean;
  children: ReactElement;
}

interface ILocationState {
  state: {
    from: string;
  };
  pathname: string;
}

const ProtectedRoute: FC<IProps> = ({ onlyAuth = null, onlyNonAuth = null, children }) => { 
  const { isAuth } = useSelector((store: { user: any }) => store.user)
  const location = useLocation()
  const { state, pathname } = location as ILocationState

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