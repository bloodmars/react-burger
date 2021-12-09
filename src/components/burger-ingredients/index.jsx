import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from '../../components/ingredient'
import IngredientDetails from '../../components/ingredient-details'
import Modal from '../../components/modal'
import { SHOW_INGREDIENT_DETAILS, HIDE_INGREDIENT_DETAILS } from '../../services/actions/ingredients'
import { useSelector, useDispatch } from 'react-redux'

const BurgerIngredients = () => {
  const [activeTab, setActiveTab] = useState('bun')
  const { ingredients, ingredientDetails } = useSelector(store => store.ingredients)
  const dispatch = useDispatch()

  const scroller = useRef(null)
  const sectionBun = useRef(null)
  const sectionSauce = useRef(null)
  const sectionMain = useRef(null)

  const showIngredientDetailsPopup = (ingredient) => {
    dispatch({
      type: SHOW_INGREDIENT_DETAILS,
      payload: ingredient
    })
  }

  const closeIngredientDetailsPopup = () => {
    dispatch({
      type: HIDE_INGREDIENT_DETAILS
    })
  }

  const tabHandler = (id) => {
    const scrollerPos = scroller.current.offsetTop

    switch (id) {
      case 'main': {
        scroller.current.scrollTop = sectionMain.current.offsetTop - scrollerPos
        break
      }
      case 'sauce': {
        scroller.current.scrollTop = sectionSauce.current.offsetTop - scrollerPos
        break
      }
      default: {
        scroller.current.scrollTop = 0
      }      
    }
  }

  const scrollIngredientsEvent = () => {
    const scrollerTop = scroller.current.scrollTop
    const scrollerPos = scroller.current.offsetTop
    const saucePos = sectionSauce.current.offsetTop - scrollerPos
    const mainPos = sectionMain.current.offsetTop - scrollerPos
    
    if (scrollerTop >= mainPos) { 
      setActiveTab('main')
    } else if (scrollerTop >= saucePos) { 
      setActiveTab('sauce')
    } else { 
      setActiveTab('bun')
    }
  }
  
  useEffect(() => {
    scroller.current.addEventListener('scroll', scrollIngredientsEvent);
    return () => scroller.current.removeEventListener('scroll', scrollIngredientsEvent);  
  }, [scroller])

  return (
    <>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${styles.tab} mb-10`}>
        <Tab value="1" active={activeTab === 'bun'} onClick={() => tabHandler('bun')}>Булки</Tab>
        <Tab value="2" active={activeTab === 'sauce'} onClick={() => tabHandler('sauce')}>Соусы</Tab>
        <Tab value="3" active={activeTab === 'main'} onClick={() => tabHandler('main')}>Начинки</Tab>
      </div>
      <div className={styles.scroller} ref={scroller}>
        <div>
          <h2 className="text text_type_main-medium" ref={sectionBun}>Булки</h2>     
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {ingredients.filter(ingredient => ingredient.type === 'bun').map(ingredient => (
              <Ingredient 
                {...ingredient} 
                key={ingredient._id} 
                onClick={() => showIngredientDetailsPopup(ingredient)} 
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text text_type_main-medium" ref={sectionSauce}>Соусы</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {ingredients.filter(ingredient => ingredient.type === 'sauce').map(ingredient => (
              <Ingredient 
                {...ingredient} 
                key={ingredient._id} 
                onClick={() => showIngredientDetailsPopup(ingredient)} 
              />
            ))}
          </div> 
        </div>
        <div>
          <h2 className="text text_type_main-medium" ref={sectionMain}>Начинки</h2>
          <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
            {ingredients.filter(ingredient => ingredient.type === 'main').map(ingredient => (
              <Ingredient 
                {...ingredient} 
                key={ingredient._id} 
                onClick={() => showIngredientDetailsPopup(ingredient)} 
              />
            ))}
          </div> 
        </div>
      </div>

      {ingredientDetails && (
        <Modal onClose={() => closeIngredientDetailsPopup()} title="Детали ингредиента">
          <IngredientDetails ingredient={ingredientDetails} />
        </Modal>
      )}
    </>
  )
}

export default BurgerIngredients