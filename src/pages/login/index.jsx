import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postLogin } from 'services/actions/user/login'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const dispatch = useDispatch()
  const { loginRequest, loginFailed, loginFailedMessage } = useSelector(store => store.userLogin)

  const isEmailValid = email => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const isPasswordValid = password => {
    return password.length >= 6
  }

  const onEmailChange = e => {
    const value = e.target.value
    setEmail(value)
    setEmailError(isEmailValid(value) ? false : true)
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

    if (loginRequest) {
      return
    }

    if (isEmailValid(email) && isPasswordValid(password)) {
      dispatch(postLogin({ email, password }))
    } else {
      setEmailError(isEmailValid(email) ? false : true)
      setPasswordError(isPasswordValid(password) ? false : true)
    }
  }    

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h2 className="text text_type_main-medium mb-6">Вход</h2>

      <div className="mb-6">
        <Input
          type="email"
          placeholder="E-mail"
          onChange={onEmailChange}
          value={email}
          name="email"
          error={emailError}
          errorText={'Введите корректный E-mail'}  
        />
      </div>

      <div className="mb-6">
        <Input
          type={passwordVisible ? 'text' : 'password'}
          placeholder="Пароль"
          onChange={onPasswordChange}
          value={password}
          icon={passwordVisible ? 'HideIcon' : 'ShowIcon'}
          onIconClick={onIconClickPasswordHandle}
          name="password"
          error={passwordError}
          errorText={'Минимальная длина пароля 6 символов'}  
        />
      </div>

      <div className="mb-20">
        <Button type="primary" size="medium">Войти</Button>

        {loginFailed && (
          <p className={`${styles.error} mt-4 text text_type_main-default`}>{loginFailedMessage}</p>
        )}
      </div>

      <p className={`${styles.bottom} mb-4 text text_type_main-default`}>
        Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>

      <p className={`${styles.bottom} text text_type_main-default`}>
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </form>
  )
}

export default LoginPage
