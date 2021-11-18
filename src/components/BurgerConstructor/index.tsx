import React, { useState } from 'react'
import styles from './styles.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientInterface from '../../interfaces/ingredient'
import OrderDetails from '../../components/OrderDetails'
import Modal from '../../components/Modal'

interface Props {
  ingredientTop: IngredientInterface | undefined;
  ingredientBottom: IngredientInterface | undefined;
  ingredientsMiddle: IngredientInterface[];
}

const BurgerConstructor = (props: Props) => {
  const [showModal, setShowModal] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>()

  const showOrderPopup = () => {
    setOrderNumber('034536')
    setShowModal(true)
  }

  return (
    <>
      {props.ingredientTop && (
        <ConstructorElement
          type="top"
          isLocked={true}
          text={props.ingredientTop.name}
          price={props.ingredientTop.price}
          thumbnail={props.ingredientTop.image}
        />         
      )}

      <div className={styles.scroller}>
        {props.ingredientsMiddle.map((element, index) => {
          return (
            <div className={styles.draggable} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement
                isLocked={false}
                text={element.name}
                price={element.price}
                thumbnail={element.image}
              />  
            </div>
          )
        })}
      </div>

      {props.ingredientBottom && (
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={props.ingredientBottom.name}
          price={props.ingredientBottom.price}
          thumbnail={props.ingredientBottom.image}
        />
      )}

      <div className={`${styles.total} mt-10`}>
        <div className={`${styles.price} mr-10`}>
          <span className="text text_type_digits-medium">610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={showOrderPopup}>Оформить заказ</Button>
      </div>

      {showModal && orderNumber && (
        <Modal onClick={() => setShowModal(false)}>
          <OrderDetails number={orderNumber} />
        </Modal>
      )}      
    </>
  )
}

export default BurgerConstructor