import React, { useEffect, useState, useReducer } from 'react'
import styles from './styles.module.css'
import AppHeader from '../../components/app-header'
import BurgerConstructor from '../../components/burger-constructor'
import BurgerIngredients from '../../components/burger-ingredients'
import IngredientInterface from '../../interfaces/ingredient'
import UserIngredientsContext from '../../contexts/user-ingredients'

const INGREDIENTS_API_URL = 'https://norma.nomoreparties.space/api/ingredients'

const userIngredientsPrice = (list: any, side: any) => {
  let price = 0
  if (side) {
    price += side.price * 2
  }
  list.map((element: IngredientInterface) => price += element.price)
  return price
} 

const userIngredientsReducer = (state: any, action: any) => {
  if (action.type === 'add') {
    if (action.payload.type === 'bun') {
      return { 
        list: state.list, 
        side: action.payload, 
        total: userIngredientsPrice(state.list, action.payload) 
      }
    } else {
      state.list.push(action.payload)
      return { 
        list: state.list, 
        side: state.side,
        total: userIngredientsPrice(state.list, state.side) 
      }
    }
  }
}

const userIngredientsInitialState = { list: [], side: undefined, total: 0 }

const App = () => {
  const [ingredients, setIngredients] = useState([])
  const [errorRequest, setErrorRequest] = useState<string>()
  const [userIngredientsState, userIngredientsDispatch] = useReducer(
    userIngredientsReducer, userIngredientsInitialState)
  
  useEffect(() => {
    fetch(INGREDIENTS_API_URL)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        const items = data.data
        setIngredients(items)

        // put some ingredients like selected by user for example
        userIngredientsDispatch({ type: 'add', payload: items[0] })
        userIngredientsDispatch({ type: 'add', payload: items[5] })
        userIngredientsDispatch({ type: 'add', payload: items[6] })
        userIngredientsDispatch({ type: 'add', payload: items[7] })
        userIngredientsDispatch({ type: 'add', payload: items[8] })
        userIngredientsDispatch({ type: 'add', payload: items[11] })
        userIngredientsDispatch({ type: 'add', payload: items[12] })
      })
      .catch(error => setErrorRequest(error.message))
  }, [])

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
              <UserIngredientsContext.Provider value={[userIngredientsState, userIngredientsDispatch]}>
                <BurgerConstructor /> 
              </UserIngredientsContext.Provider>
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
