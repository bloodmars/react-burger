import React, { useState, FC, useContext } from 'react'
import styles from './styles.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'
import Ingredient from '../../components/ingredient'
import IngredientDetails from '../../components/ingredient-details'
import Modal from '../../components/modal'
import { BurgerContext } from '../../services/contexts'

const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showIngredient, setShowIngredient] = useState<IngredientInterface>()
  const ingredients = useContext(BurgerContext)

  const showIngredientPopup = (ingredient: IngredientInterface) => {
    setShowIngredient(ingredient)
    setShowModal(true)
  }

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tab} mb-10`}>
        <Tab value="1" active={activeTab === 1} onClick={() => setActiveTab(1)}>Булки</Tab>
        <Tab value="2" active={activeTab === 2} onClick={() => setActiveTab(2)}>Соусы</Tab>
        <Tab value="3" active={activeTab === 3} onClick={() => setActiveTab(3)}>Начинки</Tab>
      </div>
      <div className={styles.scroller}>
        <div>
          <h2 className="text text_type_main-medium">Булки</h2>     
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {ingredients.filter((ingredient: IngredientInterface) => ingredient.type === 'bun').map((ingredient: IngredientInterface) => (
              <Ingredient {...ingredient} key={ingredient._id} onClick={() => showIngredientPopup(ingredient)} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {ingredients.filter((ingredient: IngredientInterface) => ingredient.type === 'sauce').map((ingredient: IngredientInterface) => (
              <Ingredient {...ingredient} key={ingredient._id} onClick={() => showIngredientPopup(ingredient)} />
            ))}
          </div> 
        </div>
        <div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {ingredients.filter((ingredient: IngredientInterface) => ingredient.type === 'main').map((ingredient: IngredientInterface) => (
              <Ingredient {...ingredient} key={ingredient._id} onClick={() => showIngredientPopup(ingredient)} />
            ))}
          </div> 
        </div>
      </div>

      {showModal && showIngredient && (
        <Modal onClose={() => setShowModal(false)} title="Детали ингредиента">
          <IngredientDetails ingredient={showIngredient} />
        </Modal>
      )}
    </>
  )
}

export default BurgerIngredients