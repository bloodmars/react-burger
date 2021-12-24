import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postReset } from 'services/actions/user/reset'
import { useSelector, useDispatch } from 'react-redux'
import { RESET_DONE } from 'services/actions/user/reset'
import styles from './styles.module.css'

const ResetPasswordPage = () => {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [tokenError, setTokenError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { resetRequest, resetStep, resetFailed, resetFailedMessage } = useSelector(store => store.userReset)

  useEffect(() => {
    if (!resetStep) {
      navigate('/forgot-password')
    } else {
      if (resetStep == 2) {
        navigate('/login')
        dispatch({ type: RESET_DONE })
      }
    }
  }, [resetStep])

  const isPasswordValid = password => {
    return password.length >= 6
  }

  const onTokenChange = e => {
    const value = e.target.value
    setToken(value)
    setTokenError(value ? false : true)
  }

  const onPasswordChange = e => {
    const value = e.target.value
    setPassword(value)
    setPasswordError(isPasswordValid(value) ? false : true)
  } 

  const onIconClickPasswordHandle = e => {
    setPasswordVisible(!passwordVisible)
  }

  const submitHandler = e => {
    e.preventDefault()

    if (resetRequest) {
      return
    }

    if (token && isPasswordValid(password)) {
      dispatch(postReset({ token, password }))
    } else {
      setTokenError(token ? false : true)
      setPasswordError(isPasswordValid(password) ? false : true)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>

      <div className="mb-6">
        <Input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Введите новый пароль"
          onChange={onPasswordChange}
          value={password}
          icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
          onIconClick={onIconClickPasswordHandle}
          name="password"
          error={passwordError}
          errorText={'Минимальная длина пароля 6 символов'}  
        />
      </div>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={onTokenChange}
          value={token}
          name="token"
          error={tokenError}
          errorText={'Обязательное поле'}          
        />
      </div>

      <div className="mb-20">
        <Button type="primary" size="medium">Сохранить</Button>

        {resetFailed && (
          <p className={`${styles.error} mt-4 text text_type_main-default`}>{resetFailedMessage}</p>
        )} 
      </div>

      <p className={`${styles.bottom} text text_type_main-default`}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </form>
  )
}

export default ResetPasswordPage
