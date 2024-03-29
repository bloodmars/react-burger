import React, { FC, useState, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { patchUser } from 'services/actions/user/patch'
import { logoutUser } from 'services/actions/user/logout'
import { useSelector, useDispatch } from 'react-redux'
import styles from './styles.module.css'

const ProfilePage: FC = () => {
  const dispatch = useDispatch()

  const { name: userName, email: userEmail  } = useSelector((store: { user: any }) => store.user)

  const [name, setName] = useState(userName)
  const [email, setEmail] = useState(userEmail)
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [nameDisabled, setNameDisabled] = useState(true)
  const [emailDisabled, setEmailDisabled] = useState(true)
  const [passwordDisabled, setPasswordDisabled] = useState(true)
  const inputNameRef = useRef<HTMLInputElement>(null)
  const inputEmailRef = useRef<HTMLInputElement>(null)
  const inputPasswordRef = useRef<HTMLInputElement>(null)
  const [formEdited, setFormEdited] = useState(false)

  const { userPatchRequest, userPatchFailed, userPatchFailedMessage } = useSelector((store: { userPatch: any }) => store.userPatch)
  const { logoutRequest } = useSelector((store: { userLogout: any }) => store.userLogout)

  const isEmailValid = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
  }

  const isPasswordValid = (password: string) => {
    return password.length === 0 || (password.length > 0 && password.length >= 6)
  }

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    setNameError(value ? false : true)
    setFormEdited(true)
  }

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    setEmailError(isEmailValid(value) ? false : true)
    setFormEdited(true)
  }

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
    const value = e.target.value
    setPassword(value)
    setPasswordError(isPasswordValid(value) ? false : true)
    setFormEdited(true)
  }

  const onIconClickNameHandle = (e: React.MouseEvent<HTMLElement>) => {
    setNameDisabled(false)
    setTimeout(() => inputNameRef.current?.focus(), 0)
  }

  const onIconClickEmailHandle = (e: React.MouseEvent<HTMLElement>) => {
    setEmailDisabled(false)
    setTimeout(() => inputEmailRef.current?.focus(), 0)
  }

  const onIconClickPasswordHandle = (e: React.MouseEvent<HTMLElement>) => {
    setPasswordDisabled(false)
    setTimeout(() => inputPasswordRef.current?.focus(), 0)
  }

  const onNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setNameDisabled(true)
  }

  const onEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setEmailDisabled(true)
  }

  const onPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordDisabled(true)
  }

  const onCancelFormHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setFormEdited(false)
    setName(userName)
    setEmail(userEmail)
    setNameError(false)
    setEmailError(false)
    setPasswordError(false)
    setPassword('')
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (userPatchRequest) {
      return
    }

    if (name && isEmailValid(email) && isPasswordValid(password)) {
      dispatch(patchUser({ name, email, password }))
      setFormEdited(false)
    } else {
      setNameError(name ? false : true)
      setEmailError(isEmailValid(email) ? false : true)
      setPasswordError(isPasswordValid(password) ? false : true)
    }
  }

  const logoutHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (logoutRequest) {
      return
    }

    dispatch(logoutUser())
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.nav}>
        <NavLink
          to="/profile"
          className={({ isActive }) => isActive ? `${styles.selected} pt-4 pb-4` : 'pt-4 pb-4'}
        > 
          <span className="text text_type_main-medium text_color_inactive">Профиль</span>
        </NavLink>
        <NavLink 
          to="/profile/orders"
          className={`${styles.link} pt-4 pb-4`}
        > 
          <span className="text text_type_main-medium text_color_inactive">История заказов</span>
        </NavLink>
        <NavLink 
          to="#"
          onClick={logoutHandler}
          className={`${styles.link} pt-4 pb-4`}
        > 
          <span className="text text_type_main-medium text_color_inactive">Выход</span>
        </NavLink>

        <p className={`${styles.info} mt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
      </div>

      <div className="mb-6">
        <Input
          type={'text'}
          placeholder="Имя"
          onChange={onNameChange}
          value={name}
          icon={'EditIcon'}
          onIconClick={onIconClickNameHandle}
          name="name"
          disabled={nameDisabled}
          error={nameError}
          ref={inputNameRef}
          onBlur={onNameBlur}
          errorText={'Обязательное поле'}  
        />
      </div>

      <div className="mb-6">
        <Input
          type={'text'}
          placeholder="Логин"
          onChange={onEmailChange}
          value={email}
          icon={'EditIcon'}
          onIconClick={onIconClickEmailHandle}
          name="email"
          disabled={emailDisabled}
          error={emailError}
          ref={inputEmailRef}
          onBlur={onEmailBlur}
          errorText={'Введите корректный E-mail'} 
        />
      </div>

      <div className="mb-6">
        <Input
          type={'password'}
          placeholder="Пароль"
          onChange={onPasswordChange}
          value={password}
          icon={'EditIcon'}
          onIconClick={onIconClickPasswordHandle}
          name="password"
          disabled={passwordDisabled}
          error={passwordError}
          ref={inputPasswordRef}
          onBlur={onPasswordBlur}
          errorText={'Минимальная длина пароля 6 символов'} 
        />
      </div>

      {(formEdited || userPatchFailed) && (
        <div className={styles.bottom}>
          <span className={`${styles.cancel} text text_type_main-default mr-7`} onClick={onCancelFormHandler}>Отмена</span>
          <Button type="primary" size="medium">Сохранить</Button>

          {userPatchFailed && (
            <p className={`${styles.error} mt-4 text text_type_main-default`}>{userPatchFailedMessage}</p>
          )}           
        </div>
      )}
    </form>
  )
}

export default ProfilePage
