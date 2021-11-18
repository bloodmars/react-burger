import React, { useState } from 'react'
import styles from './styles.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'
import Ingredient from '../../components/Ingredient'
import IngredientDetails from '../../components/IngredientDetails'
import Modal from '../../components/Modal'

interface Props {
  ingredients: IngredientInterface[];
}

const BurgerIngredients = (props: Props) => {
  const [activeTab, setActiveTab] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [showIngredient, setShowIngredient] = useState<IngredientInterface>()

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
            {props.ingredients.filter(element => element.type === 'bun').map(element => (
              <Ingredient data={element} key={element._id} onClick={() => showIngredientPopup(element)} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {props.ingredients.filter(element => element.type === 'sauce').map(element => (
              <Ingredient data={element} key={element._id} onClick={() => showIngredientPopup(element)} />
            ))}
          </div> 
        </div>
        <div>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {props.ingredients.filter(element => element.type === 'main').map(element => (
              <Ingredient data={element} key={element._id} onClick={() => showIngredientPopup(element)} />
            ))}
          </div> 
        </div>
      </div>

      {showModal && showIngredient && (
        <Modal onClick={() => setShowModal(false)} title="Детали ингредиента">
          <IngredientDetails ingredient={showIngredient} />
        </Modal>
      )}
    </>
  )
}

export default BurgerIngredients