import React from 'react'
import styles from './styles.module.css'
import AppHeader from '../.././components/AppHeader'
import BurgerConstructor from '../.././components/BurgerConstructor'
import BurgerIngredients from '../.././components/BurgerIngredients'
import dataIngredients from '../.././utils/ingredients.js'
import dataIngredientsExample from '../.././utils/ingredients.example.js'

function App() {
  const ingredientsLength = dataIngredientsExample.length - 1
  const ingredientTop = dataIngredientsExample[0]
  const ingredientBottom = dataIngredientsExample[ingredientsLength]
  const ingredientsMiddle = dataIngredientsExample.slice(1, ingredientsLength)

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.section}>
          <BurgerIngredients 
            ingredients={dataIngredients} 
          />
        </section >
        <section className={`${styles.section} ${styles.right} pt-25 pb-10 pr-4`}>
          <BurgerConstructor 
            ingredientTop={ingredientTop}
            ingredientBottom={ingredientBottom}
            ingredientsMiddle={ingredientsMiddle}
            ingredientsLength={ingredientsLength}
          />        
        </section>
      </main>
    </>
  )
}

export default App
