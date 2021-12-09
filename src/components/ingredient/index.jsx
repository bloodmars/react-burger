import React from 'react'
import styles from './styles.module.css'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag } from 'react-dnd'
import { useSelector } from 'react-redux'

const Ingredient = ({ onClick, _id, type, image, price, name }) => {
  const { ingredients: builderIngredients, side } = useSelector(store => store.builder)

  const [, dragRef] = useDrag({
    type: type,
    item: { _id }
  })

  const getCountIngredient = () => {
    if (type === 'bun') {
      return (side && side._id === _id) ? 2 : 0
    } else {
      return builderIngredients.filter(ingredient => ingredient._id === _id).length
    }
  }

  const count = getCountIngredient()

  return (
    <div className={`${styles.ingredient} mb-8`} onClick={onClick}>
      {count > 0 && <Counter count={count} size="default"/>}
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