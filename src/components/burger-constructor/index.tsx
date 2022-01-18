import React, { FC, useMemo } from 'react'
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom'
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import OrderDetails from 'components/order-details'
import Modal from 'components/modal'
import ConstructorElement from 'components/constructor-element'
import { postOrder, ORDER_CLOSE } from 'services/actions/order'
import { BUILDER_SET_BUN, BUILDER_ADD_ITEM } from 'services/actions/builder'
import { useSelector, useDispatch } from 'react-redux'
import { useDrop } from 'react-dnd'
import IIngredient from 'interfaces/ingredient'

const BurgerConstructor: FC = () => {
  const { isAuth } = useSelector((store: { user: any }) => store.user)
  const { ingredients } = useSelector((store: { ingredients: any }) => store.ingredients)
  const { builderIngredients, builderBun } = useSelector((store: { builder: any }) => store.builder)
  const { order, orderRequest } = useSelector((store: { order: any }) => store.order)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [{ isOver }, dropRef] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop: (item: IIngredient) => {
      const ingredient = ingredients.find((ingredient: IIngredient) => ingredient._id === item._id)
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
    if (isAuth) {
      dispatch(postOrder([builderBun].concat(builderIngredients)))
    } else {
      navigate('/login')
    }
  }

  const closeOrderPopup = () => {
    dispatch({
      type: ORDER_CLOSE
    })
  }

  const totalPrice = useMemo(() => {
    let price = 0
    if (builderBun) {
      price += builderBun.price
    }
    return price + builderIngredients.reduce((sum: number, ingredient: IIngredient) => sum + ingredient.price, 0)
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
        {builderIngredients.map((ingredient: IIngredient, index: number) => (
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
          {orderRequest
            ? <Button type="primary" size="large">Подождите...</Button>
            : <Button type="primary" size="large" onClick={orderHandler}>Оформить заказ</Button>
          }
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