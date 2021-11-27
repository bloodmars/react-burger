import React, { useState, useContext, useMemo, useEffect } from 'react'
import styles from './styles.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'
import OrderDetails from '../../components/order-details'
import Modal from '../../components/modal'
import { BurgerContext } from '../../services/contexts'
import { API_BASE_URL } from '../../services/api'

const BurgerConstructor = () => {
  const ingredients = useContext(BurgerContext)
  const [showModal, setShowModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>()
  const [side, setSide] = useState<IngredientInterface>()
  const [items, setItems] = useState<IngredientInterface[]>([])

  const orderHandler = () => {
    const ingredients = [side].concat(items).concat(side)

    fetch(`${API_BASE_URL}/orders`, {
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

  useEffect(() => {
    // ИМИТАЦИЯ ПОЛЬЗОВАТЕЛЬСКОГО ВЫБОРА
    if (ingredients.length > 0) {
      setSide(ingredients[0])
      setItems([
        ingredients[5],
        ingredients[6],
        ingredients[7],
        ingredients[8],
        ingredients[10],
        ingredients[11],
        ingredients[12]
      ])
    }   
  }, [ingredients])

  const totalPrice = useMemo(() => {
    let price = 0
    if (side) {
      price += side.price * 2
    }
    items.map((ingredient: IngredientInterface) => price += ingredient.price)
    return price
  }, [items, side])

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
        {items.map((ingredient: IngredientInterface) => {
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

      {side && items.length > 0 && (
        <div className={`${styles.total} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <span className="text text_type_digits-medium">{totalPrice}</span>
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