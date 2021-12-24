import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const NotFoundPage = () => {
  const navigate = useNavigate()

  const goToIndexPage = () => {
    navigate('/')
  }

  return (
    <div className={styles.error}>
      <div className="text text_type_main-default mb-10">Упс, страница не найдена</div>
      <Button type="primary" size="large" onClick={goToIndexPage}>На главную</Button>
    </div>
  )
}

export default NotFoundPage
