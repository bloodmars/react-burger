import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import AppHeader from '../../components/app-header'
import BurgerConstructor from '../../components/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients'

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

const App = () => {
  const [ingredients, setIngredients] = useState([])
  const [errorRequest, setErrorRequest] = useState<string>()
  
  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => setIngredients(data.data))
      .catch(error => setErrorRequest(error.message))
  }, [])

  const constructorIngredients = React.useMemo(
    () => {
      const ingredientsLength = ingredients.length - 1
      if (ingredientsLength > 0) {
        return {
          side: ingredients[0],
          middle: ingredients.slice(1, ingredientsLength)
        }
      } else {
        return {
          side: undefined,
          middle: []
        }
      }
    },
    [ingredients]
  )

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {!errorRequest && (
          <>
            <section className={styles.section}>
              <BurgerIngredients 
                ingredients={ingredients} 
              />
            </section >
            <section className={`${styles.section} ${styles.right} pt-25 pb-10 pr-4`}>
              <BurgerConstructor 
                ingredientTop={constructorIngredients.side}
                ingredientBottom={constructorIngredients.side}
                ingredientsMiddle={constructorIngredients.middle}
              /> 
            </section>
          </>
        )}
        {errorRequest && (
          <div className={`${styles.error} text text_type_main-default`}>Упс, у нас проблемы с API: {errorRequest}</div>
        )}
      </main>
    </>
  )
}

export default App
