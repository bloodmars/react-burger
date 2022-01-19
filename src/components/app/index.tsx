import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'services/actions/user/get'
import { getIngredients } from 'services/actions/ingredients'
import AppHeader from 'components/app-header'
import ProtectedRoute from 'components/protected-route'
import ConstructorPage from 'pages/constructor'
import LoginPage from 'pages/login'
import RegisterPage from 'pages/register'
import ForgotPasswordPage from 'pages/forgot-password'
import ResetPasswordPage from 'pages/reset-password'
import ProfilePage from 'pages/profile'
import ProfileOrdersPage from 'pages/profile-orders'
import NotFoundPage from 'pages/not-found'
import Modal from 'components/modal'
import IngredientDetails from 'components/ingredient-details'
import styles from './styles.module.css'

interface ILocationState {
  state: {
    background: string;
  };
}

const App = () => {
  const RouterSwitch = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      dispatch(getUser())
      dispatch(getIngredients())
    }, [dispatch])

    const { state } = location as ILocationState
    const background = state && state.background

    const { isInitRequested: isUserLoaded } = useSelector((store: { user: any }) => store.user)
    const { isInitRequested: isIngredientsLoaded, 
      isIngredientsGetFailed } = useSelector((store: { ingredients: any }) => store.ingredients)

    const handleModalClose = () => {
      navigate('/')
    }

    return (
      <>
        <AppHeader />      
        <main className={styles.main}>
          {isUserLoaded && isIngredientsLoaded && (
            <>
              {isIngredientsGetFailed ? (
                <div className={`${styles.error} text text_type_main-default`}>Упс, у нас проблемы с API</div>
              ) : (
                <>
                  <Routes location={background || location}>
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path="/" element={<ConstructorPage />} />
                    <Route path="/profile" element={
                      <ProtectedRoute onlyAuth={true}>
                        <ProfilePage />
                      </ProtectedRoute>
                    }/>
                    <Route path="/profile/orders" element={
                      <ProtectedRoute onlyAuth={true}>
                        <ProfileOrdersPage />
                      </ProtectedRoute>
                    }/>                     
                    <Route path="/login" element={
                      <ProtectedRoute onlyNonAuth={true}>
                        <LoginPage />
                      </ProtectedRoute>
                    }/>
                    <Route path="/register" element={
                      <ProtectedRoute onlyNonAuth={true}>
                        <RegisterPage />
                      </ProtectedRoute>
                    }/>
                    <Route path="/forgot-password" element={
                      <ProtectedRoute onlyNonAuth={true}>
                        <ForgotPasswordPage />
                      </ProtectedRoute>
                    }/>
                    <Route path="/reset-password" element={
                      <ProtectedRoute onlyNonAuth={true}>
                        <ResetPasswordPage />
                      </ProtectedRoute>
                    }/>
                    <Route path='/ingredients/:id' element={
                      <IngredientDetails />
                    }/>            
                  </Routes>

                  {background && (     
                    <Routes>
                      <Route
                        path='/ingredients/:id'
                        element={
                          <Modal onClose={handleModalClose} title="Детали ингредиента">
                            <IngredientDetails />
                          </Modal>
                        }
                      />     
                    </Routes>
                  )}                
                </>            
              )}
            </>
          )}
        </main>
      </>
    )
  }

  return (
    <BrowserRouter>
      <RouterSwitch />
    </BrowserRouter>
  )
}

export default App
