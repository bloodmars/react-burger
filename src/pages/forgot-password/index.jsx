import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { postForgot } from 'services/actions/user/reset'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { forgotRequest, resetStep, forgotFailed, forgotFailedMessage } = useSelector(store => store.userReset)

  useEffect(() => {
    if (resetStep == 1) {
      navigate('/reset-password')
    }
  }, [resetStep])

  const isEmailValid = email => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const onEmailChange = e => {
    const value = e.target.value
    setEmail(value)
    setEmailError(isEmailValid(value) ? false : true)
  }

  const submitHandler = e => {
    e.preventDefault()

    if (forgotRequest) {
      return
    }

    if (isEmailValid(email)) {
      dispatch(postForgot({ email }))
    } else {
      setEmailError(true)
    }
  }   

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>

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

      <div className="mb-20">
        <Button type="primary" size="medium">Восстановить</Button>

        {forgotFailed && (
          <p className={`${styles.error} mt-4 text text_type_main-default`}>{forgotFailedMessage}</p>
        )}        
      </div>

      <p className={`${styles.bottom} text text_type_main-default`}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </form>
  )
}

export default ForgotPasswordPage
