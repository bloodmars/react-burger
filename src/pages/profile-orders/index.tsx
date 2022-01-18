import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from 'services/actions/user/logout'
import styles from './styles.module.css'

const ProfileOrdersPage: FC = () => {
  const dispatch = useDispatch()
  const { logoutRequest } = useSelector((store: { userLogout: any }) => store.userLogout)

  const logoutHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (logoutRequest) {
      return
    }

    dispatch(logoutUser())
  }

  return (
    <div className={styles.form}>
      <div className={styles.nav}>
        <NavLink
          to="/profile"
          className={`${styles.link} pt-4 pb-4`}
        > 
          <span className="text text_type_main-medium text_color_inactive">Профиль</span>
        </NavLink>
        <NavLink 
          to="/profile/orders"
          className={({ isActive }) => isActive ? `${styles.selected} pt-4 pb-4` : 'pt-4 pb-4'}
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
    </div>
  )
}

export default ProfileOrdersPage
