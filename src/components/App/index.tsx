import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import AppHeader from '../../components/AppHeader'
import BurgerConstructor from '../../components/BurgerConstructor'
import BurgerIngredients from '../../components/BurgerIngredients'

const ApiUrl = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  const [ingredients, setIngredients] = useState([])
  const [constructorIngredients, setConstructorIngredients] = useState({top: undefined, bottom: undefined, middle: []})

  useEffect(() => {
    fetch(ApiUrl)
      .then(response => response.json())
      .then(data => setIngredients(data.data))
      .catch(error => alert(`Error api request: ${error}`))
  }, [])

  useEffect(() => {
    let ingredientsLength = ingredients.length - 1
    if (ingredientsLength > 0) {
      setConstructorIngredients({
        top: ingredients[0],
        bottom: ingredients[ingredientsLength],
        middle: ingredients.slice(1, ingredientsLength)
      })
    }
  }, [ingredients])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <BurgerIngredients 
            ingredients={ingredients} 
          />
        </section >
        <section className={`${styles.section} ${styles.right} pt-25 pb-10 pr-4`}>
          <BurgerConstructor 
            ingredientTop={constructorIngredients.top}
            ingredientBottom={constructorIngredients.bottom}
            ingredientsMiddle={constructorIngredients.middle}
          /> 
        </section>
      </main>
    </>
  )
}

export default App
