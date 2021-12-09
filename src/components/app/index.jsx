import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import AppHeader from '../../components/app-header'
import BurgerConstructor from '../../components/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients'
import { getIngredients } from '../../services/actions/ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const { ingredients, ingredientsFailed } = useSelector(store => store.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {!ingredientsFailed && (
          <DndProvider backend={HTML5Backend}>
            <section className={styles.section}>
              <BurgerIngredients />
            </section >
            <section className={`${styles.section} ${styles.right} pt-25 pb-10 pr-4`}>
              <BurgerConstructor /> 
            </section>
          </DndProvider>
        )}
        {ingredientsFailed && (
          <div className={`${styles.error} text text_type_main-default`}>Упс, у нас проблемы с API: {ingredientsFailed}</div>
        )}
      </main>
    </>
  )
}

export default App
