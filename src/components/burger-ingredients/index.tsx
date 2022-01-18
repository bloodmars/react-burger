import React, { FC, useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styles from './styles.module.css'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import Ingredient from 'components/ingredient'
import { useSelector } from 'react-redux'
import IIngredient from 'interfaces/ingredient'

const BurgerIngredients: FC = () => {
  const [activeTab, setActiveTab] = useState('bun')
  const { ingredients } = useSelector((store: { ingredients: any }) => store.ingredients)

  const navigate = useNavigate()
  const location = useLocation()

  const scroller = useRef<HTMLDivElement>(null)
  const sectionBun = useRef<HTMLDivElement>(null)
  const sectionSauce = useRef<HTMLDivElement>(null)
  const sectionMain = useRef<HTMLDivElement>(null)

  const goToIngredient = (id: string) => {
    navigate(`/ingredients/${id}`, { 
      state: { 
        background: location.pathname 
      } 
    })
  }

  const tabHandler = (id: string) => {
    if (!scroller || !scroller.current) {
      return
    }
    const scrollerPos = scroller.current.offsetTop
    switch (id) {
      case 'main': {
        if (sectionMain && sectionMain.current) {
          scroller.current.scrollTop = sectionMain.current.offsetTop - scrollerPos
        }
        break
      }
      case 'sauce': {
        if (sectionSauce && sectionSauce.current) {
          scroller.current.scrollTop = sectionSauce.current.offsetTop - scrollerPos
        }
        break
      }
      default: {
        scroller.current.scrollTop = 0
      }      
    }
  }

  const scrollIngredientsEvent = () => {
    if (!scroller || !scroller.current || 
        !sectionSauce || !sectionSauce.current ||
        !sectionMain || !sectionMain.current) {
      return
    }    
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
    if (!scroller || !scroller.current) {
      return
    }    
    scroller.current.addEventListener('scroll', scrollIngredientsEvent)
    return () => {
      if (!scroller || !scroller.current) {
        return
      }      
      scroller.current.removeEventListener('scroll', scrollIngredientsEvent)
    }
  }, [scroller])

  const getIngredientSection = (type: string) => {
    return (
      <div className={`${styles.container} ml-4 mr-4 mt-6 mb-2`}>
        {ingredients.filter((ingredient: IIngredient) => ingredient.type === type).map((ingredient: IIngredient) => (
          <Ingredient 
            {...ingredient} 
            key={ingredient._id} 
            onClick={() => goToIngredient(ingredient._id)} 
          />
        ))}
      </div>
    )
  }

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
          {getIngredientSection('bun')}
        </div>
        <div>
          <h2 className="text text_type_main-medium" ref={sectionSauce}>Соусы</h2>
          {getIngredientSection('sauce')}
        </div>
        <div>
          <h2 className="text text_type_main-medium" ref={sectionMain}>Начинки</h2>
          {getIngredientSection('main')}
        </div>
      </div>
    </>
  )
}

export default BurgerIngredients