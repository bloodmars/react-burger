import React, { FC, useMemo } from 'react'
import styles from './styles.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'
import IIngredient from 'interfaces/ingredient'

interface IProps {
  onClick: () => void;
  _id: string;
  type: string;
  image: string;
  price: number;
  name: string;
}

const Ingredient: FC<IProps> = ({ onClick, _id, type, image, price, name }) => {
  const { builderIngredients, builderBun } = useSelector((store: { builder: any }) => store.builder)

  const [, dragRef] = useDrag({
    type: type,
    item: { _id }
  })

  const countIngredient = useMemo(() => {
    if (type === 'bun') {
      return (builderBun && builderBun._id === _id) ? 1 : 0
    } else {
      return builderIngredients.reduce((total: number, ingredient: IIngredient) => { 
        return ingredient._id === _id ? total + 1 : total
      }, 0)
    }
  }, [type, _id, builderBun, builderIngredients])

  return (
    <div className={`${styles.ingredient} mb-8`} onClick={onClick}>
      {countIngredient > 0 && <Counter count={countIngredient} size="default"/>}
      <div ref={dragRef} className={styles.draggable}>
        <img className={`${styles.image} ml-4 mr-4 mb-1`} src={image} alt={name}/>
        <p className={`${styles.price} text text_type_digits-default mb-1`}>
          <span className="mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </p>
        <p className={`${styles.name} text text_type_main-default`}>{name}</p>
      </div>
    </div>
  )
}

export default Ingredient