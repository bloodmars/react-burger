import React, { FC } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BurgerIcon, Logo, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const AppHeader: FC = () => {
  return (
    <header className={`${styles.header} p-4`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <nav className={styles.nav}>
            <NavLink
              to="/"
              className={({ isActive }) => isActive ? `${styles.selected} p-5` : 'p-5'}
            >
              <BurgerIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-4">Конструктор</span>
            </NavLink>
            <NavLink
              to="#"
              className={({ isActive }) => isActive ? `p-5 ml-4` : 'p-5 ml-4'}
            >            
              <ListIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-4">Лента заказов</span>
            </NavLink>     
          </nav>
        </div>
        <div className={styles.middle}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className={styles.right}>
          <nav className={styles.nav}>
            <NavLink
              to="/profile"
              className={({ isActive }) => isActive ? `${styles.selected} p-5` : 'p-5'}
            >
              <ProfileIcon type="secondary" />
              <span className="text text_type_main-default text_color_inactive ml-4">Личный кабинет</span>
            </NavLink>  
          </nav>
        </div>
      </div>
    </header>    
  )
}

export default AppHeader