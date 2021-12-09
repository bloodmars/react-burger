import React, { useState, useMemo, useEffect } from 'react'
import styles from './styles.module.css';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from '../../components/order-details'
import Modal from '../../components/modal'
import ConstructorElement from '../../components/constructor-element'
import { postOrder, ORDER_CLOSE } from '../../services/actions/order'
import { BUILDER_SET_SIDE, BUILDER_ADD_ITEM } from '../../services/actions/builder'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'

const BurgerConstructor = () => {
  const { ingredients } = useSelector(store => store.ingredients)
  const { ingredients: builderIngredients, side } = useSelector(store => store.builder)
  const { order } = useSelector(store => store.order)
  const dispatch = useDispatch()

  const [{ isOver }, dropRef] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop: (item) => {
      const ingredient = ingredients.filter(ingredient => ingredient._id === item._id)[0]
      const actionType = ingredient.type === 'bun' ? BUILDER_SET_SIDE : BUILDER_ADD_ITEM
      dispatch({
        type: actionType,
        payload: ingredient
      })
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  })

  const orderHandler = () => {
    const orderItems = [side].concat(builderIngredients).concat(side)
    dispatch(postOrder(orderItems))
  }

  const closeOrderPopup = () => {
    dispatch({
      type: ORDER_CLOSE
    })
  }

  const totalPrice = useMemo(() => {
    let price = 0
    if (side) {
      price += side.price * 2
    }
    builderIngredients.map(ingredient => price += ingredient.price)
    return price
  }, [builderIngredients, side])

  return (
    <div ref={dropRef} className={`${styles.container} ${
      (builderIngredients.length > 0 || side) ? '' : styles.empty
    } ${
      isOver ? styles.isOver : ''
    }`}>
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
        {builderIngredients.map((ingredient, index) => {
          return (
            <ConstructorElement
              isLocked={false}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              key={index}
              index={index}
            />  
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

      {side && builderIngredients.length > 0 && (
        <div className={`${styles.total} mt-10`}>
          <div className={`${styles.price} mr-10`}>
            <span className="text text_type_digits-medium">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={orderHandler}>Оформить заказ</Button>
        </div>        
      )}

      {order && (
        <Modal onClose={() => closeOrderPopup()}>
          <OrderDetails number={order.number} />
        </Modal>
      )}      
    </div>
  )
}

export default BurgerConstructor