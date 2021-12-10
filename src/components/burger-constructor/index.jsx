import React, { useState, useMemo, useEffect } from 'react'
import styles from './styles.module.css';
import { DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from 'components/order-details'
import Modal from 'components/modal'
import ConstructorElement from 'components/constructor-element'
import { postOrder, ORDER_CLOSE } from 'services/actions/order'
import { BUILDER_SET_BUN, BUILDER_ADD_ITEM } from 'services/actions/builder'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'

const BurgerConstructor = () => {
  const { ingredients } = useSelector(store => store.ingredients)
  const { builderIngredients, builderBun } = useSelector(store => store.builder)
  const { order } = useSelector(store => store.order)
  const dispatch = useDispatch()

  const [{ isOver }, dropRef] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop: (item) => {
      const ingredient = ingredients.find(ingredient => ingredient._id === item._id)
      const actionType = ingredient.type === 'bun' ? BUILDER_SET_BUN : BUILDER_ADD_ITEM
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
    const orderItems = [builderBun].concat(builderIngredients)
    dispatch(postOrder(orderItems))
  }

  const closeOrderPopup = () => {
    dispatch({
      type: ORDER_CLOSE
    })
  }

  const totalPrice = useMemo(() => {
    if (builderBun) {
      const priceIngredients = builderIngredients.reduce((sum, ingredient) => sum + ingredient.price, 0)
      return builderBun.price + priceIngredients
    }
  }, [builderIngredients, builderBun])

  const containerClasses = `
    ${styles.container} 
    ${(builderIngredients.length || builderBun) ? '' : styles.empty} 
    ${isOver ? styles.isOver : ''}
  `

  return (
    <div ref={dropRef} className={containerClasses}>
      {builderBun && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${builderBun.name} (верх)`}
          price={builderBun.price}
          thumbnail={builderBun.image}
        />
      )}

      <div className={styles.scroller}>
        {builderIngredients.map((ingredient, index) => (
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            key={index}
            index={index}
          />
        ))}
      </div>

      {builderBun && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${builderBun.name} (низ)`}
          price={builderBun.price}
          thumbnail={builderBun.image}
        /> 
      )}

      {builderBun && (
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