import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import AppHeader from '../../components/app-header'
import BurgerConstructor from '../../components/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients'
import IngredientInterface from '../../interfaces/ingredient'
import { BurgerContext } from '../../services/contexts'
import { API_BASE_URL } from '../../services/api'

const App = () => {
  const [ingredients, setIngredients] = useState<IngredientInterface[]>([])
  const [errorRequest, setErrorRequest] = useState<string>()
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/ingredients`)
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

  return (
    <BurgerContext.Provider value={ingredients}>
      <AppHeader />
      <main className={styles.main}>
        {!errorRequest && (
          <>
            <section className={styles.section}>
              <BurgerIngredients />
            </section >
            <section className={`${styles.section} ${styles.right} pt-25 pb-10 pr-4`}>
              <BurgerConstructor /> 
            </section>
          </>
        )}
        {errorRequest && (
          <div className={`${styles.error} text text_type_main-default`}>Упс, у нас проблемы с API: {errorRequest}</div>
        )}
      </main>
    </BurgerContext.Provider>
  )
}

export default App
