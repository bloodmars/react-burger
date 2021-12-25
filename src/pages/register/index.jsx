import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postRegister } from 'services/actions/user/register'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false)

  const dispatch = useDispatch()

  const { registerRequest, registerFailed, registerFailedMessage } = useSelector(store => store.userRegister)

  const isEmailValid = email => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const isPasswordValid = password => {
    return password.length >= 6
  }

  const onNameChange = e => {
    const value = e.target.value
    setName(value)
    setNameError(value ? false : true)
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

    if (registerRequest) {
      return
    }

    if (name && isEmailValid(email) && isPasswordValid(password)) {
      dispatch(postRegister({ name, email, password }))
    } else {
      setNameError(name ? false : true)
      setEmailError(isEmailValid(email) ? false : true)
      setPasswordError(isPasswordValid(password) ? false : true)
    }
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h2 className="text text_type_main-medium mb-6">Регистрация</h2>

      <div className="mb-6">
        <Input
          type="text"
          placeholder="Имя"
          onChange={onNameChange}
          value={name}
          name="name"
          error={nameError}
          errorText={'Обязательное поле'}          
        />
      </div>

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
        <Button type="primary" size="medium">Зарегистрироваться</Button>        

        {registerFailed && (
          <p className={`${styles.error} mt-4 text text_type_main-default`}>{registerFailedMessage}</p>
        )} 
      </div>

      <p className={`${styles.bottom} text text_type_main-default`}>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </form>
  )
}

export default RegisterPage
