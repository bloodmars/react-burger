import React, { FC } from 'react'
import styles from './styles.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'

interface Props {
  onClick: () => void;
  image: string;
  price: number;
  name: string;
}

const Ingredient: FC<Props> = ({ onClick, image, price, name }) => {
  return (
    <div className={`${styles.ingredient} mb-8`} onClick={onClick}>
      <Counter count={1} size="default" />
      <img className={`${styles.image} ml-4 mr-4 mb-1`} src={image} alt={name}/>
      <p className={`${styles.price} text text_type_digits-default mb-1`}>
        <span className="mr-2">{price}</span>
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.name} text text_type_main-default`}>{name}</p>
    </div>
  )
}

export default Ingredient