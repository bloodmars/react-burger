import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './styles.module.css'

const IngredientDetails = () => { 
  const { id } = useParams()
  const { state } = useLocation()
  const { ingredients } = useSelector(store => store.ingredients)
  const ingredient = ingredients.find(ingredient => ingredient._id === id)

  return (
    <div className={styles.container}>
      {!state && (
        <div className='text text_type_main-large'>Детали ингредиента</div>
      )}
      <img className={styles.image} src={ingredient.image_large} alt={ingredient.name}/>
      <div className='text text_type_main-medium mt-4'>{ingredient.name}</div>
      <div className={`${styles.options} mt-8 mb-15`}>
        <div className={styles.item}>
          <div className={`${styles.title} text text_type_main-default mb-2`}>Калории, ккал</div>
          <div className={`${styles.value} text text_type_digits-default`}>{ingredient.calories}</div>
        </div>
        <div className={styles.item}>
          <div className={`${styles.title} text text_type_main-default mb-2`}>Белки, г</div>
          <div className={`${styles.value} text text_type_digits-default`}>{ingredient.proteins}</div>
        </div>
        <div className={styles.item}>
          <div className={`${styles.title} text text_type_main-default mb-2`}>Жиры, г</div>
          <div className={`${styles.value} text text_type_digits-default`}>{ingredient.fat}</div>
        </div>
        <div className={styles.item}>
          <div className={`${styles.title} text text_type_main-default mb-2`}>Углеводы, г</div>
          <div className={`${styles.value} text text_type_digits-default`}>{ingredient.carbohydrates}</div>
        </div>
      </div>
    </div>
  )
}

export default IngredientDetails