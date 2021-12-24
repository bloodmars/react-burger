import React from 'react'
import BurgerConstructor from 'components/burger-constructor'
import BurgerIngredients from 'components/burger-ingredients'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import styles from './styles.module.css'

const ConstructorPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <section className={styles.section}>
        <BurgerIngredients />
      </section >
      <section className={`${styles.section} ${styles.right} pt-25 pb-10 pr-4`}>
        <BurgerConstructor /> 
      </section>
    </DndProvider> 
  )
}

export default ConstructorPage
