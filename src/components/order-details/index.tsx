import React, { FC } from 'react'
import styles from './styles.module.css'
import OrderIcon from 'images/order.gif'

interface IProps {
  number: string;
}

const OrderDetails: FC<IProps> = ({ number }) => { 
  return (
    <div className={styles.container}>
      <div className={`${styles.number} mt-4 mb-8 text text_type_digits-large`}>{number}</div>
      <div className="text text_type_main-large">идентификатор заказа</div>
      <img src={OrderIcon} className="m-15" alt={number}/>
      <div className="text text_type_main-default mb-2">Ваш заказ начали готовить</div>
      <div className={`${styles.wait} text text_type_main-default mb-30`}>Дождитесь готовности на орбитальной станции</div>
    </div>
  )
}

export default OrderDetails