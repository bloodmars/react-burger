import React from 'react'
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

export default class AppHeader extends React.Component {
  render() {
    return (
      <header className={`${styles.header} p-4`}>
        <div className={styles.left}>
          <nav className={styles.nav}>
            <a href="#" className={`${styles.selected} p-5`}>
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default ml-4">Конструктор</span>
            </a>
            <a href="#" className="p-5 ml-4">
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-4">Лента заказов</span>
            </a>       
          </nav>
        </div>
        <div className={styles.middle}><Logo /></div>
        <div className={styles.right}>
          <nav className={styles.nav}>
            <a href="#" className="p-5">
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-4">Личный кабинет</span>
            </a>    
          </nav>
        </div>
      </header>
    )
  }
}