import React from 'react'
import styles from './App.module.css'
import AppHeader from './components/AppHeader'
import BurgerConstructor from './components/BurgerConstructor'
import BurgerIngredients from './components/BurgerIngredients'
import dataIngredients from './utils/ingredients.js'
import dataIngredientsExample from './utils/ingredients.example.js'

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
          <BurgerConstructor 
            ingredients={dataIngredients} 
          />
        </section >
        <section className={styles.section}>
          <BurgerIngredients 
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
