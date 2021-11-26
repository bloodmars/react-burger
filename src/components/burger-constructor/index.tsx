import React, { useState, useContext, useReducer, useMemo } from 'react'
import styles from './styles.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'
import OrderDetails from '../../components/order-details'
import Modal from '../../components/modal'
import UserIngredientsContext from '../../contexts/user-ingredients'

const ORDER_API_URL = 'https://norma.nomoreparties.space/api/orders'

const BurgerConstructor = () => {
  const [showModal, setShowModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>()
  const [{list, side, total}, userIngredientsDispatch] = useContext(UserIngredientsContext)

  const orderHandler = () => {
    const ingredients = [side].concat(list).concat(side)

    fetch(ORDER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients })
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Something went wrong');
      }
    })
    .then(data => {
      setOrderNumber(data.order.number)
      setShowModal(true)
    })
    .catch(error => console.log(error.message))
  }

  return (
    <>
      {side && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${side.name} (верх)`}
          price={side.price}
          thumbnail={side.image}
        />         
      )}

      <div className={styles.scroller}>
        {list.map((ingredient: IngredientInterface) => {
          return (
            <div className={styles.draggable} key={ingredient._id}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />  
            </div>
          )
        })}
      </div>

      {side && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${side.name} (низ)`}
          price={side.price}
          thumbnail={side.image}
        />
      )}

      {side && list.length > 0 && (
        <div className={`${styles.total} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <span className="text text_type_digits-medium">{total}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={orderHandler}>Оформить заказ</Button>
        </div>        
      )}

      {showModal && orderNumber && (
        <Modal onClose={() => setShowModal(false)}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}      
    </>
  )
}

export default BurgerConstructor